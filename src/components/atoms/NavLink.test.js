// src/components/atoms/NavLink/NavLink.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// ¡Importante! Necesitamos un Router para probar enlaces
import { MemoryRouter } from 'react-router-dom';
import NavLink from './NavLink'; // Asegúrate que la ruta sea correcta

describe('Pruebas para el átomo NavLink', () => {

  // Creamos una función "wrapper" para no repetir el MemoryRouter
  const renderWithRouter = (ui) => {
    return render(ui, { wrapper: MemoryRouter });
  };

  test('1. Debe renderizar el texto del enlace', () => {
    // Usamos nuestro wrapper
    renderWithRouter(<NavLink to="/">Ir a Inicio</NavLink>);
    
    expect(screen.getByText('Ir a Inicio')).toBeInTheDocument();
  });

  test('2. Debe tener el atributo "href" correcto basado en la prop "to"', () => {
    renderWithRouter(<NavLink to="/perfil">Mi Perfil</NavLink>);
    
    // Buscamos el link por su "role" de accesibilidad
    const linkElement = screen.getByRole('link', { name: 'Mi Perfil' });
    
    // Verificamos que el "href" se haya generado correctamente
    // Nota: toHaveAttribute('href', '/perfil')
    expect(linkElement).toHaveAttribute('href', '/perfil');
  });

});