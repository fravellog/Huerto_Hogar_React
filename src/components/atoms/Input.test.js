// src/components/atoms/Input/Input.test.js (Actualizado al 100%)
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from './Input'; // Asegúrate que la ruta sea correcta

describe('Pruebas para el átomo Input', () => {

  test('1. Debe renderizarse con el placeholder correcto', () => {
    render(<Input type="text" placeholder="Escribe tu nombre" />);
    const inputElement = screen.getByPlaceholderText('Escribe tu nombre');
    expect(inputElement).toBeInTheDocument();
  });

  test('2. Debe llamar a la función onChange cuando el usuario escribe', () => {
    const handleChangeMock = jest.fn();
    // Renderizamos sin 'type' para probar el default en la búsqueda de role
    render(<Input onChange={handleChangeMock} />);
    
    // 'getByRole('textbox')' funciona porque el tipo por defecto es "text"
    const inputElement = screen.getByRole('textbox');
    
    fireEvent.change(inputElement, { target: { value: 'Hola' } });
    expect(handleChangeMock).toHaveBeenCalledTimes(1);
  });
  
  // --- ¡NUEVA PRUEBA PARA CUBRIR LA RAMA FALTANTE! ---
  test('3. Debe usar "text" como type por defecto si no se especifica', () => {
    // Renderizamos SIN la prop "type"
    render(<Input placeholder="Input por defecto" />);
    
    const inputElement = screen.getByPlaceholderText('Input por defecto');
    
    // Verificamos que el tipo por defecto "text" se aplicó
    expect(inputElement).toHaveAttribute('type', 'text');
  });

});