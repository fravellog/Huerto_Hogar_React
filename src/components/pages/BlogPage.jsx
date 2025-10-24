// src/components/pages/BlogPage.jsx
import MainLayout from '../templates/MainLayout';
import Title from '../atoms/Title';
// import BlogGrid from '../organisms/BlogGrid'; // Importarías el organismo cuando esté listo

// Datos de ejemplo para las entradas del blog (similar al HTML)
const blogPosts = [
  { id: 1, title: "Guía para crear una huerta urbana", summary: "Consejos prácticos para iniciar tu propia huerta...", imageSrc: "public/Blog/Huerta_personas.jpg", link: "https://falconagroalimentaria.com/huerta-para-principiantes-como-iniciar-mi-propia-huerta/", linkText: "Ver guía..." },
  { id: 2, title: "Beneficios de consumir frutas y verduras", summary: "Descubre por qué incluir frutas y verduras...", imageSrc: "public/Blog/beneficios.jpeg", link: "https://www.eufic.org/es/vida-sana/articulo/beneficios-de-las-frutas-y-las-verduras/", linkText: "Recomendaciones..." },
  // ... añadir las otras entradas
];


function BlogCard({ post }) {
  return (
    <div className="blog-card" style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 12px rgba(60,185,23,0.10)', padding: 24, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 340, margin: '0 auto' }}>
      <img src={post.imageSrc} alt={post.title} style={{ width: '100%', maxWidth: 220, height: 140, objectFit: 'cover', marginBottom: 16, borderRadius: 12, boxShadow: '0 1px 6px rgba(60,185,23,0.10)' }} />
      <h3 style={{ color: '#388E3C', fontWeight: 700, fontSize: '1.2rem', marginBottom: 8 }}>{post.title}</h3>
      <p style={{ color: '#222', fontSize: '1rem', marginBottom: 16 }}>{post.summary}</p>
      <a href={post.link} target="_blank" rel="noopener noreferrer" className="btn-blog" style={{ background: '#4CAF50', color: '#fff', borderRadius: 8, padding: '10px 22px', fontSize: '1rem', fontWeight: 500, textDecoration: 'none', boxShadow: '0 2px 8px rgba(60,185,23,0.10)', transition: 'background 0.2s, transform 0.2s' }}>
        {post.linkText}
      </a>
    </div>
  );
}

export default function BlogPage() {
  return (
    <MainLayout>
      <Title level="h1" className="text-center mb-8">Blog de la Huerta</Title>
      <div className="blog-grid" style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center', background: 'transparent', padding: '0 0 48px 0' }}>
        {blogPosts.map(post => <BlogCard key={post.id} post={post} />)}
      </div>
    </MainLayout>
  );
}