/**
 * MotionRecipe — controls component transition behaviour.
 *
 * Base transition uses the canonical motion tokens (normal duration, standard easing).
 * Set `reduced: true` to disable all transitions (e.g. when `prefers-reduced-motion`
 * is detected at the consumer level).
 *
 * Usage:
 *   import { motionRecipe } from '@mono/ui-tokens';
 *   const animated = motionRecipe({ reduced: false });
 *   const still    = motionRecipe({ reduced: true });
 */
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../theme.css.js';

export const motionRecipe = recipe({
  base: {
    transition: `all ${vars.motion.duration.normal} ${vars.motion.easing.standard}`,
  },
  variants: {
    reduced: {
      true: {
        transition: 'none',
      },
      false: {},
    },
  },
  defaultVariants: {
    reduced: false,
  },
});
