import MainLayout from '../templates/MainLayout';
import FeaturedProducts from '../organisms/FeaturedProducts';
import Banner from '../organisms/Banner';
import { Link } from 'react-router-dom'; // Para el enlace del botón
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
 
 
// Datos de ejemplo
const featuredProductsData = [
   { id: 1, nombre: "Tomates Orgánicos", precio: "Precio: $1.610/kg", imagen: "public/Verduras/tomate.png" }, // Formato precio como en HTML
   { id: 2, nombre: "Lechugas Frescas", precio: "Precio: $1.180/unidad", imagen: "public/Verduras/Lechuga.png" },
   { id: 3, nombre: "Zanahorias Frescas", precio: "Precio: $1.200/kg", imagen: "public/Verduras/Zanahoria.png" },
];
 
 
export default function HomePage() {
  const { isAuthenticated } = useContext(AuthContext);

  const handleAddToCart = (product) => {
    console.log('Añadir al carrito:', product);
    // Aquí iría la lógica original del modal (abrirModalCantidad)
    // adaptada a React (probablemente usando estado para mostrar/ocultar un modal)
  };
 
 
  return (
    <MainLayout>
      <Banner />
      <FeaturedProducts products={featuredProductsData} onAddToCart={handleAddToCart} />
       {/* Contenedor y enlace "Ver Productos" con clases CSS */}
       <div style={{display:'flex', justifyContent:'center', margin:'32px 0'}}> {/* Estilo en línea como en tu HTML */}
      <Link to={isAuthenticated ? '/tienda' : '/login'} className="btn btn-ver-productos"> {/* Usa las clases CSS */}
        Ver productos
      </Link>
       </div>
       {/* Aquí podrías añadir el componente Modal si lo creas */}
       {/* <QuantityModal /> */}
    </MainLayout>
  );
}