import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BlogCard from './BlogCard';

describe('Pruebas para la molécula BlogCard', () => {

  // 1. Creamos un objeto "mock" (simulado) que se parece a la prop 'post'
  const mockPost = {
    title: 'Mi Título de Blog de Prueba',
    summary: 'Este es un resumen de prueba...',
    imageSrc: '/imagen/prueba.jpg',
    link: 'https://ejemplo.com',
    linkText: 'Leer Más'
  };

  test('Debe renderizar todo el contenido del post correctamente', () => {
    // 2. Renderizamos la molécula pasándole el mock
    render(<BlogCard post={mockPost} />);

    // 3. Hacemos aserciones de que todos los átomos y datos están presentes
    
    // Probamos el átomo Image
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', mockPost.title);
    expect(image).toHaveAttribute('src', mockPost.imageSrc);

    // Probamos el título
    expect(screen.getByRole('heading', { name: mockPost.title })).toBeInTheDocument();

    // Probamos el resumen
    expect(screen.getByText(mockPost.summary)).toBeInTheDocument();

    // Probamos el enlace (que es un <a>, no un <Button>)
    const link = screen.getByRole('link', { name: mockPost.linkText });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', mockPost.link);
    expect(link).toHaveAttribute('target', '_blank'); // Importante para links externos
  });
});