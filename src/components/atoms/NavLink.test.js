import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// ¡Importante! Necesitamos un Router para que el test funcione
import { MemoryRouter } from 'react-router-dom';
import NavLink from './NavLink';
 
 
describe('NavLink Component (Atom)', () => {
 
 
  it('debería renderizar el enlace con el texto y la ruta (href) correctos', () => {
    // 1. Arrange
    // Envolvemos el componente en <MemoryRouter>
    render(
      <MemoryRouter>
        <NavLink to="/productos">Productos</NavLink>
      </MemoryRouter>
    );
 
 
    // 2. Act & Assert
    const linkElement = screen.getByRole('link', { name: /Productos/i });
    
    expect(linkElement).toBeInTheDocument();
    // Verificamos que el 'href' se generó correctamente
    expect(linkElement).toHaveAttribute('href', '/productos');
  });
 
 
  it('debería aplicar la clase "active" cuando la ruta coincide', () => {
    // 1. Arrange
    // Usamos 'initialEntries' para decirle al MemoryRouter
    // cuál es la URL "actual" en la que estamos.
    render(
      <MemoryRouter initialEntries={['/nosotros']}>
        <NavLink to="/nosotros">Nosotros</NavLink>
      </MemoryRouter>
    );
 
 
    // 2. Act & Assert
    const linkElement = screen.getByRole('link', { name: /Nosotros/i });
    expect(linkElement).toHaveClass('active');
  });
 
 
  it('NO debería aplicar la clase "active" cuando la ruta NO coincide', () => {
    // 1. Arrange
    // La URL actual es '/inicio', pero el enlace es para '/nosotros'
    render(
      <MemoryRouter initialEntries={['/inicio']}>
        <NavLink to="/nosotros">Nosotros</NavLink>
      </MemoryRouter>
    );
 
 
    // 2. Act & Assert
    const linkElement = screen.getByRole('link', { name: /Nosotros/i });
    expect(linkElement).not.toHaveClass('active');
  });
 
 
});
