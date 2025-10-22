// src/components/organisms/LoginForm.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// No necesitas IconInput si styles.css maneja los iconos
// import IconInput from '../molecules/IconInput';
 
 
export default function LoginForm({ onLogin, onGoogleLogin }) {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [errorGeneral, setErrorGeneral] = useState('');
  const [loading, setLoading] = useState(false);
 
 
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrorGeneral('');
    if (!usuario || !contrasena) {
      setErrorGeneral('Por favor, ingrese usuario y contraseña.');
      return;
    }
    setLoading(true);
    onLogin({ usuario, contrasena })
      .catch((err) => {
        setErrorGeneral(err.message || 'Error al iniciar sesión.');
      })
      .finally(() => {
        setLoading(false);
      });
  };
 
 
  return (
    // Usa el ID o clase del contenedor principal del formulario
    <div id="iniciosesion"> {/* Usa el ID #iniciosesion */}
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <h2 style={{ textAlign: 'center' }}>Iniciar Sesión</h2> {/* Estilo en línea como en tu HTML */}
 
 
        {/* Campo Usuario con icono (estructura del HTML original) */}
        <div className="campo campo-icono">
          <label htmlFor="usuario">Usuario</label>
          <div className="input-icono">
            <span className="icono">👤</span> {/* Ícono como texto o SVG/FontAwesome */}
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </div>
          {/* Aquí podrías poner el <p id="errorUsuario"> si lo necesitas */}
        </div>
 
 
        {/* Campo Contraseña con icono */}
        <div className="campo campo-icono">
          <label htmlFor="contrasena">Contraseña</label>
          <div className="input-icono">
            <span className="icono">🔒</span> {/* Ícono */}
            <input
              type="password"
              id="contrasena"
              name="contrasena"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>
           {/* Aquí podrías poner el <p id="errorContrasena"> si lo necesitas */}
        </div>
 
 
        {/* Muestra el error general si existe */}
        {errorGeneral && <p id="errorGeneral" style={{ color: 'red', textAlign: 'center', marginTop: '8px' }}>{errorGeneral}</p>}
 
 
        {/* Botón Ingresar */}
        <button type="submit" id="btn-iniciarsesion" disabled={loading} className="btn"> {/* Usa clase .btn */}
          {loading ? 'Ingresando...' : 'Ingresar'}
        </button>
 
 
        {/* Mensaje de éxito (si lo necesitas) */}
        {/* <p id="mensaje"></p> */}
      </form>
 
 
      {/* Botón Google (estructura similar al HTML) */}
      <button onClick={onGoogleLogin} disabled={loading} className="btn" style={{ marginTop: '12px', background: 'white', color: '#444', border: '1px solid #dadce0', width: '100%' }}> {/* Estilos aproximados */}
         {/* Aquí iría el logo de Google */} G Iniciar sesión con Google
      </button>
 
 
      {/* Enlace Registro */}
      <p style={{ marginTop: '16px', textAlign: 'center' }}>¿No tienes una cuenta?</p>
      {/* Botón que navega usando Link de React Router */}
      <Link to="/registro" className="btn" style={{ width: '100%', textAlign: 'center', display: 'block' }}> {/* Usa clase .btn y estilos */}
        📝 Registrarse ahora
      </Link>
      {/* O si prefieres un botón que navegue:
      <button type="button" xx={() => navigate('/registro')} className="btn">
        📝 Registrarse ahora
      </button>
      */}
    </div>
  );
}