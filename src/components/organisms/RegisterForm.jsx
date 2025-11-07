import React, { useState } from 'react';
import Title from '../atoms/Title';
import { Link } from 'react-router-dom';


export default function RegisterForm({ onRegister = () => Promise.resolve() }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [error, setError] = useState('');
  const [correoRegistrado, setCorreoRegistrado] = useState(false);
  const [loading, setLoading] = useState(false);


  // Validar correo en tiempo real
  const handleCorreoChange = (e) => {
    const value = e.target.value;
    setCorreo(value);
    setError("");
    if (value) {
      const usuarios = JSON.parse(localStorage.getItem('usuariosRegistrados') || '[]');
      if (usuarios.some(u => u.correo.trim().toLowerCase() === value.trim().toLowerCase())) {
        setCorreoRegistrado(true);
        setError('Este correo ya está registrado');
      } else {
        setCorreoRegistrado(false);
        setError(""); // Limpia el error si el correo es nuevo
      }
    } else {
      setCorreoRegistrado(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!nombre || !correo || !contrasena || !confirmar) {
      setError('Por favor, completa todos los campos.');
      return;
    }
    if (correoRegistrado) {
      setError('Este correo ya está registrado');
      return;
    }
    if (contrasena !== confirmar) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    const usuarios = JSON.parse(localStorage.getItem('usuariosRegistrados') || '[]');
    if (usuarios.some(u => u.correo.trim().toLowerCase() === correo.trim().toLowerCase())) {
      setCorreoRegistrado(true);
      setError('Este correo ya está registrado');
      return;
    }
    setLoading(true);
    try {
      // Guardar usuario en localStorage (solo para demo, no seguro en producción)
      usuarios.push({ nombre, correo, contrasena });
      localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));
      await onRegister({ nombre, correo, contrasena });
      // Limpiar campos tras registro exitoso para cubrir ese flujo
      setNombre('');
      setCorreo('');
      setContrasena('');
      setConfirmar('');
      setError('');
      setCorreoRegistrado(false);
    } catch (err) {
      setError(err.message || 'Error al registrarse.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form id="registro" onSubmit={handleSubmit} autoComplete="off">
      <Title level="h2" className="text-center mb-6">Registro</Title>
      <div className="campo campo-icono">
        <label htmlFor="nombre">Nombre</label>
        <div className="input-icono">
          <span className="icono">&#128100;</span>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="campo campo-icono">
        <label htmlFor="correo">Correo</label>
        <div className="input-icono">
          <span className="icono">&#128231;</span>
          <input
            type="email"
            id="correo"
            name="correo"
            value={correo}
            onChange={handleCorreoChange}
            required
            style={correoRegistrado ? { borderColor: '#d93025', background: '#fff0f0' } : {}}
          />
        </div>
      </div>
      <div className="campo campo-icono">
        <label htmlFor="contrasena">Contraseña</label>
        <div className="input-icono">
          <span className="icono">&#128274;</span>
          <input
            type="password"
            id="contrasena"
            name="contrasena"
            value={contrasena}
            onChange={e => setContrasena(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="campo campo-icono">
        <label htmlFor="confirmar">Confirmar</label>
        <div className="input-icono">
          <span className="icono">&#128274;</span>
          <input
            type="password"
            id="confirmar"
            name="confirmar"
            value={confirmar}
            onChange={e => setConfirmar(e.target.value)}
            required
          />
        </div>
      </div>
      {error && <p id="mensaje" style={{ color: '#d93025', textAlign: 'center', marginTop: 8 }}>{error}</p>}
      <button type="submit" id="btn-registro" className="btn" disabled={loading}>
        {loading ? 'Registrando...' : 'Registrarse'}
      </button>
      <div style={{ marginTop: 18, textAlign: 'center' }}>
        <span style={{ color: '#666', fontSize: 15 }}>¿Ya tienes una cuenta?</span>
        <Link
          to="/login"
          style={{
            marginTop: 6,
            color: '#388E3C',
            fontSize: 15,
            textAlign: 'center',
            display: 'block',
            textDecoration: 'underline',
            background: 'none',
            border: 'none',
            boxShadow: 'none',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Iniciar sesión
        </Link>
      </div>
    </form>
  );
}
