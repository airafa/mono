/**
 * LayoutSprinkles — responsive utility classes for layout properties.
 *
 * Conditions:
 *   - mobile:  no media query (default, applies always)
 *   - tablet:  @media (min-width: 768px)
 *   - desktop: @media (min-width: 1024px)
 *
 * Properties: display, flexDirection, alignItems, justifyContent, gap,
 *             paddingBlock, paddingInline, marginBlock, marginInline (CSS logical)
 *
 * Shorthands: padding (paddingBlock + paddingInline), margin (marginBlock + marginInline)
 *
 * Usage:
 *   import { sprinkles } from '@wsl-ad/ui-tokens';
 *   const cls = sprinkles({ display: 'flex', gap: 'md', paddingBlock: { mobile: 'sm', desktop: 'lg' } });
 */
import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';
import { vars } from '../theme.css.js';

const spacingValues = {
  xs: vars.spacing.xs,
  sm: vars.spacing.sm,
  md: vars.spacing.md,
  lg: vars.spacing.lg,
  xl: vars.spacing.xl,
  '2xl': vars.spacing['2xl'],
} as const;

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { '@media': 'screen and (min-width: 768px)' },
    desktop: { '@media': 'screen and (min-width: 1024px)' },
  },
  defaultCondition: 'mobile',
  properties: {
    display: ['none', 'flex', 'block', 'inline', 'grid'],
    flexDirection: ['row', 'column'],
    alignItems: ['stretch', 'flex-start', 'center', 'flex-end'],
    justifyContent: ['stretch', 'flex-start', 'center', 'flex-end', 'space-between'],
    gap: spacingValues,
    paddingBlock: spacingValues,
    paddingInline: spacingValues,
    marginBlock: spacingValues,
    marginInline: spacingValues,
  },
  shorthands: {
    padding: ['paddingBlock', 'paddingInline'],
    margin: ['marginBlock', 'marginInline'],
  },
});

export const sprinkles = createSprinkles(responsiveProperties);

export type Sprinkles = Parameters<typeof sprinkles>[0];
