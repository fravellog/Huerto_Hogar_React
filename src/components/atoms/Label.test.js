// src/components/atoms/Label/Label.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Label from './Label'; // Asegúrate que la ruta sea correcta

describe('Pruebas para el átomo Label', () => {

  test('1. Debe renderizar el texto contenido (children) correctamente', () => {
    render(<Label>Nombre de Usuario</Label>);
    
    // Buscamos el label por su texto
    const labelElement = screen.getByText('Nombre de Usuario');
    
    expect(labelElement).toBeInTheDocument();
  });

  test('2. Debe tener el atributo "for" correcto (usando la prop "htmlFor")', () => {
    // React usa "htmlFor" que se traduce a "for" en el HTML
    render(<Label htmlFor="username">Usuario</Label>);
    
    const labelElement = screen.getByText('Usuario');
    
    // Verificamos que el atributo "for" coincide con la prop "htmlFor"
    expect(labelElement).toHaveAttribute('for', 'username');
  });

});