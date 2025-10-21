// src/components/pages/ShopPage.jsx
import MainLayout from '../templates/MainLayout';
import Title from '../atoms/Title'; // Usaremos el átomo Title

export default function ShopPage() {
  return (
    <MainLayout>
      <Title level="h1" className="text-center mb-8">Nuestros Productos</Title>
      {/* Aquí eventualmente iría el organismo ProductGrid con todos los productos */}
      <div className="text-center text-gray-600">
        <p>Cargando productos...</p>
        {/* Podrías añadir filtros o categorías aquí más adelante */}
      </div>
    </MainLayout>
  );
}