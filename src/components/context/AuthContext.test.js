import React from 'react';
import { render, act } from '@testing-library/react';
import { AuthProvider, AuthContext } from './AuthContext';

// Utilidad para consumir el contexto en pruebas
function ContextConsumer({ onValue }) {
  return (
    <AuthContext.Consumer>
      {value => {
        onValue(value);
        return null;
      }}
    </AuthContext.Consumer>
  );
}

describe('AuthContext', () => {
  it('maneja error en localStorage.getItem para isAuthenticated', () => {
    const originalGetItem = window.localStorage.getItem;
    window.localStorage.getItem = (key) => {
      if (key === 'isAuthenticated') throw new Error('fail');
      return null;
    };
    let contextValue;
    render(
      <AuthProvider>
        <ContextConsumer onValue={v => { contextValue = v; }} />
      </AuthProvider>
    );
    expect(contextValue.isAuthenticated).toBe(false);
    window.localStorage.getItem = originalGetItem;
  });

  it('maneja error en localStorage.getItem para user', () => {
    const originalGetItem = window.localStorage.getItem;
    window.localStorage.getItem = (key) => {
      if (key === 'user') throw new Error('fail');
      return null;
    };
    let contextValue;
    render(
      <AuthProvider>
        <ContextConsumer onValue={v => { contextValue = v; }} />
      </AuthProvider>
    );
    expect(contextValue.user).toBe(null);
    window.localStorage.getItem = originalGetItem;
  });
  beforeEach(() => {
    localStorage.clear();
  });

  it('proporciona valores iniciales correctos', () => {
    let contextValue;
    render(
      <AuthProvider>
        <ContextConsumer onValue={v => { contextValue = v; }} />
      </AuthProvider>
    );
    expect(contextValue.isAuthenticated).toBe(false);
    expect(contextValue.user).toBe(null);
    expect(typeof contextValue.login).toBe('function');
    expect(typeof contextValue.logout).toBe('function');
  });

  it('login actualiza el estado y localStorage', () => {
    let contextValue;
    render(
      <AuthProvider>
        <ContextConsumer onValue={v => { contextValue = v; }} />
      </AuthProvider>
    );
    act(() => {
      contextValue.login({ nombre: 'Test' });
    });
    expect(contextValue.isAuthenticated).toBe(true);
    expect(contextValue.user).toEqual({ nombre: 'Test' });
    expect(JSON.parse(localStorage.getItem('isAuthenticated'))).toBe(true);
    expect(JSON.parse(localStorage.getItem('user'))).toEqual({ nombre: 'Test' });
  });

  it('logout limpia el estado y localStorage', () => {
    let contextValue;
    render(
      <AuthProvider>
        <ContextConsumer onValue={v => { contextValue = v; }} />
      </AuthProvider>
    );
    act(() => {
      contextValue.login({ nombre: 'Test' });
    });
    act(() => {
      contextValue.logout();
    });
    expect(contextValue.isAuthenticated).toBe(false);
    expect(contextValue.user).toBe(null);
    expect(localStorage.getItem('isAuthenticated')).toBe('false');
    expect(localStorage.getItem('user')).toBe('null');
  });

  it('sincroniza localStorage si cambia el usuario', () => {
    let contextValue;
    render(
      <AuthProvider>
        <ContextConsumer onValue={v => { contextValue = v; }} />
      </AuthProvider>
    );
    act(() => {
      contextValue.login({ nombre: 'Test' });
    });
    act(() => {
      contextValue.login({ nombre: 'Otro' });
    });
    expect(JSON.parse(localStorage.getItem('user'))).toEqual({ nombre: 'Otro' });
  });

  it('maneja errores de localStorage sin fallar', () => {
    const originalSetItem = window.localStorage.setItem;
    window.localStorage.setItem = () => { throw new Error('fail'); };
    let contextValue;
    render(
      <AuthProvider>
        <ContextConsumer onValue={v => { contextValue = v; }} />
      </AuthProvider>
    );
    expect(() => {
      act(() => {
        contextValue.login({ nombre: 'Test' });
      });
    }).not.toThrow();
    window.localStorage.setItem = originalSetItem;
  });
});
