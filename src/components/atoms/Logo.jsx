import Image from './Image';
import { Link } from 'react-router-dom';
 
 
export default function Logo({ className = "" }) { // Recibe header-logo
  return (
      <Image
        src="src/assets/logo.png"
        alt="Logo Huerto Hogar"
        className={className} // Aplica la clase 'header-logo' pasada desde Header
        id={className === 'logo-huerta' ? 'Logo-huerta' : undefined}
      />
  );
}