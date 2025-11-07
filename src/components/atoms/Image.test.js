// src/components/atoms/Image.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Image from './Image';

describe('Pruebas para el átomo Image', () => {

  const testSrc = 'https://ejemplo.com/imagen.jpg';
  const testAlt = 'Descripción de prueba';

  test('Debe renderizar con todos los atributos correctos', () => {
    render(<Image src={testSrc} alt={testAlt} />);
    
    // Buscamos la imagen por su texto alternativo
    const imgElement = screen.getByAltText(testAlt);
    
    // Verificamos los atributos
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', testSrc);
    expect(imgElement).toHaveAttribute('loading', 'lazy');
    expect(imgElement).toHaveAttribute('decoding', 'async');
  });
});