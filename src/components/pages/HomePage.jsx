import MainLayout from '../templates/MainLayout';
import FeaturedProducts from '../organisms/FeaturedProducts';
import Banner from '../organisms/Banner';
// import { useCart } from '../../context/CartContext'; // Para la lógica del carrito
import Button from '../atoms/Button'; // Para el botón "Ver productos"
import { Link } from 'react-router-dom'; // Para el enlace del botón

// Datos de ejemplo (normalmente vendrían de una API o estado global)
const featuredProductsData = [
   { id: 1, nombre: "Tomates Orgánicos", precio: "$1.610 /kg", imagen: "/VerdurasImg/tomate.png" },
   { id: 2, nombre: "Lechugas Frescas", precio: "$1.180 c/u", imagen: "/img/lechuga.jpg" },
   { id: 3, nombre: "Zanahorias Frescas", precio: "$1.200 /kg", imagen: "/VerdurasImg/Zanahoria.png" },
];

export default function HomePage() {
  // const { addToCart } = useCart(); // Ejemplo

  const handleAddToCart = (product) => {
    console.log('Añadir al carrito:', product);
    // Aquí llamarías a addToCart(product);
  };

  return (
    <MainLayout>
      <Banner />
      <FeaturedProducts products={featuredProductsData} onAddToCart={handleAddToCart} />
      {/* Botón "Ver Productos" como enlace */}
       <div className="text-center my-8">
            <Link to="/tienda">
              {/* Reutilizando el átomo Button pero renderizado como Link */}
              <Button className="text-lg px-8 py-3"> {/* Ajusta tamaño si es necesario */}
                Ver productos
              </Button>
            </Link>
       </div>
    </MainLayout>
  );
}