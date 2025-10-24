// src/components/pages/ContactPage.jsx
import MainLayout from '../templates/MainLayout';
import Title from '../atoms/Title';
import ContactForm from '../organisms/ContactForm';

export default function ContactPage() {
  return (
    <MainLayout>
      <Title level="h1" className="text-center mb-8">Contacto</Title>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 0' }}>
        <ContactForm />
      </div>
    </MainLayout>
  );
}