module.exports = {
  // Le dice a Jest que simule un entorno de navegador (DOM)
  testEnvironment: 'jsdom',

  // Le dice a Jest que corra este archivo ANTES de cada prueba
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'],

  // Mapeador de módulos:
  // Si Jest ve un 'import "styles.css"', lo tratará como un objeto vacío
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
};