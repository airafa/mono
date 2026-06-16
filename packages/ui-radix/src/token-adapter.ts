/**
 * Radix UI Themes token adapter.
 *
 * Maps `@mono/ui-tokens` canonical values → Radix `<Theme>` props.
 * Handles all three theme modes: 'light', 'dark', 'expressive'.
 *
 * Expressive mode uses `radius="full"` to signal Gemini circle language.
 * Gradient surfaces are applied via `data-theme="expressive"` CSS attribute
 * selectors on the shell root — not via Radix theme props.
 */
import { tokens, expressiveOverrides } from '@mono/ui-tokens';

type ThemeMode = 'light' | 'dark' | 'expressive';

type RadixAppearance = 'light' | 'dark';
type RadixRadius = 'none' | 'small' | 'medium' | 'large' | 'full';

export interface RadixThemeProps {
  appearance: RadixAppearance;
  radius: RadixRadius;
  accentColor: string;
}

function toRadixRadius(mode: ThemeMode): RadixRadius {
  if (mode === 'expressive') {
    // Expressive: map 2xl (48px) → full to max out Gemini circle language
    const px = parseInt(expressiveOverrides.radius['2xl'], 10);
    if (px >= 32) return 'full';
    if (px >= 16) return 'large';
    return 'medium';
  }
  // Standard: md = 12px → medium
  const px = parseInt(tokens.radius.md, 10);
  if (px <= 4) return 'small';
  if (px <= 16) return 'medium';
  return 'large';
}

export function buildRadixThemeProps(mode: ThemeMode): RadixThemeProps {
  return {
    appearance: mode === 'dark' ? 'dark' : 'light',
    radius: toRadixRadius(mode),
    accentColor: 'blue', // Radix accent colors are semantic strings; blue maps to Solarized #268bd2
  };
}
