module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  settings: {react: {version: 'detect'}},
  rules: {
    'react/no-unknown-property': ['error', {ignore: ['css']}],
    'react/prop-types': 'off',
    'react/jsx-no-target-blank': ['error', {allowReferrer: true}],
  },
}
