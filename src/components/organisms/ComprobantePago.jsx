import React, { useRef } from 'react';
import Button from '../atoms/Button';
import Title from '../atoms/Title';
import Label from '../atoms/Label';

// Recibe props: user, monto, fecha, datosTarjeta, direccion, productos, onDescargar, onImprimir
// Para exportar a PDF usamos html2pdf.js
// Instala con: npm install html2pdf.js


const ComprobantePago = ({ user, monto, fecha, datosTarjeta, direccion, productos = [], onDescargar, onImprimir }) => {
  const refComprobante = useRef();

  // Descargar PDF real usando html2pdf.js vía CDN (compatible con Vite)
  const handleDescargarPDF = async () => {
    if (!window.html2pdf) {
      // Cargar html2pdf.js desde CDN sólo si no está cargado
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    }
    if (window.html2pdf && refComprobante.current) {
      window.html2pdf()
        .set({
          margin: 0.5,
          filename: `comprobante_pago_${fecha.replace(/\W+/g, '_')}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        })
        .from(refComprobante.current)
        .save();
    }
  };

  return (
    <div
      ref={refComprobante}
      id="comprobante-pago"
      style={{
        maxWidth: 480,
        margin: '0 auto',
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(60,185,23,0.10)',
        padding: 32,
        border: '1px solid #e5e7eb',
        position: 'relative',
        fontFamily: 'Arial, Helvetica, sans-serif',
        textAlign: 'center',
      }}
    >
      <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Comprobante de Pago</h2>
      <div style={{ marginBottom: 24, fontSize: 15, color: '#222', textAlign: 'left' }}>
        <div style={{ marginBottom: 6 }}><b>Fecha:</b> {fecha}</div>
        <div style={{ marginBottom: 6 }}><b>Nombre:</b> {user?.nombre || user?.name || ''}</div>
        <div style={{ marginBottom: 6 }}><b>Email:</b> {user?.email || ''}</div>
        <div style={{ marginBottom: 6 }}><b>Dirección de envío:</b><br />
          {direccion?.calle} #{direccion?.numeroDir}, {direccion?.ciudad}, {direccion?.region}
        </div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <table style={{ width: '100%', fontSize: 15, borderCollapse: 'collapse', margin: '0 auto' }}>
          <thead>
            <tr style={{ background: '#388E3C', color: '#fff' }}>
              <th style={{ padding: '8px 6px', textAlign: 'left' }}>Producto</th>
              <th style={{ padding: '8px 6px', textAlign: 'center' }}>Cantidad</th>
              <th style={{ padding: '8px 6px', textAlign: 'center' }}>Precio</th>
              <th style={{ padding: '8px 6px', textAlign: 'center' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {productos.length === 0 ? (
              <tr><td colSpan={4} style={{ textAlign: 'center', padding: 16, color: '#888' }}>No hay productos</td></tr>
            ) : (
              productos.map((item, idx) => (
                <tr key={item.id || idx} style={{ background: idx % 2 === 0 ? '#f5f5f5' : '#fff' }}>
                  <td style={{ padding: '8px 6px' }}>{item.nombre}</td>
                  <td style={{ padding: '8px 6px', textAlign: 'center' }}>{item.cantidad}</td>
                  <td style={{ padding: '8px 6px', textAlign: 'center' }}>{item.precio.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 })}</td>
                  <td style={{ padding: '8px 6px', textAlign: 'center' }}>{(item.precio * item.cantidad).toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 })}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div style={{ marginBottom: 12, textAlign: 'right' }}>
        <span style={{ fontWeight: 700, fontSize: 18, color: '#388E3C' }}>Total: {monto.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 })}</span>
      </div>
      <div style={{ marginBottom: 10, fontSize: 15, color: '#222', textAlign: 'left' }}>
        <b>Tarjeta:</b> **** **** **** {datosTarjeta?.slice(-4)}
      </div>
      {/* Botones sólo en pantalla, no en PDF */}
      <div className="print:hidden" style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 24 }}>
        <Button onClick={handleDescargarPDF} type="button">Descargar PDF</Button>
        <Button onClick={onImprimir} type="button" variant="secondary">Imprimir</Button>
      </div>
    </div>
  );
};

export default ComprobantePago;
