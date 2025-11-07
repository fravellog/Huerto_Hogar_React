import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import MiniHero from './MiniHero';

describe('Pruebas para el organismo MiniHero', () => {
  test('Debe renderizar el título y el enlace a la tienda', () => {
    // Envolvemos en MemoryRouter porque MiniHero usa <Link>
    render(
      <MemoryRouter>
        <MiniHero />
      </MemoryRouter>
    );

    expect(screen.getByText('La Huerta')).toBeInTheDocument();
    expect(screen.getByText('🥬')).toBeInTheDocument();

    const linkElement = screen.getByRole('link', { name: 'Tienda' });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/tienda');
  });
});