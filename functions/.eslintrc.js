module.exports = {
  "root": true,
  "env": {
    "es6": true,
    "node": true,

  },
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
  },
  "extends": [
    "eslint:recommended",
    "google",
  ],
  "rules": {
    "indent": ["off", 2],
    "object-curly-spacing": ["error", "always"],
    "quotes": ["error", "double"],
  },
};
