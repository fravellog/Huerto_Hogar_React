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

  test('muestra error si hay campos vacíos', async () => {
    render(<RegisterForm />);
    fireEvent.submit(document.getElementById('registro'));
    expect(await screen.findByText(/completa todos los campos/i)).toBeInTheDocument();
  });

  test('limpia error al cambiar correo', async () => {
    localStorage.setItem('usuariosRegistrados', JSON.stringify([
      { nombre: 'Pepe', correo: 'pepe@mail.com', contrasena: '123' }
    ]));
    render(<RegisterForm />);
    const correoInput = screen.getByLabelText(/correo/i);
    fireEvent.change(correoInput, { target: { value: 'pepe@mail.com' } });
    expect(screen.getByText(/ya está registrado/i)).toBeInTheDocument();
    fireEvent.change(correoInput, { target: { value: '' } });
    expect(screen.queryByText(/ya está registrado/i)).not.toBeInTheDocument();
  });

  test('muestra error si el correo ya está registrado solo al hacer submit', async () => {
    localStorage.setItem('usuariosRegistrados', JSON.stringify([
      { nombre: 'Pepe', correo: 'pepe@mail.com', contrasena: '123' }
    ]));
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: 'otro@mail.com' } });
    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: 'pepe@mail.com' } });
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: 'Pepe' } });
    fireEvent.change(screen.getByLabelText(/contraseñ?a?/i), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText(/confirmar/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /registrarse/i }));
    expect(await screen.findByText(/ya está registrado/i)).toBeInTheDocument();
  });

  test('muestra error personalizado si onRegister rechaza con mensaje', async () => {
    const onRegister = jest.fn(() => Promise.reject(new Error('Error personalizado')));
    render(<RegisterForm onRegister={onRegister} />);
    fillAndSubmit({ nombre: 'Juan', correo: 'nuevo@mail.com', contrasena: '123456', confirmar: '123456' });
    expect(await screen.findByText(/error personalizado/i)).toBeInTheDocument();
  });

  test('muestra error genérico si onRegister rechaza sin mensaje', async () => {
    const onRegister = jest.fn(() => Promise.reject({}));
    render(<RegisterForm onRegister={onRegister} />);
    fillAndSubmit({ nombre: 'Juan', correo: 'nuevo2@mail.com', contrasena: '123456', confirmar: '123456' });
    expect(await screen.findByText(/error al registrarse/i)).toBeInTheDocument();
  });

  test('muestra error si localStorage.setItem lanza excepción', async () => {
    const setItemOriginal = window.localStorage.setItem;
    window.localStorage.setItem = () => { throw new Error('Fallo localStorage'); };
    render(<RegisterForm />);
    fillAndSubmit({ nombre: 'ErrorLS', correo: 'errorls@mail.com', contrasena: '123456', confirmar: '123456' });
    // Espera a que aparezca el mensaje de error específico o el genérico
    await waitFor(() => {
      expect(screen.getByText((content) =>
        content && (content.toLowerCase().includes('fallo localstorage') || content.toLowerCase().includes('error al registrarse'))
      )).toBeInTheDocument();
    });
    window.localStorage.setItem = setItemOriginal;
  });


  test('muestra error genérico si onRegister lanza excepción sin mensaje', async () => {
    const onRegister = jest.fn(() => { throw {}; });
    render(<RegisterForm onRegister={onRegister} />);
    fillAndSubmit({ nombre: 'ErrorOnReg', correo: 'erroronreg@mail.com', contrasena: '123456', confirmar: '123456' });
    expect(await screen.findByText((t) => t.toLowerCase().includes('error al registrarse'))).toBeInTheDocument();
  });

  test('deshabilita el botón y muestra "Registrando..." cuando loading', async () => {
    let resolver;
    const onRegister = jest.fn(() => new Promise(r => { resolver = r; }));
    render(<RegisterForm onRegister={onRegister} />);
    fillAndSubmit({ nombre: 'Juan', correo: 'juan2@mail.com', contrasena: '123456', confirmar: '123456' });
    expect(screen.getByRole('button', { name: /registrando/i })).toBeDisabled();
    resolver();
    await waitFor(() => expect(onRegister).toHaveBeenCalled());
  });

  test('limpia los campos tras registro exitoso', async () => {
    render(<RegisterForm />);
    fillAndSubmit({ nombre: 'Limpio', correo: 'limpio@mail.com', contrasena: '123456', confirmar: '123456' });
    await waitFor(() => expect(screen.getByLabelText(/nombre/i)).toHaveValue(''));
    expect(screen.getByLabelText(/correo/i)).toHaveValue('');
    expect(screen.getByLabelText(/contraseñ?a?/i)).toHaveValue('');
    expect(screen.getByLabelText(/confirmar/i)).toHaveValue('');
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