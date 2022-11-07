module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:promise/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'promise/catch-or-return': 'off',
    'promise/always-return': 'off',
    'no-console': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
  },
}
