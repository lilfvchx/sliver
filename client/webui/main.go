package main

import (
	"bytes"
	"context"
	"embed"
	"encoding/json"
	"errors"
	"flag"
	"fmt"
	"io"
	"io/fs"
	"log"
	"math"
	"net/http"
	"reflect"
	"sort"
	"strconv"
	"strings"
	"time"

	"github.com/bishopfox/sliver/client/assets"
	"github.com/bishopfox/sliver/client/transport"
	"github.com/bishopfox/sliver/protobuf/commonpb"
	"github.com/bishopfox/sliver/protobuf/rpcpb"
	"github.com/golang/protobuf/jsonpb"
	oldproto "github.com/golang/protobuf/proto"
	"google.golang.org/grpc"
	"google.golang.org/protobuf/reflect/protoreflect"
)

//go:embed static/*
var staticFS embed.FS

const (
	defaultRPCTimeout  = 2 * time.Minute
	demoEventsInterval = 300 * time.Millisecond
)

type server struct {
	conn *grpc.ClientConn
	rpc  rpcpb.SliverRPCClient
	demo bool
}

type invokeRequest struct {
	Method string `json:"method"`
	Body   string `json:"body"`
}

type actionRequest struct {
	Action string            `json:"action"`
	Params map[string]string `json:"params"`
}

type methodInfo struct {
	Method          string `json:"method"`
	Input           string `json:"input"`
	Output          string `json:"output"`
	ClientStreaming bool   `json:"clientStreaming"`
	ServerStreaming bool   `json:"serverStreaming"`
	Category        string `json:"category"`
}

type rpcDoc struct {
	Method          string   `json:"method"`
	Category        string   `json:"category"`
	Summary         string   `json:"summary"`
	WhenToUse       string   `json:"whenToUse"`
	InputMessage    string   `json:"inputMessage"`
	OutputMessage   string   `json:"outputMessage"`
	InputFields     []string `json:"inputFields"`
	Streaming       string   `json:"streaming"`
	ExampleRequest  string   `json:"exampleRequest"`
	RelatedPlaybook []string `json:"relatedPlaybook"`
	Tips            []string `json:"tips"`
}

type actionTemplate struct {
	Key         string            `json:"key"`
	Label       string            `json:"label"`
	Description string            `json:"description"`
	Category    string            `json:"category"`
	Params      map[string]string `json:"params"`
}

type beaconMapNode struct {
	ID       string   `json:"id"`
	Label    string   `json:"label"`
	Host     string   `json:"host"`
	Status   string   `json:"status"`
	X        float64  `json:"x"`
	Y        float64  `json:"y"`
	Menu     []string `json:"menu"`
	Operator string   `json:"operator"`
}

type beaconMapResponse struct {
	Nodes []beaconMapNode `json:"nodes"`
	Edges [][2]string     `json:"edges"`
}

var actionTemplates = []actionTemplate{
	{Key: "listener.mtls.start", Label: "Start mTLS Listener", Description: "Levanta listener mTLS para sesiones/beacons.", Category: "Infrastructure", Params: map[string]string{"name": "team-mtls", "host": "0.0.0.0", "port": "8888"}},
	{Key: "listener.http.start", Label: "Start HTTP Listener", Description: "Levanta listener HTTP.", Category: "Infrastructure", Params: map[string]string{"name": "team-http", "host": "0.0.0.0", "port": "80"}},
	{Key: "listener.https.start", Label: "Start HTTPS Listener", Description: "Levanta listener HTTPS.", Category: "Infrastructure", Params: map[string]string{"name": "team-https", "host": "0.0.0.0", "port": "443", "domain": ""}},
	{Key: "payload.generate", Label: "Generate Implant", Description: "Genera payload base para operación.", Category: "Payloads", Params: map[string]string{"name": "beacon-sales", "os": "windows", "arch": "amd64", "format": "0", "isBeacon": "true"}},
	{Key: "sessions.list", Label: "List Sessions", Description: "Vista de sesiones activas.", Category: "Operations", Params: map[string]string{}},
	{Key: "beacons.list", Label: "List Beacons", Description: "Vista de beacons registrados.", Category: "Operations", Params: map[string]string{}},
	{Key: "jobs.list", Label: "List Jobs", Description: "Lista jobs del servidor.", Category: "Operations", Params: map[string]string{}},
	{Key: "pivot.graph", Label: "Pivot Graph", Description: "Topología de pivoteo.", Category: "Operations", Params: map[string]string{}},
	{Key: "loot.list", Label: "List Loot", Description: "Muestra loot centralizado.", Category: "Data", Params: map[string]string{}},
	{Key: "creds.list", Label: "List Creds", Description: "Muestra credenciales recolectadas.", Category: "Data", Params: map[string]string{}},
	{Key: "websites.list", Label: "List Websites", Description: "Muestra sitios hosteados por Sliver.", Category: "Data", Params: map[string]string{}},
	{Key: "builders.list", Label: "List Builders", Description: "Muestra builders externos.", Category: "Extensibility", Params: map[string]string{}},
	{Key: "extensions.list", Label: "List Extensions", Description: "Consulta catálogo de extensiones cargadas.", Category: "Extensibility", Params: map[string]string{}},
}

func main() {
	addr := flag.String("listen", "127.0.0.1:18080", "HTTP listen address")
	configPath := flag.String("config", "", "Path to sliver operator config")
	demo := flag.Bool("demo", false, "Run with mock data and no Sliver connection")
	flag.Parse()

	if !*demo && *configPath == "" {
		log.Fatal("-config is required")
	}

	s := &server{demo: *demo}
	if !*demo {
		cfg, err := assets.ReadConfig(*configPath)
		if err != nil {
			log.Fatalf("read config: %v", err)
		}
		rpc, conn, err := transport.MTLSConnect(cfg)
		if err != nil {
			log.Fatalf("connect: %v", err)
		}
		defer conn.Close()
		s.conn = conn
		s.rpc = rpc
	}

	log.Printf("sliver webui listening on http://%s", *addr)
	log.Fatal(http.ListenAndServe(*addr, s.routes()))
}

func (s *server) routes() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/api/health", s.health)
	mux.HandleFunc("/api/catalog", s.catalog)
	mux.HandleFunc("/api/rpc-docs", s.rpcDocs)
	mux.HandleFunc("/api/action-catalog", s.actionCatalog)
	mux.HandleFunc("/api/dashboard", s.dashboard)
	mux.HandleFunc("/api/beacon-map", s.beaconMap)
	mux.HandleFunc("/api/invoke", s.invoke)
	mux.HandleFunc("/api/action", s.action)
	mux.HandleFunc("/api/events", s.events)

	sub, err := fs.Sub(staticFS, "static")
	if err != nil {
		panic(err)
	}
	mux.Handle("/", http.FileServer(http.FS(sub)))
	return mux
}

func (s *server) health(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, map[string]any{"ok": true, "demo": s.demo})
}

func (s *server) actionCatalog(w http.ResponseWriter, _ *http.Request) { writeJSON(w, actionTemplates) }

func (s *server) rpcDocs(w http.ResponseWriter, _ *http.Request) {
	svc := rpcpb.File_rpcpb_services_proto.Services().ByName("SliverRPC")
	docs := make([]rpcDoc, 0, svc.Methods().Len())
	related := relatedActionsByMethod()
	for i := 0; i < svc.Methods().Len(); i++ {
		m := svc.Methods().Get(i)
		method := string(m.Name())
		fields := make([]string, 0, m.Input().Fields().Len())
		for fi := 0; fi < m.Input().Fields().Len(); fi++ {
			f := m.Input().Fields().Get(fi)
			fields = append(fields, fmt.Sprintf("%s (%s)", f.Name(), f.Kind()))
		}
		streaming := "unary"
		if m.IsStreamingServer() && m.IsStreamingClient() {
			streaming = "bidi-stream"
		} else if m.IsStreamingServer() {
			streaming = "server-stream"
		} else if m.IsStreamingClient() {
			streaming = "client-stream"
		}
		docs = append(docs, rpcDoc{
			Method:          method,
			Category:        category(method),
			Summary:         rpcSummary(method),
			WhenToUse:       rpcWhenToUse(method),
			InputMessage:    string(m.Input().FullName()),
			OutputMessage:   string(m.Output().FullName()),
			InputFields:     fields,
			Streaming:       streaming,
			ExampleRequest:  rpcExampleRequest(method),
			RelatedPlaybook: related[method],
			Tips:            rpcTips(method),
		})
	}
	sort.Slice(docs, func(i, j int) bool {
		if docs[i].Category == docs[j].Category {
			return docs[i].Method < docs[j].Method
		}
		return docs[i].Category < docs[j].Category
	})
	writeJSON(w, docs)
}

func (s *server) dashboard(w http.ResponseWriter, r *http.Request) {
	if s.demo {
		writeJSON(w, map[string]any{"sessions": map[string]any{"sessions": []any{map[string]any{"id": "demo-session-1"}}}, "beacons": map[string]any{"beacons": []any{map[string]any{"id": "demo-beacon-1"}}}, "jobs": map[string]any{"active": []any{}}, "hosts": map[string]any{"hosts": []any{map[string]any{"hostUUID": "demo-host"}}}, "loot": map[string]any{"loot": []any{}}, "creds": map[string]any{"credentials": []any{}}, "websites": map[string]any{"websites": []any{}}, "builders": map[string]any{"builders": []any{}}, "extensions": map[string]any{"extensions": []any{}}})
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 45*time.Second)
	defer cancel()
	tasks := []struct{ n, m string }{{"sessions", "GetSessions"}, {"beacons", "GetBeacons"}, {"jobs", "GetJobs"}, {"hosts", "Hosts"}, {"loot", "LootAll"}, {"creds", "Creds"}, {"websites", "Websites"}, {"builders", "Builders"}, {"extensions", "ListExtensions"}}
	out, errs := map[string]any{}, map[string]string{}
	for _, t := range tasks {
		body := `{}`
		if t.m == "ListExtensions" {
			body = `{"request":{}}`
		}
		resp, err := s.invokeRPC(ctx, t.m, body)
		if err != nil {
			errs[t.n] = err.Error()
			continue
		}
		out[t.n] = resp
	}
	if len(errs) > 0 {
		out["errors"] = errs
	}
	writeJSON(w, out)
}

func (s *server) beaconMap(w http.ResponseWriter, r *http.Request) {
	if s.demo {
		writeJSON(w, beaconMapResponse{Nodes: []beaconMapNode{
			{ID: "b-1", Label: "Beacon-Alpha", Host: "wkstn-01", Status: "online", X: 120, Y: 80, Operator: "sales", Menu: []string{"Interact", "Tasks", "Pivot", "Screenshot", "Kill"}},
			{ID: "b-2", Label: "Beacon-Bravo", Host: "srv-finance", Status: "online", X: 320, Y: 160, Operator: "sales", Menu: []string{"Interact", "Tasks", "Loot", "Creds", "Kill"}},
			{ID: "b-3", Label: "Beacon-Charlie", Host: "dc-01", Status: "sleep", X: 500, Y: 70, Operator: "sales", Menu: []string{"Interact", "Tasks", "Pivot Graph", "Kill"}},
		}, Edges: [][2]string{{"b-1", "b-2"}, {"b-2", "b-3"}}})
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 20*time.Second)
	defer cancel()
	raw, err := s.invokeRPC(ctx, "GetBeacons", `{}`)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadGateway)
		return
	}

	var parsed map[string]any
	if err := json.Unmarshal([]byte(raw), &parsed); err != nil {
		http.Error(w, fmt.Sprintf("cannot parse beacons payload: %v", err), http.StatusBadGateway)
		return
	}
	arr, _ := parsed["beacons"].([]any)
	nodes := make([]beaconMapNode, 0, len(arr))
	radius, cx, cy := 220.0, 320.0, 200.0
	for i, item := range arr {
		m, _ := item.(map[string]any)
		id := asString(m["id"], fmt.Sprintf("beacon-%d", i+1))
		host := asString(m["hostname"], "unknown")
		label := asString(m["name"], id)
		angle := (2 * math.Pi * float64(i)) / math.Max(float64(len(arr)), 1)
		nodes = append(nodes, beaconMapNode{
			ID:       id,
			Label:    label,
			Host:     host,
			Status:   "online",
			X:        cx + radius*math.Cos(angle),
			Y:        cy + radius*math.Sin(angle),
			Operator: asString(m["username"], "operator"),
			Menu:     []string{"Interact", "Tasks", "Pivot", "Loot", "Kill"},
		})
	}

	edges := make([][2]string, 0)
	for i := 1; i < len(nodes); i++ {
		edges = append(edges, [2]string{nodes[i-1].ID, nodes[i].ID})
	}
	writeJSON(w, beaconMapResponse{Nodes: nodes, Edges: edges})
}

func (s *server) catalog(w http.ResponseWriter, _ *http.Request) {
	svc := rpcpb.File_rpcpb_services_proto.Services().ByName("SliverRPC")
	methods := make([]methodInfo, 0, svc.Methods().Len())
	for i := 0; i < svc.Methods().Len(); i++ {
		m := svc.Methods().Get(i)
		n := string(m.Name())
		methods = append(methods, methodInfo{Method: n, Input: string(m.Input().FullName()), Output: string(m.Output().FullName()), ClientStreaming: m.IsStreamingClient(), ServerStreaming: m.IsStreamingServer(), Category: category(n)})
	}
	sort.Slice(methods, func(i, j int) bool {
		if methods[i].Category == methods[j].Category {
			return methods[i].Method < methods[j].Method
		}
		return methods[i].Category < methods[j].Category
	})
	writeJSON(w, methods)
}

func (s *server) invoke(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	var req invokeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), defaultRPCTimeout)
	defer cancel()
	resp, err := s.invokeRPC(ctx, req.Method, req.Body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	writeJSON(w, map[string]any{"method": req.Method, "response": resp})
}

func (s *server) action(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "method not allowed", http.StatusMethodNotAllowed)
		return
	}
	var req actionRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	method, body, err := mapActionToRPC(req.Action, req.Params)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), defaultRPCTimeout)
	defer cancel()
	resp, err := s.invokeRPC(ctx, method, body)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	writeJSON(w, map[string]any{"action": req.Action, "method": method, "response": resp})
}

func mapActionToRPC(action string, params map[string]string) (string, string, error) {
	get := func(k, d string) string {
		if v := strings.TrimSpace(params[k]); v != "" {
			return v
		}
		return d
	}
	portNum := func(k, d string) string {
		p := get(k, d)
		if _, err := strconv.Atoi(p); err != nil {
			return d
		}
		return p
	}
	switch action {
	case "listener.mtls.start":
		return "StartMTLSListener", fmt.Sprintf(`{"name":"%s","host":"%s","port":%s}`, get("name", "team-mtls"), get("host", "0.0.0.0"), portNum("port", "8888")), nil
	case "listener.http.start":
		return "StartHTTPListener", fmt.Sprintf(`{"name":"%s","host":"%s","domain":"%s","port":%s}`, get("name", "team-http"), get("host", "0.0.0.0"), get("domain", ""), portNum("port", "80")), nil
	case "listener.https.start":
		return "StartHTTPSListener", fmt.Sprintf(`{"name":"%s","host":"%s","domain":"%s","port":%s}`, get("name", "team-https"), get("host", "0.0.0.0"), get("domain", ""), portNum("port", "443")), nil
	case "payload.generate":
		return "Generate", fmt.Sprintf(`{"name":"%s","os":"%s","arch":"%s","format":%s,"isBeacon":%s}`, get("name", "beacon-sales"), get("os", "windows"), get("arch", "amd64"), portNum("format", "0"), get("isBeacon", "true")), nil
	case "pivot.graph":
		return "PivotGraph", `{}`, nil
	case "loot.list":
		return "LootAll", `{}`, nil
	case "creds.list":
		return "Creds", `{}`, nil
	case "jobs.list":
		return "GetJobs", `{}`, nil
	case "beacons.list":
		return "GetBeacons", `{}`, nil
	case "sessions.list":
		return "GetSessions", `{}`, nil
	case "websites.list":
		return "Websites", `{}`, nil
	case "builders.list":
		return "Builders", `{}`, nil
	case "extensions.list":
		return "ListExtensions", `{"request":{}}`, nil
	default:
		return "", "", fmt.Errorf("unsupported action %q", action)
	}
}

func (s *server) invokeRPC(ctx context.Context, methodName, body string) (string, error) {
	mDesc, fullMethod, err := resolveMethod(methodName)
	if err != nil {
		return "", err
	}
	if s.demo {
		return fmt.Sprintf("{\n  \"demo\": true,\n  \"method\": %q,\n  \"note\": \"Mock mode enabled, no RPC executed\"\n}", mDesc.Name()), nil
	}
	inMsg, err := newMessageByName(string(mDesc.Input().FullName()))
	if err != nil {
		return "", err
	}
	outMsg, err := newMessageByName(string(mDesc.Output().FullName()))
	if err != nil {
		return "", err
	}
	if strings.TrimSpace(body) == "" {
		body = "{}"
	}
	if err := jsonpb.UnmarshalString(body, inMsg); err != nil {
		return "", fmt.Errorf("invalid request json: %w", err)
	}
	if !mDesc.IsStreamingServer() && !mDesc.IsStreamingClient() {
		if err := s.conn.Invoke(ctx, fullMethod, inMsg, outMsg); err != nil {
			return "", err
		}
		return marshalProto(outMsg)
	}
	if mDesc.IsStreamingClient() {
		return "", errors.New("client-streaming RPCs are not currently supported in web invoke")
	}
	stream, err := s.conn.NewStream(ctx, &grpc.StreamDesc{ServerStreams: true}, fullMethod)
	if err != nil {
		return "", err
	}
	if err := stream.SendMsg(inMsg); err != nil {
		return "", err
	}
	if err := stream.CloseSend(); err != nil {
		return "", err
	}
	items := []string{}
	for {
		msg, err := newMessageByName(string(mDesc.Output().FullName()))
		if err != nil {
			return "", err
		}
		err = stream.RecvMsg(msg)
		if err != nil {
			if errors.Is(err, io.EOF) {
				break
			}
			return "", err
		}
		j, err := marshalProto(msg)
		if err != nil {
			return "", err
		}
		items = append(items, j)
	}
	return "[\n" + strings.Join(items, ",\n") + "\n]", nil
}

func marshalProto(msg oldproto.Message) (string, error) {
	b := bytes.NewBuffer(nil)
	if err := (&jsonpb.Marshaler{Indent: "  "}).Marshal(b, msg); err != nil {
		return "", err
	}
	return b.String(), nil
}

func newMessageByName(name string) (oldproto.Message, error) {
	t := oldproto.MessageType(name)
	if t == nil {
		return nil, fmt.Errorf("message type %s not found in registry", name)
	}
	v := reflect.New(t.Elem()).Interface()
	msg, ok := v.(oldproto.Message)
	if !ok {
		return nil, fmt.Errorf("%s is not a proto message", name)
	}
	return msg, nil
}

func (s *server) events(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	if s.demo {
		for i := 0; ; i++ {
			fmt.Fprintf(w, "event: message\ndata: {\"eventType\":\"session-connected\",\"demo\":true,\"count\":%d}\n\n", i+1)
			if f, ok := w.(http.Flusher); ok {
				f.Flush()
			}
			select {
			case <-r.Context().Done():
				return
			case <-time.After(demoEventsInterval):
			}
		}
	}
	stream, err := s.rpc.Events(r.Context(), &commonpb.Empty{})
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadGateway)
		return
	}
	for {
		evt, err := stream.Recv()
		if err != nil {
			fmt.Fprintf(w, "event: error\ndata: %q\n\n", err.Error())
			if f, ok := w.(http.Flusher); ok {
				f.Flush()
			}
			return
		}
		buf := bytes.NewBuffer(nil)
		_ = (&jsonpb.Marshaler{}).Marshal(buf, evt)
		fmt.Fprintf(w, "event: message\ndata: %s\n\n", strings.TrimSpace(buf.String()))
		if f, ok := w.(http.Flusher); ok {
			f.Flush()
		}
	}
}

func resolveMethod(name string) (protoreflect.MethodDescriptor, string, error) {
	name = strings.TrimSpace(name)
	svc := rpcpb.File_rpcpb_services_proto.Services().ByName("SliverRPC")
	for i := 0; i < svc.Methods().Len(); i++ {
		m := svc.Methods().Get(i)
		if string(m.Name()) == name || "/rpcpb.SliverRPC/"+string(m.Name()) == name {
			return m, "/rpcpb.SliverRPC/" + string(m.Name()), nil
		}
	}
	return nil, "", fmt.Errorf("unknown method %q", name)
}

func category(method string) string {
	switch {
	case strings.Contains(method, "Session") || strings.Contains(method, "Beacon") || strings.Contains(method, "Task"):
		return "Operator > Endpoints"
	case strings.Contains(method, "Listener") || strings.Contains(method, "MTLS") || strings.Contains(method, "WG") || strings.Contains(method, "DNS") || strings.Contains(method, "HTTP"):
		return "Infrastructure > C2"
	case strings.Contains(method, "Generate") || strings.Contains(method, "Build") || strings.Contains(method, "Profile") || strings.Contains(method, "Compiler"):
		return "Operations > Payloads"
	case strings.Contains(method, "Loot") || strings.Contains(method, "Cred") || strings.Contains(method, "Host") || strings.Contains(method, "Website"):
		return "Operations > Data"
	case strings.Contains(method, "Alias") || strings.Contains(method, "Extension") || strings.Contains(method, "Wasm") || strings.Contains(method, "Builder"):
		return "Platform > Extensibility"
	case strings.Contains(method, "Crack"):
		return "Operations > Crackstation"
	case strings.Contains(method, "Operator") || strings.Contains(method, "Client") || strings.Contains(method, "Version") || strings.Contains(method, "Event"):
		return "Platform > Core"
	default:
		return "Other"
	}
}

func writeJSON(w http.ResponseWriter, payload any) {
	w.Header().Set("Content-Type", "application/json")
	_ = json.NewEncoder(w).Encode(payload)
}

func asString(v any, fallback string) string {
	if s, ok := v.(string); ok && strings.TrimSpace(s) != "" {
		return s
	}
	return fallback
}

func relatedActionsByMethod() map[string][]string {
	out := map[string][]string{}
	for _, a := range actionTemplates {
		m, _, err := mapActionToRPC(a.Key, a.Params)
		if err != nil {
			continue
		}
		out[m] = append(out[m], a.Key)
	}
	return out
}

func rpcSummary(method string) string {
	switch {
	case strings.HasPrefix(method, "Start") && strings.Contains(method, "Listener"):
		return "Inicia un listener C2 en el servidor Sliver."
	case strings.Contains(method, "Generate"):
		return "Genera un payload/artefacto de implant para operación."
	case strings.Contains(method, "Session") || strings.Contains(method, "Beacon"):
		return "Consulta o gestiona endpoints comprometidos (sessions/beacons)."
	case strings.Contains(method, "Loot"):
		return "Gestiona artefactos recolectados durante la operación."
	case strings.Contains(method, "Cred"):
		return "Gestiona credenciales obtenidas o importadas."
	case strings.Contains(method, "Builder") || strings.Contains(method, "Extension"):
		return "Administra componentes externos y extensibilidad."
	default:
		return "Ejecuta una operación del plano de control SliverRPC."
	}
}

func rpcWhenToUse(method string) string {
	switch {
	case strings.Contains(method, "Listener"):
		return "Úsalo al preparar infraestructura C2 antes de generar/entregar implantes."
	case strings.Contains(method, "Generate"):
		return "Úsalo cuando necesites crear un nuevo implant/payload para una campaña."
	case strings.Contains(method, "Session") || strings.Contains(method, "Beacon"):
		return "Úsalo durante ejecución para monitoreo y control de endpoints activos."
	case strings.Contains(method, "Loot") || strings.Contains(method, "Cred"):
		return "Úsalo durante post-explotación para clasificar y operar sobre datos obtenidos."
	default:
		return "Úsalo cuando el workflow guiado no cubre tu caso y necesites control granular."
	}
}

func rpcExampleRequest(method string) string {
	if m, b, err := mapActionToRPC("payload.generate", map[string]string{}); err == nil && method == m {
		return b
	}
	for _, a := range actionTemplates {
		m, b, err := mapActionToRPC(a.Key, a.Params)
		if err == nil && m == method {
			return b
		}
	}
	return "{}"
}

func rpcTips(method string) []string {
	tips := []string{"Valida siempre los campos requeridos del request antes de ejecutar en producción."}
	if strings.Contains(method, "Listener") {
		tips = append(tips, "Verifica puertos, firewall y certificados antes de iniciar listeners.")
	}
	if strings.Contains(method, "Generate") {
		tips = append(tips, "Alinea OS/ARCH/format con el objetivo para evitar payloads inválidos.")
	}
	if strings.Contains(method, "Session") || strings.Contains(method, "Beacon") {
		tips = append(tips, "Combina con el Event Stream para detectar cambios en tiempo real.")
	}
	if strings.Contains(method, "Extension") || strings.Contains(method, "Builder") {
		tips = append(tips, "Revisa compatibilidad y firma/origen del módulo antes de usarlo.")
	}
	return tips
}
