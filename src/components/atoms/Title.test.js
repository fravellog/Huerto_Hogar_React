import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Title from './Title';

describe('Pruebas para el átomo Title', () => {

  // --- PRUEBA 1 (Valor por defecto) ---
  test('1. Debe renderizar como H2 por defecto', () => {
    render(<Title>Soy un H2 por defecto</Title>);
    const headingElement = screen.getByRole('heading', { level: 2 });
    
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe('H2');
    expect(headingElement).toHaveClass('text-3xl mb-3');
  });
  
  // --- PRUEBA 2 (Valor válido) ---
  test('2. Debe renderizar como H1 cuando se lo pasamos', () => {
    render(<Title level="h1">Soy un H1</Title>);
    const headingElement = screen.getByRole('heading', { level: 1 });
    
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe('H1');
    expect(headingElement).toHaveClass('text-4xl mb-4');
  });

  // --- PRUEBA 3 (Fallback de 'level' inválido) ---
  test('3. Debe usar H2 como TAG y clase si el level es inválido', () => {
    // Probamos la rama 'levelStyles[level] || levelStyles.h2'
    // y la lógica de validación de 'Tag'
    render(<Title level="h7">Soy un H2 (fallback)</Title>);
    
    const element = screen.getByText('Soy un H2 (fallback)');

    // Verificamos que la etiqueta renderizada fue "H2" (el nuevo fallback del Tag)
    expect(element.tagName).toBe('H2');
    // Verificamos que la CLASE también sea la de h2
    expect(element).toHaveClass('text-3xl mb-3');
  }); // <-- La Prueba 3 TERMINA AQUÍ

  // --- PRUEBA 4 (Fallback de 'className') ---
  test('4. Debe aplicar clases personalizadas pasadas por "className"', () => {
    // Esta prueba cubre la rama 'className = ""'
    render(<Title level="h1" className="mi-clase-personalizada">Título con clase</Title>);
    
    const element = screen.getByText('Título con clase');
    
    // Verificamos que tiene todas las clases
    expect(element).toHaveClass('font-bold'); // Clase base
    expect(element).toHaveClass('text-4xl'); // Clase de level
    expect(element).toHaveClass('mi-clase-personalizada'); // Clase personalizada
  });

}); // <-- Aquí termina el 'describe'