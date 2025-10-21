export default function Footer() {
    return (
      // Estilos base del footer original con Tailwind
      <footer className="w-full text-center py-4 mt-10 bg-gray-100 text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Huerto Hogar.</p>
        {/* Podrías añadir más links o info aquí si es necesario */}
      </footer>
    );
  }