import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import RegisterForm from './RegisterForm';

// Mock de localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    clear: () => { store = {}; }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('Pruebas para el organismo RegisterForm', () => {
  const mockOnRegister = jest.fn();

  beforeEach(() => {
    mockOnRegister.mockClear();
    localStorageMock.clear();
    render(
      <MemoryRouter>
        <RegisterForm onRegister={mockOnRegister} />
      </MemoryRouter>
    );
  });

  test('1. Debe mostrar error si las contraseñas no coinciden', () => {
    // --- 👇 ¡ESTA ES LA CORRECCIÓN! ---
    // Usamos getByLabelText con los strings exactos de tu componente [cite: RegisterForm.jsx]
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('Correo'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText('Confirmar contraseña'), { target: { value: '654321' } });

    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));
    expect(screen.getByText('Las contraseñas no coinciden.')).toBeInTheDocument();
  });

  test('2. Debe mostrar error en tiempo real si el correo ya existe', () => {
    const usuarios = [{ correo: 'existente@test.com' }];
    localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));

    // --- 👇 ¡ESTA ES LA CORRECCIÓN! ---
    const inputCorreo = screen.getByLabelText('Correo');
    fireEvent.change(inputCorreo, { target: { value: 'existente@test.com' } });

    expect(screen.getByText('El correo ya está registrado.')).toBeInTheDocument();
  });
  
  test('3. Debe llamar a onRegister si el formulario es válido', async () => {
    mockOnRegister.mockResolvedValue(true);

    // --- 👇 ¡ESTA ES LA CORRECCIÓN! ---
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText('Correo'), { target: { value: 'nuevo@test.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText('Confirmar contraseña'), { target: { value: '123456' } });

    fireEvent.click(screen.getByRole('button', { name: 'Registrarse' }));
    expect(screen.getByText('Registrando...')).toBeInTheDocument();

    await waitFor(() => {
      expect(mockOnRegister).toHaveBeenCalledTimes(1);
    });
  });
});