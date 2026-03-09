#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FRONTEND_DIR="$ROOT_DIR/web/sliver-rmm-ui"
FRONTEND_PORT="${FRONTEND_PORT:-4173}"
SERVER_LOG="${SERVER_LOG:-$ROOT_DIR/.sliver-server.log}"
FRONTEND_LOG="${FRONTEND_LOG:-$ROOT_DIR/.sliver-frontend.log}"

if ! command -v go >/dev/null 2>&1; then
  echo "[error] Go no está instalado o no está en PATH." >&2
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "[error] npm no está instalado o no está en PATH." >&2
  exit 1
fi

if [[ ! -d "$FRONTEND_DIR" ]]; then
  echo "[error] No se encontró el frontend en $FRONTEND_DIR" >&2
  exit 1
fi

if [[ ! -d "$FRONTEND_DIR/node_modules" ]]; then
  echo "[info] Instalando dependencias del frontend..."
  (cd "$FRONTEND_DIR" && npm install)
fi

echo "[info] Iniciando Sliver server (go run ./server) ..."
(
  cd "$ROOT_DIR"
  go run ./server >"$SERVER_LOG" 2>&1
) &
SERVER_PID=$!

echo "[info] Iniciando frontend Vite en puerto $FRONTEND_PORT ..."
(
  cd "$FRONTEND_DIR"
  npm run dev -- --host 0.0.0.0 --port "$FRONTEND_PORT" >"$FRONTEND_LOG" 2>&1
) &
FRONTEND_PID=$!

cleanup() {
  echo ""
  echo "[info] Deteniendo procesos..."
  kill "$FRONTEND_PID" >/dev/null 2>&1 || true
  kill "$SERVER_PID" >/dev/null 2>&1 || true
}
trap cleanup EXIT INT TERM

sleep 2

HOST_IP="$(hostname -I 2>/dev/null | awk '{print $1}')"
if [[ -z "$HOST_IP" ]]; then
  HOST_IP="127.0.0.1"
fi

echo ""
echo "✅ Stack iniciado"
echo "- Sliver server PID: $SERVER_PID"
echo "- Frontend PID: $FRONTEND_PID"
echo ""
echo "🔗 Rutas de conexión frontend:"
echo "- Local:   http://localhost:${FRONTEND_PORT}"
echo "- Red:     http://${HOST_IP}:${FRONTEND_PORT}"
echo ""
echo "📝 Logs:"
echo "- Server:   $SERVER_LOG"
echo "- Frontend: $FRONTEND_LOG"
echo ""
echo "Presiona Ctrl+C para detener todo."

wait "$FRONTEND_PID"
