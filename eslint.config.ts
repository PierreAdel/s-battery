import { builtinModules } from "module";

import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

import js from "@eslint/js";
import vitest from "@vitest/eslint-plugin";

export default defineConfig([
  // Ignore the folder globally
  globalIgnores([".react-router/types/**", "build/**", "node_modules/**"]),
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    settings: { react: { version: "detect" } },
    ...react.configs.flat.recommended,
    ...react.configs.flat["jsx-runtime"],
  },
  reactHooks.configs["recommended-latest"],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    files: [
      "**/*.{test,spec}.{js,jsx,ts,tsx}",
      "**/__tests__/**/*.{js,jsx,ts,tsx}",
    ],
    ...vitest.configs.recommended,
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
  },
  prettier, // turn off stylistic rules that conflict with Prettier
  {
    plugins: { "simple-import-sort": simpleImportSort },
    rules: {
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // 1. Node built-ins
            ["^node:", `^(${builtinModules.join("|")})(/|$)`],
            // 2. React and other external packages
            ["^react", "^[a-z]"],
            // 3. Aliases (e.g. @/)
            ["^@/"],
            // 4. Parent/relative imports
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // 5. Style imports
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      // Optional hygiene
      "no-duplicate-imports": "error",
    },
  },
]);
