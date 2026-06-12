import js from "@eslint/js";
import prettierConfig from "eslint-config-prettier";
import onlyWarn from "eslint-plugin-only-warn";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import pluginTurbo from "eslint-plugin-turbo";
import globals from "globals";
import tseslint from "typescript-eslint";

/*
 * This is a custom ESLint configuration for use with
 * internal (bundled by their consumer) libraries
 * that utilize React.
 */

/** @type {import("typescript-eslint").Config} */
export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  pluginTurbo.configs["flat/recommended"],
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  {
    plugins: {
      "react-hooks": reactHooksPlugin,
      "only-warn": onlyWarn,
    },
    rules: {
      ...reactHooksPlugin.configs.recommended.rules,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  prettierConfig,
  {
    ignores: [".*.js", "node_modules/", "dist/"],
  },
];