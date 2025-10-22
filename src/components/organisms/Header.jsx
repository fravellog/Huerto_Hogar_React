import Logo from '../atoms/Logo';
import NavLink from '../atoms/NavLink'; // Usaremos el NavLink adaptado
// import { useCart } from '../../context/CartContext'; // Para contador
// import { useAuth } from '../../context/AuthContext'; // Para login/logout
 
 
export default function Header() {
  // const { cartItemCount } = useCart();
  // const { user } = useAuth();
 
 
  return (
    <header className="main-header">
      <div className="header-content">
        <Logo className="header-logo"/>
        <nav className="header-nav">
          <NavLink to="/login" className="nav-link">🔑 Iniciar Sesión</NavLink>
          <NavLink to="/login" className="nav-link">🛍️ Tienda</NavLink>
          <NavLink to="/login" className="nav-link">📰 Blog</NavLink>
          <NavLink to="/login" className="nav-link">👤 Perfil</NavLink>
          <NavLink to="/login" className="nav-link">✉️ Contacto</NavLink>
          <NavLink to="/login" className="nav-link">🛒 Carrito
            {/* Span para el contador como en tu HTML original */}
            {/* {cartItemCount > 0 && (
                <span id="contador-carrito" style={{background:'#e74c3c',color:'#fff',borderRadius:'50%',padding:'2px 7px',fontSize:'0.9em',verticalAlign:'top',marginLeft:'2px'}}>
                  {cartItemCount}
                </span>
             )} */}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}