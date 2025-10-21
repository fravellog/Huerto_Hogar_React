// src/components/pages/ContactPage.jsx
import MainLayout from '../templates/MainLayout';
import Title from '../atoms/Title';
// import ContactForm from '../organisms/ContactForm'; // Importarías el formulario

export default function ContactPage() {
  return (
    <MainLayout>
      <Title level="h1" className="text-center mb-8">Contacto</Title>
      {/* Aquí eventualmente iría el organismo ContactForm */}
       <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow">
         <p className="text-gray-600 text-center">Formulario de contacto próximamente...</p>
         {/* Aquí podrías añadir info de contacto como teléfono o dirección */}
       </div>
    </MainLayout>
  );
}