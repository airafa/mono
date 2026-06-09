import { describe, it, expect } from 'vitest';
import { buildRadixThemeProps } from '../token-adapter.js';

describe('buildRadixThemeProps', () => {
  it('light mode appearance is light', () => {
    expect(buildRadixThemeProps('light').appearance).toBe('light');
  });

  it('dark mode appearance is dark', () => {
    expect(buildRadixThemeProps('dark').appearance).toBe('dark');
  });

  it('expressive mode appearance is light (gradient via data-theme CSS)', () => {
    expect(buildRadixThemeProps('expressive').appearance).toBe('light');
  });

  it('expressive mode radius is full (Gemini circle language)', () => {
    expect(buildRadixThemeProps('expressive').radius).toBe('full');
  });

  it('light mode radius is medium (12px token)', () => {
    expect(buildRadixThemeProps('light').radius).toBe('medium');
  });

  it('all modes set an accentColor', () => {
    expect(buildRadixThemeProps('light').accentColor).toBeTruthy();
    expect(buildRadixThemeProps('dark').accentColor).toBeTruthy();
    expect(buildRadixThemeProps('expressive').accentColor).toBeTruthy();
  });
});
