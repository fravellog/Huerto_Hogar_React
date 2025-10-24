// src/components/organisms/Banner.jsx
 
 
export default function Banner() {
  return (
    <section
      className="banner"
      style={{
        width: '100%',
        minHeight: 260,
        background: 'url(/Logos/banner_verduras.jpg) center/cover no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <div className="banner-content">
        <h1>Tienda la Huerta</h1>
        <p>
          Bienvenidos a nuestra página dedicada a la huerta. Descubre productos frescos y orgánicos para tu mesa.
        </p>
      </div>
    </section>
  );
}