module.exports = {
  presets: [
    '@babel/preset-env',
    // Esto le dice a Babel cómo transformar React (JSX)
    ['@babel/preset-react', { runtime: 'automatic' }] 
  ]
};