package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestHealthDemo(t *testing.T) {
	s := &server{demo: true}
	r := httptest.NewRequest(http.MethodGet, "/api/health", nil)
	w := httptest.NewRecorder()
	s.health(w, r)
	if w.Code != http.StatusOK {
		t.Fatalf("expected 200 got %d", w.Code)
	}
	var out map[string]any
	if err := json.Unmarshal(w.Body.Bytes(), &out); err != nil {
		t.Fatal(err)
	}
	if ok, _ := out["ok"].(bool); !ok {
		t.Fatalf("expected ok true")
	}
}

func TestCatalogContainsGetSessions(t *testing.T) {
	s := &server{demo: true}
	r := httptest.NewRequest(http.MethodGet, "/api/catalog", nil)
	w := httptest.NewRecorder()
	s.catalog(w, r)
	if w.Code != http.StatusOK {
		t.Fatalf("expected 200 got %d", w.Code)
	}
	var out []methodInfo
	if err := json.Unmarshal(w.Body.Bytes(), &out); err != nil {
		t.Fatal(err)
	}
	found := false
	for _, m := range out {
		if m.Method == "GetSessions" {
			found = true
			break
		}
	}
	if !found {
		t.Fatal("GetSessions not found in catalog")
	}
}

func TestActionCatalogContainsPayloadGenerate(t *testing.T) {
	s := &server{demo: true}
	r := httptest.NewRequest(http.MethodGet, "/api/action-catalog", nil)
	w := httptest.NewRecorder()
	s.actionCatalog(w, r)
	if w.Code != http.StatusOK {
		t.Fatalf("expected 200 got %d", w.Code)
	}
	var out []actionTemplate
	if err := json.Unmarshal(w.Body.Bytes(), &out); err != nil {
		t.Fatal(err)
	}
	found := false
	for _, a := range out {
		if a.Key == "payload.generate" {
			found = true
			break
		}
	}
	if !found {
		t.Fatal("payload.generate not found in action catalog")
	}
}

func TestInvokeDemo(t *testing.T) {
	s := &server{demo: true}
	body := `{"method":"GetSessions","body":"{}"}`
	r := httptest.NewRequest(http.MethodPost, "/api/invoke", strings.NewReader(body))
	w := httptest.NewRecorder()
	s.invoke(w, r)
	if w.Code != http.StatusOK {
		t.Fatalf("expected 200 got %d body=%s", w.Code, w.Body.String())
	}
	if !strings.Contains(w.Body.String(), "demo") {
		t.Fatalf("expected demo response, got %s", w.Body.String())
	}
}

func TestDashboardDemo(t *testing.T) {
	s := &server{demo: true}
	r := httptest.NewRequest(http.MethodGet, "/api/dashboard", nil)
	w := httptest.NewRecorder()
	s.dashboard(w, r)
	if w.Code != http.StatusOK {
		t.Fatalf("expected 200 got %d", w.Code)
	}
	if !strings.Contains(w.Body.String(), "sessions") {
		t.Fatalf("expected sessions in dashboard payload")
	}
}

func TestActionDemo(t *testing.T) {
	s := &server{demo: true}
	body := `{"action":"listener.mtls.start","params":{"name":"ops","host":"0.0.0.0","port":"8888"}}`
	r := httptest.NewRequest(http.MethodPost, "/api/action", strings.NewReader(body))
	w := httptest.NewRecorder()
	s.action(w, r)
	if w.Code != http.StatusOK {
		t.Fatalf("expected 200 got %d body=%s", w.Code, w.Body.String())
	}
	if !strings.Contains(w.Body.String(), "StartMTLSListener") {
		t.Fatalf("expected mapped method in response")
	}
}

func TestMapActionUnsupported(t *testing.T) {
	_, _, err := mapActionToRPC("unsupported", map[string]string{})
	if err == nil {
		t.Fatalf("expected error")
	}
}

func TestRPCDocsContainsGetSessions(t *testing.T) {
	s := &server{demo: true}
	r := httptest.NewRequest(http.MethodGet, "/api/rpc-docs", nil)
	w := httptest.NewRecorder()
	s.rpcDocs(w, r)
	if w.Code != http.StatusOK {
		t.Fatalf("expected 200 got %d", w.Code)
	}
	var out []rpcDoc
	if err := json.Unmarshal(w.Body.Bytes(), &out); err != nil {
		t.Fatal(err)
	}
	found := false
	for _, d := range out {
		if d.Method == "GetSessions" {
			found = true
			if d.Summary == "" || d.WhenToUse == "" {
				t.Fatalf("expected populated docs for GetSessions")
			}
			break
		}
	}
	if !found {
		t.Fatalf("GetSessions docs not found")
	}
}

func TestBeaconMapDemo(t *testing.T) {
	s := &server{demo: true}
	r := httptest.NewRequest(http.MethodGet, "/api/beacon-map", nil)
	w := httptest.NewRecorder()
	s.beaconMap(w, r)
	if w.Code != http.StatusOK {
		t.Fatalf("expected 200 got %d", w.Code)
	}
	var out beaconMapResponse
	if err := json.Unmarshal(w.Body.Bytes(), &out); err != nil {
		t.Fatal(err)
	}
	if len(out.Nodes) == 0 {
		t.Fatalf("expected nodes in beacon map")
	}
	if len(out.Nodes[0].Menu) == 0 {
		t.Fatalf("expected context menu options in beacon map node")
	}
}
