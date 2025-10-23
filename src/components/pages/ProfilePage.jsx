// src/components/pages/ProfilePage.jsx
import MainLayout from '../templates/MainLayout';
import Title from '../atoms/Title';
// import ProfileCard from '../organisms/ProfileCard'; // Importarías el componente de perfil

export default function ProfilePage() {
  // Aquí obtendrías la información del usuario (probablemente desde un contexto)
  // const { user } = useAuth();

  return (
    <MainLayout>
      <div className="text-center py-16 sm:py-24">
        <Title level="h1" className="text-align-center mb-20">Mi Perfil</Title>
          <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
          <div className="max-w-md w-full bg-white p-8 rounded-lg shadow flex flex-col items-center">
            {/* Aquí eventualmente iría el organismo ProfileCard */}
            <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
              <div className="max-w-md w-full bg-white p-8 rounded-lg shadow flex flex-col items-center">
                {/* ...contenido... */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}