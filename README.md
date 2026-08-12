# APP Restoran - Menu QR cliente

Menu QR mobile-first para clientes de TIFO Restaurant OS, adaptado actualmente a **Alma de Pueblo**.

El cliente escanea el QR de una mesa, ve el menu, consulta su consumo cuando el mozo lo habilita, divide cuenta, avanza al flujo de pago web demo y deja feedback.

## Demo integrada en nube

Para la demo cliente, este repo debe apuntar al backend publicado en Render:

```env
MENU_API_URL=https://resto-management-backend-86xq.onrender.com/api/v1
MENU_RESTAURANT_SLUG=alma-de-pueblo
```

## Ejecutar local

```powershell
cd "C:\Users\ignad\Documents\ChatGPT\Empresa_TIFO\APP_Restoran"
git checkout main
git pull origin main
npm install
npm run dev
```

Abrir:

```text
http://localhost:3000
```

## Que se debe poder mostrar

- Menu del restaurante.
- Productos disponibles sincronizados con el backend.
- Productos sin stock o no disponibles ocultos del menu.
- Consumo de mesa visible solo cuando el mozo habilita consumo/pago web.
- Flujo QR conectado con app nativa, dashboard y backend.

## Repos relacionados

- App nativa mozo: https://github.com/Ignagalvan/resto_app_nativa
- Dashboard gestion: https://github.com/Ignagalvan/resto-management-frontend
- Backend API: https://github.com/Ignagalvan/resto-management-backend
