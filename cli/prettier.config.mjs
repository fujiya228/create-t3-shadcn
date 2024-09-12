const config = {
  arrowParens: "always",
  printWidth: 80,
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: ["<THIRD_PARTY_MODULES>", "", "^~/", "^[.][.]/", "^[.]/"],
  importOrderBuiltinModulesToTop: true,
  importOrderCombineTypeAndValueImports: true,
  importOrderMergeDuplicateImports: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderSortSpecifiers: true,
};

export default config;