# Restaurant OS

Restaurant OS es una app web mobile-first para restaurantes que quieren mejorar la experiencia QR en mesa: el comensal escanea el QR, ve la carta, consulta su cuenta, divide el consumo, avanza al pago y deja feedback.

El proyecto esta en etapa de **Demo Funcional del Flujo QR -> MVP Tecnico**. No se considera un MVP final todavia.

## Demo actual

La demo esta adaptada visualmente para **Alma de Pueblo** y usa productos reales de su carta como caso comercial.

- Preview Vercel para mostrar avance: https://restaurant-dtczm3vsz-gestionar.vercel.app
- Produccion actual: https://restaurant-os-nine-sepia.vercel.app
- Repositorio: https://github.com/Ignagalvan/APP_Restoran.git

## Que permite probar hoy

- Home del comensal al escanear QR.
- Menu digital por categorias.
- Carta cargada con productos de Alma de Pueblo.
- Cuenta de mesa demo.
- Division de cuenta por partes iguales o por productos.
- Resumen previo al pago.
- Inicio de checkout con Mercado Pago Sandbox.
- Feedback del cliente con redireccion a Google Maps.
- Panel restaurante basico en estado mock.

## Que falta para MVP Tecnico

El proximo objetivo es pasar de demo funcional a MVP tecnico. Para eso falta construir o consolidar:

- Backend minimo.
- Persistencia real de mesas.
- Sesiones reales de mesa.
- Cuenta real por mesa.
- Estado de pagos parciales.
- Integracion Mercado Pago Sandbox validada end-to-end.
- Validacion de pagos por webhook/consulta.
- Division real de cuenta con pagos parciales.
- Feedback persistente.
- Preparacion para integrarse con sistemas POS/restaurante externos.

## Vision de producto

La primera version no busca reemplazar el sistema del restaurante. La idea inicial es conectarse al sistema que ya usa el local:

1. El restaurante mantiene sus mesas y pedidos en su sistema actual.
2. Cada mesa tiene un QR unico.
3. El camarero carga consumos en el sistema del restaurante.
4. Restaurant OS sincroniza o recibe esos consumos.
5. El cliente ve su cuenta actualizada desde el QR.
6. El cliente puede dividir, pagar y dejar feedback.
7. Restaurant OS informa pagos/estado al restaurante.

Mas adelante, el producto puede crecer hacia un sistema propio completo para restaurantes que quieran tener todo integrado.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Vercel
- Mercado Pago SDK
- Persistencia demo en JSON/local repository

## Instalacion local

```bash
git clone https://github.com/Ignagalvan/APP_Restoran.git
cd APP_Restoran
npm install
```

Para trabajar sobre el avance de Alma de Pueblo:

```bash
git checkout codex/alma-de-pueblo
```

Crear un archivo `.env.local` en la raiz del proyecto:

```env
APP_BASE_URL=http://localhost:3000
MERCADO_PAGO_ACCESS_TOKEN=TEST-your-sandbox-access-token
MERCADO_PAGO_PUBLIC_KEY=TEST-your-sandbox-public-key
```

Tambien existe `.env.example` como referencia.

## Comandos

```bash
npm run dev
npm run lint
npm run build
npm run start
```

Si el puerto 3000 esta ocupado:

```bash
npm run dev -- -p 3001
```

## Rutas utiles

- `/` - Home QR del comensal.
- `/menu` - Menu digital.
- `/menu/[category]` - Categoria del menu.
- `/account` - Cuenta demo.
- `/split` - Division de cuenta.
- `/payment` - Resumen y pago.
- `/feedback` - Feedback del cliente.
- `/admin` - Panel restaurante mock.
- `/api/health` - Health check.
- `/api/tables/[qrCode]` - Mesa por QR demo.
- `/api/sessions/[sessionId]` - Sesion/cuenta demo.

## Flujo recomendado para mostrar

1. Abrir la demo en mobile o con vista responsive.
2. Entrar al home.
3. Revisar menu y categorias.
4. Abrir una categoria, por ejemplo Pastas o Principales.
5. Volver a la cuenta.
6. Probar dividir cuenta.
7. Ir al pago.
8. Elegir Mercado Pago para probar Sandbox.
9. Cerrar con feedback.

## Documentacion interna

La documentacion principal vive en `docs/`:

- `docs/AI_CONTEXT.md`
- `docs/REQUIREMENTS.md`
- `docs/PROJECT_BLUEPRINT.md`
- `docs/EPICS.md`
- `docs/CHANGELOG.md`
- `docs/ROADMAP.md`

## Notas de trabajo

- No subir cambios directo a `main` sin revisar.
- Usar ramas separadas para avances comerciales o tecnicos.
- Para mostrar avances a clientes, usar Preview Deployments de Vercel.
- El panel restaurante esta pausado temporalmente como prioridad funcional; el foco tecnico siguiente esta en backend, datos, Mercado Pago y sesiones reales.
