module.exports = {
  extends: ['standard-with-typescript', 'plugin:prettier/recommended'],
  rules: {
    'no-console': 'error',
    'no-restricted-imports': ['error', {patterns: ['@mui/*/*/*']}],
  },
}
