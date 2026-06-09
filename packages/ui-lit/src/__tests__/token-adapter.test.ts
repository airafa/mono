import { describe, it, expect } from 'vitest';
import { getLitTokenProperties } from '../token-adapter.js';

describe('getLitTokenProperties', () => {
  it('returns a CSS property map with expected keys', () => {
    const props = getLitTokenProperties('light');
    expect(props['--color-primary']).toBeDefined();
    expect(props['--color-surface']).toBeDefined();
    expect(props['--font-body-family']).toBeDefined();
    expect(props['--radius-md']).toBeDefined();
    expect(props['--elevation-sm']).toBeDefined();
    expect(props['--motion-duration-normal']).toBeDefined();
  });

  it('light mode --color-primary is Solarized blue', () => {
    expect(getLitTokenProperties('light')['--color-primary']).toBe('#268bd2');
  });

  it('dark mode --color-primary is Solarized dark primary', () => {
    expect(getLitTokenProperties('dark')['--color-primary']).toBe('#268bd2');
  });

  it('dark mode --color-surface differs from light mode', () => {
    const light = getLitTokenProperties('light');
    const dark = getLitTokenProperties('dark');
    expect(dark['--color-surface']).not.toBe(light['--color-surface']);
  });

  it('expressive mode --radius-md is larger than light mode', () => {
    const light = getLitTokenProperties('light');
    const expressive = getLitTokenProperties('expressive');
    const lightPx = parseInt(light['--radius-md'] ?? '0', 10);
    const expressivePx = parseInt(expressive['--radius-md'] ?? '0', 10);
    expect(expressivePx).toBeGreaterThan(lightPx);
  });

  it('expressive mode uses anticipate easing', () => {
    const props = getLitTokenProperties('expressive');
    expect(props['--motion-easing-standard']).toContain('cubic-bezier');
  });

  it('expressive mode --color-primary is light-mode primary (no dark inversion)', () => {
    // expressive is light-based
    const expressive = getLitTokenProperties('expressive');
    const light = getLitTokenProperties('light');
    expect(expressive['--color-primary']).toBe(light['--color-primary']);
  });
});
