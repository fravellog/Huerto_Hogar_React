import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function NavLink({ to, children, className = "", ...props }) {
  let resolved = useResolvedPath(to);
  // `useMatch` devuelve info si la ruta coincide, sino null. `end: true` es para coincidencia exacta.
  let match = useMatch({ path: resolved.pathname, end: true });

  // Clases base para enlaces de navegación
  const baseClasses = "px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out";
  // Clases cuando el enlace está activo
  const activeClasses = "bg-green-100 text-green-800";
  // Clases cuando el enlace no está activo
  const inactiveClasses = "text-gray-700 hover:bg-gray-100 hover:text-gray-900";

  return (
    <Link
      to={to}
      className={`${baseClasses} ${match ? activeClasses : inactiveClasses} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}