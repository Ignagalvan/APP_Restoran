# RF-008 — Análisis de Feedback

## Estado

Análisis preliminar. No implementado.

## Flujo previsto

1. Acceder desde **Mi Experiencia** o desde el cierre del pago simulado.
2. Elegir una valoración mock.
3. Agregar un comentario opcional.
4. Confirmar el envío simulado.
5. Mostrar una confirmación clara.

## Estados

- Sin valoración.
- Valoración seleccionada.
- Comentario opcional ingresado.
- Envío simulado en curso.
- Confirmación local.

## Componentes reutilizables

- `Button` para confirmar y volver.
- Contenedor mobile, encabezado, fondos y tokens visuales existentes.
- Patrón de toast accesible de Cuenta Digital para confirmaciones breves.
- Patrón de Bottom Sheet si la revisión de UX decide mantener el feedback contextual; requiere aprobación antes de adoptarlo.

## Componentes nuevos previstos

- Selector accesible de valoración.
- Campo de comentario.
- Resumen o confirmación de envío.

## Decisiones pendientes

- Escala y etiquetas de valoración.
- Longitud máxima del comentario.
- Punto de entrada principal: Home, cierre de pago o ambos.
- Presentación como pantalla o superficie contextual.

## Riesgos

- Definir una escala sin aprobación altera la interpretación del feedback.
- Duplicar patrones de confirmación en lugar de extraer una primitiva común.
- Confundir feedback simulado con un envío almacenado realmente.

Google Reviews, clasificación automática, almacenamiento, notificaciones y datos personales quedan fuera de V1.
