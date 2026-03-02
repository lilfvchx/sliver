#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
WORK_DIR="${HOME}/.sliver-webui"
LOG_DIR="${WORK_DIR}/logs"
PID_DIR="${WORK_DIR}/pids"
CFG_PATH="${WORK_DIR}/webui_operator.cfg"
LHOST="${LHOST:-127.0.0.1}"
WEBUI_LISTEN="${WEBUI_LISTEN:-127.0.0.1:18080}"
OPERATOR_NAME="${OPERATOR_NAME:-webui}"

mkdir -p "${LOG_DIR}" "${PID_DIR}"

log() { printf '[bootstrap] %s\n' "$*"; }
warn() { printf '[bootstrap][warn] %s\n' "$*" >&2; }

find_bin() {
  local name="$1"
  if command -v "$name" >/dev/null 2>&1; then
    command -v "$name"
    return 0
  fi
  if [[ -x "${ROOT_DIR}/${name}" ]]; then
    printf '%s\n' "${ROOT_DIR}/${name}"
    return 0
  fi
  if [[ -x "${ROOT_DIR}/bin/${name}" ]]; then
    printf '%s\n' "${ROOT_DIR}/bin/${name}"
    return 0
  fi
  return 1
}

ensure_sliver_binaries() {
  if find_bin sliver-server >/dev/null 2>&1 && find_bin sliver-client >/dev/null 2>&1; then
    log "sliver binaries found"
    return
  fi
  log "sliver binaries not found, building from source (make)"
  (cd "${ROOT_DIR}" && make)
}

ensure_webui_binary() {
  mkdir -p "${ROOT_DIR}/bin"
  log "building sliver-webui binary"
  (cd "${ROOT_DIR}" && go build -o "${ROOT_DIR}/bin/sliver-webui" ./client/webui)
}

start_server() {
  local server_bin
  server_bin="$(find_bin sliver-server)"

  if pgrep -f "sliver-server" >/dev/null 2>&1; then
    log "sliver-server already running"
    return
  fi

  log "starting sliver-server daemon"
  nohup "${server_bin}" daemon >"${LOG_DIR}/sliver-server.log" 2>&1 &
  echo $! >"${PID_DIR}/sliver-server.pid"
  sleep 4
}

ensure_operator_config() {
  if [[ -f "${CFG_PATH}" ]]; then
    log "operator config already exists: ${CFG_PATH}"
    return 0
  fi

  local server_bin
  server_bin="$(find_bin sliver-server)"

  log "creating operator config at ${CFG_PATH}"
  if "${server_bin}" operator --name "${OPERATOR_NAME}" --lhost "${LHOST}" --save "${CFG_PATH}" >"${LOG_DIR}/operator.log" 2>&1; then
    log "operator config created"
    return 0
  fi

  warn "could not generate operator config automatically"
  warn "check ${LOG_DIR}/operator.log"
  return 1
}

start_webui() {
  local webui_bin="${ROOT_DIR}/bin/sliver-webui"

  if pgrep -f "sliver-webui" >/dev/null 2>&1; then
    log "sliver-webui already running"
    return
  fi

  if [[ -f "${CFG_PATH}" ]]; then
    log "starting webui in connected mode on ${WEBUI_LISTEN}"
    nohup "${webui_bin}" -config "${CFG_PATH}" -listen "${WEBUI_LISTEN}" >"${LOG_DIR}/sliver-webui.log" 2>&1 &
  else
    warn "starting webui in demo mode because operator config is missing"
    nohup "${webui_bin}" -demo -listen "${WEBUI_LISTEN}" >"${LOG_DIR}/sliver-webui.log" 2>&1 &
  fi
  echo $! >"${PID_DIR}/sliver-webui.pid"
}

print_summary() {
  local pids=()
  [[ -f "${PID_DIR}/sliver-webui.pid" ]] && pids+=("$(cat "${PID_DIR}/sliver-webui.pid")")
  [[ -f "${PID_DIR}/sliver-server.pid" ]] && pids+=("$(cat "${PID_DIR}/sliver-server.pid")")

  cat <<MSG

Bootstrap completed.

- Web UI URL: http://${WEBUI_LISTEN}
- Work dir: ${WORK_DIR}
- Logs:
  - ${LOG_DIR}/sliver-server.log
  - ${LOG_DIR}/sliver-webui.log

Tips:
- export LHOST=<public_or_tailscale_ip> to regenerate operator cfg for remote clients.
- stop processes manually with:
  kill ${pids[*]:-<pid>}

MSG
}

main() {
  ensure_sliver_binaries
  ensure_webui_binary
  start_server
  ensure_operator_config || true
  start_webui
  print_summary
}

main "$@"
