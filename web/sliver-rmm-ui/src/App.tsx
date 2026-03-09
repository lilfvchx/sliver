import React, { useMemo, useState } from "react";
import Editor from "@monaco-editor/react";
import toast, { Toaster } from "react-hot-toast";
import {
  Activity,
  Bell,
  Bot,
  ChevronRight,
  Circle,
  Command,
  Download,
  Folder,
  HardDrive,
  LayoutDashboard,
  Menu,
  Monitor,
  Network,
  Package,
  Play,
  Search,
  Server,
  Settings,
  Terminal,
  Upload,
  X,
} from "lucide-react";
import { rpcCatalog } from "./data/rpcCatalog";

type Node = {
  id: string;
  name: string;
  mode: "Session" | "Beacon";
  os: string;
  pid: number;
  execPath: string;
  status: "active" | "idle";
};

type Protocol = "mtls" | "wg" | "dns" | "http" | "https";
type MainTab = "operaciones" | "infraestructura";

type LogLine = { text: string; level: "ok" | "err" | "info" };

const nodes: Node[] = [
  { id: "1", name: "DC-APP-01", mode: "Session", os: "Windows Server 2022", pid: 1888, execPath: "C:\\ProgramData\\svc.exe", status: "active" },
  { id: "2", name: "ENG-LAP-09", mode: "Beacon", os: "Windows 11", pid: 5024, execPath: "C:\\Users\\ana\\AppData\\agent.exe", status: "idle" },
  { id: "3", name: "EDGE-DNS", mode: "Session", os: "Ubuntu 22.04", pid: 991, execPath: "/usr/local/bin/sliver", status: "active" },
];

const gateways = [
  { id: "g1", name: "MTLS-GW-01", proto: "mTLS", port: 8888, health: "healthy", latency: "34ms" },
  { id: "g2", name: "WG-HUB", proto: "WireGuard", port: 53, health: "healthy", latency: "41ms" },
  { id: "g3", name: "DNS-C2", proto: "DNS", port: 53, health: "degraded", latency: "122ms" },
];

const commandPresets = ["info", "whoami", "pwd", "ls", "ps", "netstat", "ifconfig", "screenshot", "download /tmp/loot.zip", "execute -o \"ipconfig /all\""];
const scriptingRpcs = ["RegisterExtension", "CallExtension", "ListExtensions", "RegisterWasmExtension", "ListWasmExtensions", "ExecWasmExtension"];

function Donut({ active, total }: { active: number; total: number }) {
  const pct = Math.max(0, Math.min(100, Math.round((active / total) * 100)));
  return (
    <div className="relative h-14 w-14">
      <div className="h-14 w-14 rounded-full border-4 border-zinc-700" style={{ background: `conic-gradient(#22d3ee ${pct}%, #3f3f46 ${pct}% 100%)` }} />
      <div className="absolute inset-2 rounded-full bg-[#111827]" />
      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-semibold">{pct}%</div>
    </div>
  );
}

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showActivity, setShowActivity] = useState(true);
  const [mainTab, setMainTab] = useState<MainTab>("operaciones");
  const [selectedNodeId, setSelectedNodeId] = useState(nodes[0].id);
  const [targetNodeIds, setTargetNodeIds] = useState<string[]>([nodes[0].id]);
  const [commandInput, setCommandInput] = useState("info");
  const [scriptCode, setScriptCode] = useState("# Sliver command scratchpad\ninfo\nps\n");
  const [isExecuting, setIsExecuting] = useState(false);
  const [filter, setFilter] = useState("");
  const [protocol, setProtocol] = useState<Protocol>("mtls");
  const [logLines, setLogLines] = useState<LogLine[]>([{ text: "[runtime] listo", level: "info" }]);

  const activeNodes = nodes.filter((n) => n.status === "active").length;
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) ?? nodes[0];
  const scriptingEndpoints = rpcCatalog.filter((r) => scriptingRpcs.includes(r.name));

  const filteredNodes = useMemo(
    () => nodes.filter((n) => `${n.name} ${n.mode} ${n.os}`.toLowerCase().includes(filter.toLowerCase())),
    [filter],
  );

  const protocolFields = useMemo(() => {
    switch (protocol) {
      case "mtls": return ["Host", "Port", "Certificado CA", "Certificado Cliente", "Llave Privada"];
      case "wg": return ["Host", "Port", "TunIP", "NPort", "KeyPort", "WG Pub Key"];
      case "dns": return ["Domains[]", "Host", "Port", "Canaries", "EnforceOTP"];
      case "http": return ["Domain", "Host", "Port", "Website", "LongPollTimeout", "LongPollJitter"];
      case "https": return ["Domain", "Host", "Port", "Cert", "Key", "ACME", "RandomizeJARM", "EnforceOTP"];
    }
  }, [protocol]);

  const toggleTarget = (id: string) => {
    setTargetNodeIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const runCommand = async () => {
    if (!commandInput.trim()) return toast.error("Comando vacío");
    if (targetNodeIds.length === 0) return toast.error("Selecciona al menos un objetivo");
    setIsExecuting(true);
    const stamp = new Date().toLocaleTimeString();
    setLogLines((prev) => [...prev, { text: `[${stamp}] > ${commandInput} (${targetNodeIds.length} objetivos)`, level: "info" }]);
    await new Promise((r) => setTimeout(r, 650));
    const names = nodes.filter((n) => targetNodeIds.includes(n.id)).map((n) => n.name);
    setLogLines((prev) => [
      ...prev,
      ...names.map((n) => ({ text: `[${stamp}] [${n}] OK: comando ejecutado`, level: "ok" as const })),
    ]);
    setIsExecuting(false);
    toast.success("Ejecución completada");
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      <Toaster position="bottom-right" toastOptions={{ style: { background: "#111827", color: "#f4f4f5", border: "1px solid #27272a" } }} />

      <div className="flex min-h-screen">
        <aside className={`border-r border-zinc-800 bg-[#0b1020] p-3 transition-all duration-200 ${sidebarCollapsed ? "w-20" : "w-64"}`}>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-cyan-300"><Bot size={18} /> {!sidebarCollapsed && <span className="font-semibold">Sliver</span>}</div>
            <button onClick={() => setSidebarCollapsed((v) => !v)} className="rounded border border-zinc-700 p-1.5 hover:border-zinc-500"><Menu size={14} /></button>
          </div>
          <nav className="space-y-2 text-sm text-zinc-300">
            {[
              { icon: LayoutDashboard, label: "Dashboard" },
              { icon: Monitor, label: "Nodos" },
              { icon: Network, label: "Gateways" },
              { icon: Package, label: "Armory" },
              { icon: Command, label: "Comandos" },
              { icon: HardDrive, label: "Loot" },
            ].map((item) => (
              <button key={item.label} className="flex w-full items-center gap-2 rounded-md px-2 py-2 hover:bg-zinc-900/60 transition-all duration-200">
                <item.icon size={14} /> {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
        </aside>

        <div className="flex-1">
          <header className="sticky top-0 z-10 border-b border-zinc-800 bg-[#0b0f19]/95 px-5 py-3 backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm text-zinc-400"><span>Control</span><ChevronRight size={14} /><span>RMM</span><ChevronRight size={14} /><span className="text-zinc-100">Operador</span></div>
              <div className="flex w-80 max-w-full items-center gap-2 rounded-md border border-zinc-700 bg-zinc-900/70 px-2 py-1.5 text-sm"><Search size={14} className="text-zinc-500" /><input className="w-full bg-transparent outline-none" placeholder="Buscar nodos, gateways, loot..." /></div>
              <div className="flex gap-2">
                <button onClick={() => setShowActivity((v) => !v)} className="rounded border border-zinc-700 p-2 hover:border-zinc-500"><Activity size={14} /></button>
                <button onClick={() => setShowNotifications((v) => !v)} className="rounded border border-zinc-700 p-2 hover:border-zinc-500"><Bell size={14} /></button>
                <button onClick={() => setShowSettings(true)} className="rounded border border-zinc-700 p-2 hover:border-zinc-500"><Settings size={14} /></button>
              </div>
            </div>
            {showNotifications && <div className="mt-2 rounded border border-zinc-700 bg-[#0d1324] p-2 text-xs">Nueva sesión · Gateway DNS degradado · Script finalizado</div>}
          </header>

          <main className="grid grid-cols-12 gap-4 p-5">
            <section className="col-span-12 xl:col-span-9 space-y-4">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <button onClick={() => setFilter("active")} className="rounded-xl border border-zinc-800 bg-[#111827] p-4 text-left shadow-lg shadow-black/20 transition-all hover:border-cyan-500/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase text-zinc-400">Nodos Activos</p>
                      <p className="mt-1 text-3xl font-semibold text-cyan-300">{activeNodes}</p>
                      <p className="mt-1 inline-flex items-center gap-1 text-xs text-emerald-400"><Circle size={10} className="fill-emerald-400 animate-pulse" /> online</p>
                    </div>
                    <Donut active={activeNodes} total={nodes.length} />
                  </div>
                </button>
                <button onClick={() => setMainTab("infraestructura")} className="rounded-xl border border-zinc-800 bg-[#111827] p-4 text-left shadow-lg shadow-black/20 transition-all hover:border-cyan-500/50">
                  <p className="text-xs uppercase text-zinc-400">Gateways</p><p className="mt-1 text-3xl font-semibold text-cyan-300">{gateways.length}</p><p className="mt-1 text-xs text-zinc-400">click para infraestructura</p>
                </button>
                <button onClick={() => setMainTab("operaciones")} className="rounded-xl border border-zinc-800 bg-[#111827] p-4 text-left shadow-lg shadow-black/20 transition-all hover:border-cyan-500/50">
                  <p className="text-xs uppercase text-zinc-400">Extensiones RPC</p><p className="mt-1 text-3xl font-semibold text-cyan-300">{scriptingEndpoints.length}</p><p className="mt-1 text-xs text-zinc-400">click para operaciones</p>
                </button>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-[#0d1324] p-4 shadow-lg shadow-black/20">
                <div className="mb-3 flex gap-2">
                  <button onClick={() => setMainTab("operaciones")} className={`rounded px-3 py-1.5 text-sm ${mainTab === "operaciones" ? "bg-cyan-500 text-slate-950" : "border border-zinc-700"}`}>Operaciones</button>
                  <button onClick={() => setMainTab("infraestructura")} className={`rounded px-3 py-1.5 text-sm ${mainTab === "infraestructura" ? "bg-cyan-500 text-slate-950" : "border border-zinc-700"}`}>Infraestructura</button>
                </div>

                {mainTab === "operaciones" ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-12 gap-3">
                      <div className="col-span-12 lg:col-span-4 rounded-lg border border-zinc-700 bg-zinc-900/40 p-3">
                        <p className="mb-2 text-sm font-medium">Objetivos</p>
                        <div className="space-y-2">
                          {nodes.map((n) => (
                            <button key={n.id} onClick={() => toggleTarget(n.id)} className={`w-full rounded px-2 py-1.5 text-left text-sm ${targetNodeIds.includes(n.id) ? "bg-cyan-500/20 border border-cyan-500/50" : "border border-zinc-700"}`}>
                              {n.name} <span className="text-xs text-zinc-500">({n.mode})</span>
                            </button>
                          ))}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {targetNodeIds.map((id) => {
                            const n = nodes.find((x) => x.id === id);
                            if (!n) return null;
                            return <span key={id} className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-xs">{n.name}</span>;
                          })}
                        </div>
                      </div>

                      <div className="col-span-12 lg:col-span-8 rounded-lg border border-zinc-700 bg-zinc-900/40 p-3">
                        <p className="mb-2 text-sm font-medium">Comando Sliver</p>
                        <div className="mb-2 flex gap-2">
                          <select value={commandInput} onChange={(e) => setCommandInput(e.target.value)} className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5 text-sm">
                            {commandPresets.map((c) => <option key={c} value={c}>{c}</option>)}
                          </select>
                          <button onClick={runCommand} disabled={isExecuting} className="inline-flex items-center gap-1 rounded bg-cyan-500 px-3 py-1.5 text-sm font-semibold text-slate-950 disabled:opacity-60">
                            <Play size={14} /> {isExecuting ? "Ejecutando..." : "Ejecutar"}
                          </button>
                        </div>
                        <div className="overflow-hidden rounded-md border border-zinc-700">
                          <Editor height="180px" theme="vs-dark" language="python" value={scriptCode} onChange={(v) => setScriptCode(v ?? "")} options={{ minimap: { enabled: false }, lineNumbers: "on", automaticLayout: true }} />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border border-zinc-700 bg-black/50 p-3 font-mono text-xs">
                      {logLines.map((l, i) => (
                        <p key={`${l.text}-${i}`} className={l.level === "ok" ? "text-emerald-400" : l.level === "err" ? "text-rose-400" : "text-zinc-300"}>{l.text}</p>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="rounded-lg border border-zinc-700 bg-zinc-900/40 p-3">
                      <p className="mb-2 text-sm font-medium">Configurar Gateway</p>
                      <div className="mb-2 flex gap-2">
                        <select value={protocol} onChange={(e) => setProtocol(e.target.value as Protocol)} className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5 text-sm">
                          <option value="mtls">mTLS</option><option value="wg">WireGuard</option><option value="dns">DNS</option><option value="http">HTTP</option><option value="https">HTTPS</option>
                        </select>
                        <button onClick={() => toast.success("Gateway iniciado")} className="rounded bg-cyan-500 px-3 py-1.5 text-sm font-semibold text-slate-950">Iniciar</button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {protocolFields.map((f) => <input key={f} className="rounded border border-zinc-700 bg-zinc-900 px-2 py-1.5 text-sm" placeholder={f} />)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
                      {gateways.map((g) => (
                        <div key={g.id} className="rounded-lg border border-zinc-700 bg-zinc-900/40 p-3">
                          <p className="font-medium">{g.name}</p>
                          <p className="text-xs text-zinc-400">{g.proto}:{g.port} · {g.latency}</p>
                          <p className={`text-xs ${g.health === "healthy" ? "text-emerald-400" : "text-amber-300"}`}>{g.health}</p>
                          <div className="mt-2 flex gap-2">
                            <button onClick={() => toast.success(`Reiniciado ${g.name}`)} className="rounded border border-zinc-700 px-2 py-1 text-xs">Reiniciar</button>
                            <button onClick={() => toast(`Logs ${g.name}`)} className="rounded border border-zinc-700 px-2 py-1 text-xs">Ver Logs</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {showActivity && (
              <aside className="col-span-12 xl:col-span-3 rounded-xl border border-zinc-800 bg-[#0d1324] p-4 shadow-lg shadow-black/20">
                <p className="mb-2 text-sm font-semibold">Actividad Reciente</p>
                <div className="space-y-2 text-xs text-zinc-300">
                  <p>• Nodo DC-APP-01 conectado</p>
                  <p>• Gateway DNS degradado</p>
                  <p>• Script inventory finalizado</p>
                  <p>• BOF ad-enum ejecutado</p>
                  <p>• Loot creds_dump actualizado</p>
                </div>
                <div className="mt-4 rounded border border-zinc-700 bg-zinc-900/40 p-2 text-xs">RPC ext: {scriptingEndpoints.length}</div>
              </aside>
            )}
          </main>
        </div>
      </div>

      {showSettings && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md rounded-lg border border-zinc-700 bg-[#0d1324] p-4">
            <div className="mb-3 flex items-center justify-between"><h3 className="font-semibold">Preferencias</h3><button onClick={() => setShowSettings(false)} className="rounded border border-zinc-700 p-1"><X size={14} /></button></div>
            <label className="mb-2 block text-sm"><input type="checkbox" defaultChecked className="mr-2" />Tema Dark</label>
            <button onClick={() => { setShowSettings(false); toast.success("Preferencias guardadas"); }} className="rounded bg-cyan-500 px-3 py-1.5 text-sm font-semibold text-slate-950">Guardar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
