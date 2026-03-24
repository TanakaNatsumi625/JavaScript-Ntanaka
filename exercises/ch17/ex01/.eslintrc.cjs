module.exports = {
  parserOptions: {
    sourceType: "module",
  },
  extends: ["eslint:recommended", "google", "prettier"],
  ignorePatterns: ["node_modules/", "dist/", "format_sample.js", ".eslintrc.cjs"],
  env: {
    es2022: true,
    node: true,
    jest: true,
    browser: true,
  },
  rules: {
  },
  root: true,
};
