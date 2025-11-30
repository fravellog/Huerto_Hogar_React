import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from './ProductCard';

// --- Configuración de Mocks ---
// Vamos a simular (mock) localStorage, alert y dispatchEvent
// para que el test no dependa del navegador real.

// 1. Mock de localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    }
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// 2. Mock de window.alert
// jest.spyOn(...) nos deja "espiar" una función
const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

// 3. Mock de window.dispatchEvent
const dispatchEventMock = jest.spyOn(window, 'dispatchEvent').mockImplementation(() => true);

// 4. Datos de prueba
const mockProduct = {
  id: 1,
  nombre: 'Tomate',
  precio: 1610,
  imagen: '/img/tomate.jpg'
};
// ------------------------------

describe('Pruebas para la molécula ProductCard', () => {

  test('4. Muestra el precio formateado correctamente', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Precio: $1.610/kg')).toBeInTheDocument();
  });

  test('5. Muestra el precio tal cual si no es número', () => {
    const prod = { ...mockProduct, precio: 'Precio especial' };
    render(<ProductCard product={prod} />);
    expect(screen.getByText('Precio especial')).toBeInTheDocument();
  });

  test('6. No rompe si localStorage.setItem lanza error', () => {
    const originalSetItem = window.localStorage.setItem;
    window.localStorage.setItem = () => { throw new Error('fail'); };
    render(<ProductCard product={mockProduct} />);
    fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }));
    // El test pasa si no se lanza excepción
    window.localStorage.setItem = originalSetItem;
  });

  // Limpiamos los mocks después de CADA prueba
  beforeEach(() => {
    localStorageMock.clear(); // Limpia el carrito
    alertMock.mockClear();     // Limpia el contador de llamadas a alert
    dispatchEventMock.mockClear(); // Limpia el contador de llamadas a dispatchEvent
  });

  test('1. Debe renderizar la información del producto', () => {
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByRole('heading', { name: 'Tomate' })).toBeInTheDocument();
    expect(screen.getByText('Precio: $1.610/kg')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('alt', 'Tomate');
    expect(screen.getByRole('button', { name: 'Agregar al carrito' })).toBeInTheDocument();
  });

  test('2. Debe agregar un producto NUEVO al localStorage al hacer clic', () => {
    render(<ProductCard product={mockProduct} />);

    // Simulamos el clic en el botón
    fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }));

    // ASERCIONES:
    
    // ¿Se llamó a la alerta?
    expect(alertMock).toHaveBeenCalledWith('Tomate agregado al carrito');

    // ¿Se disparó el evento para actualizar el header?
    expect(dispatchEventMock).toHaveBeenCalled();

    // ¿Se guardó correctamente en localStorage?
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    expect(carritoGuardado).toHaveLength(1);
    expect(carritoGuardado[0].id).toBe(1);
    expect(carritoGuardado[0].cantidad).toBe(1);
  });

  test('3. Debe AUMENTAR la cantidad de un producto EXISTENTE', () => {
    // 1. Setup: Ponemos un item en el carrito ANTES de la prueba
    const carritoInicial = [{ ...mockProduct, cantidad: 1 }];
    localStorage.setItem('carrito', JSON.stringify(carritoInicial));
    
    render(<ProductCard product={mockProduct} />);

    // 2. Simulamos el clic
    fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }));

    // 3. ASERCIONES:
    
    // ¿Se guardó correctamente?
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    expect(carritoGuardado).toHaveLength(1); // Sigue habiendo 1 item
    expect(carritoGuardado[0].id).toBe(1);
    expect(carritoGuardado[0].cantidad).toBe(2); // ¡La cantidad aumentó!
    
    // Los otros mocks también deben haber sido llamados
    expect(alertMock).toHaveBeenCalledTimes(1);
    expect(dispatchEventMock).toHaveBeenCalledTimes(1);
  });
});