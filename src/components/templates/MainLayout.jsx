import Header from '../organisms/Header';
import Footer from '../organisms/Footer'; // Importa el Footer
 
 
export default function MainLayout({ children }) {
  // Asumiendo que styles.css controla el layout principal (min-height, flex) a través de body/html
  return (
    <> {/* Usamos un fragmento para no añadir divs extra */}
      <Header />
      {/* El contenido específico de cada página irá aquí */}
      {/* Puedes añadir un div contenedor si tu CSS lo requiere */}
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}