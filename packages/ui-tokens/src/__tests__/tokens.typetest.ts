import { describe, it } from 'vitest';
import { tokens } from '../tokens.js';
import type { TokenTree } from '../tokens.js';
import { colorDark } from '../tokens.dark.js';
import type { ColorDark } from '../tokens.dark.js';
import { expressiveOverrides } from '../tokens.expressive.js';
import type { ExpressiveOverrides } from '../tokens.expressive.js';

// Compile-time type assertions: if the token objects diverge from their types,
// TypeScript errors here before any test runs.
const _tokensCheck: TokenTree = tokens;
const _darkCheck: ColorDark = colorDark;
const _expressiveCheck: ExpressiveOverrides = expressiveOverrides;

describe('Token type assertions', () => {
  it('tokens satisfies TokenTree', () => {
    void (_tokensCheck satisfies TokenTree);
  });

  it('colorDark satisfies ColorDark', () => {
    void (_darkCheck satisfies ColorDark);
  });

  it('expressiveOverrides satisfies ExpressiveOverrides', () => {
    void (_expressiveCheck satisfies ExpressiveOverrides);
  });
});
