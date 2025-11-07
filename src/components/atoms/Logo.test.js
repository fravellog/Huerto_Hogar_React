// src/components/atoms/Logo.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Logo from './Logo';

describe('Pruebas para el átomo Logo', () => {

  test('1. Debe renderizarse con src/alt correctos y sin ID por defecto', () => {
    render(<Logo />);

    const logoElement = screen.getByRole('img', { name: 'Logo Huerto Hogar' });
    
    expect(logoElement).toBeInTheDocument();
    expect(logoElement).toHaveAttribute('src', '/Logos/logo_huerta.png');
    
    // Esta aserción prueba la rama "else" del ternario
    expect(logoElement).not.toHaveAttribute('id');
  });

  // --- ¡NUEVA PRUEBA PARA CUBRIR LA RAMA FALTANTE! ---
  test('2. Debe tener el ID "Logo-huerta" si se pasa la clase correcta', () => {
    // Aquí probamos la rama "if" del ternario
    render(<Logo className="logo-huerta" />);
    
    const logoElement = screen.getByRole('img', { name: 'Logo Huerto Hogar' });

    // Verificamos que ahora SÍ tiene el ID
    expect(logoElement).toHaveAttribute('id', 'Logo-huerta');
  });
});