import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartTable from './CartTable';

const mockItems = [{ id: 1, nombre: 'Tomate', cantidad: 2, precio: 1000 }];
const mockOnRemove = jest.fn();
const mockOnPay = jest.fn();
const mockFormatCLP = (value) => `$${value.toLocaleString('es-CL')}`;

describe('Pruebas para el organismo CartTable', () => {

  beforeEach(() => {
    mockOnRemove.mockClear();
    mockOnPay.mockClear();
  });

  // --- PRUEBA 1 (Cubre la rama CON formatCLP) ---
  test('1. Debe renderizar items con el formateador (formatCLP)', () => {
    render(
      <CartTable 
        items={mockItems} 
        total="$2.000" 
        onRemove={mockOnRemove}
        onPay={mockOnPay}
        formatCLP={mockFormatCLP} 
      />
    );
    expect(screen.getByText('Total: $2.000')).toBeInTheDocument();
  });

  // --- PRUEBA 2 (Prueba el callback onRemove) ---
  test('2. Debe llamar a onRemove al hacer clic en Eliminar', () => {
    render(<CartTable items={mockItems} onRemove={mockOnRemove} onPay={mockOnPay} />);
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }));
    expect(mockOnRemove).toHaveBeenCalledWith(mockItems[0]);
  });
  
  // --- PRUEBA 3 (Prueba el callback onPay) ---
  test('3. Debe llamar a onPay al hacer clic en Pagar', () => {
    render(<CartTable items={mockItems} onRemove={mockOnRemove} onPay={mockOnPay} />);
    fireEvent.click(screen.getByRole('button', { name: /Pagar/i }));
    expect(mockOnPay).toHaveBeenCalledTimes(1);
  });

  // --- PRUEBA 4 (Cubre la rama items.length === 0) ---
  test('4. Debe mostrar un mensaje si el carrito está vacío', () => {
    render(<CartTable items={[]} onRemove={mockOnRemove} onPay={mockOnPay} />);
    expect(screen.getByText('No hay productos en el carrito')).toBeInTheDocument();
  });

  // --- PRUEBA 5 (Cubre la rama SIN formatCLP) ---
  test('5. Debe renderizar items con el formato por defecto (sin formatCLP)', () => {
    render(
      <CartTable 
        items={mockItems} 
        total="$2000"
        onRemove={mockOnRemove}
        onPay={mockOnPay}
      />
    );
    expect(screen.getByText('Total: $2000')).toBeInTheDocument();
  });

  // --- ¡ESTA PRUEBA CUBRE LAS RAMAS FALTANTES DE LÍNEA 3 y 27! ---
  test('6. Debe usar los valores por defecto de "items" y "total"', () => {
    // Renderizamos SIN pasar 'items' y SIN pasar 'total'
    render(
      <CartTable 
        onRemove={mockOnRemove}
        onPay={mockOnPay}
      />
    );

    // 1. Verificamos que el default de items=[] funciona
    expect(screen.getByText('No hay productos en el carrito')).toBeInTheDocument();

    // 2. Verificamos que el default de total=0 funciona (Línea 3 y 27)
    // Buscamos el span que EMPIEZA con "Total: "
    const totalSpan = screen.getByText((content) => content.startsWith('Total:'));
    
    // Verificamos que su contenido completo es "Total: 0"
    expect(totalSpan).toHaveTextContent('Total: 0');
  });
});