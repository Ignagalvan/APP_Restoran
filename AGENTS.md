<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Restaurant OS — bootloader de contexto

Antes de explorar código:

1. Resolver la raíz de la bóveda desde `RESTAURANT_OS_BRAIN`. Si no existe o no apunta a una bóveda válida, pedir su ubicación sin hacer una búsqueda masiva. Leer `00 - Inicio\Inicio.md` y `00 - Inicio\Rutas de contexto.md`, que contiene las rutas canónicas de las notas fundamentales.
2. Consultar `00 - Inicio\SYSTEM_MAP.md`; leer `05 - Trabajo\CURRENT_STATE.md` solo si la tarea cruza repositorios o hay trabajo temporal abierto.
3. Identificar dominio, repositorios afectados, notas relevantes y símbolos/servicios/endpoints a localizar.
4. Consultar Codebase Memory MCP (`list_projects`, `get_architecture`, `search_graph`, `trace_path`, `detect_changes`) antes de abrir código masivamente. Usar `get_code_snippet` solo después de formular una hipótesis. Si el MCP no está disponible, usar el CLI local `codebase-memory-mcp` como fallback.
   Mantener `auto_index=false`; indexar solo los repositorios de `SYSTEM_MAP.md` o rutas explícitamente autorizadas dentro de `CBM_ALLOWED_ROOT`, nunca AppData, sistema, caches, temporales, instalaciones de herramientas ni dependencias externas.
5. Abrir inicialmente como máximo unos 8 archivos fuente; volver al índice antes de ampliar el contexto.

Resolver contradicciones según `04 - Decisiones\Fuentes de verdad.md`, distinguiendo intención esperada, implementación actual, ejecución, descubrimiento estructural e historia.

En cambios de API, modelos, estados, auth, eventos, WebSockets, pagos, pedidos, mesas o schemas, preguntar mentalmente “What else consumes this?” y revisar los cuatro repositorios según `Dependencias entre repositorios`.

Validar el cambio con la comprobación proporcional al riesgo. Al finalizar, aplicar `04 - Decisiones\Política de relevancia.md`; actualizar una nota existente o crear un ADR solo si cambió arquitectura, contrato, regla, seguridad, operación, despliegue, responsabilidad entre repos o una solución reutilizable. No guardar secretos, `.env`, credenciales, logs ni bloques grandes de código.
