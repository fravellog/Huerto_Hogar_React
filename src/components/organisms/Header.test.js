// src/components/organisms/Header.test.js
import React from 'react';
// ¡Importamos desde nuestro nuevo archivo! (Ajusta la ruta si es necesario)
import { render, screen, fireEvent } from '../../test-utils'; 
import Header from './Header';

describe('Pruebas para el organismo Header', () => {

  test('1. Debe mostrar "Iniciar Sesión" si NO está autenticado', () => {
    // Renderizamos CON el wrapper (ya viene por defecto)
    render(<Header />);
    
    expect(screen.getByText('🔑 Iniciar Sesión')).toBeInTheDocument();
    expect(screen.queryByText('👤 Perfil')).toBeNull();
  });

  test('2. Debe mostrar "Perfil" si SÍ está autenticado', () => {
    // Sobreescribimos el valor de 'auth' para esta prueba
    const mockAuth = { isAuthenticated: true, logout: jest.fn() };
    render(<Header />, { authValue: mockAuth }); 

    expect(screen.getByText('👤 Perfil')).toBeInTheDocument();
    expect(screen.queryByText('🔑 Iniciar Sesión')).toBeNull();
  });
  
  test('3. Debe llamar a logout() al hacer clic en "Cerrar sesión"', () => {
    const mockAuth = { isAuthenticated: true, logout: jest.fn() };
    render(<Header />, { authValue: mockAuth }); 

    fireEvent.click(screen.getByText('🚪 Cerrar sesión'));
    expect(mockAuth.logout).toHaveBeenCalledTimes(1);
  });
});