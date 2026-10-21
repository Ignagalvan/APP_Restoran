# Cuenta compartida · QR

Implementación local en `codex/cuenta-compartida-v1`. Guía canónica: `resto-management-backend/docs/cuenta-compartida-v1.md`.

Las rutas reales de mesa de cuenta, división y pago muestran la cuenta central. Cada persona puede elegir una parte disponible o su consumo, ver pagos y saldo e indicar su medio previsto. No confirma pagos ni solicita transferir de nuevo por una confirmación demorada. Caja verifica lo recibido.

El BFF usa la configuración de backend/restaurante existente. No contiene datos de demostración ni un segundo saldo independiente. Se sincroniza automáticamente; conserva el mismo comando ante una respuesta incierta.

Comprobación acotada 2026-10-21: recorrido real en navegador QR → Caja → saldo parcial/completo → cierre, con base local y pagos sintéticos. El QR refleja consumo compartido y cobros automáticamente. Corrección del cierre: respuestas 404/410 retiran la cuenta anterior; no dejan importes obsoletos junto al aviso.

El bloqueo de arranque se resolvió renombrando el archivo ajeno vacío `k.includes(admin-users))})` a `archivo-local-recuperado.txt`, conservando su contenido y excluyéndolo de la entrega. Evidencia en `artifacts/cuenta-compartida-v1/`, también excluida. Queda aceptación móvil física y de las otras formas de reparto; ver guía canónica. Backend/migración primero; sin despliegue en esta tarea.
