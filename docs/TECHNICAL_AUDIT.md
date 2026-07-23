# Auditoría técnica

## Alcance

Revisión estática de la aplicación actual. No se modificó código ni se auditó comportamiento visual en navegador. Las propuestas no autorizan cambios sobre módulos congelados.

## Diagnóstico

La base es pequeña, legible y correctamente separada por módulo. Los datos mock están fuera de la presentación, los componentes interactivos delimitan el uso de cliente y la lógica crítica de RF-005 está concentrada en `split-data.ts`. No se detectaron duplicados completos que justifiquen una refactorización inmediata.

## Propuestas priorizadas

### P1 — Antes de ampliar el producto

1. **Unificar el contexto mock del restaurante.** Nombre, mesa y estado aparecen en fuentes diferentes (`guest-home`, menú y cuenta). Crear en el futuro una única fuente tipada para evitar inconsistencias entre módulos.
2. **Desacoplar datos de los componentes de experiencia.** `AccountExperience` y `SplitExperience` importan mocks globales directamente. Recibir datos por propiedades o mediante una capa mock de acceso facilitará estados vacíos, QA y el futuro reemplazo por integraciones.
3. **Extraer formatos neutrales del dominio.** `formatCurrency` vive en `account-data.ts`, aunque lo usan cuenta, división y futuros pagos/panel. Debe migrar a una utilidad compartida de formato sin cambiar su resultado.
4. **Definir modelos canónicos.** Menú y cuenta representan el mismo producto con tipos distintos y el precio cambia de `string` a `number`. Mantener modelos de vista separados es válido, pero hace falta una identidad o adaptador común para evitar búsquedas manuales y fallos al abrir detalles.

### P2 — Al iniciar RF-009

1. **Crear primitivas de layout compartidas.** Cuenta y división repiten contenedor, glows, encabezado, botón volver y badge de mesa. No conviene tocar módulos congelados ahora; el panel debe introducir primitivas nuevas solo si pueden adoptarse gradualmente y sin alterar resultados.
2. **Separar estilos por responsabilidad.** `globals.css` concentra tokens y estilos de todos los módulos. Mantener allí tokens y reglas globales, y acercar los estilos específicos a cada módulo cuando el crecimiento haga difícil localizar cambios.
3. **Formalizar estados reutilizables.** Los estados vacíos de cuenta y división repiten estructura visual. Diseñar una primitiva `EmptyState` configurable para panel, feedback y configuración, sin reemplazar todavía los estados congelados.
4. **Crear primitivas de estado.** El punto de estado, badges y mensajes de disponibilidad se repiten de forma implícita. Un `StatusBadge` con variantes semánticas reduciría inconsistencias en mesas, cuentas y feedback.
5. **Establecer contratos de datos mock por módulo.** Para el panel, usar funciones de lectura o repositorios mock tipados en vez de importar arrays globales desde la UI. Esto preserva la frontera necesaria para un backend futuro.

### P3 — Calidad evolutiva

1. Añadir pruebas unitarias a cálculos y contratos de división/pago cuando esa etapa sea autorizada.
2. Añadir pruebas de interacción para tabs, Bottom Sheet, foco, teclado y estados deshabilitados.
3. Revisar que todos los botones reutilizables comuniquen `disabled` también visualmente; la variante base no define ese estado de forma central.
4. Revisar imágenes mock repetidas: varios productos comparten una fotografía por categoría, aceptable para V1 pero débil para una validación gastronómica final.
5. Ejecutar React Doctor únicamente cuando sea autorizado, además de lint, build, revisión visual y funcional.

## Reutilización detectada

- `Button` y `cn` son primitivas adecuadas para extender sin dependencias nuevas.
- `MenuBottomSheet` ya demuestra reutilización entre Menú y Cuenta; antes de usarlo fuera de platos debería extraerse una primitiva genérica de Sheet y conservar el detalle gastronómico como composición.
- `formatCurrency`, modelos de restaurante/mesa y estados visuales tienen valor transversal inmediato.
- Las cards comparten lenguaje visual, pero no una estructura idéntica: conviene compartir tokens o una primitiva flexible, no forzar un único componente universal.
- El patrón de tabs accesibles de RF-005 puede adaptarse a filtros o vistas compactas; no debe convertirse en navegación principal del panel.

## Deuda y riesgos

- **Media:** datos duplicados del restaurante y mesa pueden divergir.
- **Media:** acoplamiento directo de componentes a mocks dificulta probar estados y migrar a datos reales.
- **Media:** crecimiento de `globals.css` aumenta riesgo de regresiones visuales cruzadas.
- **Baja:** búsqueda de detalles de cuenta mediante IDs del menú presupone correspondencia total entre dos fuentes.
- **Baja:** ausencia de pruebas automatizadas deja cálculos y accesibilidad protegidos solo por revisión manual, lint y tipos.
- **Baja:** algunas líneas JSX y datos mock muy extensos reducen legibilidad, aunque no afectan ejecución.

## Refactorizaciones que no conviene hacer ahora

- No reemplazar componentes de RF-002 a RF-005 solo para uniformar estilo.
- No crear un sistema genérico de cards, sheets o estado global antes de tener dos consumidores reales.
- No introducir gestión global de estado, backend, autenticación ni dependencias nuevas para resolver datos mock locales.
- No dividir archivos pequeños por anticipación; la modularidad actual es suficiente para el alcance existente.

