// src/test-utils.js
import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from './components/context/AuthContext';

// Valores por defecto para AuthContext
const defaultAuth = {
	isAuthenticated: false,
	user: null,
	login: jest.fn(),
	logout: jest.fn(),
};

// Wrapper global para tests: MemoryRouter + AuthContext
const Wrapper = ({ children, authProps }) => (
	<MemoryRouter>
		<AuthContext.Provider value={authProps || defaultAuth}>
			{children}
		</AuthContext.Provider>
	</MemoryRouter>
);

const customRender = (ui, options = {}) => {
	const { authProps, ...rest } = options;
	return render(ui, { wrapper: (props) => <Wrapper {...props} authProps={authProps} />, ...rest });
};

export * from '@testing-library/react';
export { customRender as render };