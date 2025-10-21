import Image from '../atoms/Image';
import Button from '../atoms/Button';

export default function ProductCard({ product, onAddToCart }) {
  const { id, nombre, precio, imagen } = product;

  return (
    // Replicando .producto-card con Tailwind
    <div className="bg-white rounded-2xl shadow-md p-5 text-center w-full max-w-xs transition hover:shadow-lg flex flex-col">
      <Image
        src={imagen}
        alt={nombre}
        // Replicando .producto-img
        className="w-32 h-32 object-cover mb-4 rounded-xl shadow-sm mx-auto"
      />
      {/* Usando clases directamente en lugar de Title para más control */}
      <h3 className="text-lg font-semibold text-green-800 mb-2 flex-grow">{nombre}</h3>
      {/* Replicando .precio */}
      <p className="text-gray-600 text-sm mb-3">{precio}</p>
      <Button onClick={() => onAddToCart(product)} className="w-full mt-auto">
        Agregar al carrito
      </Button>
    </div>
  );
}