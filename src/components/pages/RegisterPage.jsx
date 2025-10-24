// src/components/pages/RegisterPage.jsx
import React from 'react';
import RegisterForm from '../organisms/RegisterForm';
import Logo from '../atoms/Logo';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  // const { register } = useAuth(); // Ejemplo
  const navigate = useNavigate();

  // Función placeholder para manejar el registro
  const handleRegister = async ({ nombre, correo, contrasena }) => {
    console.log("Register attempt:", nombre, correo);
     // Simulación: Redirige a login después de 1 segundo
     return new Promise(resolve => setTimeout(() => {
        navigate('/login'); // Redirige a la página de login
        resolve();
     }, 1000));
    // try {
    //   await register(nombre, correo, contrasena);
    //   navigate('/login'); // Redirige a login si es exitoso
    // } catch (error) {
    //   console.error("Register failed:", error);
    //   throw error; // Lanza el error para que RegisterForm lo muestre
    // }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f5] px-4 py-12">
      <div className="mb-8">
        <Logo className="logo-huerta" />
      </div>
      <RegisterForm onRegister={handleRegister} />

      <footer className="mt-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Huerta.
      </footer>
    </div>
  );
}