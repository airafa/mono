/**
 * MUI token adapter.
 *
 * Maps `@mono/ui-tokens` canonical values → MUI `ThemeOptions`.
 * Handles all three theme modes: 'light', 'dark', 'expressive'.
 *
 * Expressive mode: applies expressiveOverrides (heavier radius, kinetic motion,
 * tinted elevation). Gradient on AppBar header is applied via
 * `data-theme="expressive"` CSS class on the shell root — not via MUI theme —
 * because multi-stop rgba gradients cannot be CSS-var-interpolated.
 */
import { createTheme } from '@mui/material/styles';
import type { Theme, ThemeOptions } from '@mui/material/styles';
import { tokens, expressiveOverrides } from '@mono/ui-tokens';

type ThemeMode = 'light' | 'dark' | 'expressive';

function resolveColor(mode: ThemeMode) {
  return mode === 'dark' ? tokens.colorDark : tokens.color;
}

function buildThemeOptions(mode: ThemeMode): ThemeOptions {
  const color = resolveColor(mode);
  const isExpressive = mode === 'expressive';

  return {
    cssVariables: true,
    palette: {
      mode: mode === 'dark' ? 'dark' : 'light',
      primary: {
        main: color.primary,
        contrastText: color.onPrimary,
      },
      secondary: {
        main: color.secondary,
        contrastText: color.onSecondary,
      },
      error: {
        main: color.error,
        contrastText: color.onError,
      },
      warning: {
        main: color.warning,
      },
      success: {
        main: color.success,
      },
      background: {
        default: color.surface,
        paper: color.surfaceContainer,
      },
      text: {
        primary: color.onSurface,
        secondary: color.onSurfaceVariant,
      },
      divider: color.outline,
    },
    shape: {
      borderRadius: isExpressive
        ? parseInt(expressiveOverrides.radius.md, 10)
        : parseInt(tokens.radius.md, 10),
    },
    typography: {
      fontFamily: tokens.font.body.family,
      h1: {
        fontFamily: tokens.font.heading.h1.family,
        fontWeight: parseInt(tokens.font.heading.h1.weight, 10),
        fontSize: tokens.font.heading.h1.size,
        lineHeight: tokens.font.heading.h1.lineHeight,
      },
      body1: {
        fontFamily: tokens.font.body.family,
        fontSize: tokens.font.body.size,
        lineHeight: tokens.font.body.lineHeight,
      },
      body2: {
        fontFamily: tokens.font.label.sm.family,
        fontSize: tokens.font.label.sm.size,
        lineHeight: tokens.font.label.sm.lineHeight,
      },
    },
    shadows: [
      'none',
      isExpressive ? expressiveOverrides.elevation.sm : tokens.elevation.sm,
      isExpressive ? expressiveOverrides.elevation.md : tokens.elevation.md,
      tokens.elevation.lg,
      tokens.elevation.lg,
      tokens.elevation.lg,
      tokens.elevation.lg,
      tokens.elevation.lg,
      tokens.elevation.lg,
      tokens.elevation.lg,
      tokens.elevation.lg,
      tokens.elevation.lg,
      tokens.elevation.lg,
      tokens.elevation.lg,
      tokens.elevation.lg,
      tokens.elevation.lg,
      tokens.elevation.lg,
      tokens.elevation.lg,
      tokens.elevation.lg,
      tokens.elevation.lg,
      tokens.elevation.lg,
      tokens.elevation.lg,
      tokens.elevation.lg,
      tokens.elevation.lg,
      tokens.elevation.lg,
    ] as Theme['shadows'],
    transitions: {
      easing: {
        easeInOut: isExpressive
          ? expressiveOverrides.motion.easing.standard
          : tokens.motion.easing.standard,
        easeOut: tokens.motion.easing.decelerate,
        easeIn: tokens.motion.easing.accelerate,
        sharp: tokens.motion.easing.accelerate,
      },
      duration: {
        shortest: parseInt(tokens.motion.duration.instant, 10),
        shorter: parseInt(tokens.motion.duration.fast, 10),
        short: parseInt(tokens.motion.duration.normal, 10),
        standard: isExpressive
          ? parseInt(expressiveOverrides.motion.duration.normal, 10)
          : parseInt(tokens.motion.duration.normal, 10),
        complex: parseInt(tokens.motion.duration.slow, 10),
        enteringScreen: parseInt(tokens.motion.duration.slow, 10),
        leavingScreen: parseInt(tokens.motion.duration.fast, 10),
      },
    },
  };
}

export function buildMuiTheme(mode: ThemeMode): Theme {
  return createTheme(buildThemeOptions(mode));
}
