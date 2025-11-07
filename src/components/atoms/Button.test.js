// Importamos herramientas de RTL y el componente
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Button from './Button';

// 'describe' es una función de JEST para agrupar pruebas
describe('Pruebas para el componente Button (Átomo)', () => {

  // 'test' (o 'it') es una función de JEST para una prueba individual
  test('1. Debe renderizarse con el texto correcto', () => {
    // Usamos 'render' (de RTL) para dibujar el componente
    render(<Button>Click aquí</Button>);
    
    // Usamos 'screen' (de RTL) para buscar el elemento
    const buttonElement = screen.getByText(/Click aquí/i);
    
    // 'expect' es la función de aserción de JEST
    // '.toBeInTheDocument' es un "matcher" de jest-dom
    expect(buttonElement).toBeInTheDocument();
  });

  // Otra prueba de JEST
  test('2. Debe llamar a la función onClick', () => {
    // 'jest.fn()' es una función "espía" (mock) de JEST
    const handleClickMock = jest.fn();
    
    render(<Button onClick={handleClickMock}>Púlsame</Button>);
    
    // Simulamos el clic (de RTL)
    fireEvent.click(screen.getByText(/Púlsame/i));
    
    // Verificamos con JEST si el mock fue llamado
    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });

});