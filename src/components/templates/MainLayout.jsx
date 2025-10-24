import Header from '../organisms/Header';
import Footer from '../organisms/Footer'; // Importa el Footer
// Banner and MiniHero removed from global layout; header contains navigation


export default function MainLayout({ children }) {
  // Colocamos un Banner compacto global que solo será visible en móviles vía CSS
  return (
    <> {/* Usamos un fragmento para no añadir divs extra */}
      <Header />
      {/* Header provides navigation; no global mobile banner */}
      {/* El contenido específico de cada página irá aquí */}
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}