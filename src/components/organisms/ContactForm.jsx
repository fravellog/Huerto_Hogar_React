import React, { useState } from 'react';

export default function ContactForm() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
    setNombre('');
    setEmail('');
    setMensaje('');
  };

  return (
    <form className="contact-form-modern" onSubmit={handleSubmit} autoComplete="off">
      <div className="contact-form-row">
        <div className="contact-input-group">
          <span className="contact-icon">👤</span>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
        </div>
        <div className="contact-input-group">
          <span className="contact-icon">✉️</span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="contact-input-group">
          <span className="contact-icon">💬</span>
          <input
            type="text"
            placeholder="Mensaje"
            value={mensaje}
            onChange={e => setMensaje(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="contact-btn">
          📤 Enviar
        </button>
      </div>
      {enviado && <div className="contact-success">¡Mensaje enviado!</div>}
    </form>
  );
}
