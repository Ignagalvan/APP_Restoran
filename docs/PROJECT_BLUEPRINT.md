# Project Blueprint — Restaurant OS

Referencia principal para cualquier desarrollo futuro. Resume decisiones vigentes; los documentos fuente conservan el detalle.

## 1. Visión del producto

Restaurant OS es una plataforma web modular que reduce fricciones dentro del restaurante, ahorra tiempo al comensal y mejora la operación sin reemplazar al mozo. La V1 valida con datos mock la experiencia desde el QR hasta la división, pago simulado, propina y feedback, más una gestión básica para el restaurante.

No es solo un menú QR, una aplicación de pagos ni un POS. Existe una única plataforma configurable para todos los restaurantes.

## 2. Principios de diseño

- Mobile first, accesible, legible y usable con una mano.
- Elegante, cálida, humana, premium, confiable y atemporal.
- Una pantalla, un objetivo y una acción principal; máximo tres acciones principales visibles.
- Jerarquía clara, espacio generoso, iconografía simple y profundidad sutil.
- La simplicidad tiene prioridad sobre la cantidad de información.
- Animaciones discretas que aporten claridad.
- La tecnología desaparece y el restaurante permanece como protagonista.

## 3. Principios de arquitectura

- Una única aplicación modular y configurable; no crear variantes por restaurante.
- Next.js, TypeScript y Tailwind CSS como base actual.
- Componentes pequeños y reutilizables; reutilizar antes de duplicar.
- Separar datos mock, presentación e interacción.
- Mantener acotado el límite cliente/servidor.
- V1 sin backend, base de datos, autenticación real, pagos reales ni integraciones gastronómicas.
- No solicitar ni almacenar datos financieros reales.
- Priorizar mantenibilidad, estabilidad, accesibilidad y velocidad percibida.

## 4. Metodología oficial

1. Especificación de requerimientos.
2. Diseño.
3. Implementación.
4. Validación.
5. Evolución.

No crear metodologías paralelas ni documentación innecesaria. Un módulo nuevo comienza después de validar, documentar y congelar el anterior.

## 5. Estados oficiales de los módulos

| RF | Módulo | Estado |
|---|---|---|
| RF-001 | QR de mesa | Aprobado |
| RF-002 | Home del comensal | Implementado, validado y congelado |
| RF-003 | Menú Digital | Implementado, validado y congelado |
| RF-004 | Cuenta Digital | Implementado, validado y congelado |
| RF-005 | División Inteligente de Cuenta | Implementado, validado y congelado |
| RF-006 | Pago simulado | Implementado, validado y congelado |
| RF-007 | Propina | Implementado, validado y congelado |
| RF-008 | Feedback | Implementado, validado y congelado |
| RF-009 | Panel básico del restaurante | Pausado para V2 |
| RF-010 | Configuración básica | Pendiente |

EP-001 a EP-007 están cerradas. RF-009 queda pausado para V2.

## 6. Prioridades de todos los RF

1. RF-001 — Contexto de mesa.
2. RF-002 — Punto de entrada.
3. RF-003 — Menú Digital.
4. RF-004 — Cuenta Digital.
5. RF-005 — División Inteligente de Cuenta.
6. RF-006 — Pago simulado.
7. RF-007 — Propina.
8. RF-008 — Feedback.
9. RF-009 — Panel básico.
10. RF-010 — Configuración básica.

RF-002 a RF-008 están cerrados. RF-009 queda pausado para V2.

## 7. Dependencias entre RF

- RF-001 aporta el contexto de mesa a RF-002.
- RF-002 da acceso a RF-003, RF-004 y RF-008.
- RF-004 proporciona la cuenta utilizada por RF-005.
- RF-005 entrega importe y conceptos a RF-006.
- RF-007 se integra a RF-006 antes de confirmar el pago simulado.
- RF-008 puede iniciarse desde la Home o después del pago simulado.
- RF-009 usa datos mock representativos de mesas, cuentas y feedback.
- RF-010 se accede desde RF-009 y configura localmente módulos, menú y mesas mock.

## 8. Definition of Done

Un módulo está terminado para V1 cuando:

- Cumple alcance y exclusiones documentadas.
- Usa datos mock separados y no incorpora integraciones no aprobadas.
- Mantiene coherencia visual, accesibilidad básica y mobile first.
- Supera `npm run lint` y `npm run build`.
- Supera revisión visual y funcional.
- Actualiza únicamente la documentación necesaria.
- Queda implementado, validado y congelado para V1.

Un módulo congelado solo admite errores o mejoras críticas de usabilidad.

## 9. Convenciones para Codex

- Leer primero este documento y luego las fuentes específicas de la tarea.
- No actuar como Product Owner ni inventar decisiones funcionales.
- Respetar el alcance y registrar incertidumbres como pendientes.
- No modificar módulos congelados sin autorización expresa.
- No crear backend, base de datos, autenticación, pagos o integraciones reales sin aprobación.
- Reutilizar componentes y patrones; no duplicar lógica ni interfaces.
- No avanzar a otro RF durante el cierre del módulo actual.
- Validar el cambio y comunicar archivos, resultados y pendientes.
- Mantener documentación breve y sin marcos metodológicos adicionales.

## 10. Orden oficial de implementación

1. RF-008 — Feedback.
2. Experiencia QR del comensal.
3. UX Pass global de V1.
4. Revisión general de V1.
5. Auditoría final con lint, build y React Doctor si se autoriza.
