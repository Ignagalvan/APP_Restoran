# Promociones · carta QR

2026-10-12. Rama codex/menu-promociones; entrega por PR coordinado, no producción implícita.

La carta consume precio efectivo, precio habitual y nombre de promoción de la API central. Los muestra en tarjeta y detalle: final, habitual tachado y nombre/No acumulable/Extras aparte. Conserva disponibilidad y opciones; no decide descuentos por su cuenta ni agrega un checkout nuevo. Una promoción activa sólo aparece dentro de su vigencia; no hay selector de canal u ocultamiento del QR.

**Pendiente aprobado:** apartado «Promociones» que reúna ofertas vigentes/productos disponibles y conserve la oferta en su categoría. No implementado en este PR; reutilizar API/motor actuales, sin precios paralelos ni agotados reactivados.

Build/typecheck/lint locales aprobados. Vista previa del QR con el cálculo real de un 20% (34.000 → 27.200), sólo en memoria, sin promociones guardadas ni cambios de datos comerciales. No equivale a aceptación productiva de guardado/pedido. Archivos generados, arneses, capturas y otros cambios locales quedan excluidos.

Desplegar después de migración/backend compatibles; verificar API/slug del entorno destino y oferta guardada, precio habitual/final, pausa/vencimiento y disponibilidad. Revertir consumidor conservando snapshots/migración, coordinado con pausa de reglas. Guía común con Operaciones/Mesas: [entrega y pendientes](https://github.com/Ignagalvan/resto-management-frontend/blob/codex/menu-promociones/docs/entrega-y-pendientes.md).
