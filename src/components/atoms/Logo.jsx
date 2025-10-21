import Image from './Image';
import { Link } from 'react-router-dom';

export default function Logo({ className = "" }) {
  return (
    <Link to="/"> {/* Enlace a la página de inicio */}
      <Image
        src="/assets/logo.png" // Asegúrate que logo.png esté en la carpeta `public/img/`
        alt="Logo Huerto Hogar"
        // Replica .header-logo con Tailwind
        className={`h-10 w-auto ${className}`} // Ajusta h-10 según el tamaño deseado
      />
    </Link>
  );
}