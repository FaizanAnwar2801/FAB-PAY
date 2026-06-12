import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import onlyWarn from "eslint-plugin-only-warn";
import pluginTurbo from "eslint-plugin-turbo";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import("typescript-eslint").Config} */
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginTurbo.configs["flat/recommended"],
  {
    plugins: {
      "only-warn": onlyWarn,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        React: "writable",
        JSX: "writable",
      },
    },
  },
  prettierConfig,
  {
    ignores: [".*.js", "node_modules/", "dist/"],
  },
];