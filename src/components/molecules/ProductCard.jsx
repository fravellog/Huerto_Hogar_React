// src/components/molecules/ProductCard.jsx
import Image from '../atoms/Image';
import Button from '../atoms/Button';

export default function ProductCard({ product }) {
  const { id, nombre, precio, imagen } = product;

  const handleAddToCartClick = () => {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const idx = carrito.findIndex(p => p.id === id);
    if (idx >= 0) {
      carrito[idx].cantidad += 1;
    } else {
      carrito.push({ id, nombre, precio, imagen, cantidad: 1 });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    window.dispatchEvent(new Event('carritoActualizado'));
    alert(`${nombre} agregado al carrito`);
  };

  return (
    <div className="producto-card">
      <Image src={imagen} alt={nombre} className="producto-img" />
      <h3>{nombre}</h3>
      <h4 className="precio">{precio}</h4>
      <Button onClick={handleAddToCartClick} className="agregar-carrito">
        Agregar al carrito
      </Button>
    </div>
  );
}