// src/components/organisms/FeaturedProducts.test.js
import React from 'react';
// ¡Importamos desde nuestro nuevo archivo!
import { render, screen } from '../../test-utils'; 
import FeaturedProducts from './FeaturedProducts';

const mockProducts = [
  { id: 1, nombre: 'Tomate', precio: '$1.000', imagen: 'tomate.jpg' },
  { id: 2, nombre: 'Lechuga', precio: '$500', imagen: 'lechuga.jpg' }
];

describe('Pruebas para el organismo FeaturedProducts', () => {

  test('1. Debe renderizar un ProductCard por cada producto', () => {
    // Renderizamos CON el wrapper
    // (Por si ProductCard usa <Link> o AuthContext)
    render(<FeaturedProducts products={mockProducts} />);

    expect(screen.getByRole('heading', { name: 'Ofertas Destacadas' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Tomate' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Lechuga' })).toBeInTheDocument();
  });

  test('2. No debe renderizar NADA si no hay productos', () => {
    render(<FeaturedProducts products={[]} />);
    expect(container.firstChild).toBeNull();
  });
});