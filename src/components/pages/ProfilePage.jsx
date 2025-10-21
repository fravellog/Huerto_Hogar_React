// src/components/pages/ProfilePage.jsx
import MainLayout from '../templates/MainLayout';
import Title from '../atoms/Title';
// import ProfileCard from '../organisms/ProfileCard'; // Importarías el componente de perfil

export default function ProfilePage() {
  // Aquí obtendrías la información del usuario (probablemente desde un contexto)
  // const { user } = useAuth();

  return (
    <MainLayout>
      <Title level="h1" className="text-center mb-8">Mi Perfil</Title>
      {/* Aquí eventualmente iría el organismo ProfileCard */}
       <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
         <p className="text-gray-600 text-center">Cargando información del perfil...</p>
         {/* Aquí mostrarías la foto, nombre, correo y botones */}
       </div>
    </MainLayout>
  );
}