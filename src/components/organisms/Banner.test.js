import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Banner from './Banner';

describe('Pruebas para el organismo Banner', () => {
  test('Debe renderizar el título y el párrafo del banner', () => {
    render(<Banner />);

    // Probamos que el título exista
    const titulo = screen.getByRole('heading', { name: 'Tienda la Huerta' });
    expect(titulo).toBeInTheDocument();

    // Probamos que el texto de bienvenida exista
    const parrafo = screen.getByText(
      /Bienvenidos a nuestra página dedicada a la huerta/i
    );
    expect(parrafo).toBeInTheDocument();
  });
});