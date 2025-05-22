/** @type {import("prettier").Config} */
const config = {
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  singleQuote: false,
  printWidth: 140,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: ["", "^~/", "^[../]", "^[./]"],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "4.4.0",
};

module.exports = config;
