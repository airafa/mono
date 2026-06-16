/**
 * Mantine token adapter.
 *
 * Maps `@wsl-ad/ui-tokens` canonical values → `MantineThemeOverride`.
 * Handles all three theme modes: 'light', 'dark', 'expressive'.
 *
 * Expressive mode: applies expressiveOverrides (heavier radius, kinetic motion,
 * tinted elevation). Gradient surfaces are applied via `data-theme="expressive"`
 * CSS selectors on the shell host element — not via MantineTheme properties —
 * because multi-stop rgba gradients cannot be CSS-var-interpolated.
 */
import { createTheme } from '@mantine/core';
import type { MantineThemeOverride } from '@mantine/core';
import { tokens, expressiveOverrides } from '@wsl-ad/ui-tokens';

type ThemeMode = 'light' | 'dark' | 'expressive';

function resolveColor(mode: ThemeMode) {
  return mode === 'dark' ? tokens.colorDark : tokens.color;
}

function resolveRadius(mode: ThemeMode) {
  if (mode === 'expressive') {
    return {
      xs: tokens.radius.xs,
      sm: tokens.radius.sm,
      md: expressiveOverrides.radius.md,
      lg: expressiveOverrides.radius.lg,
      xl: expressiveOverrides.radius.xl,
    };
  }
  return {
    xs: tokens.radius.xs,
    sm: tokens.radius.sm,
    md: tokens.radius.md,
    lg: tokens.radius.lg,
    xl: tokens.radius.xl,
  };
}

export function buildMantineTheme(mode: ThemeMode): MantineThemeOverride {
  const color = resolveColor(mode);
  const radius = resolveRadius(mode);

  return createTheme({
    primaryColor: 'brand',
    // Override Mantine's default white so --mantine-color-body = Solarized cream (#fdf6e3) in light mode
    white: tokens.color.surface,
    black: tokens.color.onSurface,
    colors: {
      // 10-shade ramp: M3 roles mapped to Mantine shade indices 0–9
      // Index  Mantine usage      M3 role
      //   0    lightest bg        surfaceContainerLow (near-white in light)
      //   1    hover bg           primaryContainer
      //   2    subtle accent      inversePrimary (soft tint)
      //   3    light accent       primaryContainer  (slightly darker)
      //   4    base variant       primary (slightly muted — Mantine "outlined" btn fill)
      //   5    primary default    primary  ← primaryColor index
      //   6    primary hover      primary  (Mantine darkens by 1 shade for hover)
      //   7    pressed            onPrimaryContainer inverse (dark surface)
      //   8    on-primary text    inverseSurface
      //   9    darkest            onPrimaryContainer
      brand: [
        color.surfaceContainerLow, // 0
        color.primaryContainer, // 1
        color.inversePrimary, // 2
        color.primaryContainer, // 3  (intentional — ramp steps are M3 not HSL)
        color.primary, // 4
        color.primary, // 5  ← primaryColor index (default fill)
        color.primary, // 6  (hover; CSS filter will darken it)
        color.onPrimaryContainer, // 7
        color.inverseSurface, // 8
        color.onPrimaryContainer, // 9
      ] as [string, string, string, string, string, string, string, string, string, string],
      // Override Mantine's dark palette with Solarized dark values.
      // dark[7] = --mantine-color-body in dark mode → Solarized dark surface (#002b36)
      ...(mode === 'dark' && {
        dark: [
          tokens.colorDark.onSurface, // 0 — lightest text
          tokens.colorDark.onSurfaceVariant, // 1
          tokens.colorDark.outline, // 2
          tokens.colorDark.outlineVariant, // 3
          tokens.colorDark.surfaceContainerHigh, // 4
          tokens.colorDark.surfaceContainer, // 5
          tokens.colorDark.surfaceContainerLow, // 6
          tokens.colorDark.surface, // 7 — body background (#002b36)
          tokens.colorDark.inverseSurface, // 8
          tokens.colorDark.inverseOnSurface, // 9
        ] as [string, string, string, string, string, string, string, string, string, string],
      }),
    },
    fontFamily: tokens.font.body.family,
    headings: {
      fontFamily: tokens.font.heading.h1.family,
      sizes: {
        h1: {
          fontSize: tokens.font.heading.h1.size,
          lineHeight: tokens.font.heading.h1.lineHeight,
          fontWeight: tokens.font.heading.h1.weight,
        },
      },
    },
    radius,
    shadows: {
      xs: tokens.elevation.none,
      sm: mode === 'expressive' ? expressiveOverrides.elevation.sm : tokens.elevation.sm,
      md: mode === 'expressive' ? expressiveOverrides.elevation.md : tokens.elevation.md,
      lg: tokens.elevation.lg,
    },
    other: {
      tokens,
      themeMode: mode,
    },
  });
}

export function getMantineColorScheme(mode: ThemeMode): 'light' | 'dark' {
  return mode === 'dark' ? 'dark' : 'light';
}
