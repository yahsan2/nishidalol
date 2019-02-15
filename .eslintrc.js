const prettierrc = require('./.prettierrc.js')

module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ['vue','prettier'],
  extends: [
    'plugin:vue/essential',
    "plugin:prettier/recommended", // we added this line
    '@vue/prettier'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ["error", "never"],
    'prettier/prettier': [
      "error",
      prettierrc
    ]
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  }
}
