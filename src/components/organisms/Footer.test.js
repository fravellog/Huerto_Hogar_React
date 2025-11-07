import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from './Footer';

describe('Pruebas para el organismo Footer', () => {
  test('Debe renderizar el texto de copyright con el año actual', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    
    // Usamos una expresión regular para encontrar el texto
    const copyrightText = screen.getByText(`© ${currentYear} La Huerta.`);
    expect(copyrightText).toBeInTheDocument();
  });
});