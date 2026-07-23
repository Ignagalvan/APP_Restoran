# UX Pass V1 — Backlog priorizado

## Propósito

Única iteración transversal previa al Release Candidate de la V1. No modifica reglas de negocio ni agrega funcionalidades: consolida accesibilidad, claridad, consistencia y robustez visual sobre los módulos terminados.

## P0 — Bloqueantes del Release Candidate

### UX-001 — Accesibilidad completa del Bottom Sheet

- **Módulos afectados:** RF-003 Menú Digital y RF-004 Cuenta Digital.
- **Problema:** el detalle declara `dialog`, pero no se evidencia gestión completa de foco: foco inicial, contención dentro del modal, cierre con `Escape`, restitución al elemento invocador y aislamiento del contenido de fondo.
- **Mejora propuesta:** completar el patrón de diálogo accesible en el Bottom Sheet reutilizado, preservando su apariencia y comportamiento funcional.
- **Criterio de validación:** recorrido íntegro solo con teclado; el foco no sale del Sheet, `Escape` lo cierra, vuelve a la tarjeta que lo abrió y un lector de pantalla no navega el fondo mientras está abierto.
- **Riesgo:** una implementación manual incompleta puede introducir pérdida de foco o cierres involuntarios en móvil.

### UX-002 — Eliminar desbordes en viewports estrechos y con texto ampliado

- **Módulos afectados:** RF-002 Home, RF-004 Cuenta Digital, RF-005 División y RF-006 Pago.
- **Problema:** existen textos y filas forzados con `whitespace-nowrap`, títulos de gran escala y resúmenes horizontales que pueden desbordar a 320 px o con zoom de texto.
- **Mejora propuesta:** permitir reflujo controlado, reducir escala de forma fluida y apilar metadatos cuando el ancho efectivo no alcance.
- **Criterio de validación:** sin scroll horizontal ni contenido recortado a 320 px, 200% de zoom, orientación horizontal y textos del sistema ampliados.
- **Riesgo:** el reflujo puede aumentar alturas y alterar el balance visual aprobado de módulos congelados.

### UX-003 — Robustecer CTAs fijos ante teclado y áreas seguras

- **Módulos afectados:** RF-005 División y RF-006 Pago; patrón reutilizable para RF-007/RF-008.
- **Problema:** los footers fijos dependen de padding reservado y pueden cubrir contenido con teclado virtual, viewport horizontal o barras dinámicas del navegador.
- **Mejora propuesta:** unificar el patrón de CTA inferior con altura reservada derivada del propio footer, soporte de `safe-area` y comportamiento compatible con viewport visual/teclado.
- **Criterio de validación:** CTA y helper siempre visibles sin tapar el último control en iOS/Android, 320–430 px, orientación horizontal y teclado abierto.
- **Riesgo:** diferencias entre navegadores móviles; requiere validación en dispositivos o emulación representativa.

## P1 — Calidad y consistencia necesarias

### UX-004 — Unificar estados de foco, selección y deshabilitado

- **Módulos afectados:** RF-002 a RF-008.
- **Problema:** foco y estados se definen en selectores dispersos; algunos controles dependen de `focus-within`, otros de `focus-visible`, y los deshabilitados no comparten una semántica visual uniforme.
- **Mejora propuesta:** consolidar patrones visuales reutilizables para foco, selección, procesamiento y deshabilitado, manteniendo identidad y contraste actuales.
- **Criterio de validación:** todo control interactivo muestra foco visible; seleccionado/deshabilitado/procesando son distinguibles sin depender solo del color; contraste WCAG AA.
- **Riesgo:** una abstracción excesiva podría borrar jerarquías específicas de cada módulo.

### UX-005 — Normalizar encabezados y continuidad entre pasos

- **Módulos afectados:** RF-002 Home, RF-004 Cuenta, RF-005 División, RF-006 Pago y RF-008 Feedback.
- **Problema:** se repiten marca, mesa, navegación atrás y títulos con pequeñas variaciones de escala y espaciado; esto puede hacer que el recorrido se perciba como pantallas separadas.
- **Mejora propuesta:** alinear ritmo vertical, jerarquía, etiqueta de restaurante/mesa y transición conceptual entre Cuenta → División → Pago → Feedback.
- **Criterio de validación:** comparación visual lado a lado sin saltos injustificados de posición, escala o nomenclatura; navegación atrás coherente y predecible.
- **Riesgo:** tocar módulos congelados exige limitar el cambio a consistencia transversal, sin rediseño local.

### UX-006 — Revisar legibilidad de textos secundarios

- **Módulos afectados:** RF-002 a RF-008.
- **Problema:** abundan textos de 0.62–0.75 rem y tonos atenuados en badges, helpers, precios y metadatos; pueden perder legibilidad en pantallas luminosas o para personas mayores.
- **Mejora propuesta:** fijar un mínimo legible para información necesaria, elevar contraste y reservar tamaños mínimos solo para contenido no esencial.
- **Criterio de validación:** contraste AA, lectura cómoda a distancia normal y ninguna instrucción necesaria por debajo del mínimo acordado.
- **Riesgo:** aumentar texto puede generar wrapping y exigir reajustar tarjetas.

### UX-007 — Consolidar feedback de acciones y estados asíncronos

- **Módulos afectados:** RF-004 Cuenta, RF-006 Pago y RF-008 Feedback.
- **Problema:** mensajes temporales, helpers, errores y procesamiento usan patrones distintos; el toast de Cuenta puede no ser suficientemente persistente o anunciable según el contexto.
- **Mejora propuesta:** definir un patrón común para confirmación discreta, error recuperable, procesamiento y resultado, con regiones `aria-live` adecuadas.
- **Criterio de validación:** cada acción tiene respuesta perceptible visualmente y por lector de pantalla; los errores indican recuperación sin mover inesperadamente el foco.
- **Riesgo:** anuncios duplicados o demasiado verbosos para tecnologías asistivas.

### UX-008 — Validar navegación por teclado en selectores compuestos

- **Módulos afectados:** RF-003 categorías, RF-005 modalidades y RF-006 método/propina.
- **Problema:** RF-005 implementa tabs con teclado, pero Menú usa navegación simple y métodos/propina usan radios visuales; la experiencia de flechas, tabulación y foco no está normalizada.
- **Mejora propuesta:** aplicar la semántica nativa o patrón ARIA correspondiente en cada selector, sin convertir controles que no son tabs en tabs.
- **Criterio de validación:** orden de tabulación lógico, flechas donde corresponde, activación con teclado y nombre/estado anunciado correctamente.
- **Riesgo:** cambiar semántica sin ajustar interacción puede empeorar la accesibilidad.

### UX-009 — Verificación integral de movimiento reducido

- **Módulos afectados:** RF-002 a RF-008.
- **Problema:** existe una regla global de `prefers-reduced-motion`, pero deben verificarse scroll suave, imágenes, Sheet, indicadores y spinners en el recorrido completo.
- **Mejora propuesta:** asegurar equivalentes instantáneos y mantener señal de procesamiento sin depender exclusivamente de animación.
- **Criterio de validación:** con movimiento reducido no hay desplazamientos ni escalados notorios y todos los cambios de estado siguen siendo comprensibles.
- **Riesgo:** duraciones casi nulas pueden provocar parpadeos o estados visuales imperceptibles.

## P2 — Pulido global

### UX-010 — Consolidar primitivas visuales repetidas

- **Módulos afectados:** RF-002 a RF-008 y base futura de RF-009.
- **Problema:** cards, encabezados, badges, estados vacíos y barras inferiores repiten estilos con variantes cercanas.
- **Mejora propuesta:** extraer primitivas de presentación pequeñas y componibles después de cerrar los módulos, sin alterar su comportamiento.
- **Criterio de validación:** menor duplicación, mismo resultado visual y ninguna regresión en lint/build o recorridos.
- **Riesgo:** refactor transversal amplio inmediatamente antes del RC.

### UX-011 — Homogeneizar ritmo de espaciado y densidad

- **Módulos afectados:** RF-003 Menú, RF-004 Cuenta, RF-005 División, RF-006 Pago y RF-008 Feedback.
- **Problema:** conviven gaps, paddings y separaciones cercanas pero no idénticas; los módulos con CTA fijo se sienten más densos que Menú y Cuenta.
- **Mejora propuesta:** revisar con una escala única el ritmo entre encabezado, secciones, cards, helpers y cierre de pantalla.
- **Criterio de validación:** auditoría visual lado a lado con alineaciones consistentes y sin espacios vacíos o compresión accidental.
- **Riesgo:** una uniformidad rígida puede ignorar necesidades particulares de contenido.

### UX-012 — Pulir coherencia de microinteracciones

- **Módulos afectados:** RF-002 a RF-008.
- **Problema:** hover, press, aparición, selección y transición usan curvas y duraciones similares, pero no completamente consistentes.
- **Mejora propuesta:** limitar las microinteracciones a un conjunto reducido de duraciones y curvas aprobadas, diferenciando entrada, selección y presión.
- **Criterio de validación:** transiciones de 200–300 ms, sin animación decorativa, sin layout shift y con equivalencia para movimiento reducido.
- **Riesgo:** el pulido puede convertirse en cambio cosmético sin impacto si no se valida en flujo.

### UX-013 — Revisar presentación en pantallas medianas y escritorio

- **Módulos afectados:** RF-002 a RF-008.
- **Problema:** la carcasa móvil se centra en desktop, pero cada pantalla puede responder distinto en altura, fondos, bordes y CTAs fijos.
- **Mejora propuesta:** estabilizar el contenedor de experiencia, elevación y comportamiento de barras inferiores en tablet/escritorio sin abandonar mobile first.
- **Criterio de validación:** presentación consistente en 768, 1024 y 1440 px, sin footers flotando fuera del contenedor ni alturas artificiales.
- **Riesgo:** invertir demasiado esfuerzo en un contexto secundario para la V1.

## Orden recomendado de ejecución

1. UX-001 a UX-003.
2. UX-004 a UX-009.
3. Regresión visual y funcional completa.
4. UX-010 a UX-013 solo si no comprometen la estabilidad del RC.
5. Validación final: teclado, lector de pantalla, zoom 200%, movimiento reducido, viewports 320–430 px, tablet/escritorio, `npm run lint` y `npm run build`.
