/**
 * Expressive theme overrides.
 *
 * The expressive theme is NOT a standalone base theme — it layers override
 * tokens on top of the `light` base. Activated exclusively via `?theme=expressive`
 * URL parameter. Gradient surfaces are applied via `data-theme="expressive"`
 * CSS selectors (not via CSS vars), because multi-stop rgba gradients cannot
 * be interpolated through CSS custom properties.
 *
 * Motion values follow the official M3 Expressive web conversion table:
 * https://m3.material.io/styles/motion/overview/specs#web-convert-springs-to-curves
 *
 * M3 Expressive motion uses spring-physics with overshoot (spatial) and smooth
 * settle (effects). Values > 1.0 in the cubic-bezier produce the characteristic
 * bounce that makes interactions feel alive and fluid.
 *
 * 7 Expressive Tactics (m3.material.io/blog/building-with-m3-expressive):
 *   1. Use a variety of shapes — mix round + square for visual tension
 *   2. Apply rich and nuanced colors — primary/secondary/tertiary contrast
 *   3. Guide attention with typography — emphasized text styles
 *   4. Contain content for emphasis — grouping with brightest surfaces
 *   5. Add fluid and natural motion — spring physics, shape morph
 *   6. Leverage component flexibility — adapt to context
 *   7. Combine tactics to create hero moments — 1–2 per product
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
      /** M3 Expressive default spatial — bouncy overshoot for movement/size/rotation */
      standard: string;
      /** M3 Expressive fast spatial — quick bounce for small components */
      fastSpatial: string;
      /** M3 Expressive slow spatial — gentle bounce for full-screen animations */
      slowSpatial: string;
      /** M3 Expressive default effects — smooth settle for color/opacity changes */
      effects: string;
      /** M3 Expressive fast effects — quick settle for small state changes */
      fastEffects: string;
    };
    duration: {
      /** M3 Expressive default spatial duration */
      normal: string;
      /** M3 Expressive fast spatial duration — small components */
      fast: string;
      /** M3 Expressive slow spatial duration — full-screen transitions */
      slow: string;
      /** M3 Expressive default effects duration */
      effects: string;
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
      // M3 Expressive web conversion table (m3.material.io/styles/motion/overview/specs)
      standard: 'cubic-bezier(0.38, 1.21, 0.22, 1.00)', // default spatial — bouncy overshoot
      fastSpatial: 'cubic-bezier(0.42, 1.67, 0.21, 0.90)', // fast spatial — quicker bounce
      slowSpatial: 'cubic-bezier(0.39, 1.29, 0.35, 0.98)', // slow spatial — gentle bounce
      effects: 'cubic-bezier(0.34, 0.80, 0.34, 1.00)', // default effects — smooth, no overshoot
      fastEffects: 'cubic-bezier(0.31, 0.94, 0.34, 1.00)', // fast effects — quick settle
    },
    duration: {
      normal: '500ms', // M3 default spatial
      fast: '350ms', // M3 fast spatial
      slow: '650ms', // M3 slow spatial
      effects: '200ms', // M3 default effects
    },
  },
  elevation: {
    sm: '0 2px 8px rgba(38,139,210,0.16), 0 1px 3px rgba(0,43,54,0.08)',
    md: '0 4px 16px rgba(38,139,210,0.20), 0 2px 6px rgba(0,43,54,0.10)',
  },
} as const satisfies ExpressiveOverrides;
