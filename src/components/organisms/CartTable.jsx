import React from 'react';

export default function CartTable({ items = [], total = 0, onRemove, onPay, formatCLP }) {
  const mostrarTotal = items.length > 0;

  // Formatea el total si corresponde
  const totalFormateado = formatCLP
    ? (typeof total === 'number' ? formatCLP(total) : total)
    : (typeof total === 'number' ? `$${total}` : total);

  return (
    <div className="cart-card" style={{ background: '#fafafa', borderRadius: 18, boxShadow: '0 4px 24px rgba(60,185,23,0.10)', padding: 32, maxWidth: 600, margin: '0 auto' }}>
      <h2 style={{ fontWeight: 700, fontSize: 26, color: '#222', marginBottom: 18 }}>Carrito de compras</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
          <thead>
            <tr style={{ background: '#388E3C', color: '#fff', fontWeight: 700 }}>
              <th style={{ padding: '12px 8px', borderRadius: '12px 0 0 0' }}>Producto</th>
              <th style={{ padding: '12px 8px' }}>Cantidad</th>
              <th style={{ padding: '12px 8px' }}>Precio</th>
              <th style={{ padding: '12px 8px' }}>Total</th>
              <th style={{ padding: '12px 8px', borderRadius: '0 12px 0 0' }}>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: 24, color: '#888' }}>
                  No hay productos en el carrito.
                </td>
              </tr>
            ) : (
              items.map((item, idx) => (
                <tr key={item.id || idx} style={{ background: idx % 2 === 0 ? '#f5f5f5' : '#fff' }}>
                  <td style={{ padding: '10px 8px', fontWeight: 500 }}>{item.nombre}</td>
                  <td style={{ padding: '10px 8px', textAlign: 'center' }}>{item.cantidad}</td>
                  <td style={{ padding: '10px 8px', textAlign: 'center' }}>{formatCLP ? formatCLP(item.precio) : `$${item.precio}`}</td>
                  <td style={{ padding: '10px 8px', textAlign: 'center' }}>{formatCLP ? formatCLP(item.precio * item.cantidad) : `$${item.precio * item.cantidad}`}</td>
                  <td style={{ padding: '10px 8px', textAlign: 'center' }}>
                    <button onClick={() => onRemove(item)} style={{ background: '#e74c3c', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 12px', cursor: 'pointer' }}>Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {mostrarTotal && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: 24 }}>
          <span style={{ fontWeight: 700, fontSize: 20, color: '#388E3C', marginRight: 24 }}>Total: {totalFormateado}</span>
          <button onClick={onPay} style={{ background: '#43a047', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 600, fontSize: 17, boxShadow: '0 2px 8px rgba(60,185,23,0.10)', cursor: 'pointer' }}>Realizar pago</button>
        </div>
      )}
    </div>
  );
}