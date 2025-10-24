import Title from '../atoms/Title';
import MainLayout from '../templates/MainLayout';
import ProductCard from '../molecules/ProductCard';

const productos = [
  { id: "FR001", nombre: "Manzanas", precio: 1200, stock: 150, descripcion: "Manzanas crujientes y dulces.", categoria: "Frutas", imagen: "/Frutas/Manzana.png" },
  { id: "FR002", nombre: "Naranjas", precio: 1000, stock: 200, descripcion: "Jugosas y ricas en vitamina C.", categoria: "Frutas", imagen: "/Frutas/Naranja.png" },
  { id: "VR001", nombre: "Lechuga", precio: 900, stock: 100, descripcion: "Lechuga fresca para ensaladas.", categoria: "Verduras", imagen: "/Verduras/Lechuga.png" },
  { id: "VR002", nombre: "Papas (Saco 5kg)", precio: 5000, stock: 80, descripcion: "Papas ideales para freír o cocer.", categoria: "Verduras", imagen: "/Verduras/Saco_papa.jpg" },
  { id: "VR003", nombre: "Tomate", precio: 1610, stock: 50, descripcion: "Tomates frescos", categoria: "Verduras", imagen: "/Verduras/tomate.png" },
  { id: "VR004", nombre: "Brócoli", precio: 1490, stock: 50, descripcion: "Brócoli natural", categoria: "Verduras", imagen: "/Verduras/brocoli.png" },
  { id: "VR005", nombre: "Cebolla", precio: 1420, stock: 50, descripcion: "Cebolla natural", categoria: "Verduras", imagen: "/Verduras/Cebolla.png" },
  { id: "VR006", nombre: "Zanahorias", precio: 1200, stock: 50, descripcion: "Zanahoria natural", categoria: "Verduras", imagen: "/Verduras/Zanahoria.png" },
  { id: "FR003", nombre: "Mango", precio: 1570, stock: 50, descripcion: "Mango frescos", categoria: "Frutas", imagen: "/Frutas/Mango.png" },
  { id: "FR004", nombre: "Frutilla", precio: 3990, stock: 50, descripcion: "Frutilla por kg", categoria: "Frutas", imagen: "/Frutas/Frutilla.png" },
  { id: "FR005", nombre: "Plátanos", precio: 1570, stock: 50, descripcion: "Platanos naturales", categoria: "Frutas", imagen: "/Frutas/Platanos.png" },
  { id: "FR006", nombre: "Sandia", precio: 5290, stock: 50, descripcion: "Sandia Jugosa", categoria: "Frutas", imagen: "/Frutas/Sandia.png" },
];



export default function ShopPage() {
  const verduras = productos.filter(p => p.categoria === 'Verduras');
  const frutas = productos.filter(p => p.categoria === 'Frutas');
  return (
    <MainLayout>
      <Title level="h2" className="text-center mb-8">Nuestros Productos</Title>
      <div
        className="shop-categorias-container"
        style={{
          display: 'flex',
          gap: 48,
          justifyContent: 'center',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        {/* Bloque Verduras */}
  <div className="shop-categoria-block" style={{ flex: 1, minWidth: 320, background: '#f8fff8', borderRadius: 18, padding: 28, boxShadow: '0 2px 8px rgba(60,185,23,0.06)' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', color: '#388E3C', marginBottom: 24, fontWeight: 700 }}>
            🥦 Verduras
          </h2>
          <div className="shop-productos-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
            {verduras.map(producto => <ProductCard key={producto.id} product={producto} />)}
          </div>
        </div>
        {/* Bloque Frutas */}
  <div className="shop-categoria-block" style={{ flex: 1, minWidth: 320, background: '#fffef8', borderRadius: 18, padding: 28, boxShadow: '0 2px 8px rgba(60,185,23,0.06)' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', color: '#388E3C', marginBottom: 24, fontWeight: 700 }}>
            🍎 Frutas
          </h2>
          <div className="shop-productos-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
            {frutas.map(producto => <ProductCard key={producto.id} product={producto} />)}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}