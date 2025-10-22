import { Link, useMatch, useResolvedPath } from 'react-router-dom';
 
 
export default function NavLink({ to, children, className = "", ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
 
 
  // Aplica 'nav-link' y opcionalmente una clase 'active' si tu CSS la define
  const combinedClassName = `nav-link ${match ? 'active' : ''} ${className}`.trim();
 
 
  return (
    <Link
      to={to}
      className={combinedClassName} // Usa la clase 'nav-link' y 'active'
      {...props}
    >
      {children}
    </Link>
  );
}