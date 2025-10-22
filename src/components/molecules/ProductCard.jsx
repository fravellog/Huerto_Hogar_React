// src/components/molecules/ProductCard.jsx
import Image from '../atoms/Image';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
 
 
export default function ProductCard({ product /*, onAddToCart */ }) { // Comenta onAddToCart por ahora
  const { id, nombre, precio, imagen } = product;
  const navigate = useNavigate(); // Hook para navegar
 
 
  const handleAddToCartClick = () => {
    // En lugar de añadir al carrito, navega a login
    navigate('/login');
  };
 
 
  return (
    // Usa clases CSS originales o Tailwind
    <div className="producto-card"> {/* O clases Tailwind */}
      <Image src={imagen} alt={nombre} className="producto-img" /> {/* O clases Tailwind */}
      <h3>{nombre}</h3>
      <h4 className="precio">{precio}</h4> {/* O clases Tailwind */}
      {/* Llama a handleAddToCartClick en lugar de onAddToCart */}
      <Button xx={handleAddToCartClick} className="agregar-carrito"> {/* O clases Tailwind */}
        Agregar al carrito
      </Button>
    </div>
  );
}