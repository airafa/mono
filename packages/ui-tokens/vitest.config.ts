import { defineConfig } from 'vitest/config';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

export default defineConfig({
  plugins: [vanillaExtractPlugin()],
  test: {
    environment: 'node',
    globals: true,
    include: ['**/*.{test,spec,typetest}.?(c|m)[jt]s?(x)'],
  },
});
