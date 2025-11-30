// src/components/molecules/ProductCard.jsx

import Image from '../atoms/Image';
import Button from '../atoms/Button';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function ProductCard({ product }) {
  const { id, nombre, precio, imagen } = product;
  // Asegura que el precio sea numérico para el carrito
  const precioNumerico = typeof precio === 'number' ? precio : parseInt(String(precio).replace(/[^\d]/g, ''), 10) || 0;
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // Formato de precio: "Precio: $1.610/kg"
  function formatearPrecio(valor) {
    if (typeof valor !== 'number') return valor;
    return `Precio: $${valor.toLocaleString('es-CL')}\/kg`;
  }

  const handleAddToCartClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    let cantidad = window.prompt('¿Cuántas unidades desea agregar?', '1');
    cantidad = parseInt(cantidad, 10);
    if (isNaN(cantidad) || cantidad <= 0) {
      alert('Cantidad inválida. Debe ser un número mayor a 0.');
      return;
    }
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const idx = carrito.findIndex(p => p.id === id);
    if (idx >= 0) {
      carrito[idx].cantidad += cantidad;
    } else {
      carrito.push({ id, nombre, precio: precioNumerico, imagen, cantidad });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    window.dispatchEvent(new Event('carritoActualizado'));
    alert(`${nombre} agregado al carrito (${cantidad})`);
  };

  return (
    <div className="producto-card">
      <Image src={imagen} alt={nombre} className="producto-img" />
      <h3>{nombre}</h3>
      <h4 className="precio">{formatearPrecio(precio)}</h4>
      <Button onClick={handleAddToCartClick} className="agregar-carrito">
        Agregar al carrito
      </Button>
    </div>
  );
}