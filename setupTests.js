// jest-dom agrega "matchers" personalizados para Jest 
// que nos permiten hacer cosas como:
// expect(element).toBeInTheDocument();
import '@testing-library/jest-dom';
// Polyfill para TextEncoder/TextDecoder que react-router-dom v6 necesita
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
