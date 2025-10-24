# Google Sign-In (desarrollo)

Esta guía rápida explica cómo configurar Google Sign-In para el proyecto `Huerto_Hogar_React` en modo desarrollo.

1) Crear Client ID en Google Cloud Console

- Abre: https://console.cloud.google.com/apis/credentials
- Selecciona o crea un proyecto.
- Si te solicita, configura la "OAuth consent screen" (pantalla de consentimiento): pon un nombre de app (ej.: "Huerto Hogar") y un correo de soporte.
- Elige "Crear credenciales" → "ID de cliente de OAuth" → Tipo: "Aplicación web".
- Nombre (Client name): por ejemplo `HuertoHogar Web Client (Dev)`.
- En "Orígenes de JavaScript autorizados" añade: `http://localhost:5173` (u otro puerto si usas otro).
- Crea y copia el Client ID (termina en `.apps.googleusercontent.com`).

2) Añadir la variable al proyecto

- En la raíz del proyecto hay un archivo de ejemplo: `.env.example`.
- Copia este archivo a `.env` y reemplaza el valor por tu Client ID (o crea `.env` manualmente):

```
VITE_GOOGLE_CLIENT_ID=TU_CLIENT_ID.apps.googleusercontent.com
```

- Reinicia Vite si ya estaba ejecutándose.

3) Probar el flujo

- Ejecuta los comandos en PowerShell:

```powershell
npm install
npm run dev
```

- Abre la app (ej.: http://localhost:5173), ve a la página de login y pulsa el botón de Google. Al completar el flujo la app guardará `isAuthenticated` y `user` en localStorage.

4) Notas y seguridad

- El Client ID no es secreto. En producción debes verificar el `id_token` en tu servidor para confirmar su firma y claims (`aud`, `iss`, `exp`).
- Si quieres, puedo añadir un ejemplo de endpoint en Node/Express para verificar tokens.

---

Archivo creado automáticamente: `.env.example` con formato listo para usar.
