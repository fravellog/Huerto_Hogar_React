// src/components/pages/NotFoundPage.jsx
import MainLayout from '../templates/MainLayout';
import Title from '../atoms/Title';
import { Link } from 'react-router-dom';
import Button from '../atoms/Button';

export default function NotFoundPage() {
  return (
    <MainLayout>
      <div className="text-center py-16 sm:py-24">
        <Title level="h1" className="text-red-600 !text-5xl sm:!text-6xl">Error 404</Title>
        <p className="text-xl text-gray-700 mt-4 mb-8">
          ¡Ups! La página que buscas no se encuentra.
        </p>
        <Link to="/">
          <Button className="px-6 py-3 text-lg">
             Volver al Inicio
          </Button>
        </Link>
      </div>
    </MainLayout>
  );
}