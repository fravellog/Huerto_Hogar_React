// src/components/organisms/LoginForm.test.js
import React from 'react';
// ¡Importamos desde nuestro nuevo archivo!
import { render, screen, fireEvent, waitFor } from '../../test-utils'; 
import LoginForm from './LoginForm';

describe('Pruebas para el organismo LoginForm', () => {

  const mockOnLogin = jest.fn();

  beforeEach(() => {
    mockOnLogin.mockClear();
  });

  test('1. Debe renderizar los labels y el botón', () => {
    // Renderizamos. El wrapper ya incluye <MemoryRouter>
    render(<LoginForm onLogin={mockOnLogin} />); 
    
    // Ahora que el componente no "crasha", SÍ encontrará los labels
    expect(screen.getByLabelText('Correo')).toBeInTheDocument();
    expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();
  });

  test('2. Debe llamar a onLogin con los datos correctos', async () => {
    mockOnLogin.mockResolvedValue(true); 
    render(<LoginForm onLogin={mockOnLogin} />); 

    // Usamos los labels exactos de tu componente
    fireEvent.change(screen.getByLabelText('Correo'), { target: { value: 'test@test.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));

    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith({
        correo: 'test@test.com',
        contrasena: '123456'
      });
    });
  });
});