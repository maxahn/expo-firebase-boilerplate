module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'prettier'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react', 'react-hooks', 'prettier'
  ],
  rules: {
    quotes: [ 'error', 'single' ]
  },
};
