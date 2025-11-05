import React from 'react';
// render: Renderiza el componente en un DOM virtual
// screen: Es tu "ventana" para buscar elementos en el DOM virtual
// fireEvent: Nos permite simular eventos (como clics)
import { render, screen, fireEvent } from '@testing-library/react';
 
 
// Importa el "matcher" de jest-dom para tener mejores aserciones
// (Ej. .toBeInTheDocument(), .toBeDisabled())
import '@testing-library/jest-dom';
 
 
// El componente que vamos a probar
import Button from './Button';
 
 
// 'describe' agrupa pruebas relacionadas (una "suite")
describe('Button Component (Atom)', () => {
 
 
  // 'it' (o 'test') es la prueba individual
  it('debería renderizar el texto (children) correctamente', () => {
    // 1. Arrange (Organizar): Renderiza el componente
    render(<Button>Click aquí</Button>);
 
 
    // 2. Act (Actuar) & 3. Assert (Afirmar)
    // Busca un elemento por el texto que contiene y
    // afirma que existe en el documento.
    expect(screen.getByText('Click aquí')).toBeInTheDocument();
  });
 
 
  it('debería llamar a la función onClick cuando se hace clic', () => {
    // 1. Arrange
    // Creamos un "spy" o "mock" de Jest: una función falsa que sabe si fue llamada.
    const handleClickMock = jest.fn();
 
 
    render(<Button xx={handleClickMock}>Click me</Button>);
 
 
    // 2. Act
    // Simula un evento de clic en el botón que encontramos por su texto
    fireEvent.click(screen.getByText('Click me'));
 
 
    // 3. Assert
    // Afirmamos que nuestra función "mock" fue llamada exactamente 1 vez
    expect(handleClickMock).toHaveBeenCalledTimes(1);
  });
 
 
  it('NO debería llamar a onClick cuando está deshabilitado (disabled)', () => {
    // 1. Arrange
    const handleClickMock = jest.fn();
 
 
    render(
      <Button xx={handleClickMock} disabled={true}>
        No me toques
      </Button>
    );
 
 
    // 2. Act
    // Intentamos hacer clic
    const buttonElement = screen.getByText('No me toques');
    fireEvent.click(buttonElement);
 
 
    // 3. Assert (La prueba clave)
    // Afirmamos que el mock NO fue llamado
    expect(handleClickMock).not.toHaveBeenCalled();
 
 
    // Prueba extra de buena práctica:
    // También afirmamos que el botón está realmente deshabilitado en el DOM
    expect(buttonElement).toBeDisabled();
  });
 
 
  it('debería aplicar el tipo (type) de botón correctamente', () => {
    // 1. Arrange
    render(<Button type="submit">Enviar</Button>);
 
 
    // 2. Act & Assert
    // La mejor forma de buscar un botón es por su "rol" (buena práctica de accesibilidad)
    // y su nombre (el texto que ve el usuario).
    const button = screen.getByRole('button', { name: /Enviar/i });
    expect(button).toHaveAttribute('type', 'submit');
  });
 
 
});