# RF-004 — Experiencia de Cuenta Digital

## Estado del módulo

- Implementado.
- Validado.
- Congelado para V1.

## 1. Problema que resuelve

La Cuenta Digital permite que el comensal revise el estado económico de su mesa sin depender de solicitar una cuenta impresa. Reduce esperas, mejora la claridad sobre lo consumido y facilita la revisión previa a los módulos de división y pago, sin reemplazar la atención del mozo.

## 2. Acceso y momento del flujo

- Se accede desde **Ver Consumo** en la Home de la mesa.
- Está disponible durante la sesión activa de la mesa.
- Puede consultarse antes de iniciar división de cuenta o pago.
- La experiencia para una mesa sin sesión activa o después de su cierre permanece pendiente de definición futura.

## 3. Información implementada

- Restaurante y número de mesa.
- Estado **Cuenta abierta**.
- Productos consumidos.
- Cantidad y precio unitario.
- Subtotal por producto.
- Subtotal general y total.
- Referencia secundaria de actualización.

En la V1, el total es igual al subtotal. No se incluyen impuestos, descuentos ni propina.

## 4. Acciones implementadas

- Volver a la Home.
- Revisar el consumo.
- Consultar el detalle de un producto mediante el Bottom Sheet reutilizado del Menú.
- Simular la actualización del consumo manteniendo los datos mockeados.
- Ver **Dividir cuenta** como acción preparada para RF-005, sin ejecutar el flujo.
- Ver **Continuar al pago** como acción preparada para RF-006, sin ejecutar pagos.

## 5. Estados implementados

### Cuenta con consumo

Muestra productos, cantidades, importes, subtotales y total de la mesa.

### Cuenta vacía

Muestra un estado vacío claro y permite actualizar el consumo de forma simulada.

No forman parte de RF-004 los estados de pago parcial, cuenta pagada, error real ni actualización en tiempo real.

## 6. Decisiones V1

- Los datos son mockeados y locales.
- No existe backend, base de datos ni integración con sistemas gastronómicos.
- La actualización es simulada y no funciona en tiempo real.
- La propina pertenece al módulo de Pago.
- La división de cuenta y el pago no se implementan en RF-004.
- La interfaz prioriza el detalle del consumo y evita estadísticas redundantes en el encabezado.

## 7. Pendientes para RF-005 y RF-006

- Definir modalidades y reglas de división de cuenta.
- Resolver selecciones simultáneas y pagos parciales.
- Definir qué información se transfiere desde la Cuenta Digital hacia división y pago.
- Determinar el comportamiento si la mesa continúa consumiendo después de un pago parcial.
- Definir cuándo una cuenta se considera completamente pagada y cuándo se cierra la mesa.
- Definir métodos de pago, confirmación, errores y reintentos.
