/**
 * Vanilla Extract styles for the MUI AppShell.
 *
 * This variant uses Vanilla Extract (build-time, zero-runtime) for ALL custom
 * layout styling. The `sx` prop (Emotion runtime CSS-in-JS) is intentionally
 * NOT used — it is disallowed by ESLint in this package. MUI components
 * (IconButton, Tooltip) still use Emotion internally for their own widget
 * styling, but every layout/structural style here is authored in `.css.ts`.
 *
 * Tokens come from the VE theme contract (`vars`), so they respond to
 * light/dark/expressive theme switching automatically via CSS variable
 * reassignment. The expressive gradient is applied through a
 * `[data-theme="expressive"]` descendant selector because multi-stop rgba
 * gradients cannot be interpolated through CSS custom properties.
 */
import { style } from '@vanilla-extract/css';
import { vars } from '@wsl-ad/ui-tokens';

const TOPBAR_HEIGHT = '64px';
const SIDEBAR_WIDTH = '60px';

export const shell = style({
  display: 'flex',
  minHeight: '100vh',
});

export const topbar = style({
  position: 'fixed',
  insetBlockStart: 0,
  insetInline: 0,
  zIndex: 1100,
  display: 'flex',
  alignItems: 'center',
  height: TOPBAR_HEIGHT,
  paddingInline: vars.spacing.md,
  backgroundColor: vars.color.surface,
  color: vars.color.onSurface,
  borderBlockEnd: `1px solid ${vars.color.outline}`,
  boxShadow: vars.elevation.sm,
  transition: `background-color ${vars.motion.duration.normal} ${vars.motion.easing.standard}`,
  selectors: {
    '[data-theme="expressive"] &': {
      backgroundColor: 'transparent',
      backgroundImage:
        'linear-gradient(160deg, #268bd2 0%, #2aa198 35%, #6c71c4 65%, rgba(108,113,196,0) 100%)',
      borderBlockEnd: 'none',
      boxShadow: 'none',
    },
  },
});

export const toolbarGrow = style({
  flexGrow: 1,
});

export const sidebar = style({
  position: 'fixed',
  insetBlockStart: TOPBAR_HEIGHT,
  insetInlineStart: 0,
  insetBlockEnd: 0,
  width: SIDEBAR_WIDTH,
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingBlockStart: vars.spacing.md,
  backgroundColor: vars.color.surfaceVariant,
  borderInlineEnd: `1px solid ${vars.color.outline}`,
});

export const navList = style({
  listStyle: 'none',
  margin: 0,
  padding: 0,
});

export const navItem = style({
  paddingInlineStart: vars.spacing.sm,
});

export const navButton = style({
  marginBlockEnd: vars.spacing.sm,
});

export const content = style({
  flexGrow: 1,
  marginInlineStart: SIDEBAR_WIDTH,
  marginBlockStart: TOPBAR_HEIGHT,
  padding: vars.spacing.lg,
  color: vars.color.onSurface,
});
