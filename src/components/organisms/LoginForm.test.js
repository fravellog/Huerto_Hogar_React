// src/components/organisms/LoginForm.test.js
import React from 'react';
// ¡Importamos desde nuestro nuevo archivo!
import { render, screen, fireEvent, waitFor } from '../../test-utils'; 
import LoginForm from './LoginForm';

describe('Pruebas para el organismo LoginForm', () => {
  test('7. Muestra error genérico si onLogin rechaza sin mensaje', async () => {
    mockOnLogin.mockRejectedValueOnce({}); // error sin .message
    render(<LoginForm onLogin={mockOnLogin} />);
    fireEvent.change(screen.getByLabelText('Correo'), { target: { value: 'a@a.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));
    expect(await screen.findByText('Error al iniciar sesión.')).toBeInTheDocument();
  });

  test('3. Muestra error si campos vacíos', async () => {
    render(<LoginForm onLogin={mockOnLogin} />);
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));
    expect(await screen.findByText('Por favor, ingrese correo y contraseña.')).toBeInTheDocument();
    expect(mockOnLogin).not.toHaveBeenCalled();
  });

  test('4. Muestra error si onLogin rechaza', async () => {
    mockOnLogin.mockRejectedValueOnce(new Error('Credenciales incorrectas'));
    render(<LoginForm onLogin={mockOnLogin} />);
    fireEvent.change(screen.getByLabelText('Correo'), { target: { value: 'a@a.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));
    expect(await screen.findByText('Credenciales incorrectas')).toBeInTheDocument();
  });

  test('5. Muestra "Ingresando..." cuando loading', async () => {
    // Simula promesa pendiente
    let resolveLogin;
    mockOnLogin.mockImplementation(() => new Promise(res => { resolveLogin = res; }));
    render(<LoginForm onLogin={mockOnLogin} />);
    fireEvent.change(screen.getByLabelText('Correo'), { target: { value: 'a@a.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));
    expect(screen.getByRole('button')).toHaveTextContent('Ingresando...');
    // Resuelve la promesa para limpiar
    resolveLogin();
    await waitFor(() => expect(screen.getByRole('button')).toHaveTextContent('Ingresar'));
  });

  test('6. Renderiza el enlace de registro y el botón de Google', () => {
    render(<LoginForm onLogin={mockOnLogin} />);
    expect(screen.getByRole('link', { name: /registrarse/i })).toHaveAttribute('href', '/registro');
    expect(screen.getByText('¿No tienes una cuenta?')).toBeInTheDocument();
    expect(document.getElementById('google-signin-button')).toBeInTheDocument();
  });

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