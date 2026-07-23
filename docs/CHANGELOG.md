# Changelog — Restaurant OS

## EP-002 — Home del Comensal

- Migración del proyecto fuera de OneDrive a `C:\dev\restaurant-os`.
- Creación de estructura Next.js + TypeScript + Tailwind.
- Implementación de Home V2 del Comensal.
- Verificación con `npm run lint` y `npm run build`.
- EP-002 aprobada visualmente como primera versión usable.

## Cierre de RF-003 — Menú Digital

- Segunda iteración del Menú Digital.
- Incorporación de fotografías gastronómicas.
- Bottom Sheet con detalle del plato.
- Scroll sincronizado con categorías.
- Mejoras de UX y microanimaciones.
- RF-003 aprobado, implementado y validado.
- EP-002 completamente cerrada.

## Cierre de RF-004 — Cuenta Digital

- Implementación completa de RF-004.
- Reutilización del Bottom Sheet del Menú para el detalle de productos.
- Refinamiento de la experiencia de Cuenta Digital.
- Simplificación del encabezado para priorizar el detalle del consumo.
- RF-004 validado y congelado para V1.
- EP-003 completamente cerrada.

## Implementación de RF-005 — División Inteligente de Cuenta

- División por unidad con cantidades locales.
- División en partes iguales entre 2 y 10 personas.
- Redondeo hacia arriba al peso entero.
- Saldo pendiente de asignación visible.
- Tabs con transición CSS y estados visuales accesibles.
- CTA inferior y contrato local preparado para RF-006.
- Navegación habilitada desde **Dividir cuenta** en RF-004.
- Validación con lint, build y revisión funcional mobile.

## Cierre de RF-005 — División Inteligente de Cuenta

- Estado vacío y validaciones defensivas incorporados.
- Selección por unidad reforzada visualmente.
- CTA estable, accesible y preparado para uso móvil.
- Lenguaje del resumen simplificado para mayor claridad.
- RF-005 aprobado, validado y congelado para V1.
- EP-004 completamente cerrada.

## Especificación de RF-006 — Pago simulado

- Flujo, estados, contratos, validaciones y casos borde consolidados.
- Arquitectura de componentes y reutilización definida.
- Riesgos técnicos y decisiones pendientes de producto identificados.

## Sprint 5 — Implementación de RF-006

- Ruta `/payment` y transporte del contrato de RF-005 en memoria.
- Métodos mock Mercado Pago, Tarjeta y Efectivo.
- Opciones explícitas de propina: sin propina, 5%, 10% y 15%.
- Validaciones defensivas y prevención de doble confirmación.
- Procesamiento, resultado exitoso y estado sin pago preparado.
- Salida hacia RF-008 Feedback preparada.
- Validación completa con lint, build y recorrido funcional mobile.
- RF-007 y RF-008 diseñados; auditoría técnica y arquitectura inicial de RF-009 completadas.

## Cierre de RF-006 y Sprint 6

- RF-006 aprobado y congelado para V1.
- EP-005 completamente cerrada.
- RF-007 formalizado con contrato y cálculo de dominio propios.
- Opciones sin propina, 5%, 10% y 15% integradas y validadas.
- Métodos y propina bloqueados durante procesamiento.
- RF-008 alineado con el contrato real de RF-006 y listo para implementación.
- UX Pass V1 priorizado sin implementar mejoras cosméticas.
- Arquitectura de RF-009 refinada sin código.

## Cierre de RF-007 e inicio de Sprint 7

- RF-007 aprobado y congelado para V1.
- EP-006 completamente cerrada.
- Sprint 7 iniciado con RF-008 Feedback como único RF en implementación.

## Cierre de RF-008 e inicio de Sprint 8

- RF-008 aprobado y congelado para V1.
- EP-007 completamente cerrada.
- Feedback implementado con calificación de 1 a 5 estrellas, comentario opcional, envío simulado, éxito, error recuperable y omisión.
- Idea V2 registrada: ofrecer reseña en Google Maps / Google Reviews cuando el feedback sea positivo, sin implementación en V1.
- Sprint 8 iniciado con RF-009 Panel básico del restaurante como único RF en implementación.

## Cambio de foco — Experiencia QR del comensal

- RF-009 Panel Restaurante queda pausado para V2.
- Se conserva toda la implementación existente del panel como base futura.
- Se incorpora el flujo principal por QR con rutas `/mesa/[mesa]`.
