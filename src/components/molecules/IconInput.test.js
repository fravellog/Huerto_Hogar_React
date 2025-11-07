import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import IconInput from './IconInput';

describe('Pruebas para la molécula IconInput', () => {

  test('1. Debe renderizar el Label, Icono y Input si se pasan todas las props', () => {
    // Le pasamos un string como 'icon', como espera el componente
    render(
      <IconInput 
        id="test-input"
        label="Mi Label"
        icon="icono-prueba"
        placeholder="Escribe aquí"
      />
    );

    // ¿Existe el Label?
    expect(screen.getByText('Mi Label')).toBeInTheDocument();
    
    // ¿Existe el Icono?
    expect(screen.getByText('icono-prueba')).toBeInTheDocument();

    // ¿Existe el Input (buscado por su Label, la mejor forma)?
    expect(screen.getByLabelText('Mi Label')).toBeInTheDocument();
    
    // ¿Tiene el placeholder correcto?
    expect(screen.getByPlaceholderText('Escribe aquí')).toBeInTheDocument();
  });

  test('2. NO debe renderizar Label ni Icono si no se pasan las props', () => {
    render(
      <IconInput 
        id="test-input-2"
        placeholder="Sin label ni icono"
      />
    );
    
    // queryBy... es la forma de probar que algo NO existe
    // (devuelve null si no lo encuentra, en lugar de fallar)
    
    // ¿Existe el Label? No debería.
    expect(screen.queryByText('Mi Label')).toBeNull();

    // ¿Existe el Icono? No debería.
    expect(screen.queryByText('icono-prueba')).toBeNull();

    // El input sí debe existir
    expect(screen.getByPlaceholderText('Sin label ni icono')).toBeInTheDocument();
  });
});