// src/components/pages/LoginPage.jsx
import React from 'react';
import LoginForm from '../organisms/LoginForm'; // Asumiendo que ya creaste LoginForm.jsx
import Logo from '../atoms/Logo';
// import { useAuth } from '../../context/AuthContext'; // Para la lógica de autenticación
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  // const { login, loginWithGoogle } = useAuth(); // Ejemplo
  const navigate = useNavigate();

  // Función placeholder para manejar el login
  const handleLogin = async ({ usuario, contrasena }) => {
    console.log("Login attempt:", usuario);
    // Simulación: Redirige a la home después de 1 segundo
    return new Promise(resolve => setTimeout(() => {
        navigate('/'); // Redirige a la página principal
        resolve();
    }, 1000));
    // try {
    //   await login(usuario, contrasena);
    //   navigate('/'); // Redirige al home si es exitoso
    // } catch (error) {
    //   console.error("Login failed:", error);
    //   throw error; // Lanza el error para que LoginForm lo muestre
    // }
  };

  // Función placeholder para Google Login
  const handleGoogleLogin = () => {
    console.log("Google Login attempt");
    // loginWithGoogle().then(() => navigate('/'));
  };

  return (
    // Layout simple centrado
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-lime-100 px-4 py-12">
      <div className="mb-8">
        <Logo className="h-16 sm:h-20" /> {/* Logo un poco más grande */}
      </div>
      <LoginForm onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} />
      <footer className="mt-8 text-center text-sm text-gray-500">
         &copy; {new Date().getFullYear()} Huerto Hogar.
       </footer>
    </div>
  );
}