import { Link } from 'react-router-dom';

export default function MiniHero() {
  return (
    <div className="mini-hero" role="region" aria-label="Banner móvil">
      <div className="mini-hero-inner">
        <div className="mh-left">🥬</div>
        <div className="mh-title">La Huerta</div>
        <Link to="/tienda" className="mh-cta">Tienda</Link>
      </div>
    </div>
  );
}
