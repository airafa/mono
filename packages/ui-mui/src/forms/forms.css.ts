/**
 * Vanilla Extract styles for MUI form components.
 * No `sx` prop is used — all custom layout styling is build-time VE.
 */
import { style } from '@vanilla-extract/css';
import { vars } from '@mono/ui-tokens';

export const submitButton = style({
  marginBlockStart: vars.spacing.md,
});
