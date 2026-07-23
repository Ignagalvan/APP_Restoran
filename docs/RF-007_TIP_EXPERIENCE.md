# RF-007 — Experiencia de Propina

## Estado

Implementado, validado y congelado para V1.

## Objetivo y alcance

Permitir que el comensal elija, antes de confirmar el pago simulado, si desea agregar propina y comprenda inmediatamente cuánto representa y cuál será el total final.

RF-007 forma parte de la experiencia de RF-006 en `/payment`; no crea una pantalla ni una ruta independiente. Solo opera con estado local en memoria y no procesa, persiste ni distribuye dinero real.

Opciones aprobadas para V1:

- Sin propina.
- 5 %.
- 10 %.
- 15 %.

## Flujo del usuario

1. RF-006 recibe un borrador de pago válido desde RF-005 y muestra su resumen.
2. El comensal llega a la sección **Propina**, antes de la confirmación del pago.
3. Selecciona explícitamente una de las cuatro opciones aprobadas.
4. La interfaz actualiza de inmediato el importe de propina y el total final, sin esperas ni navegación.
5. El comensal puede cambiar la opción mientras el pago no esté en procesamiento.
6. Con una opción válida y un método de pago válido, RF-006 habilita la confirmación.
7. RF-006 incorpora la selección al contrato de confirmación y continúa con el pago simulado.

La opción **Sin propina** no se preselecciona: elegirla es una decisión válida y explícita. Esto evita confundir ausencia de interacción con consentimiento.

## Navegación

- Entrada: dentro de `/payment`, después del resumen del importe base.
- Permanencia: seleccionar o cambiar la propina no cambia la ruta ni la posición conceptual del flujo.
- Salida: RF-006 confirma el pago simulado y navega a RF-008.
- Volver: utiliza la navegación definida por RF-006; RF-007 no incorpora navegación propia.
- Recarga: al depender de memoria local, se aplica el estado no disponible definido por RF-006.

## Componentes

### Reutilizables

- Formateador monetario compartido para todos los importes en ARS.
- Contenedor, jerarquía tipográfica y patrones de cards de RF-006.
- Estado visual seleccionado/no seleccionado/deshabilitado ya aprobado.
- Resumen de importes de RF-006, extendido mediante datos y no duplicado.
- CTA de RF-006; RF-007 solo participa en su condición de habilitación.

### Nuevos

- `TipSelector`: grupo de selección única y responsable de exponer el valor elegido.
- `TipOption`: opción componible para **Sin propina**, 5 %, 10 % o 15 %.
- `TipAmountSummary`: presenta importe base, propina y total final dentro del resumen de RF-006.

Los nombres son técnicos y pueden ajustarse durante la implementación sin alterar el comportamiento.

## Estados

### Pendiente de selección

- Ninguna opción está seleccionada.
- La confirmación de RF-006 permanece deshabilitada.
- Se muestra una indicación breve para elegir una opción, sin usar el texto del CTA como error.

### Sin propina

- La opción **Sin propina** está seleccionada.
- Importe de propina: $0.
- Total final: igual al importe base.
- Es un estado válido para confirmar.

### Propina seleccionada

- Una única opción porcentual está seleccionada.
- Se muestran el porcentaje, el importe calculado y el total final.
- Cambiar la selección reemplaza por completo la anterior.

### Deshabilitado

- Aplica durante el procesamiento de RF-006 o cuando el contrato de entrada no es válido.
- No permite cambiar la selección ni confirmar nuevamente.

### Estado vacío / no disponible

- Aplica si falta el contrato de pago, el importe base es cero, negativo o no finito, o la moneda no es la admitida.
- No se ofrecen opciones de propina y no se genera un contrato de salida.
- Reutiliza el estado no disponible de RF-006 en lugar de crear una variante aislada.

### Error de cálculo

- Ante un resultado no finito o inconsistente, se bloquea la confirmación.
- Se muestra un mensaje claro y recuperable dentro de RF-006.
- No se conserva ni emite el resultado inválido.

## Contrato de entrada desde RF-006

RF-007 recibe un alcance de pago ya validado por RF-006:

- Identificador local del borrador de pago.
- Moneda `ARS`.
- Importe base entero, finito y mayor que cero.
- Estado del pago: editable o en procesamiento.

Restaurante, mesa, modalidad, productos, cantidades y saldo pendiente continúan perteneciendo al contrato recibido por RF-006 desde RF-005. RF-007 no los transforma ni duplica.

## Contrato de salida hacia RF-006

Una selección válida entrega:

- Tipo: sin propina o porcentaje.
- Porcentaje: 0, 5, 10 o 15.
- Importe base sin modificar.
- Importe de propina, entero y no negativo.
- Total final, entero y mayor que cero.
- Moneda `ARS`.

Invariantes:

- `total final = importe base + importe de propina`.
- **Sin propina** siempre equivale a porcentaje 0 e importe $0.
- Una opción porcentual siempre se calcula sobre el importe base recibido, nunca sobre un total que ya incluya propina.
- Solo puede existir una selección activa.
- El contrato no se emite mientras no haya una selección explícita válida.

RF-006 incorpora esta salida a su contrato de confirmación. RF-007 no crea identificadores de operación ni estados de pago.

## Cálculo y validaciones

- Opciones permitidas: exclusivamente 0, 5, 10 y 15.
- El importe base debe ser entero, finito y mayor que cero.
- La moneda debe ser `ARS`.
- La propina porcentual se calcula como `importe base × porcentaje / 100`.
- Si el resultado contiene fracción de peso, se redondea al peso entero más cercano. Esta regla evita importes fraccionarios y mantiene una diferencia máxima de $0,50.
- El total se deriva siempre del importe base validado y la propina calculada; nunca se acepta como entrada editable.
- Valores externos o manipulados fuera del conjunto permitido se rechazan, no se normalizan silenciosamente.
- Mientras RF-006 procesa la confirmación, la selección queda bloqueada para prevenir cambios y dobles envíos.

## Casos borde

- Importe base divisible o no divisible exactamente por el porcentaje.
- Selección repetida de la opción activa: no modifica el estado ni recalcula innecesariamente.
- Cambio rápido entre opciones: prevalece la última selección válida.
- Regreso desde un estado anterior de RF-006: conserva la selección solo mientras sobreviva el estado en memoria.
- Importe base muy alto: el cálculo debe permanecer dentro de enteros seguros de JavaScript; fuera de ese rango se considera inválido.
- Contrato alterado después de seleccionar: RF-006 debe recalcular RF-007 desde el nuevo importe base antes de habilitar la confirmación.
- Doble interacción durante procesamiento: controles y CTA permanecen bloqueados.

## Accesibilidad

- `TipSelector` se comporta como un grupo de radio con nombre accesible.
- Cada opción expone etiqueta, porcentaje y estado seleccionado mediante semántica nativa o roles ARIA equivalentes.
- Navegación por teclado con Tab; dentro del grupo, flechas para cambiar opción cuando se implemente el patrón ARIA de radio.
- Foco visible, contraste suficiente y zonas táctiles mínimas de 44 × 44 px.
- El cambio del total se anuncia de forma no intrusiva mediante una región `aria-live="polite"`.
- El estado deshabilitado es perceptible visual y semánticamente, sin depender solo del color.
- Las transiciones duran entre 200 y 300 ms y respetan `prefers-reduced-motion`.
- Importes y porcentajes se presentan como texto; nunca dependen únicamente de iconos.

## Reutilización y responsabilidades

- Un único cálculo puro produce propina y total final; la UI no replica fórmulas.
- RF-006 conserva la propiedad del flujo, método de pago, procesamiento, resultado y navegación.
- RF-007 conserva únicamente selección, cálculo y presentación de propina.
- El resumen monetario debe aceptar filas configurables para evitar una segunda card de totales.
- El mismo patrón de selección única puede reutilizar estilos y comportamiento del selector de métodos de pago, manteniendo etiquetas y semántica propias.

## Exclusiones V1

- Propina personalizada.
- Porcentajes configurables por restaurante.
- Propina sugerida automáticamente.
- Distribución entre empleados.
- Persistencia o recuperación después de recargar.
- Reglas fiscales, contables o de conciliación.
- Cobro real, backend, base de datos o integraciones externas.

## Riesgos

- Duplicar el cálculo entre RF-006 y RF-007 puede producir totales divergentes; debe existir una sola función de dominio.
- Confundir **Sin propina** con una selección por defecto puede afectar el consentimiento; por eso requiere acción explícita.
- Mostrar dos resúmenes separados puede sobrecargar mobile; debe extenderse el resumen existente.
- Un cambio del importe base después de seleccionar puede dejar datos obsoletos; la salida debe derivarse nuevamente.
- Una región viva demasiado verbosa puede resultar molesta al recorrer opciones; solo debe anunciar el total consolidado.
- El redondeo debe mantenerse centralizado para evitar diferencias entre presentación y confirmación.

## Decisiones técnicas tomadas automáticamente

- RF-007 se integra en `/payment` sin ruta propia porque es un paso previo a confirmar, no un destino independiente.
- La selección es explícita incluso para **Sin propina**, para distinguir una decisión consciente de un formulario incompleto.
- Los importes se expresan en pesos enteros y se redondean al entero más cercano, coherente con los datos monetarios V1 en ARS.
- El total final es derivado e inmutable desde la UI para proteger consistencia.
- El estado no disponible y los errores se resuelven dentro de RF-006 para evitar experiencias paralelas.
- La selección se bloquea durante el procesamiento para preservar el contrato confirmado y prevenir dobles acciones.

## Decisiones pendientes de aprobación

No quedan decisiones funcionales bloqueantes para implementar RF-007 dentro de RF-006 con el alcance V1 aprobado.

## Autoauditoría del diseño

- El flujo mantiene una única pantalla, una acción principal y no agrega navegación.
- Todos los estados producen una salida válida o bloquean explícitamente la confirmación.
- El contrato separa importe base, propina y total, y define invariantes verificables.
- La selección explícita reduce ambigüedad sin agregar pasos ni funcionalidades.
- El diseño reutiliza resumen, cards, estados y CTA existentes en lugar de duplicarlos.
- Los estados vacío, error, procesamiento y manipulación externa están contemplados.
- La experiencia es mobile first, usable con teclado y compatible con movimiento reducido.

**Nivel de confianza para implementar:** 96 %.

## Implementación V1

- Integración sin ruta propia dentro de `/payment`.
- `TipInput` y `TipSelection` como contratos tipados.
- Opciones explícitas: sin propina, 5%, 10% y 15%.
- Cálculo puro y validación defensiva centralizados en `tip-data.ts`.
- Redondeo al peso entero más cercano.
- Total derivado, no editable.
- Actualización accesible del total.
- Controles de método y propina deshabilitados durante procesamiento.
- Validación con `npm run lint`, `npm run build` y recorrido funcional mobile sin errores de consola.

El módulo queda congelado para la V1. Solo se aceptarán correcciones de errores o mejoras críticas de usabilidad.
