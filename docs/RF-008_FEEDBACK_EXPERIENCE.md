# RF-008 — Experiencia de Feedback

## Estado

Implementado, validado y congelado para V1.

## Objetivo y alcance V1

Permitir que el comensal deje una valoración breve sobre su experiencia en Lumbre, mediante una simulación local clara y sin registro.

La V1 incluye valoración, comentario opcional, envío simulado y confirmación. No incluye persistencia, datos personales, respuestas del restaurante, notificaciones, clasificación automática ni integración con Google Reviews.

## Actor principal

Comensal.

## Entradas y navegación

- Entrada principal posterior al pago simulado exitoso: RF-006 navega a `/feedback` y entrega el contexto de restaurante, mesa y operación mock.
- Entrada alternativa aprobada: **Mi Experiencia** desde la Home navega a `/feedback` con restaurante y mesa, sin operación de pago.
- Volver antes de enviar regresa al origen conocido: resultado de pago o Home. Si el origen no está disponible, regresa a Home.
- Después de confirmar el feedback, la acción principal vuelve a Home.
- No se permite enviar automáticamente al entrar ni abandonar la pantalla automáticamente después del envío.

## Flujo completo

1. El comensal accede desde un pago simulado exitoso o desde **Mi Experiencia**.
2. La pantalla presenta al restaurante como protagonista y explica brevemente el propósito.
3. El comensal elige una valoración de 1 a 5.
4. Puede agregar un comentario breve opcional.
5. Revisa su selección y activa **Enviar opinión**.
6. El sistema bloquea envíos duplicados y muestra un procesamiento simulado breve.
7. El sistema registra el resultado solo en memoria y muestra una confirmación cálida.
8. El comensal vuelve a Home.

La valoración es obligatoria. El comentario no lo es.

## Estados

### Inicial

- Contexto válido cargado.
- Sin valoración.
- Comentario vacío.
- CTA deshabilitado con ayuda textual que indica qué falta.

### Editando

- Valoración seleccionada y claramente identificable.
- Comentario opcional disponible.
- CTA habilitado cuando la valoración es válida.

### Enviando

- Envío simulado en curso.
- CTA deshabilitado y marcado como ocupado.
- No se aceptan cambios ni un segundo envío.

### Éxito

- Agradecimiento visible.
- No se vuelve a mostrar el formulario como editable.
- Acción principal: volver a Home.

### Contexto no disponible

- Se usa cuando faltan restaurante o mesa.
- No muestra formulario ni permite crear feedback inválido.
- Explica el problema en lenguaje simple y ofrece volver a Home.

### Error simulado recuperable

- Conserva valoración y comentario.
- Explica que no pudo completarse el envío.
- Ofrece **Intentar nuevamente** y volver.
- No introduce errores de red reales en V1.

### Vacío

El estado inicial sin valoración es el estado vacío válido del formulario. No debe confundirse con un error: muestra el contenido normalmente y mantiene el CTA deshabilitado.

## Componentes reutilizables

- Estructura de página mobile first, encabezado y acción de volver ya usados por la experiencia del comensal.
- Botones y estados visuales compartidos: activo, seleccionado, deshabilitado, procesando y listo.
- Patrón de CTA inferior fijo cuando no cubra contenido.
- Contenedores, tarjetas y mensajes de estado existentes que sean compatibles sin modificar módulos congelados.
- Utilidades de formato o identificadores mock existentes, si su contrato es genérico.

La reutilización debe ocurrir mediante composición o extracción segura. No se modifican RF-002 a RF-005 para adaptar esta pantalla.

## Componentes nuevos

- `FeedbackPage`: coordina contexto, estados y navegación.
- `FeedbackForm`: compone valoración, comentario y acción.
- `RatingSelector`: control accesible de selección única entre 1 y 5.
- `FeedbackComment`: campo opcional con límite visible.
- `FeedbackSubmitAction`: CTA y ayuda contextual.
- `FeedbackSuccessState`: confirmación posterior al envío.
- `FeedbackUnavailableState`: contexto inválido.
- `FeedbackErrorState`: error recuperable.

Los nombres son técnicos y pueden ajustarse durante la implementación sin cambiar responsabilidades.

## Contrato de entrada

RF-008 recibe un objeto normalizado en memoria:

```text
FeedbackContext
- restaurant: string
- table: string
- source: "payment" | "home"
- paymentOperationId?: string
```

Reglas:

- `restaurant` y `table` son obligatorios, se normalizan recortando espacios y deben permanecer no vacíos.
- Cuando `source` es `payment`, RF-008 adapta `PaymentResult.operationId` a `paymentOperationId`; este identificador es obligatorio.
- Cuando `source` es `home`, `paymentOperationId` debe omitirse.
- RF-008 no recibe importes, método de pago ni datos financieros.
- Un contrato inválido conduce al estado **Contexto no disponible**.
- La recarga puede perder el contexto porque la V1 conserva estado solo en memoria.

El adaptador de entrada toma únicamente `operationId`, `restaurant` y `table` del `PaymentResult` exitoso de RF-006. Descarta `baseAmount`, `tipAmount`, `totalAmount`, `methodId`, `completedAt` y cualquier otro dato económico. Desde Home se construye el mismo contrato reducido con `source: "home"`.

## Contrato de salida

El envío simulado produce localmente:

```text
FeedbackResult
- id: string
- restaurant: string
- table: string
- rating: 1 | 2 | 3 | 4 | 5
- comment?: string
- source: "payment" | "home"
- paymentOperationId?: string
- createdAt: string
- status: "submitted"
```

Este contrato queda preparado para que RF-009 pueda representar feedback mock. No implica persistencia ni integración entre módulos en V1.

## Validaciones

- Valoración obligatoria y limitada a enteros entre 1 y 5.
- Comentario opcional, recortado en extremos y con máximo de 500 caracteres.
- Un comentario vacío después de normalizarse se omite del resultado.
- Restaurante y mesa obligatorios, normalizados y no vacíos.
- Identificador de operación obligatorio cuando el origen sea pago.
- Rechazar `paymentOperationId` vacío y omitirlo cuando el origen sea Home.
- Impedir un segundo envío mientras el estado sea `submitting` o `submitted`.
- No crear resultado ante contexto o valoración inválidos, incluso si la función se invoca fuera de la UI.
- El identificador y la fecha mock se crean al confirmar, no al entrar.

## Casos borde

- Entrada directa o recarga sin contexto: mostrar estado no disponible.
- Valoración elegida y luego cambiada: conservar la última selección válida.
- Comentario compuesto solo por espacios: tratar como ausente.
- Comentario pegado por encima del límite: impedir superar 500 caracteres y comunicar el límite.
- Doble toque en enviar: aceptar una sola confirmación.
- Fallo simulado: conservar el contenido y permitir reintentar.
- Volver con cambios sin enviar: en V1 no se persisten borradores ni se agrega confirmación de salida.
- Entrada desde Home: omitir toda referencia visual a pago.
- Entrada desde pago: agradecer la visita sin revelar información económica.

## Accesibilidad

- El selector de valoración debe funcionar con toque, teclado y lector de pantalla.
- Usar un grupo con nombre accesible y una opción seleccionable por valor; comunicar valor y estado seleccionado.
- Soportar flechas, `Home` y `End` cuando se implemente como radiogroup, además de foco visible.
- Zonas táctiles de al menos 44 × 44 px.
- El comentario debe tener etiqueta persistente, contador comprensible y asociación con errores.
- El estado de envío usa `aria-busy`; éxito y error se anuncian sin mover el foco de forma inesperada.
- No depender solo del color para selección, error o éxito.
- Mantener contraste alto, texto legible, orden de foco lógico y uso con una mano.
- Las microinteracciones duran 200–300 ms y respetan `prefers-reduced-motion`.

## Oportunidades de reutilización

- Unificar los estados de carga, error y éxito simulados con RF-006 si ya son genéricos.
- Reutilizar el contexto común de restaurante y mesa sin acoplar Feedback al contrato económico de Pago.
- Diseñar `RatingSelector` como control reutilizable por el futuro panel solo para lectura, manteniendo separadas las variantes interactiva y de visualización.
- Centralizar validación y creación del resultado mock en una función pura preparada para pruebas.

## Riesgos técnicos

- El estado solo en memoria hace que una recarga posterior al pago pierda el contexto.
- Acoplar RF-008 al objeto completo de RF-006 expondría datos innecesarios y dificultaría la entrada desde Home.
- Un control de estrellas puramente visual puede resultar inaccesible si no adopta semántica de selección única.
- La simulación de error no debe parecer un fallo real frecuente ni introducir comportamiento aleatorio difícil de validar.
- RF-009 no debe asumir persistencia de los resultados producidos por esta V1.

## Decisiones automáticas justificadas

- **Ruta `/feedback`:** nombre directo y coherente con el módulo, sin afectar reglas de negocio.
- **Escala de 1 a 5:** patrón ampliamente reconocible y suficiente para una valoración mock; no se usa para clasificar feedback ni activar rutas diferentes.
- **Valoración obligatoria y comentario opcional:** deriva del flujo aprobado y evita envíos sin información mínima.
- **Máximo de 500 caracteres:** protege legibilidad y estado local sin convertir el módulo en una encuesta extensa.
- **Éxito con retorno manual a Home:** permite comprender que el envío terminó y evita redirecciones sorpresivas.
- **Error simulado determinista durante QA:** facilita reproducibilidad; el mecanismo técnico no debe quedar visible al comensal.
- **Contrato reducido desde RF-006:** aplica minimización de datos y permite compartir el mismo módulo con la entrada desde Home.

## Decisiones que requieren aprobación

Ninguna bloquea la implementación del alcance V1 documentado.

Quedan explícitamente fuera de V1 y requerirán una decisión futura antes de incorporarse:

- Criterio para considerar una valoración positiva o negativa.
- Derivación de feedback positivo a Google Reviews.
- Tratamiento operativo del feedback negativo.
- Persistencia, moderación y visibilidad real para el restaurante.

## Autoauditoría del diseño

- **Alcance:** limitado a feedback mock; no incorpora integraciones ni datos personales.
- **Flujo:** cubre entrada posterior al pago y entrada directa desde Home sin duplicar experiencia.
- **Claridad:** una acción principal, valoración obligatoria y comentario opcional.
- **Defensa:** contratos inválidos, doble envío, recarga y errores tienen salida definida.
- **Arquitectura:** separa contexto, formulario, resultado y navegación; no depende del contrato financiero completo.
- **Accesibilidad:** contempla semántica, teclado, lector de pantalla, tactilidad y movimiento reducido.
- **Reutilización:** aprovecha patrones existentes sin modificar módulos congelados.
- **Implementabilidad:** componentes, contratos, estados y validaciones están definidos; no quedan bloqueos de negocio para la V1 mock.

**Resultado:** diseño listo para implementación. El contrato de entrada coincide con la salida real de RF-006 y no quedan bloqueos funcionales para la V1 mock. Confianza técnica: 98%.

## Implementación V1

- Ruta `/feedback`.
- Pantalla de agradecimiento.
- Entrada desde **Mi Experiencia** en Home.
- Entrada desde resultado de pago simulado.
- Contexto reducido en memoria con restaurante, mesa, origen y operación mock opcional.
- Calificación accesible de 1 a 5 estrellas.
- Comentario opcional con límite de 500 caracteres.
- Botón **Enviar opinión**.
- Botón **Omitir**.
- Estado de envío simulado con bloqueo de doble envío.
- Estado de éxito.
- Estado de error simulado recuperable.
- Estado de contexto no disponible.
- Validación con `npm run lint` y `npm run build`.

El módulo queda congelado para la V1. Solo se aceptarán correcciones de errores o mejoras críticas de usabilidad.

## Idea futura / V2

Si el feedback es positivo, Restaurant OS podría ofrecer al comensal la opción de dejar una reseña en Google Maps / Google Reviews.

Esta idea no se implementa en V1 y requerirá decisión funcional, diseño específico e integración externa aprobada.
