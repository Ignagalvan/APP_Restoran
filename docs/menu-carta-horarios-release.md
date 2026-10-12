# Carta y horarios · QR

2026-10-12 · entrega coordinada en `codex/menu-carta-horarios`, aprobada localmente. Publicación de PR autorizada; sin merge/despliegue por este trabajo. Estado vigente en la guía principal del panel.

`/menu-preview` embebe la misma carta del cliente en el panel: mismos componentes MenuPage/MenuCategoryPage, estilos y mapApiMenu. No es una maqueta ni consulta otro catálogo. Recibe datos de la API vía padre autorizado; no recibe tokens/cookies ni puede realizar pedidos. Categoría/detalle/selección informativa de opciones funcionan dentro del teléfono. El QR público mantiene consulta API sin caché y refresco existente.

Configurar MENU_PREVIEW_PANEL_ORIGINS con origen(s) HTTPS exactos del panel, separados por coma. Sin comodines, credenciales ni tokens. Desarrollo también admite localhost:3001/127.0.0.1:3001. En producción los orígenes deben estar configurados durante build/redeploy: ruta no indexable, sin caché y CSP frame-ancestors limitado. El panel configura NEXT_PUBLIC_MENU_PREVIEW_URL hacia esta app QR.

Configuración autorizada y comprobada 2026-10-12, equipo gestionar: MENU_PREVIEW_PANEL_ORIGINS guardada como Config sólo en Production de restaurant-os con https://resto-management-frontend-bay.vercel.app; NEXT_PUBLIC_MENU_PREVIEW_URL del panel guardada con https://restaurant-os-nine-sepia.vercel.app. Sin cambios de secretos, Preview ni despliegues. Rebuild/redeploy obligatorio para incorporarlas y validar en destino; para PR usar orígenes exactos de dos previews y variables sólo de Preview, no agregar orígenes de prueba a Production. HTTP 200 del sitio actual no certifica que esta nueva ruta esté desplegada.

Mismo adaptador para preview y menú real: categorías/productos API, precio final/habitual y promoción, grupos/alternativas/recargos reales. Extras se suman al precio promocionado sin descontarlos otra vez. Opciones obligatorias/únicas/múltiples, máximos, agotados y deselección opcional; selección sólo informativa, confirmar con mozo. No inferir propiedades alimentarias/ingredientes de coincidencias de nombre con la demo. Cambiar catálogo no puede dejar una sección antigua ocultando productos nuevos.

Programación y descuentos los calcula backend en zona del restaurante. El panel muestra «Vista actual del menú», sólo carta vigente e instante actual, después de cada guardado automático confirmado. No ofrece Aplicar ni borrador/publicado/simulador; los parámetros opcionales de simulación siguen en API por compatibilidad, no en esta UI. La marca/tema/mesa de demostración actuales del QR se conservan; personalización multirrestaurante no se implementa aquí.

Guía/contrato/pendientes conjuntos: `docs/menu-carta-horarios-v1.md` y `docs/entrega-y-pendientes.md` del panel. Backend primero, luego QR/panel y Expo Go actualizado, con aceptación en destino. No requiere migración nueva; confirmar previas. Apartado QR «Promociones», snapshots comerciales completos y restauración siguen pendientes. No modificar pagos/checkout ni habilitar pedidos del cliente desde esta vista.

Local: usar los tres servicios reales (API 3000, panel 3001, QR 3002). En esta copia hay un archivo ajeno no versionado cuyo nombre rompe el glob de Turbopack; preservarlo y ejecutar `pnpm exec next dev --webpack -p 3002`. No eliminar archivos del usuario para arrancar. Esa limitación local no forma parte del código entregable.
