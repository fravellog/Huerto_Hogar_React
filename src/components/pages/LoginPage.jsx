// src/components/pages/LoginPage.jsx
import React from 'react';
import LoginForm from '../organisms/LoginForm';
import Logo from '../atoms/Logo';
import { useNavigate } from 'react-router-dom';
 
 
export default function LoginPage() {
  const navigate = useNavigate();
 
 
  const handleLogin = async ({ usuario, contrasena }) => {
    console.log("Login attempt:", usuario);

    if (usuario === "admin" && contrasena === "1234") {
      console.log("Admin login successful");
      navigate('/');
      return Promise.resolve();

    } else {
      console.log("Login failed");
      return Promise.reject(new Error("Usuario o contraseña incorrectos"));
    }
    // Lógica real de login...
    // Si es exitoso:
    // navigate('/');
    return Promise.reject(new Error("Usuario o contraseña incorrectos")); // Simula error por ahora
  };
 
 
  const handleGoogleLogin = () => {
    console.log("Google Login attempt");
     navigate('/HomePage'); // Navega a HomePage tras login con Google
  };
 
 
  return (
    // Contenedor principal que centra todo (similar a como lo haría tu CSS)
    // Puedes añadir clases Tailwind si las necesitas para centrar si no usas styles.css
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-10"> {/* Ejemplo Tailwind */}
      {/* Usa el átomo Logo con la clase/id del CSS original */}
      <Logo className="logo-huerta" /> {/* Pasa la clase/id #logo-huerta */}
 
 
      {/* Renderiza el formulario */}
      <LoginForm onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} />
 
 
      {/* Footer simple */}
       <footer className="mt-8 text-center text-sm text-gray-500">
         &copy; {new Date().getFullYear()} La Huerta.
       </footer>
    </div>
  );
}