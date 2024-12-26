import globals from 'globals';
import pluginJs from '@eslint/js';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-console': 'off',
      'prettier/prettier': 'error',
    },
  },
  pluginJs.configs.recommended,
  prettier,
  {
    plugins: {
      prettier: prettierPlugin,
    },
  },
];
