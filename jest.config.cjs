module.exports = {
  // Le dice a Jest que use un "navegador virtual" (jsdom)
  testEnvironment: 'jest-environment-jsdom', 
  
  // Le dice a Jest que cargue los "matchers" (.toBeInTheDocument, etc.)
  // antes de cada prueba.
  setupFilesAfterEnv: ['<rootDir>/setupTests.js'] 
};