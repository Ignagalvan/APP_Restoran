# Customer Journey — Restaurant OS

## Estado

Borrador en Product Discovery.

## Objetivo

Entender la experiencia completa del restaurante y detectar oportunidades reales antes de definir requerimientos.

## Principios aplicados

- El comensal debe entender qué hacer sin explicación.
- La plataforma debe ahorrar tiempo.
- El mozo debe ser potenciado, no reemplazado.
- La plataforma debe ser configurable por restaurante.
- Cada funcionalidad debe resolver un problema real.

## Journey del comensal

### 1. Se sienta en la mesa

- **Situación actual:** el comensal ocupa una mesa física.
- **Problemas:** Pendiente de definición.
- **Oportunidades:** Pendiente de definición.
- **Decisiones aprobadas:** el QR representa una mesa física; el mozo abre una sesión activa de mesa.
- **Pendiente de definición:** qué ve el comensal antes de que la sesión esté activa.

### 2. Escanea el QR

- **Situación actual:** el comensal escanea el QR de la mesa.
- **Problemas:** Pendiente de definición.
- **Oportunidades:** acceder sin instalar una aplicación.
- **Decisiones aprobadas:** la solución será una web app responsive/PWA y el QR estará asociado a la mesa física.
- **Pendiente de definición:** comportamiento si no existe una sesión activa.

### 3. Ve bienvenida / home de mesa

- **Situación deseada:** mostrar bienvenida, nombre y número de mesa, estilo visual del restaurante y opciones disponibles según configuración.
- **Decisiones aprobadas:** la estructura visual será estándar; la apariencia podrá adaptarse mediante logo, colores, imágenes y módulos activos.
- **Pendiente de definición:** contenido exacto, jerarquía visual y opciones visibles en cada configuración.

### 4. Consulta el menú

- **Situación actual:** el menú digital forma parte de la V1.
- **Problemas:** llevar cartas consume tiempo operativo.
- **Oportunidades:** permitir la consulta desde la mesa.
- **Decisiones aprobadas:** el restaurante podrá modificar menú, precios, fotos y disponibilidad de platos.
- **Pendiente de definición:** estructura, categorías, detalle de platos y flujo de actualización.

### 5. Consulta la cuenta

- **Situación actual:** esperar la cuenta genera fricción; el comensal no siempre tiene claridad sobre su consumo.
- **Problemas:** llevar y cerrar cuentas consume tiempo.
- **Oportunidades:** consultar una cuenta digital desde la mesa.
- **Decisiones aprobadas:** la cuenta digital forma parte de la V1.
- **Pendiente de definición:** origen, actualización y detalle de la cuenta.

### 6. Divide la cuenta

- **Opciones consideradas:** dividir en partes iguales; seleccionar productos propios; otras opciones pendientes de definición.
- **Decisiones aprobadas:** la división de cuenta forma parte de la V1.
- **Pendiente de definición:** reglas, concurrencia, pagos parciales y resolución de productos seleccionados por más de una persona.

### 7. Paga

- **Situación deseada:** ver resumen, elegir propina, elegir método de pago y confirmar pago.
- **Decisiones aprobadas:** pago y propina forman parte de la V1.
- **Pendiente de definición:** integración real con pagos, métodos disponibles, confirmación, fallos y qué ocurre si una persona paga y otras no.

### 8. Deja feedback

- **Situación deseada:** feedback sobre restaurante, platos y mozo; ante feedback positivo, sugerir Google Reviews; ante feedback negativo, mantenerlo privado para el restaurante.
- **Decisiones aprobadas:** el feedback forma parte de la V1.
- **Pendiente de definición:** alcance, momento, criterios de clasificación y tratamiento. Google Reviews está previsto para V2.

### 9. Se retira

- **Situación deseada:** mensaje de agradecimiento, posibilidad de descargar factura y dejar reseña.
- **Pendiente de definición:** facturación, descarga de factura, reseñas y cierre de sesión de mesa.

## Journey del mozo

- **Objetivo:** reducir tareas repetitivas sin reemplazar la atención humana.
- **Tareas contempladas:** llevar carta, llevar cuenta, dividir manualmente, buscar posnet, cobrar y entregar comprobante o factura.
- **Decisiones aprobadas:** el mozo abre la sesión de mesa y debe ser potenciado por el sistema.
- **Pendiente de definición:** acciones, permisos y responsabilidades exactas dentro de la plataforma.

## Journey del dueño / administrador

- **Objetivo:** comprender el funcionamiento del negocio y contar con datos útiles para decidir.
- **Acciones contempladas:** ver estadísticas y feedback, configurar módulos, agregar mesas y configurar menú.
- **Decisiones aprobadas:** podrá activar o desactivar módulos y gestionar tareas diarias como menú, precios, fotos, disponibilidad y promociones simples.
- **Pendiente de definición:** alcance del panel, estadísticas, permisos y gestión de mesas.

## Journey del encargado / gerente

- **Objetivo:** operar las configuraciones delegadas por el dueño.
- **Acciones contempladas:** cambiar menú y precios, ver mozos activos, productos más vendidos y productos con peor feedback.
- **Pendiente de definición:** incorporación formal como actor, permisos, datos visibles y configuraciones delegables.

## Journey del chef

- **Objetivo:** recibir información útil sobre platos sin información irrelevante.
- **Acciones contempladas:** identificar platos mejor valorados, platos con problemas y revisar feedback útil.
- **Pendiente de definición:** incorporación formal como actor, acceso, formato y frecuencia de la información.

## Journey de la empresa proveedora

- **Objetivo:** acompañar la evolución del restaurante y sostener una relación de largo plazo.
- **Decisiones aprobadas:** configuración inicial, acompañamiento, mantenimiento, seguimiento y mejora continua; apoyo en configuración avanzada, módulos, integraciones, automatizaciones, análisis de datos y evolución del producto.
- **Pendiente de definición:** procesos, responsables, frecuencia del seguimiento y alcance de cada servicio.
