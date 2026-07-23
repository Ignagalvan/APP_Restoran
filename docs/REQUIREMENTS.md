# Requerimientos — Restaurant OS V1

## Estado

Alcance V1 cerrado para implementación incremental.

## Alcance

La V1 cubre la experiencia del comensal desde el QR de mesa e incluye Home, Menú Digital, Cuenta Digital, División Inteligente de Cuenta, flujo de pago simulado, propina y feedback. También incluye un panel básico para el restaurante y configuración básica mediante datos mockeados.

No forman parte de la V1 las integraciones reales, backend, base de datos, Mercado Pago real, autenticación real, facturación, reservas, lista de espera, IA ni automatizaciones avanzadas.

## Actores

- Comensal.
- Mozo.
- Dueño o administrador del restaurante.
- Empresa proveedora de Restaurant OS.

## Alcance cerrado V1

Esta sección consolida el alcance funcional en diez módulos oficiales. Reemplaza la descomposición granular anterior para evitar identificadores duplicados durante la implementación.

| RF | Módulo | Estado V1 |
|---|---|---|
| RF-001 | QR de mesa | Aprobado |
| RF-002 | Home del comensal | Implementado, validado y congelado |
| RF-003 | Menú Digital | Implementado, validado y congelado |
| RF-004 | Cuenta Digital | Implementado, validado y congelado |
| RF-005 | División Inteligente de Cuenta | Implementado, validado y congelado |
| RF-006 | Pago simulado / flujo de pago | Implementado, validado y congelado |
| RF-007 | Propina | Implementado, validado y congelado |
| RF-008 | Feedback | Implementado, validado y congelado |
| RF-009 | Panel básico del restaurante | Pausado para V2 |
| RF-010 | Configuración básica | Pendiente de diseño e implementación |

## Requerimientos funcionales

### RF-001 — QR de mesa

**Actor principal:** Comensal.  
**Objetivo:** Acceder a la experiencia web correspondiente a una mesa física sin instalar una aplicación.  
**Alcance V1:** El QR identifica la mesa y abre la experiencia de Restaurant OS. El comportamiento sin sesión activa continúa pendiente de definición.  
**Estado:** Aprobado.

### RF-002 — Home del comensal

**Actor principal:** Comensal.  
**Objetivo:** Ofrecer un punto de entrada permanente, inmediato y comprensible para la experiencia de mesa.  
**Implementación V1:** Identidad del restaurante, mesa, bienvenida y hasta tres acciones principales, con **Ver Menú** como acción principal y sin login ni registro.  
**Estado:** Implementado, validado y congelado para V1.

### RF-003 — Menú Digital

**Actor principal:** Comensal.  
**Objetivo:** Consultar una carta digital premium dentro del restaurante.  
**Implementación V1:** Categorías, productos mock, fotografías, precios, etiquetas, descripciones, scroll sincronizado y Bottom Sheet con detalle del plato.  
**Estado:** Implementado, validado y congelado para V1.

### RF-004 — Cuenta Digital

**Actor principal:** Comensal.  
**Objetivo:** Revisar de forma clara el estado económico de la mesa antes de dividir o pagar.  
**Implementación V1:** Navegación desde Home, listado de productos, cantidades, precios, subtotales, total, productos interactivos, Bottom Sheet reutilizado, actualización simulada, estado **Cuenta abierta** y cuenta vacía.  
**Estado:** Implementado, validado y congelado para V1.

El módulo solo admite correcciones de errores o mejoras críticas de usabilidad.

### RF-005 — División Inteligente de Cuenta

**Objetivo:** Permitir que el comensal defina qué parte del consumo desea pagar antes de continuar al flujo de pago.

**Actor principal:** Comensal.

**Flujo esperado:**

1. Acceder desde **Dividir cuenta** en la Cuenta Digital.
2. Elegir una modalidad aprobada: selección de productos o división en partes iguales.
3. Definir la selección o cantidad de partes sobre la cuenta mock.
4. Revisar el importe resultante.
5. Continuar al pago simulado o volver sin confirmar.

**Datos mock necesarios:**

- Mesa y cuenta actual.
- Productos, cantidades y precios.
- Total disponible para dividir.
- Selección local de productos o cantidad de partes.
- Importe resultante de la división.

**Estado inicial:** Cuenta abierta con consumo, sin productos ni partes asignadas.

**No se implementa todavía:**

- Concurrencia entre comensales.
- Bloqueo o reserva real de productos.
- Persistencia de divisiones.
- Pagos parciales reales.
- Sincronización con backend o sistema gastronómico.

**Estado:** Implementado, validado y congelado para V1.

El módulo solo admite correcciones de errores o mejoras críticas de usabilidad.

### RF-006 — Pago simulado / flujo de pago

**Objetivo:** Validar la experiencia completa de revisión y confirmación de un pago sin procesar dinero real.

**Actor principal:** Comensal.

**Flujo esperado:**

1. Recibir el importe completo o el resultado de RF-005.
2. Revisar el resumen del pago.
3. Elegir un método de pago mock habilitado.
4. Confirmar el pago simulado.
5. Mostrar un resultado simulado claro.

**Datos mock necesarios:**

- Restaurante y mesa.
- Conceptos incluidos e importe a pagar.
- Método de pago simulado.
- Estado simulado de confirmación.
- Identificador mock de operación.

**Estado inicial:** Resumen pendiente de confirmación, sin método seleccionado y sin pago procesado.

**No se implementa todavía:**

- Mercado Pago real u otra pasarela.
- Captura, transferencia o almacenamiento de dinero.
- Tarjetas o credenciales reales.
- Webhooks, conciliación, reembolsos o reintentos reales.
- Facturación.

**Implementación V1:** Ruta `/payment`, contrato en memoria desde RF-005, resumen, Mercado Pago, Tarjeta y Efectivo mock, elección explícita de propina entre 0%, 5%, 10% y 15%, prevención de doble confirmación, procesamiento y resultado simulados, estado sin contrato y salida preparada hacia Feedback.

**Estado:** Implementado, validado y congelado para V1.

El módulo solo admite correcciones de errores o mejoras críticas de usabilidad.

### RF-007 — Propina

**Objetivo:** Permitir que el comensal defina una propina dentro del flujo de pago simulado.

**Actor principal:** Comensal.

**Flujo esperado:**

1. Acceder a la elección de propina antes de confirmar el pago.
2. Elegir una opción mock aprobada o continuar sin propina.
3. Revisar el importe de propina y el total resultante.
4. Continuar al pago simulado.

**Datos mock necesarios:**

- Importe base a pagar.
- Opciones de propina que se aprueben durante el diseño del módulo.
- Opción seleccionada.
- Importe final simulado.

**Estado inicial:** Sin propina seleccionada.

**No se implementa todavía:**

- Cobro real de propina.
- Distribución entre empleados.
- Reglas fiscales o contables.
- Configuración persistente de porcentajes.

**Implementación V1:** Selección explícita dentro de `/payment`, opciones sin propina, 5%, 10% y 15%, importes derivados en ARS entero, actualización inmediata del total, contrato tipado y bloqueo durante procesamiento.

**Estado:** Implementado, validado y congelado para V1.

El módulo solo admite correcciones de errores o mejoras críticas de usabilidad.

### RF-008 — Feedback

**Objetivo:** Permitir que el comensal deje una valoración breve sobre su experiencia.

**Actor principal:** Comensal.

**Flujo esperado:**

1. Acceder desde **Mi Experiencia** o al finalizar el pago simulado.
2. Elegir una valoración mock.
3. Agregar un comentario opcional.
4. Confirmar el envío simulado.
5. Mostrar una confirmación clara.

**Datos mock necesarios:**

- Mesa y restaurante.
- Valoración seleccionada.
- Comentario opcional.
- Estado local de envío.

**Estado inicial:** Formulario sin valoración ni comentario.

**No se implementa todavía:**

- Envío o almacenamiento real.
- Google Reviews.
- Clasificación automática de feedback.
- Notificaciones o respuestas del restaurante.
- Datos personales del comensal.

**Implementación V1:** Ruta `/feedback`, entrada desde Home y desde pago simulado, contexto reducido en memoria, calificación de 1 a 5 estrellas, comentario opcional, envío simulado, éxito, error recuperable, omisión y estado sin contexto.

**Estado:** Implementado, validado y congelado para V1.

El módulo solo admite correcciones de errores o mejoras críticas de usabilidad.

**Idea futura / V2:** Si el feedback es positivo, ofrecer la opción de dejar una reseña en Google Maps / Google Reviews. No se implementa en V1.

### RF-009 — Panel básico del restaurante

**Objetivo:** Validar una vista operativa básica para el dueño o administrador utilizando información simulada.

**Actor principal:** Dueño o administrador del restaurante.

**Flujo esperado:**

1. Acceder directamente al panel prototipo.
2. Consultar un resumen mock de mesas, feedback y estadísticas básicas.
3. Navegar únicamente entre las secciones básicas aprobadas.

**Datos mock necesarios:**

- Restaurante.
- Mesas y estados simulados.
- Feedback simulado.
- Métricas básicas simuladas, que deberán definirse durante el diseño.

**Estado inicial:** Panel con datos mock precargados.

**No se implementa todavía:**

- Autenticación o permisos reales.
- Operación en tiempo real.
- Reportes avanzados.
- Exportaciones, alertas o integraciones externas.
- Persistencia de cambios.

**Estado:** Pausado para V2. La implementación existente se conserva como base futura y no debe eliminarse.

### RF-010 — Configuración básica

**Objetivo:** Validar cómo el restaurante configura los módulos básicos de la V1 sin persistencia real.

**Actor principal:** Dueño o administrador del restaurante.

**Flujo esperado:**

1. Acceder desde el Panel básico.
2. Consultar la configuración mock del restaurante.
3. Modificar localmente la disponibilidad de módulos y datos básicos aprobados de menú o mesas.
4. Confirmar una simulación de guardado.

**Datos mock necesarios:**

- Módulos disponibles y estado activo o inactivo.
- Menú mock configurable.
- Mesas mock configurables.
- Estado local de cambios y guardado simulado.

**Estado inicial:** Configuración mock precargada para Lumbre.

**No se implementa todavía:**

- Persistencia real.
- Gestión de usuarios o permisos.
- Generación real de QR.
- Integración con sistemas gastronómicos.
- Configuración comercial, facturación o suscripciones.

**Estado:** Pendiente de diseño e implementación.

## Requerimientos no funcionales

### RNF-001 — Mobile First

La experiencia del comensal debe diseñarse primero para dispositivos móviles, con zonas táctiles cómodas y uso con una mano.

### RNF-002 — Velocidad percibida

La Home debe aspirar a estar interactiva en menos de un segundo. Todos los módulos deben evitar bloqueos y esperas innecesarias.

### RNF-003 — Sin registro obligatorio

Las funciones básicas del comensal no requieren login ni registro.

### RNF-004 — Accesibilidad y legibilidad

La interfaz debe ofrecer contraste adecuado, tipografía legible, controles grandes, navegación intuitiva y soporte para preferencias de movimiento reducido.

### RNF-005 — Interfaz autoexplicativa

Cada pantalla debe tener un objetivo claro y acciones comprensibles sin instrucciones previas.

### RNF-006 — Plataforma modular

La solución debe mantener una única base configurable, sin versiones independientes por restaurante.

### RNF-007 — Performance, estabilidad y mantenibilidad

La implementación debe utilizar componentes reutilizables, mantener tiempos de respuesta percibidos bajos y superar las validaciones definidas para cada módulo.

### RNF-008 — Seguridad de pagos

La seguridad para pagos reales queda pendiente de definición técnica. La V1 solo implementará un flujo simulado sin datos financieros reales.

## Reglas de negocio

- El QR representa una mesa física.
- El mozo abre la sesión activa de la mesa.
- La Home siempre existe y su acción principal es **Ver Menú**.
- La Home muestra como máximo tres acciones principales.
- La Home no requiere login ni registro.
- El restaurante puede activar o desactivar módulos.
- La empresa mantiene una única plataforma configurable.
- La tecnología potencia al mozo; no busca reemplazarlo.
- Todos los módulos pendientes utilizan datos mock locales durante esta etapa.

## Plan de implementación V1

1. División de Cuenta.
2. Pago simulado.
3. Propina.
4. Feedback.
5. Panel Restaurante básico.
6. Configuración básica.
7. Revisión general.
8. Auditoría con `npm run lint`, `npm run build` y React Doctor si está disponible.

No se comienza un módulo nuevo hasta cerrar la validación y documentación del módulo anterior.

## Validación por módulo

Cada módulo debe completar:

- `npm run lint`.
- `npm run build`.
- Revisión visual.
- Revisión funcional.
- Actualización documental.
- Congelado para V1.

## React Doctor

El proyecto es compatible con React Doctor porque utiliza React 19, Next.js y TypeScript. La herramienta no está instalada actualmente como dependencia local.

Comando sugerido para una auditoría puntual, sujeto a aprobación antes de descargar o ejecutar la herramienta:

```bash
npx react-doctor@latest --no-telemetry
```

La primera ejecución requiere acceso a internet y descarga temporal mediante `npx`. No se instaló ni ejecutó durante esta revisión.

## Preguntas abiertas

- ¿Qué ve el comensal si escanea el QR sin una sesión activa?
- ¿Cómo se resolverá la concurrencia entre comensales en una versión conectada?
- ¿Qué métricas básicas mostrará el Panel del restaurante?
- ¿Qué módulos y datos podrán modificarse desde Configuración básica?
- ¿Qué condiciones técnicas se usarán para validar performance y accesibilidad?
