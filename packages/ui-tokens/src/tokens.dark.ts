/**
 * Dark-mode color overrides.
 * Only `colorDark` values differ from the light base; all other tokens
 * (spacing, font, elevation, motion, radius, gradient) remain unchanged.
 *
 * Solarized dark mapping: dark-mode uses the `colorDark` palette branch
 * of the token tree. Variants should swap `color` → `colorDark` when
 * `themeMode === 'dark'`.
 */
import type { TokenTree } from './tokens.js';

export type ColorDark = TokenTree['colorDark'];

export const colorDark = {
  primary: '#268bd2',
  onPrimary: '#002b36',
  primaryContainer: '#073642',
  onPrimaryContainer: '#93a1a1',
  secondary: '#2aa198',
  onSecondary: '#002b36',
  secondaryContainer: '#073642',
  onSecondaryContainer: '#93a1a1',
  tertiary: '#6c71c4',
  onTertiary: '#002b36',
  tertiaryContainer: '#073642',
  onTertiaryContainer: '#93a1a1',
  error: '#dc322f',
  onError: '#fdf6e3',
  errorContainer: '#3b0b0b',
  onErrorContainer: '#f8d0d0',
  surface: '#002b36',
  surfaceVariant: '#073642',
  surfaceDim: '#001e28',
  surfaceBright: '#0a3342',
  surfaceContainerLow: '#07303e',
  surfaceContainer: '#073642',
  surfaceContainerHigh: '#0a3d4d',
  onSurface: '#839496',
  onSurfaceVariant: '#93a1a1',
  outline: '#586e75',
  outlineVariant: '#073642',
  inverseSurface: '#fdf6e3',
  inverseOnSurface: '#002b36',
  inversePrimary: '#1a6fa8',
  warning: '#b58900',
  success: '#859900',
  info: '#268bd2',
} as const satisfies ColorDark;
