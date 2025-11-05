import React from 'react';
// Importamos 'fireEvent' para simular eventos
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './Input';
 
 
describe('Input Component (Atom)', () => {
 
 
  it('debería renderizar con el placeholder correcto', () => {
    // 1. Arrange
    render(<Input placeholder="Buscar producto..." />);
 
 
    // 2. Act & Assert
    // 'getByPlaceholderText' es la mejor forma de encontrar este input
    expect(screen.getByPlaceholderText('Buscar producto...')).toBeInTheDocument();
  });
 
 
  it('debería mostrar el valor (value) que se le pasa', () => {
    // Esto prueba que es un "componente controlado"
    // 1. Arrange
    render(<Input value="Tomates" xx={jest.fn()} />);
 
 
    // 2. Act & Assert
    // 'getByDisplayValue' encuentra un input por el texto que tiene escrito
    expect(screen.getByDisplayValue('Tomates')).toBeInTheDocument();
  });
 
 
  it('debería llamar a onChange cuando el usuario escribe', () => {
    // 1. Arrange
    const handleChangeMock = jest.fn();
    render(<Input xx={handleChangeMock} placeholder="Escribe aquí" />);
    
    // 2. Act
    // Encontramos el input
    const inputElement = screen.getByPlaceholderText('Escribe aquí');
    
    // Simulamos un evento de "cambio" (como si el usuario escribiera)
    // Le pasamos un objeto de evento simulado con el nuevo valor
    fireEvent.change(inputElement, { target: { value: 'Lechuga' } });
 
 
    // 3. Assert
    // Verificamos que nuestro mock fue llamado
    expect(handleChangeMock).toHaveBeenCalledTimes(1);
  });
 
 
  it('debería tener el tipo (type) correcto', () => {
    // 1. Arrange
    render(<Input type="password" placeholder="Clave" />);
 
 
    // 2. Act & Assert
    // Verificamos que el input encontrado tiene el atributo 'type'
    expect(screen.getByPlaceholderText('Clave')).toHaveAttribute('type', 'password');
  });
 
 
});