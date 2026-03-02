# client/webui

Frontend web operacional para Sliver, inspirado en el orden de trabajo típico de consolas tipo Cobalt Strike (infraestructura -> acceso -> operación -> datos -> extensibilidad).

## Run

```bash
go run ./client/webui -config /path/to/operator.cfg -listen 127.0.0.1:18080
```

Abrir `http://127.0.0.1:18080`.

Modo UI sin backend:

```bash
go run ./client/webui -demo -listen 127.0.0.1:18080
```

## Capacidades incluidas

- Catálogo completo de métodos `rpcpb.SliverRPC` (descubierto por reflection).
- Dashboard con métricas de Sessions, Beacons, Jobs, Hosts, Loot, Creds, Websites, Builders.
- Playbooks por dominio vía `/api/action` para operaciones comunes:
  - C2/listeners (mTLS, HTTP, HTTPS)
  - generación de payloads
  - pivot/data ops (pivot graph, loot, creds, jobs)
  - estate ops (sessions, beacons)
  - extensibilidad (builders, extensions)
- Invocación RPC genérica (`/api/invoke`) para cubrir toda la superficie.
- Help/documentación extensiva por RPC en `/api/rpc-docs` con: propósito, cuándo usar, campos de entrada, ejemplo JSON, tips y playbooks relacionados.
- Eventos en tiempo real (`/api/events`) vía SSE.

## Nota de alcance

- Esta UI expone toda la superficie RPC posible en el catálogo, y además agrega un flujo guiado para ventas/demos y operación rápida.
- Las RPC client-streaming siguen fuera del alcance de la invocación genérica.


## Diseño comercial

- Layout tipo "command center" con navegación lateral por dominio y KPIs arriba.
- Playbooks filtrables por categoría para demos guiadas.
- Modo mixto: workflow guiado + RPC explorer completo para usuarios avanzados.
