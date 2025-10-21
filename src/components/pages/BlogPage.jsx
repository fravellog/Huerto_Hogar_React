// src/components/pages/BlogPage.jsx
import MainLayout from '../templates/MainLayout';
import Title from '../atoms/Title';
// import BlogGrid from '../organisms/BlogGrid'; // Importarías el organismo cuando esté listo

// Datos de ejemplo para las entradas del blog (similar al HTML)
const blogPosts = [
  { id: 1, title: "Guía para crear una huerta urbana", summary: "Consejos prácticos para iniciar tu propia huerta...", imageSrc: "/img/noticia1.jpg", link: "https://...", linkText: "Ver guía..." },
  { id: 2, title: "Beneficios de consumir frutas y verduras", summary: "Descubre por qué incluir frutas y verduras...", imageSrc: "/img/Noticia2.png", link: "https://...", linkText: "Recomendaciones..." },
  // ... añadir las otras entradas
];


export default function BlogPage() {
  return (
    <MainLayout>
      <Title level="h1" className="text-center mb-8">Blog de la Huerta</Title>
      {/* Aquí eventualmente iría el organismo BlogGrid */}
       <div className="text-center text-gray-600">
         <p>Cargando entradas del blog...</p>
         {/* Aquí podrías mapear `blogPosts` y mostrar `BlogCard` cuando los tengas */}
       </div>
    </MainLayout>
  );
}