// src/components/pages/RegisterPage.jsx
import React from 'react';
// import RegisterForm from '../organisms/RegisterForm'; // Crearías este componente
import Logo from '../atoms/Logo';
// import { useAuth } from '../../context/AuthContext'; // Para la lógica de registro
import { useNavigate } from 'react-router-dom';
import Title from '../atoms/Title'; // Podríamos reutilizar el Title

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
     // Layout similar a Login
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-lime-100 px-4 py-12">
      <div className="mb-8">
        <Logo className="h-16 sm:h-20" />
      </div>
      {/* Placeholder mientras creas RegisterForm.jsx */}
       <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 m-4 max-w-sm w-full mx-auto">
         <Title level="h2" className="text-center mb-6">Registro</Title>
         <p className="text-gray-600 text-center">Formulario de registro próximamente...</p>
         {/* Aquí iría <RegisterForm onRegister={handleRegister} /> */}
       </div>
      <footer className="mt-8 text-center text-sm text-gray-500">
         &copy; {new Date().getFullYear()} Huerto Hogar.
       </footer>
    </div>
  );
}