// src/components/pages/CartPage.jsx
import MainLayout from '../templates/MainLayout';
import Title from '../atoms/Title';
import CartTable from '../organisms/CartTable';
import { useState, useEffect } from 'react';

export default function CartPage() {
  // Estado del carrito conectado a localStorage
  const [items, setItems] = useState([]);

  useEffect(() => {
    const actualizarCarrito = () => {
      const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
      setItems(carrito);
    };
    actualizarCarrito();
    window.addEventListener('carritoActualizado', actualizarCarrito);
    return () => {
      window.removeEventListener('carritoActualizado', actualizarCarrito);
    };
  }, []);

  const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const handleRemove = (item) => {
    const nuevoCarrito = items.filter(i => i.id !== item.id);
    setItems(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const handlePay = () => {
    alert('Pago realizado');
    setItems([]);
    localStorage.setItem('carrito', '[]');
  };

  // Formatear precios en CLP
  const formatCLP = (valor) => valor.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 });

  // Pasar formateador a CartTable
  return (
    <MainLayout>
      <Title level="h1" className="text-center mb-8">Carrito de Compras</Title>
      <CartTable items={items} total={formatCLP(total)} onRemove={handleRemove} onPay={handlePay} formatCLP={formatCLP} />
    </MainLayout>
  );
}