/**
 * Vanilla Extract theme contract for @mono/ui-tokens.
 *
 * Provides CSS custom property references (`vars`) for all token branches,
 * and three pre-built theme classes:
 *   - `lightThemeClass` — default light mode (Solarized light + M3 roles)
 *   - `darkThemeClass` — dark mode (Solarized dark inversion)
 *   - `expressiveThemeClass` — Gemini-inspired expressive mode (light base +
 *     heavier rounding, kinetic easing, tinted elevation overrides)
 *
 * Gradient surfaces for the expressive theme are NOT in CSS vars — they are
 * applied via `data-theme="expressive"` CSS selectors since multi-stop rgba
 * gradients cannot be interpolated through CSS custom properties.
 *
 * Usage in *.css.ts files:
 *   import { vars, lightThemeClass } from '@mono/ui-tokens/theme.css.js';
 *   const myStyle = style({ color: vars.color.primary });
 */
import { createThemeContract, createTheme } from '@vanilla-extract/css';
import { tokens } from './tokens.js';
import { colorDark } from './tokens.dark.js';
import { expressiveOverrides } from './tokens.expressive.js';

// ---------------------------------------------------------------------------
// 1. Theme contract — defines the CSS var shape (leaves are null → auto-named)
// ---------------------------------------------------------------------------

export const vars = createThemeContract({
  color: {
    primary: null,
    onPrimary: null,
    primaryContainer: null,
    onPrimaryContainer: null,
    secondary: null,
    onSecondary: null,
    secondaryContainer: null,
    onSecondaryContainer: null,
    tertiary: null,
    onTertiary: null,
    tertiaryContainer: null,
    onTertiaryContainer: null,
    error: null,
    onError: null,
    errorContainer: null,
    onErrorContainer: null,
    surface: null,
    surfaceVariant: null,
    surfaceDim: null,
    surfaceBright: null,
    surfaceContainerLow: null,
    surfaceContainer: null,
    surfaceContainerHigh: null,
    onSurface: null,
    onSurfaceVariant: null,
    outline: null,
    outlineVariant: null,
    inverseSurface: null,
    inverseOnSurface: null,
    inversePrimary: null,
    warning: null,
    success: null,
    info: null,
  },
  spacing: {
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
    '2xl': null,
  },
  elevation: {
    none: null,
    sm: null,
    md: null,
    lg: null,
  },
  motion: {
    duration: {
      instant: null,
      fast: null,
      normal: null,
      slow: null,
      deliberate: null,
      thinking: null,
    },
    easing: {
      standard: null,
      decelerate: null,
      accelerate: null,
      anticipate: null,
      thinking: null,
    },
  },
  radius: {
    none: null,
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
    '2xl': null,
    full: null,
  },
});

// ---------------------------------------------------------------------------
// 2. Shared non-color values (identical for all three themes)
// ---------------------------------------------------------------------------

const baseValues = {
  spacing: tokens.spacing,
  motion: tokens.motion,
  radius: tokens.radius,
  elevation: tokens.elevation,
};

// ---------------------------------------------------------------------------
// 3. Light theme class
// ---------------------------------------------------------------------------

export const lightThemeClass = createTheme(vars, {
  color: tokens.color,
  ...baseValues,
});

// ---------------------------------------------------------------------------
// 4. Dark theme class
// ---------------------------------------------------------------------------

export const darkThemeClass = createTheme(vars, {
  color: colorDark,
  ...baseValues,
});

// ---------------------------------------------------------------------------
// 5. Expressive theme class — light base + radius / motion / elevation overrides
// ---------------------------------------------------------------------------

export const expressiveThemeClass = createTheme(vars, {
  color: tokens.color,
  spacing: tokens.spacing,
  elevation: {
    none: tokens.elevation.none,
    sm: expressiveOverrides.elevation.sm,
    md: expressiveOverrides.elevation.md,
    lg: tokens.elevation.lg,
  },
  motion: {
    duration: {
      ...tokens.motion.duration,
      normal: expressiveOverrides.motion.duration.normal, // 500ms M3 default spatial
      fast: expressiveOverrides.motion.duration.fast, // 350ms M3 fast spatial
      slow: expressiveOverrides.motion.duration.slow, // 650ms M3 slow spatial
    },
    easing: {
      ...tokens.motion.easing,
      standard: expressiveOverrides.motion.easing.standard, // M3 expressive spatial — bouncy overshoot
    },
  },
  radius: {
    ...tokens.radius,
    md: expressiveOverrides.radius.md,
    lg: expressiveOverrides.radius.lg,
    xl: expressiveOverrides.radius.xl,
    '2xl': expressiveOverrides.radius['2xl'],
  },
});
