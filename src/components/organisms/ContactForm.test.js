import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactForm from './ContactForm';

// Le decimos a Jest que vamos a controlar el tiempo (para el setTimeout)
jest.useFakeTimers();

describe('Pruebas para el organismo ContactForm', () => {
  test('Debe rellenar, enviar y limpiar el formulario', () => {
    render(<ContactForm />);

    // 1. Buscamos los elementos
    const inputNombre = screen.getByPlaceholderText('Nombre');
    const inputEmail = screen.getByPlaceholderText('Email');
    const inputMensaje = screen.getByPlaceholderText('Mensaje');
    const botonEnviar = screen.getByRole('button', { name: /Enviar/i });

    // 2. Simulamos al usuario escribiendo
    fireEvent.change(inputNombre, { target: { value: 'Usuario de Prueba' } });
    fireEvent.change(inputEmail, { target: { value: 'test@correo.com' } });
    fireEvent.change(inputMensaje, { target: { value: 'Hola mundo' } });

    // 3. Simulamos el envío
    fireEvent.click(botonEnviar);

    // 4. Verificamos el resultado del handleSubmit
    
    // Los campos deben limpiarse
    expect(inputNombre.value).toBe('');
    expect(inputEmail.value).toBe('');
    expect(inputMensaje.value).toBe('');
    
    // 5. Avanzamos el reloj de Jest 3 segundos para probar el timer
    jest.advanceTimersByTime(3000);
    // El test confirma que el timer (que pone 'enviado' en false) se ejecuta sin errores.
  });
});