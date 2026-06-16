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
    // The MUI variant uses Vanilla Extract for ALL custom layout styling.
    // The `sx` prop (Emotion runtime CSS-in-JS) is disallowed — move styles
    // to `.css.ts` files (VE), recipes, or sprinkles instead.
    files: ['packages/ui-mui/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'JSXAttribute[name.name="sx"]',
          message:
            'The `sx` prop is disallowed in @mono/ui-mui. Use Vanilla Extract (.css.ts), recipes, or sprinkles from @mono/ui-tokens instead.',
        },
      ],
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
