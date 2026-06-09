import { describe, it, expect } from 'vitest';
import { buildMuiTheme } from '../token-adapter.js';

describe('buildMuiTheme', () => {
  it('light mode sets palette.mode to light', () => {
    const theme = buildMuiTheme('light');
    expect(theme.palette.mode).toBe('light');
  });

  it('dark mode sets palette.mode to dark', () => {
    const theme = buildMuiTheme('dark');
    expect(theme.palette.mode).toBe('dark');
  });

  it('expressive mode sets palette.mode to light (no MUI dark variant)', () => {
    const theme = buildMuiTheme('expressive');
    expect(theme.palette.mode).toBe('light');
  });

  it('expressive mode has larger border radius than light mode', () => {
    const light = buildMuiTheme('light');
    const expressive = buildMuiTheme('expressive');
    expect(expressive.shape.borderRadius).toBeGreaterThan(light.shape.borderRadius as number);
  });

  it('light mode primary.main matches Solarized blue', () => {
    const theme = buildMuiTheme('light');
    expect(theme.palette.primary.main).toBe('#268bd2');
  });

  it('dark mode primary.main matches Solarized dark primary', () => {
    const theme = buildMuiTheme('dark');
    expect(theme.palette.primary.main).toBe('#268bd2');
  });
});
