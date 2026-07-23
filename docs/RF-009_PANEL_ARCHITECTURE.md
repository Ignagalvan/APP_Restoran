# RF-009 — Arquitectura inicial del Panel Restaurante

## Estado

Pausado para V2.

La implementación existente del panel se conserva como base futura. No borrar código, rutas, componentes ni documentación asociados a RF-009.

## Objetivo y límites

Validar una vista operativa básica para el dueño o administrador mediante datos mock. El panel consulta información; RF-010 será responsable de la configuración básica.

No incluye autenticación, permisos, tiempo real, persistencia, exportaciones, reportes avanzados, alertas ni integraciones externas.

## Arquitectura propuesta

- Mantener una sola aplicación Next.js y una sola identidad Restaurant OS.
- Alojar el panel en un espacio de rutas propio, separado de la experiencia del comensal, sin crear otra aplicación.
- Usar componentes de servidor para shell y vistas estáticas siempre que sea posible; limitar componentes de cliente a navegación interactiva, filtros o estados locales concretos.
- Separar cuatro capas: rutas, composición de vistas, componentes presentacionales y fuentes mock tipadas.
- Exponer datos mediante funciones mock de lectura por dominio. Las vistas no deben importar ni transformar arrays globales directamente.
- Mantener navegación y layout del panel independientes del shell mobile-first del comensal, reutilizando tokens, tipografía, accesibilidad y primitivas compatibles.
- Mantener dependencias en una sola dirección: rutas → composición → componentes → contratos de lectura. Los componentes no deben conocer la forma física de los mocks.
- Definir modelos de vista propios del panel y adaptadores en la capa de datos. No importar tipos de presentación desde Home, Menú, Cuenta, División o Pago.
- Centralizar el contexto mock del restaurante en la fuente del panel para evitar repetir nombre e identidad en cada módulo.

## Fronteras y estructura técnica

- `app/admin`: rutas, layouts y metadata del panel.
- `components/admin`: composición y componentes exclusivos del panel.
- `lib/admin`: contratos, adaptadores, consultas mock y transformaciones puras.
- `lib/formatters`: formateadores transversales solo cuando puedan extraerse sin modificar módulos congelados.

La estructura expresa ownership, no obliga a crear archivos sin uso. Las rutas reciben datos ya preparados desde consultas mock; la presentación solo decide cómo mostrarlos. RF-009 será de solo lectura y no compartirá estado mutable con RF-010.

## Módulos V1

### Resumen

Punto de entrada con una síntesis de mesas, feedback y estadísticas básicas. Las métricas exactas permanecen pendientes de aprobación.

### Mesas

Consulta de mesas y sus estados simulados. RF-009 no cambia estados ni administra sesiones reales.

### Feedback

Consulta del feedback mock recibido desde RF-008. No permite responder, notificar ni publicar contenido.

### Estadísticas básicas

Presentación de métricas mock aprobadas. No incluye rangos avanzados, comparativas complejas ni exportación.

### Configuración

Acceso a RF-010. RF-009 solo ofrece el punto de navegación y no implementa edición.

## Navegación propuesta

- Ruta base sugerida: `/admin`.
- Entrada inicial: **Resumen**.
- Destinos principales: **Resumen**, **Mesas**, **Feedback** y **Configuración**.
- Las estadísticas básicas forman parte del Resumen en V1 para evitar una sección vacía o sobredimensionada.
- En móvil, navegación compacta y accesible; en pantallas amplias, navegación lateral persistente si la revisión visual la aprueba.
- Cada destino conserva encabezado, identidad del restaurante y ubicación actual. La navegación debe funcionar con teclado y exponer el estado activo semánticamente.

Estructura técnica sugerida:

- `/admin`: Resumen.
- `/admin/tables`: Mesas.
- `/admin/feedback`: Feedback.
- `/admin/settings`: punto de entrada a RF-010, sin edición dentro de RF-009.

Cada ruta debe poder abrirse directamente y conservar un título único. La ubicación activa se deriva de la URL; no se duplica en estado cliente. Si RF-010 adopta luego otra ruta, el destino podrá reemplazarse sin alterar el shell.

## Datos mock y contratos

### Entrada del panel

- Restaurante: identificador y nombre.
- Mesas: identificador visible y estado simulado.
- Feedback: identificador, valoración, comentario opcional y referencia temporal mock.
- Estadísticas: identificador de métrica, etiqueta, valor y contexto opcional.

Los estados de mesa y las métricas permitidas requieren aprobación antes de fijar sus tipos definitivos.

### Contratos de lectura

La capa mock debe exponer consultas por intención, no arrays compartidos:

- obtener contexto del restaurante;
- obtener resumen del panel;
- listar mesas;
- listar feedback.

Cada consulta devuelve estructuras tipadas e inmutables, preparadas para la vista. Los agregados del Resumen se calculan en esta capa y no dentro de las cards. Los contratos deben representar ausencia de datos de manera explícita y distinguirla de un error de lectura.

### Salida

RF-009 no genera cambios operativos. Solo entrega navegación hacia RF-010 y selección local de vistas o filtros aprobados.

No debe escribir sobre los mocks de RF-008 ni usar su estado de formulario. El feedback del panel consume un contrato de lectura independiente, aunque sus datos mock puedan derivarse de una fuente canónica futura.

## Componentes previstos

### Reutilizables existentes o adaptables

- `Button` y utilidad `cn`.
- Tokens visuales, tipografía, foco visible y preferencia de movimiento reducido.
- Lenguaje de cards, estados vacíos y badges, mediante nuevas primitivas componibles cuando tengan consumidores reales.
- Formateadores compartidos para moneda y fechas, después de desacoplarlos de datos de Cuenta.
- Patrones accesibles de navegación y selección existentes, sin reutilizar tabs como navegación principal.

### Nuevos del panel

- `AdminShell`: layout y regiones semánticas.
- `AdminNavigation`: destinos, estado activo y adaptación responsive.
- `AdminHeader`: restaurante, título y contexto de la vista.
- `MetricCard`: métrica básica con variantes limitadas.
- `TableStatusCard` o `TableStatusList`: estado consultivo de mesas.
- `FeedbackPreviewList`: resumen de feedback.
- `StatusBadge`: estados semánticos compartibles.
- `EmptyState`: estado vacío configurable.

Los nombres son técnicos y pueden ajustarse durante la implementación. No constituyen pantallas ni funcionalidades adicionales.

`StatusBadge`, `EmptyState` y cualquier primitiva nueva deben nacer en RF-009 con una API pequeña y semántica. No se migrarán módulos congelados para justificar su abstracción. Las cards del panel compartirán tokens y composición flexible; no se creará una card universal.

## Estados de experiencia

- Datos mock disponibles.
- Sin mesas para mostrar.
- Sin feedback recibido.
- Sin estadísticas aprobadas o disponibles.
- Error mock de lectura, solo si se decide validar ese estado en V1.

Los estados vacíos pertenecen a cada sección: la ausencia de feedback no debe convertir todo el panel en vacío, y la ausencia de una métrica no debe ocultar mesas disponibles. Un error parcial debe quedar aislado en su región siempre que el contrato mock permita representarlo.

No se requiere loading remoto porque los datos son locales. Si se simula espera, debe ser breve, accesible y útil para validar la experiencia, no decorativa.

## Accesibilidad y responsive

- Estructura con landmarks, títulos jerárquicos y navegación identificada.
- Estado activo perceptible sin depender únicamente del color.
- Controles de al menos 44 px en interfaces táctiles.
- Tablas, si fueran necesarias, deben tener alternativa legible en móvil; priorizar listas o cards para pocos datos.
- Contraste alto, foco visible, textos claros y soporte de `prefers-reduced-motion`.
- El panel debe funcionar desde móvil, pero aprovechar progresivamente el ancho disponible en escritorio.
- El orden visual y el orden del DOM deben coincidir; los cambios responsive no deben depender de reordenamientos que alteren la lectura por teclado o lector de pantalla.
- Las métricas deben incluir etiquetas textuales; iconos, color y tendencia visual nunca serán su única explicación.
- Los estados vacíos y errores deben anunciarse mediante texto persistente, sin depender de animaciones o notificaciones temporales.

## Decisiones técnicas automáticas

- Una sola aplicación y un espacio de rutas propio: conserva modularidad sin duplicar infraestructura.
- Estadísticas dentro del Resumen: reduce navegación y respeta el alcance básico.
- Capa mock tipada y consultiva: facilita reemplazo futuro sin introducir backend.
- Componentes de servidor por defecto y client islands: reduce JavaScript y mantiene fronteras claras.
- Sin estado global inicialmente: los datos son locales y no existe edición compartida en RF-009.
- URL como fuente de verdad de la sección activa: permite acceso directo y evita estado duplicado.
- Agregados fuera de la UI: mantiene las cards presentacionales y evita cálculos divergentes.
- Fallos aislados por sección: una fuente mock vacía o inválida no debe inutilizar datos independientes.
- Sin filtros por defecto: no se construyen controles sin una necesidad funcional aprobada.

## Decisiones aplicadas para V1 mock

- Métricas del Resumen: mesas activas, pagos en curso, opiniones recibidas y calificación promedio.
- Estados de mesa simulados: cuenta abierta, pago en curso y cerrada.
- Feedback visible: mesa, calificación, comentario y hora mock.
- Filtros: no se implementan en RF-009.
- Acceso V1: directo a `/admin`, sin autenticación real ni puerta visual.
- Navegación: sidebar persistente en escritorio y navegación horizontal compacta en mobile.

Estas decisiones solo habilitan la validación del panel mock V1. No representan reglas operativas reales.

## Decisiones pendientes de negocio o UX

- Definición real de métricas operativas.
- Catálogo real de estados de mesa.
- Filtros o segmentación futura.
- Autenticación y permisos reales.
- Integración con datos persistidos.

## Riesgos

- Diseñar métricas antes de aprobarlas convertiría decisiones visuales en reglas de negocio implícitas.
- Reutilizar el shell del comensal produciría un panel poco eficiente en escritorio; duplicar identidad y tokens produciría inconsistencias.
- Introducir un estado global anticipado elevaría complejidad sin necesidad actual.
- Acoplar vistas a mocks concretos dificultaría RF-010 y una integración futura.
- Una tabla tradicional puede perjudicar mobile-first y accesibilidad si el conjunto de datos crece.
- Compartir directamente modelos de vista del comensal acoplaría el panel a módulos congelados y volvería frágiles futuras evoluciones.
- Convertir primitivas previstas en un sistema genérico antes de tener consumidores reales agregaría complejidad y APIs innecesarias.
- Mezclar consultas y agregación dentro de componentes cliente aumentaría JavaScript, dificultaría los estados parciales y duplicaría lógica.

## Secuencia técnica de implementación

1. Aprobar las decisiones de negocio y UX pendientes.
2. Fijar contratos mock y modelos de vista del panel.
3. Crear shell, navegación semántica y rutas directas.
4. Implementar Resumen con regiones independientes.
5. Implementar consultas de Mesas y Feedback con sus estados vacíos.
6. Incorporar el acceso sin edición a RF-010.
7. Validar navegación por teclado, responsive, estados parciales, lint y build.

Esta secuencia no autoriza implementar RF-009; solo reduce acoplamiento y ordena su ejecución futura.

## Criterio de preparación

La arquitectura queda habilitada para implementación mock V1 por aprobación del Sprint 8. Las fronteras, rutas propuestas y reglas de dependencia se mantienen como guía técnica. El módulo no queda congelado hasta completar validación, revisión visual y cierre documental.
