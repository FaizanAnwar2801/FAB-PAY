import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import prettierConfig from "eslint-config-prettier";
import onlyWarn from "eslint-plugin-only-warn";
import pluginTurbo from "eslint-plugin-turbo";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import("typescript-eslint").Config} */
export default [
  {
    ignores: [".*.js", ".next/", "node_modules/", "dist/", "out/"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginTurbo.configs["flat/recommended"],
  {
    plugins: {
      "@next/next": nextPlugin,
      "only-warn": onlyWarn,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
    },
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        React: "writable",
        JSX: "writable",
      },
    },
  },
  prettierConfig,
];