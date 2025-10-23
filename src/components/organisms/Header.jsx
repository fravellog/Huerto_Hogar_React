import Logo from '../atoms/Logo';
import NavLink from '../atoms/NavLink';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
 
 
export default function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <header className="main-header">
      <div className="header-content">
        <Logo className="header-logo"/>
        <nav className="header-nav">
          {isAuthenticated ? (
            <>
              <NavLink to="/tienda" className="nav-link">🛍️ Tienda</NavLink>
              <NavLink to="/blog" className="nav-link">📰 Blog</NavLink>
              <NavLink to="/perfil" className="nav-link">👤 Perfil</NavLink>
              <NavLink to="/contacto" className="nav-link">✉️ Contacto</NavLink>
              <NavLink to="/carrito" className="nav-link">🛒 Carrito</NavLink>
              <button onClick={logout} className="nav-link" style={{background:'none',border:'none',cursor:'pointer'}}>Cerrar sesión</button>
            </>
          ) : (
            <NavLink to="/login" className="nav-link">🔑 Iniciar Sesión</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}