import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import CartTable from './CartTable';

describe('CartTable - pruebas adicionales robustas', () => {
  const items = [
    { id: 1, nombre: 'Tomate', cantidad: 1, precio: 500 },
    { id: 2, nombre: 'Lechuga', cantidad: 3, precio: 300 }
  ];
  let onRemove;
  let onPay;
  let formatCLP;

  beforeEach(() => {
    onRemove = jest.fn();
    onPay = jest.fn();
    formatCLP = jest.fn((v) => `$${v}`);
  });

  test('onRemove recibe el item correcto aunque el texto del botón tenga distinto case', () => {
    render(<CartTable items={items} onRemove={onRemove} onPay={onPay} />);
    const botones = screen.getAllByText(/eliminar/i);
    expect(botones.length).toBeGreaterThanOrEqual(2);
    const filaLechuga = screen.getByText(/Lechuga/i).closest('tr');
    const botonEliminarLechuga = filaLechuga.querySelector('button');
    fireEvent.click(botonEliminarLechuga);
    expect(onRemove).toHaveBeenCalledWith(items[1]);
  });

  test('formatCLP se llama con el total cuando es numérico y su resultado se muestra', () => {
    render(<CartTable items={items} total={2500} onRemove={onRemove} onPay={onPay} formatCLP={formatCLP} />);
    expect(formatCLP.mock.calls.some(call => call[0] === 2500)).toBe(true);
    expect(screen.getByText(/Total:/i)).toHaveTextContent('$2500');
    formatCLP.mockClear();
    cleanup();
    render(<CartTable items={items} total={'2.500'} onRemove={onRemove} onPay={onPay} formatCLP={formatCLP} />);
    expect(formatCLP).not.toHaveBeenCalledWith(2.500);
    expect(formatCLP).not.toHaveBeenCalledWith(2500);
  });

  test('muestra el valor devuelto por formatCLP cuando existe', () => {
    const customFormatter = jest.fn(() => 'FORMATEADO');
    render(<CartTable items={items} total={100} onRemove={onRemove} onPay={onPay} formatCLP={customFormatter} />);
    expect(customFormatter.mock.calls.some(call => call[0] === 100)).toBe(true);
    expect(screen.getByText(/Total:/i)).toHaveTextContent('FORMATEADO');
  });

  test('el botón de "Realizar Pago" funciona aunque el texto tenga variaciones (case/espacios)', () => {
    render(<CartTable items={items} onRemove={onRemove} onPay={onPay} />);
    const payButton = screen.getByRole('button', { name: /realizar\s*pago/i });
    fireEvent.click(payButton);
    expect(onPay).toHaveBeenCalledTimes(1);
  });

  test('no muestra el total cuando items está vacío incluso si se pasa total prop (numérico o string)', () => {
    render(<CartTable items={[]} total={500} onRemove={onRemove} onPay={onPay} />);
    expect(screen.getByText(/No hay productos en el carrito/i)).toBeInTheDocument();
    expect(screen.queryByText(/Total:/i)).toBeNull();
    cleanup();
    render(<CartTable items={[]} total={'500'} onRemove={onRemove} onPay={onPay} />);
    expect(screen.queryByText(/Total:/i)).toBeNull();
  });

  // --------- TESTS ADICIONALES PARA COBERTURA TOTAL ---------

  test('usa valores por defecto si no se pasan props', () => {
    render(<CartTable />);
    expect(screen.getByText(/No hay productos en el carrito/i)).toBeInTheDocument();
    expect(screen.queryByText(/Total:/i)).toBeNull();
  });

  test('usa el formato por defecto si no se pasa formatCLP', () => {
    render(<CartTable items={items} total={1234} onRemove={onRemove} onPay={onPay} />);
    expect(screen.getByText('Total: $1234')).toBeInTheDocument();
    expect(screen.getAllByText(/\$[0-9]+/).length).toBeGreaterThan(1);
  });

  test('no falla si no se pasa onRemove ni onPay', () => {
    render(<CartTable items={items} total={1000} />);
    // Click en eliminar
    const botonEliminar = screen.getAllByText(/eliminar/i)[0];
    fireEvent.click(botonEliminar);
    // Click en pagar
    const payButton = screen.getByRole('button', { name: /realizar\s*pago/i });
    fireEvent.click(payButton);
    // No debe lanzar error (no hay expect, solo cobertura)
  });

  test('muestra el total como string si se pasa total como string y sin formatCLP', () => {
    render(<CartTable items={items} total={'1.234'} onRemove={onRemove} onPay={onPay} />);
    expect(screen.getByText('Total: 1.234')).toBeInTheDocument();
  });

  test('renderiza correctamente cuando item no tiene id', () => {
    const itemsSinId = [{ nombre: 'Zanahoria', cantidad: 2, precio: 100 }];
    render(<CartTable items={itemsSinId} total={200} onRemove={onRemove} onPay={onPay} />);
    expect(screen.getByText(/Zanahoria/)).toBeInTheDocument();
    expect(screen.getByText('Total: $200')).toBeInTheDocument();
  });
});