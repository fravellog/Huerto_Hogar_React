// src/components/pages/CartPage.jsx
import MainLayout from '../templates/MainLayout';
import Title from '../atoms/Title';
// import Cart from '../organisms/Cart'; // Importarías el componente del carrito

export default function CartPage() {
  return (
    <MainLayout>
      <Title level="h1" className="text-center mb-8">Carrito de Compras</Title>
      {/* Aquí eventualmente iría el organismo Cart */}
       <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
         <p className="text-gray-600 text-center">Tu carrito está vacío o cargando...</p>
         {/* Aquí mostrarías la tabla de productos, total y botón de pago */}
       </div>
    </MainLayout>
  );
}