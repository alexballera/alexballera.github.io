import * as astro from 'eslint-plugin-astro';

import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default [
  js.configs.recommended,
  ...astro.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: 2022, sourceType: 'module' }
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
    }
  },
  {
    files: ['**/*.astro','**/*.ts','**/*.js'],
    languageOptions: {
      globals: {
        URL: 'readonly',
        Response: 'readonly',
        document: 'readonly',
        window: 'readonly'
      }
    }
  },
  {
    ignores: ['dist', 'node_modules', '.astro', '.astro/**']
  }
];
