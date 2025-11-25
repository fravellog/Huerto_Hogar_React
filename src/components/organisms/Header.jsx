import Logo from '../atoms/Logo';
import NavLink from '../atoms/NavLink';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import Banner from './Banner';
 
 
export default function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(v => !v);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => document.body.classList.remove('no-scroll');
  }, [menuOpen]);

  return (
    <header className="main-header">
      <div className="header-content">
        <Logo className="header-logo"/>

        {/* Hamburger toggle visible on small screens */}
        <button
          className={`hamburger ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        {/* Desktop nav (hidden on mobile via CSS) */}
        <nav className={`header-nav`}>
          {isAuthenticated ? (
            <>
              <NavLink to="/tienda" className="nav-link">🛍️ Tienda</NavLink>
              <NavLink to="/blog" className="nav-link">📰 Blog</NavLink>
              <NavLink to="/perfil" className="nav-link">👤 Perfil</NavLink>
              <NavLink to="/contacto" className="nav-link">✉️ Contacto</NavLink>
              <NavLink to="/carrito" className="nav-link">🛒 Carrito</NavLink>
              <button
                className="nav-link"
                onClick={() => { logout(); setMenuOpen(false); }}
                aria-label="Cerrar sesión"
              >
                🚪 Cerrar sesión
              </button>
            </>
          ) : (
            <NavLink to="/login" className="nav-link">🔑 Iniciar Sesión</NavLink>
          )}
        </nav>

  {/* Mobile backdrop (click to close) */}
  <div className={`mobile-backdrop ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />

  {/* Mobile sliding panel (default green). To use white style add class 'mobile-panel--light' */}
  <div className={`mobile-panel mobile-panel--green ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
          <div className="mobile-panel__header">
            <Logo className="logo-huerta" />
            <button className="mobile-panel__close" aria-label="Cerrar menú" onClick={() => setMenuOpen(false)}>✕</button>
          </div>
          <div className="mobile-panel__content" onClick={() => setMenuOpen(false)}>
            {isAuthenticated ? (
              <>
                <NavLink to="/tienda" className="nav-link">🛍️ Tienda</NavLink>
                <NavLink to="/blog" className="nav-link">📰 Blog</NavLink>
                <NavLink to="/perfil" className="nav-link">👤 Perfil</NavLink>
                <NavLink to="/contacto" className="nav-link">✉️ Contacto</NavLink>
                <NavLink to="/carrito" className="nav-link">🛒 Carrito</NavLink>
                <button
                  className="nav-link"
                  onClick={() => { logout(); setMenuOpen(false); }}
                  aria-label="Cerrar sesión"
                >
                  🚪 Cerrar sesión
                </button>
              </>
            ) : (
              <NavLink to="/login" className="nav-link">🔑 Iniciar Sesión</NavLink>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}