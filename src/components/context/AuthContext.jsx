import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Inicializar estado a partir de localStorage para persistir sesión al navegar atrás/recargar
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('isAuthenticated')) || false;
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch (e) {
      /* istanbul ignore next */
      return null;
    }
  });

  // Función para iniciar sesión
  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    try {
      localStorage.setItem('isAuthenticated', JSON.stringify(true));
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (e) {
      // ignore storage errors
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    try {
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
    } catch (e) {
      // ignore
    }
  };

  // Mantener localStorage sincronizado si el usuario cambia fuera de login/logout
  useEffect(() => {
    try {
      localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
      localStorage.setItem('user', JSON.stringify(user));
    } catch (e) {
      // ignore
    }
  }, [isAuthenticated, user]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
