/**
 * Expressive theme overrides.
 *
 * The expressive theme is NOT a standalone base theme — it layers override
 * tokens on top of the `light` base. Activated exclusively via `?theme=expressive`
 * URL parameter. Gradient surfaces are applied via `data-theme="expressive"`
 * CSS selectors (not via CSS vars), because multi-stop rgba gradients cannot
 * be interpolated through CSS custom properties.
 *
 * Design rationale: Gemini Visual Design Language (design.google/library/gemini-ai-visual-design)
 *   - Heavy rounding signals warmth, harmony, playful optimism
 *   - Kinetic anticipate/release curves give responsiveness and intelligence
 *   - Gradient surfaces = directional energy, not static decoration
 */

export interface ExpressiveOverrides {
  radius: {
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  motion: {
    easing: {
      /** Replaces standard easing — kinetic feel over smooth */
      standard: string;
    };
    duration: {
      /** Slightly slower than base 200ms — feels deliberate */
      normal: string;
    };
  };
  elevation: {
    /** Tinted blue shadow for expressive mode */
    sm: string;
    /** Tinted blue shadow for expressive mode */
    md: string;
  };
}

export const expressiveOverrides = {
  radius: {
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
  },
  motion: {
    easing: {
      standard: 'cubic-bezier(0.36, 0, 0.66, -0.56)', // anticipate curve
    },
    duration: {
      normal: '250ms',
    },
  },
  elevation: {
    sm: '0 2px 8px rgba(38,139,210,0.16), 0 1px 3px rgba(0,43,54,0.08)',
    md: '0 4px 16px rgba(38,139,210,0.20), 0 2px 6px rgba(0,43,54,0.10)',
  },
} as const satisfies ExpressiveOverrides;
