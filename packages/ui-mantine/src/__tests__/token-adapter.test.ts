import { describe, it, expect } from 'vitest';
import { buildMantineTheme, getMantineColorScheme } from '../token-adapter.js';

describe('buildMantineTheme', () => {
  it('sets primaryColor to brand', () => {
    const theme = buildMantineTheme('light');
    expect(theme.primaryColor).toBe('brand');
  });

  it('brand color array has exactly 10 entries', () => {
    const theme = buildMantineTheme('light');
    expect(theme.colors?.brand).toHaveLength(10);
  });

  it('light mode brand[5] equals light primary token', () => {
    const theme = buildMantineTheme('light');
    // Solarized blue — light primary
    expect(theme.colors?.brand?.[5]).toBe('#268bd2');
  });

  it('dark mode brand[5] equals dark primary token', () => {
    const theme = buildMantineTheme('dark');
    // Solarized blue — dark primary is the same value
    expect(theme.colors?.brand?.[5]).toBe('#268bd2');
  });

  it('expressive mode applies enlarged radius to md/lg/xl', () => {
    const light = buildMantineTheme('light');
    const expressive = buildMantineTheme('expressive');
    expect(expressive.radius?.md).not.toEqual(light.radius?.md);
    expect(expressive.radius?.lg).not.toEqual(light.radius?.lg);
  });

  it('expressive mode sets themeMode in other', () => {
    const theme = buildMantineTheme('expressive');
    expect((theme.other as { themeMode: string }).themeMode).toBe('expressive');
  });

  it('light and dark modes set themeMode in other', () => {
    expect((buildMantineTheme('light').other as { themeMode: string }).themeMode).toBe('light');
    expect((buildMantineTheme('dark').other as { themeMode: string }).themeMode).toBe('dark');
  });
});

describe('getMantineColorScheme', () => {
  it('returns dark for dark mode', () => {
    expect(getMantineColorScheme('dark')).toBe('dark');
  });

  it('returns light for light mode', () => {
    expect(getMantineColorScheme('light')).toBe('light');
  });

  it('returns light for expressive mode (no dark MantineProvider)', () => {
    expect(getMantineColorScheme('expressive')).toBe('light');
  });
});
