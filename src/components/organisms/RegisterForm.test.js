import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterForm from './RegisterForm';

jest.mock('react-router-dom', () => ({
  Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>
}));

describe('RegisterForm', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const fillAndSubmit = ({
    nombre = '',
    correo = '',
    contrasena = '',
    confirmar = ''
  } = {}) => {
    if (nombre) fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: nombre } });
    if (correo) fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: correo } });
    if (contrasena) fireEvent.change(screen.getByLabelText(/contraseñ?a?/i), { target: { value: contrasena } });
    if (confirmar) fireEvent.change(screen.getByLabelText(/confirmar/i), { target: { value: confirmar } });
    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));
  };

  test('renderiza campos y botón', () => {
    render(<RegisterForm />);
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseñ?a?/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrarse/i })).toBeInTheDocument();
  });

  test('muestra error si el correo ya está registrado', async () => {
    localStorage.setItem('usuariosRegistrados', JSON.stringify([
      { nombre: 'Pepe', correo: 'pepe@mail.com', contrasena: '123' }
    ]));
    render(<RegisterForm />);
    fillAndSubmit({
      nombre: 'Pepe',
      correo: 'pepe@mail.com',
      contrasena: '123456',
      confirmar: '123456'
    });
    expect(await screen.findByText(/registrado/i)).toBeInTheDocument();
  });

  test('muestra error si las contraseñas no coinciden', async () => {
    render(<RegisterForm />);
    fillAndSubmit({
      nombre: 'Ana',
      correo: 'ana@mail.com',
      contrasena: '123456',
      confirmar: '654321'
    });
    expect(await screen.findByText(/no coinciden/i)).toBeInTheDocument();
  });

  test('llama a onRegister si todo es válido', async () => {
    const onRegister = jest.fn(() => Promise.resolve());
    render(<RegisterForm onRegister={onRegister} />);
    fillAndSubmit({
      nombre: 'Juan',
      correo: 'juan@mail.com',
      contrasena: '123456',
      confirmar: '123456'
    });
    await waitFor(() => expect(onRegister).toHaveBeenCalled());
  });

  test('el link de "Iniciar sesión" navega a /login', () => {
    render(<RegisterForm />);
    const link = screen.getByText(/iniciar sesión/i);
    expect(link).toHaveAttribute('href', '/login');
  });
});