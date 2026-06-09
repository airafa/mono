import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
  },
  {
    ignores: [
      'node_modules/',
      '**/dist/',
      'build/',
      'coverage/',
      '**/storybook-static/',
      '*.min.js',
      '.nx/',
      '**/.vitepress/dist/',
      '**/.vitepress/cache/',
      '**/*.d.ts',
    ],
  },
);
