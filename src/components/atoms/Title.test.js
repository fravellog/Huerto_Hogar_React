import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Title from './Title';
 
 
describe('Title Component (Atom)', () => {
 
 
  it('debería renderizar un h1 con el texto correcto', () => {
    // 1. Arrange
    render(<Title level="h1">Título Principal</Title>);
 
 
    // 2. Act & Assert
    // 'getByRole' es la forma semántica de buscar un encabezado.
    // Le especificamos el 'level' (1 para <h1>)
    const heading = screen.getByRole('heading', { level: 1, name: /Título Principal/i });
    expect(heading).toBeInTheDocument();
  });
 
 
  it('debería renderizar un h3 con el texto correcto', () => {
    // 1. Arrange
    render(<Title level="h3">Subtítulo</Title>);
 
 
    // 2. Act & Assert
    const heading = screen.getByRole('heading', { level: 3, name: /Subtítulo/i });
    expect(heading).toBeInTheDocument();
  });
 
 
  it('debería usar h2 por defecto si no se especifica el nivel', () => {
    // 1. Arrange
    render(<Title>Título por Defecto</Title>);
 
 
    // 2. Act & Assert
    // El nivel 2 (<h2>) es el predeterminado en tu componente
    const heading = screen.getByRole('heading', { level: 2, name: /Título por Defecto/i });
    expect(heading).toBeInTheDocument();
  });
 
 
});