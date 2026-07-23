# RF-005 — División Inteligente de Cuenta

## Estado

Implementado, validado y congelado para V1.

Solo se aceptarán correcciones de errores o mejoras críticas de usabilidad.

## Objetivo

Permitir que el comensal defina qué parte del consumo desea pagar antes de continuar al flujo de pago simulado, sin persistencia ni concurrencia real.

## Entrada y salida

- Entrada prevista: acción **Dividir cuenta** de la Cuenta Digital.
- Estado inicial: cuenta abierta con consumo y sin asignaciones.
- Salida prevista: resumen local con conceptos e importe seleccionados para RF-006.
- Volver no modifica la cuenta ni conserva una división.

## Flujo del usuario

1. Acceder desde la Cuenta Digital.
2. Elegir **Por productos** o **En partes iguales**.
3. Configurar la división sobre los datos mock de la mesa.
4. Revisar selección, importe propio y saldo no asignado.
5. Continuar al pago simulado o volver.

## Modalidad por productos

- Presenta los productos de la cuenta con cantidad, precio unitario y subtotal.
- Permite marcar únicamente conceptos disponibles.
- Calcula localmente el importe seleccionado.
- Impide continuar sin una selección válida.

La selección se realiza por unidad. Una línea con varias unidades permite elegir desde cero hasta la cantidad disponible.

## Modalidad en partes iguales

- Solicita una cantidad de partes dentro de un rango cómodo para V1.
- Muestra el importe correspondiente a una parte.
- Permite continuar con una única parte asignada al comensal actual.

El rango permitido es de 2 a 10 personas. Una parte se calcula redondeando hacia arriba al peso entero. La diferencia restante no se asigna automáticamente y se informa como **Saldo pendiente de asignación**.

## Estados

- Elección de modalidad.
- Por productos sin selección.
- Por productos con selección.
- Partes iguales sin cantidad válida.
- Partes iguales configuradas.
- Resumen listo para continuar.
- Cuenta vacía o sin conceptos divisibles.

No se incluyen error remoto, actualización en tiempo real, pago parcial real ni conflicto entre comensales.

## Datos mock

Reutilizar `accountData` y `formatCurrency` de la Cuenta Digital. Mantener localmente:

- modalidad elegida;
- identificadores o unidades seleccionadas;
- cantidad de partes;
- importe resultante;
- saldo no asignado informativo.

## Componentes previstos

- `SplitPage`: composición general.
- `SplitExperience`: estado local y coordinación.
- `SplitMethodSelector`: elección de modalidad.
- `ProductSplitList`: selección por productos.
- `EqualSplitControl`: configuración de partes.
- `SplitSummary`: importe y saldo resultante.
- `SplitActions`: volver y continuar.

## Reutilización

- Contenedor, encabezado, badges y patrones visuales existentes.
- Datos y formateo monetario de `account-data.ts`.
- Componente `Button` existente.
- Patrones de filas táctiles de Cuenta Digital, sin modificar el módulo congelado.

## Riesgos

- Elegir una granularidad incorrecta cambia cálculos y expectativas del usuario.
- Un redondeo no aprobado puede generar importes inconsistentes.
- El flujo no puede conectarse desde RF-004 sin autorización para reemplazar su botón deshabilitado por navegación.
- RF-006 necesita un contrato estable para recibir importe y conceptos.

## Decisiones aprobadas

1. División por unidad.
2. Partes iguales entre 2 y 10 personas.
3. Redondeo hacia arriba al peso entero.
4. Saldo restante visible y sin asignación automática.
5. Navegación autorizada desde la acción **Dividir cuenta** de RF-004.
6. Sin concurrencia, bloqueos ni persistencia.

## Contrato preparado para RF-006

El módulo construye localmente un objeto con restaurante, mesa, modalidad, productos seleccionados, cantidad por producto, importe y saldo pendiente. No navega ni implementa RF-006.
