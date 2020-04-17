module.exports = {
  env: {
    browser: true,
    es6: true,
  },

  extends: ["react-app", "plugin:react/recommended", "prettier", "airbnb"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },

  plugins: ["react"],
  rules: {
    "arrow-body-style": "off",
    "arrow-parens": "off",
    "implicit-arrow-linebreak": "off",
    "object-curly-newline": "off",
    "nonblock-statement-body-position": "off",
    "no-else-return": "off",
    curly: "off",
    "max-len": "off",
    indent: "off",
    "no-param-reassign": "off",
    quotes: ["error", "double", { avoidEscape: true }],
    "no-console": "off",
    "react/jsx-wrap-multilines": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-props-no-spreading": "off",
    "react/jsx-one-expression-per-line": "off",
    "react/prop-types": ["error", { ignore: ["children", "history", "theme"] }],
    "import/no-dynamic-require": "off",
    "import/prefer-default-export": "off",
    "no-nested-ternary": "off",
    "operator-linebreak": "off",
    "func-names": ["error", "as-needed"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
  },
};
