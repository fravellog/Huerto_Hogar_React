import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/context/AuthContext';

// Importa tus páginas
import HomePage from './components/pages/HomePage';
import ShopPage from './components/pages/ShopPage';
import BlogPage from './components/pages/BlogPage';
import ContactPage from './components/pages/ContactPage';
import CartPage from './components/pages/CartPage';
import ProfilePage from './components/pages/ProfilePage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import NotFoundPage from './components/pages/NotFoundPage'; // Página para rutas no encontradas
import SimularPago from './components/pages/SimularPago';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas que usan el MainLayout (implícito dentro de cada página) */}
          <Route path="/" element={<HomePage />} />
          <Route path="/tienda" element={<ShopPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contacto" element={<ContactPage />} />
          <Route path="/carrito" element={<CartPage />} />

          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/simular-pago" element={<SimularPago />} />

          {/* Rutas que podrían tener un layout diferente (sin Header/Footer) */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />

          {/* Ruta comodín para 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;