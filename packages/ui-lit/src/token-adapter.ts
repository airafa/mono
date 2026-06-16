/**
 * Lit token adapter.
 *
 * Returns a CSS custom property map to be applied on the Lit host element.
 * Lit uses Shadow DOM, so VE class-based theming cannot reach the shadow root.
 * Instead, we inject token values as CSS custom properties on `:host`, and
 * the shadow root's CSS rules reference those properties.
 *
 * Expressive mode: injects overridden radius/elevation values; the host element
 * also receives `data-theme="expressive"` so shadow-root CSS can apply gradient
 * surfaces via `:host([data-theme='expressive']) .header { background: ... }`.
 */
import { tokens, expressiveOverrides } from '@mono/ui-tokens';

type ThemeMode = 'light' | 'dark' | 'expressive';

export type CssPropertyMap = Record<string, string>;

export function getLitTokenProperties(mode: ThemeMode): CssPropertyMap {
  const color = mode === 'dark' ? tokens.colorDark : tokens.color;
  const isExpressive = mode === 'expressive';

  return {
    '--color-primary': color.primary,
    '--color-on-primary': color.onPrimary,
    '--color-primary-container': color.primaryContainer,
    '--color-secondary': color.secondary,
    '--color-on-secondary': color.onSecondary,
    '--color-tertiary': color.tertiary,
    '--color-error': color.error,
    '--color-on-error': color.onError,
    '--color-surface': color.surface,
    '--color-surface-variant': color.surfaceVariant,
    '--color-on-surface': color.onSurface,
    '--color-on-surface-variant': color.onSurfaceVariant,
    '--color-outline': color.outline,

    '--font-body-family': tokens.font.body.family,
    '--font-body-size': tokens.font.body.size,
    '--font-body-weight': tokens.font.body.weight,
    '--font-heading-h1-family': tokens.font.heading.h1.family,
    '--font-heading-h1-size': tokens.font.heading.h1.size,
    '--font-heading-h1-weight': tokens.font.heading.h1.weight,

    '--spacing-xs': tokens.spacing.xs,
    '--spacing-sm': tokens.spacing.sm,
    '--spacing-md': tokens.spacing.md,
    '--spacing-lg': tokens.spacing.lg,
    '--spacing-xl': tokens.spacing.xl,
    '--spacing-2xl': tokens.spacing['2xl'],

    '--radius-xs': tokens.radius.xs,
    '--radius-sm': tokens.radius.sm,
    '--radius-md': isExpressive ? expressiveOverrides.radius.md : tokens.radius.md,
    '--radius-lg': isExpressive ? expressiveOverrides.radius.lg : tokens.radius.lg,
    '--radius-xl': isExpressive ? expressiveOverrides.radius.xl : tokens.radius.xl,
    '--radius-2xl': isExpressive ? expressiveOverrides.radius['2xl'] : tokens.radius['2xl'],
    '--radius-full': tokens.radius.full,

    '--elevation-sm': isExpressive ? expressiveOverrides.elevation.sm : tokens.elevation.sm,
    '--elevation-md': isExpressive ? expressiveOverrides.elevation.md : tokens.elevation.md,
    '--elevation-lg': tokens.elevation.lg,

    '--motion-duration-normal': isExpressive
      ? expressiveOverrides.motion.duration.normal
      : tokens.motion.duration.normal,
    '--motion-easing-standard': isExpressive
      ? expressiveOverrides.motion.easing.standard
      : tokens.motion.easing.standard,
    '--motion-easing-decelerate': tokens.motion.easing.decelerate,
    '--motion-easing-accelerate': tokens.motion.easing.accelerate,
  };
}
