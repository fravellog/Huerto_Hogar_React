// src/components/pages/LoginPage.jsx
import React, { useContext, useEffect } from 'react';
import LoginForm from '../organisms/LoginForm';
import Logo from '../atoms/Logo';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
 
 
export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
 
 

  const handleLogin = async ({ correo, contrasena }) => {
    // Buscar usuario registrado en localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuariosRegistrados') || '[]');
    const userFound = usuarios.find(u =>
      u.correo === correo && u.contrasena === contrasena
    );
    if (userFound) {
      login(userFound); // Pasa el objeto completo (nombre, correo, etc.)
      navigate('/');
      return Promise.resolve();
    } else {
      return Promise.reject(new Error("Correo o contraseña incorrectos"));
    }
  };
 
 
  // Decodifica un JWT (id_token) sin dependencia externa
  const decodeJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('decodeJwt error', e);
      return null;
    }
  };

  // Callback que llama Google Identity Services cuando hay credencial
  const handleCredentialResponse = (response) => {
    if (!response || !response.credential) {
      console.error('No credential in Google response', response);
      return;
    }
    const payload = decodeJwt(response.credential);
    if (!payload) {
      console.error('No payload decoded from id_token');
      return;
    }
    // Construir objeto de usuario simple compatible con AuthContext.login
    const user = {
      nombre: payload.name || payload.given_name || '',
      correo: payload.email,
      avatar: payload.picture,
      sub: payload.sub,
    };
    login(user);
    navigate('/');
  };

  // Cuando el usuario pulsa el botón del formulario: activamos el prompt de GSI (si está cargado)
  const handleGoogleLogin = () => {
    if (window.google && window.google.accounts && window.google.accounts.id) {
      // Muestra el flujo de selección / One Tap según configuración
      window.google.accounts.id.prompt();
    } else {
      console.warn('Google Identity Services no cargado todavía');
    }
  };

  // Cargar y configurar la librería GSI al montar el componente
  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.warn('VITE_GOOGLE_CLIENT_ID no configurado. Añade la variable en .env para habilitar Google Sign-In.');
      return;
    }

    const scriptId = 'google-identity-script';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.id = scriptId;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.google && window.google.accounts && window.google.accounts.id) {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: handleCredentialResponse,
          });
            // Renderiza el botón oficial dentro del contenedor si existe.
            // Usamos requestAnimationFrame para asegurarnos de que el contenedor
            // esté presente en el DOM (está dentro del componente hijo LoginForm).
            requestAnimationFrame(() => {
              const container = document.getElementById('google-signin-button');
              if (container) {
                window.google.accounts.id.renderButton(container, { theme: 'outline', size: 'large', width: '100%' });
              }
            });
        }
      };
      document.head.appendChild(script);
    } else {
      // Si ya está cargado, inicializamos/renderizamos de nuevo
      if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: handleCredentialResponse,
        });
          // Igual que arriba: asegurar render cuando el DOM esté listo
          requestAnimationFrame(() => {
            const container = document.getElementById('google-signin-button');
            if (container) {
              window.google.accounts.id.renderButton(container, { theme: 'outline', size: 'large', width: '100%' });
            }
          });
      }
    }

    // Cleanup no estrictamente necesario, dejar script para reutilizar
    return () => {};
  }, []);
 
 
  return (
    // Contenedor principal que centra todo (similar a como lo haría tu CSS)
    // Puedes añadir clases Tailwind si las necesitas para centrar si no usas styles.css
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10"> {/* Ejemplo Tailwind */}
      {/* Usa el átomo Logo con la clase/id del CSS original */}
      <Logo className="logo-huerta" /> {/* Pasa la clase/id #logo-huerta */}
 
 
      {/* Renderiza el formulario */}
    {/* Pasa handleGoogleLogin para el botón personalizado del formulario. También mostramos
      un contenedor donde la biblioteca GSI puede renderizar el botón oficial. */}
  <LoginForm onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} />
 
 
      {/* Footer simple */}
       <footer className="mt-8 text-center text-sm text-gray-500">
         &copy; {new Date().getFullYear()} La Huerta.
       </footer>
    </div>
  );
}