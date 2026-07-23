# RF-006 — Pago simulado

## Estado

Implementado, validado y congelado para V1.

Solo se aceptarán correcciones de errores o mejoras críticas de usabilidad.

## Objetivo y alcance

Permitir que el comensal revise un importe, elija un método mock y confirme un pago simulado sin procesar dinero ni solicitar datos financieros reales.

RF-006 comienza con un borrador válido proveniente de RF-005. La selección explícita de propina aprobada se integra antes de la confirmación final; RF-007 conserva su especificación independiente para su evolución futura.

## Flujo completo del usuario

1. Ingresar a `/payment` desde una fuente autorizada.
2. Validar y normalizar el contrato recibido antes de mostrar acciones.
3. Revisar restaurante, mesa, origen de la selección, conceptos disponibles e importe base.
4. Elegir un único método de pago mock.
5. Elegir explícitamente sin propina, 5%, 10% o 15%.
6. Volver al resumen final con importe base, propina y total.
7. Confirmar el pago simulado una sola vez.
8. Mostrar un estado breve de procesamiento.
9. Resolver en resultado exitoso o error simulado recuperable.
10. Desde el resultado, usar únicamente las salidas que se aprueben para V1.

Volver antes de confirmar no modifica la cuenta. Volver durante el procesamiento queda bloqueado para evitar estados ambiguos. El resultado simulado no altera RF-004 ni persiste datos.

## Navegación

- Ruta del módulo: `/payment`.
- Entrada principal: CTA **Continuar** de RF-005 con un `PaymentDraft` válido.
- RF-004 permanece sin cambios; la entrada V1 implementada proviene exclusivamente de RF-005.
- Volver desde revisión: retorna a la pantalla de origen conservando su estado mientras continúe la navegación cliente.
- Entrada directa, recarga o pérdida del estado: muestra `PaymentUnavailableState`; nunca reconstruye silenciosamente una selección.
- La selección de propina aprobada se integra antes de confirmar.
- Salida posterior al resultado: `/feedback` para RF-008.

El contrato se transportará mediante un estado de flujo en memoria en el límite cliente. No se enviarán conceptos por URL ni se usará almacenamiento persistente. Una recarga conduce deliberadamente al estado no disponible.

## Estados posibles

1. **No disponible:** falta el contrato o no supera validaciones.
2. **Revisión sin método:** contrato válido; CTA deshabilitado.
3. **Método seleccionado:** selección válida y reversible.
4. **Esperando propina:** exige una elección explícita entre sin propina, 5%, 10% y 15%.
5. **Listo para confirmar:** método y resultado de propina válidos.
6. **Procesando:** interacción bloqueada y anuncio accesible.
7. **Exitoso:** operación mock confirmada con identificador local.
8. **Error recuperable:** fallo mock controlado; permite reintentar o volver a revisión.

No habrá estados de pasarela, autorización bancaria, conciliación, reembolso ni pago real.

## Contrato recibido desde RF-005

RF-006 consume el contrato congelado sin modificarlo:

```text
PaymentDraft
- restaurant: string
- table: string
- mode: "products" | "equal"
- selectedProducts: Array<
    id: string
    name: string
    quantity: number
    unitPrice: number
    subtotal: number
  >
- quantityByProduct: Record<string, number>
- amount: number
- unassignedBalance: number
```

Reglas de interpretación:

- `products`: requiere al menos un producto válido y la suma de subtotales debe coincidir con `amount`.
- `equal`: admite `selectedProducts` vacío porque representa una parte, no conceptos específicos.
- `unassignedBalance` es informativo y nunca se suma al pago actual.
- RF-006 crea un modelo normalizado propio; no depende del estado interno ni de componentes de RF-005.

## Modelo normalizado interno

```text
PaymentSession
- restaurant
- table
- source: "split-products" | "split-equal" | "full-account"
- items
- baseAmount
- unassignedBalance
- currency: "ARS"
- selectedMethodId: string | null
- tipSelection: pendiente | sin-propina | seleccionada
- tipAmount
- totalAmount
- status
```

Los importes se expresan como pesos enteros en V1. `totalAmount = baseAmount + tipAmount`; el cálculo final debe existir en una única función pura compartida con RF-007.

## Contrato entregado a RF-007

```text
TipInput
- restaurant
- table
- source
- items
- baseAmount
- currency: "ARS"
- selectedMethodId
```

RF-007 devuelve una decisión explícita: sin propina o propina seleccionada. La ausencia de respuesta no equivale a cero.

## Contrato de resultado para RF-008

```text
PaymentResult
- operationId: string mock
- restaurant
- table
- status: "succeeded" | "failed"
- source
- baseAmount
- tipAmount
- totalAmount
- methodId
- completedAt: string ISO local
```

No contiene credenciales, datos personales ni información financiera. Solo se entrega después de una confirmación simulada exitosa; el error permanece dentro de RF-006.

## Componentes reutilizables

- `Button` para CTA y acciones secundarias.
- Shell mobile, encabezado, badge de mesa y tokens visuales existentes.
- `formatCurrency` para todos los importes.
- Patrones accesibles de selección usados en tabs y cards de RF-005.
- Patrones de estado vacío y CTA fijo, adaptados sin acoplar estilos específicos del módulo.

No se reutiliza `SplitSummary` directamente: se comparte el patrón, pero el resumen de pago tiene semántica y estados distintos.

## Componentes nuevos

- `PaymentPage`: entrada de ruta y metadatos.
- `PaymentExperience`: máquina de estados local y coordinación.
- `PaymentSummary`: conceptos, importe base, propina y total.
- `PaymentMethodSelector`: grupo accesible de métodos mock.
- `PaymentMethodCard`: estado disponible, seleccionado y deshabilitado.
- `PaymentActions`: CTA fijo y acción de volver.
- `PaymentProcessingState`: bloqueo y anuncio breve.
- `PaymentResult`: éxito simulado.
- `PaymentErrorState`: error recuperable y reintento.
- `PaymentUnavailableState`: contrato ausente o inválido.
- `payment-contract`: tipos, normalización y validaciones puras.
- `payment-data`: catálogo mock de métodos y escenarios controlados.

## Validaciones

- Contrato presente y con forma reconocida.
- Restaurante y mesa no vacíos tras normalizar espacios.
- `amount`, subtotales, precios y cantidades finitos; importes positivos y cantidades enteras positivas.
- `unassignedBalance` finito y no negativo.
- En modalidad por productos, subtotales consistentes con cantidad por precio y suma igual a `amount`.
- En partes iguales, `amount > 0`; no exigir productos.
- Método seleccionado existente, habilitado y único.
- Resultado de RF-007 explícito y total consistente antes de confirmar.
- CTA deshabilitado mientras falten datos o durante procesamiento.
- Confirmación idempotente en la sesión: ignorar activaciones repetidas.
- Nunca aceptar `NaN`, infinito, valores negativos, identificadores desconocidos ni datos de URL como fuente confiable.

## Casos borde

- Contrato perdido por recarga o acceso directo.
- Selección por productos vacía o alterada.
- Parte igual sin líneas de producto.
- Diferencia entre suma de productos e importe declarado.
- Método deshabilitado después de haber sido seleccionado: limpiar selección y volver al estado sin método.
- Doble toque o tecla repetida sobre confirmar.
- Navegación atrás durante procesamiento.
- Preferencia de movimiento reducido.
- Texto largo de restaurante o producto y precios de seis o más cifras.
- Error mock seguido de reintento exitoso sin duplicar operación.

## Estado vacío y estados de error

`PaymentUnavailableState` explica que no hay un pago preparado y ofrece volver a la Cuenta Digital. No muestra total cero ni CTA de confirmación.

`PaymentErrorState` comunica que la simulación no pudo completarse, conserva método e importes y permite un reintento explícito. El fallo se activa solo mediante un escenario mock determinista; nunca aleatoriamente.

Los errores de validación no se presentan como fallos bancarios. No se usarán mensajes como “rechazado por el banco” porque no existe integración real.

## Accesibilidad

- Métodos implementados como grupo de radios nativos o semántica equivalente completa.
- Zonas táctiles mínimas de 44 × 44 px.
- Estado seleccionado comunicado por texto, contraste e indicador; nunca solo por color.
- Foco visible y orden de tabulación coherente.
- CTA fijo sin cubrir contenido y compatible con safe areas.
- Procesamiento anunciado con `role="status"`; error con `role="alert"`.
- Movimiento de 200–300 ms como máximo y respeto por `prefers-reduced-motion`.
- Importes con etiquetas completas para lectores de pantalla.
- El foco pasa al encabezado del resultado o error tras la transición.

## Oportunidades de reutilización

- Extraer un patrón visual compartido para opciones seleccionables si RF-006 y RF-007 convergen, sin modificar módulos congelados.
- Compartir una utilidad monetaria y cálculo puro de total entre RF-006 y RF-007.
- Generalizar el estado no disponible solo cuando exista un segundo consumidor real.
- Mantener contratos separados de los componentes para facilitar pruebas unitarias posteriores.

## Decisiones técnicas tomadas automáticamente

1. Ruta `/payment`, por coherencia con `/account` y `/split`.
2. Estado de flujo en memoria y estado no disponible al recargar, porque V1 prohíbe persistencia y datos sensibles en URL.
3. Error mock determinista y reintentable, para validar UX sin fingir una pasarela real.
4. Prevención local de doble confirmación e identificador mock generado una sola vez por intento.
5. Modelo normalizado interno desacoplado de `PaymentDraft`, para no atar RF-006 a RF-005.
6. ARS entero y una única función pura de totales, consistente con los módulos existentes.
7. Procesamiento breve, sin espera artificial superior a 600 ms y prácticamente inmediato con movimiento reducido.

## Decisiones aprobadas

1. Ruta `/payment` y estado exclusivamente en memoria.
2. Métodos mock: Mercado Pago, Tarjeta y Efectivo.
3. Propina explícita: sin propina, 5%, 10% o 15%.
4. Prevención de doble confirmación.
5. Salida del resultado exitoso hacia RF-008 Feedback.
6. Sin backend, base de datos ni pagos reales.

## Riesgos técnicos

- Perder el contrato al recargar es intencional en V1, pero debe explicarse con claridad.
- Un estado global mal delimitado puede filtrar una sesión anterior; debe limpiarse al salir o completar.
- Duplicar cálculos con RF-007 produciría totales divergentes.
- Una simulación demasiado realista puede hacer creer que hubo un cobro.
- Habilitar RF-004 exige una modificación explícita de un módulo congelado.
- El CTA fijo puede cubrir contenido si no se reserva altura y se valida en distintos viewports.

## Fuera de alcance

Mercado Pago, pasarelas, tarjetas o credenciales reales, QR de pago, CVU, alias, webhooks, conciliación, reembolsos, facturación, persistencia, pagos parciales reales y actualización de la cuenta.

## Autoauditoría del diseño

- **Cobertura:** flujo, estados, navegación, contratos, validaciones, errores, accesibilidad y casos borde definidos.
- **Consistencia:** respeta Blueprint, alcance mock y contratos congelados de RF-005.
- **Acoplamiento:** el adaptador normalizado evita importar estado o UI de RF-005.
- **Seguridad conceptual:** no captura datos financieros ni afirma que exista un cobro real.
- **Usabilidad:** una acción principal por estado, CTA estable y recuperación clara.
- **Hallazgo:** la salida `/feedback` está preparada, pero RF-008 permanece sin implementar por alcance del Sprint.

## Implementación V1

- Navegación desde RF-005.
- Contrato local conservado únicamente en memoria.
- Resumen de conceptos, consumo, propina y total.
- Métodos mock Mercado Pago, Tarjeta y Efectivo.
- Propina explícita entre cuatro opciones aprobadas.
- CTA defensivo y confirmación idempotente.
- Procesamiento breve y resultado simulado.
- Estado no disponible para acceso directo o recarga.
- Enlace de salida hacia `/feedback` sin implementar RF-008.
- Validación con `npm run lint`, `npm run build` y recorrido funcional mobile sin errores de consola.
