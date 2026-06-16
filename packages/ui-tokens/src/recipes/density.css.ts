/**
 * DensityRecipe — controls component padding and gap based on information density preference.
 *
 * Three variants: compact | comfortable (default) | spacious
 * All values reference CSS custom properties from the VE theme contract
 * so they respond to light/dark/expressive theme switching automatically.
 *
 * Usage in a variant *.css.ts:
 *   import { densityRecipe } from '@mono/ui-tokens';
 *   const item = densityRecipe({ density: 'compact' });
 */
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../theme.css.js';

export const densityRecipe = recipe({
  base: {
    boxSizing: 'border-box',
  },
  variants: {
    density: {
      compact: {
        padding: vars.spacing.xs,
        gap: vars.spacing.xs,
      },
      comfortable: {
        padding: vars.spacing.md,
        gap: vars.spacing.sm,
      },
      spacious: {
        padding: vars.spacing.lg,
        gap: vars.spacing.md,
      },
    },
  },
  defaultVariants: {
    density: 'comfortable',
  },
});

export type DensityVariant = 'compact' | 'comfortable' | 'spacious';
