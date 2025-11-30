
import React, { useState, useEffect } from 'react';
import '../../styles/pages/simularPago.css';
import MainLayout from '../templates/MainLayout';
import Title from '../atoms/Title';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import Label from '../atoms/Label';

const SimularPago = () => {
  // Estado de los campos
  const [numero, setNumero] = useState('');
  const [nombre, setNombre] = useState('');
  const [expiracion, setExpiracion] = useState('');
  const [cvv, setCvv] = useState('');
  // Monto fijo para la simulación
  const [monto] = useState(30000);
  const [feedback, setFeedback] = useState(null); // { tipo: 'exito'|'error', mensaje: string }
  const [loading, setLoading] = useState(false);



  // Simulación de pago: éxito si la tarjeta es 4242 4242 4242 4242, error si es 4000 0000 0000 0002
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);
    setLoading(true);
    // Simulación local, sin fetch
    setTimeout(() => {
      if (numero.replace(/\s/g, '') === '4242424242424242') {
        setFeedback({ tipo: 'exito', mensaje: '¡Pago simulado realizado con éxito!' });
        localStorage.setItem('carrito', '[]');
        setNumero(''); setNombre(''); setExpiracion(''); setCvv('');
      } else if (numero.replace(/\s/g, '') === '4000000000000002') {
        setFeedback({ tipo: 'error', mensaje: 'El pago no fue realizado, vuelva a intentarlo más tarde.' });
      } else {
        setFeedback({ tipo: 'error', mensaje: 'Tarjeta de prueba no reconocida. Usa una de las tarjetas de ejemplo.' });
      }
      setLoading(false);
    }, 1200);
  };

  return (
    <MainLayout>
      <div className="simular-pago-flex-center">
        <div className="simular-pago-card">
        <Title level="h2" className="text-center mb-6">Simular Pago</Title>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4">
            <Label htmlFor="numero">Número de tarjeta</Label>
            <Input id="numero" name="numero" type="text" placeholder="1234 5678 9012 3456" value={numero} onChange={e => setNumero(e.target.value)} required maxLength={19} />
          </div>
          <div className="mb-4">
            <Label htmlFor="nombre">Nombre del titular</Label>
            <Input id="nombre" name="nombre" type="text" placeholder="Como aparece en la tarjeta" value={nombre} onChange={e => setNombre(e.target.value)} required />
          </div>
          <div className="mb-4 flex gap-4">
            <div className="flex-1">
              <Label htmlFor="expiracion">Expiración</Label>
              <Input id="expiracion" name="expiracion" type="text" placeholder="MM/AA" value={expiracion} onChange={e => setExpiracion(e.target.value)} required maxLength={5} />
            </div>
            <div className="flex-1">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" name="cvv" type="password" placeholder="123" value={cvv} onChange={e => setCvv(e.target.value)} required maxLength={4} />
            </div>
          </div>
          <div className="mb-6">
            <Label htmlFor="monto">Monto</Label>
            <Input id="monto" name="monto" type="text" value={monto.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 })} readOnly className="bg-gray-100 cursor-not-allowed" />
            <div style={{ fontSize: 13, color: '#888', marginTop: 4 }}>
              Monto fijo para la simulación
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Procesando...' : 'Simular Pago'}</Button>
          <div style={{ fontSize: 14, color: '#666', marginTop: 18, marginBottom: 0, lineHeight: 1.6 }}>
            <b>Tarjetas de prueba:</b><br />
            <span style={{ color: '#222' }}>Éxito:</span><br />
            <span style={{fontFamily:'monospace'}}>N°: 4242 4242 4242 4242</span><br />
            <span style={{fontFamily:'monospace'}}>Nombre: Juan Pérez</span><br />
            <span style={{fontFamily:'monospace'}}>Expiración: 12/29</span><br />
            <span style={{fontFamily:'monospace'}}>CVV: 123</span><br /><br />
            <span style={{ color: '#222' }}>Error:</span><br />
            <span style={{fontFamily:'monospace'}}>N°: 4000 0000 0000 0002</span><br />
            <span style={{fontFamily:'monospace'}}>Nombre: María Test</span><br />
            <span style={{fontFamily:'monospace'}}>Expiración: 11/28</span><br />
            <span style={{fontFamily:'monospace'}}>CVV: 456</span>
          </div>
        </form>
        {feedback && (
          <div className={`simular-pago-feedback ${feedback.tipo}`}>{feedback.mensaje}</div>
        )}
        </div>
      </div>
    </MainLayout>
  );
};

export default SimularPago;
