import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Label from './Label';
 
 
describe('Label Component (Atom)', () => {
 
 
  it('debería renderizar el texto y el atributo "htmlFor" correctamente', () => {
    // 1. Arrange
    render(<Label htmlFor="nombre">Nombre</Label>);
 
 
    // 2. Act & Assert
    // Encontramos la etiqueta por su texto
    const labelElement = screen.getByText('Nombre');
    
    // Verificamos que es un <label>
    expect(labelElement.tagName).toBe('LABEL');
    // Verificamos que tiene el 'htmlFor' (¡clave para accesibilidad!)
    expect(labelElement).toHaveAttribute('htmlFor', 'nombre');
  });
 
 
});