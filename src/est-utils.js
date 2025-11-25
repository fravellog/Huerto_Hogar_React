// src/test-utils.js
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// --- 👇 ¡ASEGÚRATE DE QUE ESTA RUTA SEA CORRECTA! ---
// Esta es la ruta desde test-utils.js hasta tu AuthContext.js
import { AuthContext } from './components/context/AuthContext'; // Ruta corregida

// Este es el wrapper
const AllTheProviders = ({ children, authValue }) => {
  return (
    <AuthContext.Provider value={authValue}>
      <MemoryRouter>
        {children}
      </MemoryRouter>
    </AuthContext.Provider>
  );
};

// Esta es la función de render personalizada
const customRender = (ui, options = {}) => {
  // Define un valor de 'auth' por defecto para que las pruebas no fallen
  const defaultAuthValue = {
    isAuthenticated: false,
    logout: jest.fn(),
    login: jest.fn(),
  };

  // Permite sobreescribir el 'authValue' si el test lo necesita
  const authValue = options.authValue || defaultAuthValue;

  return render(ui, {
    wrapper: (props) => <AllTheProviders {...props} authValue={authValue} />,
    ...options,
  });
};

// Re-exporta todo desde testing-library
export * from '@testing-library/react';

// Exporta nuestro render personalizado como el 'default'
export { customRender as render };