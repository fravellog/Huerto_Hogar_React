import Title from '../atoms/Title';
import ProductCard from '../molecules/ProductCard';

// Ahora recibe los productos y la función como props
export default function FeaturedProducts({ products = [], onAddToCart }) {
  if (!products || products.length === 0) {
    return null; // O mostrar un mensaje si no hay productos
  }

  return (
    // Replicando .destacados
    <section className="max-w-screen-xl mx-auto my-12 px-4 sm:px-6">
      <Title level="h2" className="text-center mb-8">Ofertas Destacadas</Title>
      {/* Replicando .productos-grid */}
      <div className="flex flex-wrap gap-6 sm:gap-8 justify-center">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}