export default function Banner() {
    return (
      // Replicando .banner con Tailwind
      // Necesitarás configurar la imagen de fondo en tu tailwind.config.js o usar estilos en línea/CSS
      <section
        className="w-full min-h-[260px] bg-cover bg-center flex items-center justify-center relative py-10"
        // Ejemplo con estilo en línea (mejor si lo configuras en Tailwind)
        style={{ backgroundImage: "url('/img/frutas-y-verduras.jpg')" }}
      >
        {/* Replicando el overlay ::after */}
        <div className="absolute inset-0 bg-green-700 opacity-20"></div>
  
        {/* Replicando .banner-content */}
        <div className="relative z-10 bg-white bg-opacity-90 rounded-2xl p-8 sm:p-10 text-center shadow-lg max-w-xl mx-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-800 mb-3">Tienda la Huerta</h1>
          <p className="text-base sm:text-lg text-gray-700">
            Bienvenidos a nuestra página dedicada a la huerta. Descubre productos frescos y orgánicos para tu mesa.
          </p>
        </div>
      </section>
    );
  }