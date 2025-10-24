import Image from './Image';
import { Link } from 'react-router-dom';
 
 
export default function Logo({ className = "" }) { // Recibe header-logo
  return (
      <Image
          src="/Logos/logo_huerta.png"
        alt="Logo Huerto Hogar"
        className={className} // Aplica la clase 'header-logo' pasada desde Header
        id={className === 'logo-huerta' ? 'Logo-huerta' : undefined}
      />
  );
}