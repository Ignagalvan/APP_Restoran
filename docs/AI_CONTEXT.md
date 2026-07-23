# Contexto para IA — Restaurant OS

## Resumen
Restaurant OS es una plataforma web modular y configurable para restaurantes, inicialmente enfocada en Córdoba, Argentina. Un QR representa una mesa física y permite al comensal acceder a las opciones disponibles durante una sesión activa abierta por el mozo.

## Estado actual
- ✅ Home.
- ✅ Menú.
- ✅ Cuenta Digital.
- ✅ División Inteligente de Cuenta.
- ✅ Pago simulado.
- ✅ Propina.
- ✅ Feedback.
- ✅ RF-006 aprobado y congelado para V1.
- RF-005 implementado, validado y congelado para V1.

## Próximo objetivo
Consolidar la experiencia QR del comensal como alcance principal de la V1.

## Sprint activo
- Flujo QR del comensal.
- RF-005 aprobado y congelado para V1.
- RF-006 aprobado y congelado para V1.
- RF-007 aprobado y congelado para V1.
- RF-008 aprobado y congelado para V1.
- RF-009 Panel Restaurante queda pausado para V2. La implementación existente se conserva como base futura.
- UX Pass V1 priorizado y reservado para antes del Release Candidate.
- Auditoría técnica realizada y arquitectura inicial de RF-009 documentada.

## Decisiones importantes
- Web app responsive/PWA.
- Una única plataforma configurable para muchos restaurantes.
- V1 enfocada en cuenta, división, pago y feedback.
- Modelo comercial acompañado, no puramente self-service.
- Codex no decide funcionalidades.
- Home V2 aprobada visualmente como primera versión usable.
- Menú Digital V1 implementado, validado y congelado.
- Cuenta Digital V1 implementada, validada y congelada.

## Qué no debe hacerse todavía
- Implementar funcionalidades no aprobadas.
- Crear backend, autenticación, pagos o base de datos sin aprobación.
- Modificar RF-003 salvo por errores o problemas críticos de usabilidad.
- Modificar RF-004 salvo por errores o mejoras críticas de usabilidad.
- Modificar RF-005 después de su congelamiento salvo errores o mejoras críticas de usabilidad.
- Modificar RF-006 después de su congelamiento salvo errores o mejoras críticas de usabilidad.
- Modificar RF-007 después de su congelamiento salvo errores o mejoras críticas de usabilidad.
- Modificar RF-008 después de su congelamiento salvo errores o mejoras críticas de usabilidad.
- Implementar mejoras del UX Pass antes de completar los módulos funcionales de V1.

## Archivos principales
- `PROJECT_BLUEPRINT.md`: referencia principal y obligatoria para cualquier desarrollo futuro.
- `PRODUCT_BIBLE.md`: fundamentos y alcance.
- `AGENTS.md`: rol y reglas.
- `ROADMAP.md`: evolución prevista.
- `DECISIONS.md`: decisiones aprobadas.
- `PRODUCT_DECISIONS.md`: decisiones funcionales aprobadas.
- `EPICS.md`: estado de las épicas.
- `CHANGELOG.md`: cambios relevantes del proyecto.
- `IDEAS.md`: ideas futuras, no requerimientos.

## Regla de inicio
Antes de cualquier desarrollo, leer primero `PROJECT_BLUEPRINT.md`. Luego leer este archivo, `AGENTS.md` y las fuentes específicas del módulo.
