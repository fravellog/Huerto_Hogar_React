import React, { useState } from 'react'; // Necesitas importar useState
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import IconInput from '../molecules/IconInput';
import Title from '../atoms/Title';
import { Link } from 'react-router-dom'; // Para el enlace de registro

// Recibe la función de login como prop
export default function LoginForm({ onLogin, onGoogleLogin }) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errorGeneral, setErrorGeneral] = useState('');
  const [loading, setLoading] = useState(false); // Para mostrar estado de carga

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorGeneral(''); // Limpia errores
    // Validación simple (puedes mejorarla)
    if (!usuario || !contrasena) {
      setErrorGeneral('Por favor, ingrese usuario y contraseña.');
      return;
    }
    setLoading(true);
    // Llama a la función de login pasada por props
    // Esta función debería manejar la lógica de autenticación y errores
    onLogin({ usuario, contrasena })
      .catch((err) => {
        setErrorGeneral(err.message || 'Error al iniciar sesión.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    // Replicando #iniciosesion con Tailwind
    <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 m-4 max-w-sm w-full mx-auto">
      <form onSubmit={handleSubmit} noValidate>
        <Title level="h2" className="text-center mb-6">Iniciar Sesión</Title>

        <IconInput
          id="usuario"
          label="Usuario"
          icon="👤" // O usa un icono SVG/FontAwesome
          type="text"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="Tu nombre de usuario"
          required
        />

        <IconInput
          id="contrasena"
          label="Contraseña"
          icon="🔒" // O usa un icono SVG/FontAwesome
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          placeholder="Tu contraseña"
          required
        />

        {errorGeneral && <p className="text-red-500 text-sm mt-2 mb-3 text-center">{errorGeneral}</p>}

        <Button type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? 'Ingresando...' : 'Ingresar'}
        </Button>
      </form>

      {/* Separador */}
      <div className="my-6 flex items-center justify-center">
        <span className="border-t border-gray-300 flex-grow"></span>
        <span className="px-3 text-gray-500 text-sm">O</span>
        <span className="border-t border-gray-300 flex-grow"></span>
      </div>

      {/* Botón de Google (requiere setup específico) */}
      {/* <div id="googleButton" className="flex justify-center"> */}
      <Button onClick={onGoogleLogin} className="w-full bg-blue-500 hover:bg-blue-600" disabled={loading}>
          Ingresar con Google
      </Button>
      {/* </div> */}


      <p className="mt-6 text-center text-sm text-gray-600">
        ¿No tienes una cuenta?{' '}
        <Link to="/registro" className="font-medium text-green-600 hover:text-green-500">
          Regístrate ahora
        </Link>
      </p>
    </div>
  );
}