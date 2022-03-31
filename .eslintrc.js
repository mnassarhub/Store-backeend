module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-console': 1, // Means error
    // 'prettier/prettier': 2, // Means error
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ]
  }
};
