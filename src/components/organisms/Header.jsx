import Logo from '../atoms/Logo';
import NavLink from '../atoms/NavLink';
// import { useCart } from '../../context/CartContext'; // Ejemplo Contexto Carrito
// import { useAuth } from '../../context/AuthContext'; // Ejemplo Contexto Auth

export default function Header() {
  // const { cartItemCount } = useCart(); // Ejemplo
  // const { user } = useAuth(); // Ejemplo

  return (
    // Replicando .main-header
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Replicando .header-content */}
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-3 px-6">
        <Logo />
        {/* Replicando .header-nav */}
        <nav className="flex items-center gap-1 sm:gap-2"> {/* Ajusta gap según sea necesario */}
          <NavLink to="/tienda">🛍️ Tienda</NavLink>
          <NavLink to="/blog">📰 Blog</NavLink>
          <NavLink to="/perfil">👤 Perfil</NavLink> {/* Podrías mostrarlo condicionalmente si el usuario está logueado */}
          <NavLink to="/contacto">✉️ Contacto</NavLink>
          <NavLink to="/carrito" className="relative">
            🛒 Carrito
            {/* Ejemplo contador carrito */}
            {/* {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                {cartItemCount}
              </span>
            )} */}
          </NavLink>
          {/* Ejemplo: Mostrar Login/Logout condicionalmente */}
          {/* {user ? (
            <Button onClick={logout} className="ml-2">Salir</Button>
          ) : (
            <NavLink to="/login" className="ml-2">🚪 Ingresar</NavLink>
          )} */}
        </nav>
      </div>
    </header>
  );
}