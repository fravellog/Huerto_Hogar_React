import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Asegúrate que los estilos base de Tailwind se importen aquí o en index.css
import './index.css';
import App from './App.jsx';
import './styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);