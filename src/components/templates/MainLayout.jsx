import Header from '../organisms/Header';
import Footer from '../organisms/Footer'; // Importa el Footer

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50"> {/* Fondo gris claro */}
      <Header />
      {/* El contenido específico de cada página irá aquí */}
      {/* Clases para centrar y añadir padding */}
      <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}