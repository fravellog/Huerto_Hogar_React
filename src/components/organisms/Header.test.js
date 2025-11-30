// src/components/organisms/Header.test.js
import React from 'react';
// ¡Importamos desde nuestro nuevo archivo! (Ajusta la ruta si es necesario)
import { render, screen, fireEvent } from '../../test-utils'; 
import Header from './Header';

describe('Pruebas para el organismo Header', () => {
  test('8. Cierra el menú móvil al hacer clic en cada enlace autenticado', () => {
    const mockAuth = { isAuthenticated: true, user: { nombre: 'Test' }, login: jest.fn(), logout: jest.fn() };
    render(<Header />, { authProps: mockAuth });
    const hamburger = screen.getByLabelText(/abrir menú/i);
    fireEvent.click(hamburger);
    // Todos los enlaces del panel móvil
    const links = [
      '🛍️ Tienda',
      '📰 Blog',
      '👤 Perfil',
      '✉️ Contacto',
      '🛒 Carrito',
    ];
    links.forEach(text => {
      // Reabrir menú para cada enlace
      if (!document.body.classList.contains('no-scroll')) {
        fireEvent.click(hamburger);
      }
      // Buscar el enlace dentro del panel móvil
      const mobileLink = Array.from(document.querySelectorAll('.mobile-panel__content .nav-link')).find(el => el.textContent === text);
      expect(mobileLink).toBeTruthy();
      fireEvent.click(mobileLink);
      expect(document.body.classList.contains('no-scroll')).toBe(false);
    });
  });

  test('9. Cierra el menú móvil y ejecuta logout al hacer clic en "Cerrar sesión" en móvil', () => {
    const mockAuth = { isAuthenticated: true, user: { nombre: 'Test' }, login: jest.fn(), logout: jest.fn() };
    render(<Header />, { authProps: mockAuth });
    const hamburger = screen.getByLabelText(/abrir menú/i);
    fireEvent.click(hamburger);
    // Botón "Cerrar sesión" en el panel móvil
    const cerrarSesionBtn = Array.from(document.querySelectorAll('.mobile-panel__content .nav-link')).find(el => el.textContent === '🚪 Cerrar sesión');
    expect(cerrarSesionBtn).toBeTruthy();
    fireEvent.click(cerrarSesionBtn);
    expect(document.body.classList.contains('no-scroll')).toBe(false);
    expect(mockAuth.logout).toHaveBeenCalledTimes(1);
  });

  test('1. Debe mostrar "Iniciar Sesión" si NO está autenticado', () => {
    render(<Header />);
    // Debe haber al menos un enlace "Iniciar Sesión"
    const loginLinks = screen.getAllByText('🔑 Iniciar Sesión');
    expect(loginLinks.length).toBeGreaterThan(0);
    // No debe haber ningún enlace "Perfil"
    expect(screen.queryAllByText('👤 Perfil').length).toBe(0);
  });

  test('2. Debe mostrar "Perfil" si SÍ está autenticado', () => {
    const mockAuth = { isAuthenticated: true, user: { nombre: 'Test' }, login: jest.fn(), logout: jest.fn() };
    render(<Header />, { authProps: mockAuth });
    // Debe haber al menos un enlace "Perfil"
    const perfilLinks = screen.getAllByText('👤 Perfil');
    expect(perfilLinks.length).toBeGreaterThan(0);
    // No debe haber ningún enlace "Iniciar Sesión"
    expect(screen.queryAllByText('🔑 Iniciar Sesión').length).toBe(0);
  });
  
  test('3. Debe llamar a logout() al hacer clic en "Cerrar sesión"', () => {
    const mockAuth = { isAuthenticated: true, user: { nombre: 'Test' }, login: jest.fn(), logout: jest.fn() };
    render(<Header />, { authProps: mockAuth });
    // Puede haber más de un botón "Cerrar sesión" (desktop y móvil)
    const cerrarSesionBtns = screen.queryAllByText('🚪 Cerrar sesión');
    expect(cerrarSesionBtns.length).toBeGreaterThan(0);
    fireEvent.click(cerrarSesionBtns[0]);
    expect(mockAuth.logout).toHaveBeenCalledTimes(1);
  });
  
    test('4. Abre y cierra el menú móvil con el botón hamburguesa', () => {
      render(<Header />);
      const hamburger = screen.getByLabelText(/abrir menú/i);
      // Abre menú
      fireEvent.click(hamburger);
      expect(document.body.classList.contains('no-scroll')).toBe(true);
      // Cierra menú: selecciona el botón correcto dentro del panel móvil
      const closeBtns = screen.getAllByLabelText(/cerrar menú/i);
      // Busca el botón con la clase 'mobile-panel__close'
      const closeBtn = closeBtns.find(btn => btn.className.includes('mobile-panel__close'));
      expect(closeBtn).toBeTruthy();
      fireEvent.click(closeBtn);
      expect(document.body.classList.contains('no-scroll')).toBe(false);
    });

    test('5. Cierra el menú móvil al hacer clic en el backdrop', () => {
      render(<Header />);
      const hamburger = screen.getByLabelText(/abrir menú/i);
      fireEvent.click(hamburger);
      const backdrop = document.querySelector('.mobile-backdrop');
      expect(backdrop).toBeTruthy();
      fireEvent.click(backdrop);
      expect(document.body.classList.contains('no-scroll')).toBe(false);
    });

    test('6. Navega correctamente por los enlaces principales autenticado', () => {
      const mockAuth = { isAuthenticated: true, user: { nombre: 'Test' }, login: jest.fn(), logout: jest.fn() };
      render(<Header />, { authProps: mockAuth });
      expect(screen.getAllByText('🛍️ Tienda').length).toBeGreaterThan(0);
      expect(screen.getAllByText('📰 Blog').length).toBeGreaterThan(0);
      expect(screen.getAllByText('✉️ Contacto').length).toBeGreaterThan(0);
      expect(screen.getAllByText('🛒 Carrito').length).toBeGreaterThan(0);
    });

    test('7. Navega correctamente por el enlace de login no autenticado', () => {
      render(<Header />);
      expect(screen.getAllByText('🔑 Iniciar Sesión').length).toBeGreaterThan(0);
    });
});