// src/components/pages/LoginPage.jsx
import React, { useContext } from 'react';
import LoginForm from '../organisms/LoginForm';
import Logo from '../atoms/Logo';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
 
 
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