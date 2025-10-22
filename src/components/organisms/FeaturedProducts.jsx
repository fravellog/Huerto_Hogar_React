// src/components/organisms/FeaturedProducts.jsx
import ProductCard from '../molecules/ProductCard';
 
 
export default function FeaturedProducts({ products = [], onAddToCart }) {
  if (!products || products.length === 0) {
    return null;
  }
 
 
  return (
    <section className="destacados">
      {/* Usa la clase CSS para el título */}
      <h2 className="destacados-titulo">
        Ofertas Destacadas
      </h2>
      <div className="productos-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            xx={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}