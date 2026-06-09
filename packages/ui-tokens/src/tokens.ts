/**
 * @wsl-ad/ui-tokens — Canonical design token tree
 *
 * Color sources:
 *   - Solarized palette (Ethan Schoonover v1.0.0)
 *   - Material Design 3 semantic color roles
 *   - Gemini visual design gradient system (design.google/library/gemini-ai-visual-design)
 *
 * ⚠️  Gradient values are based on M3 Expressive direction as available through
 *     IO 2025. Reconcile against the official IO 2026 Gemini design spec before shipping.
 */

export interface TokenTree {
  color: {
    primary: string;
    onPrimary: string;
    primaryContainer: string;
    onPrimaryContainer: string;
    secondary: string;
    onSecondary: string;
    secondaryContainer: string;
    onSecondaryContainer: string;
    tertiary: string;
    onTertiary: string;
    tertiaryContainer: string;
    onTertiaryContainer: string;
    error: string;
    onError: string;
    errorContainer: string;
    onErrorContainer: string;
    surface: string;
    surfaceVariant: string;
    surfaceDim: string;
    surfaceBright: string;
    surfaceContainerLow: string;
    surfaceContainer: string;
    surfaceContainerHigh: string;
    onSurface: string;
    onSurfaceVariant: string;
    outline: string;
    outlineVariant: string;
    inverseSurface: string;
    inverseOnSurface: string;
    inversePrimary: string;
    warning: string;
    success: string;
    info: string;
  };
  colorDark: {
    primary: string;
    onPrimary: string;
    primaryContainer: string;
    onPrimaryContainer: string;
    secondary: string;
    onSecondary: string;
    secondaryContainer: string;
    onSecondaryContainer: string;
    tertiary: string;
    onTertiary: string;
    tertiaryContainer: string;
    onTertiaryContainer: string;
    error: string;
    onError: string;
    errorContainer: string;
    onErrorContainer: string;
    surface: string;
    surfaceVariant: string;
    surfaceDim: string;
    surfaceBright: string;
    surfaceContainerLow: string;
    surfaceContainer: string;
    surfaceContainerHigh: string;
    onSurface: string;
    onSurfaceVariant: string;
    outline: string;
    outlineVariant: string;
    inverseSurface: string;
    inverseOnSurface: string;
    inversePrimary: string;
    warning: string;
    success: string;
    info: string;
  };
  gradient: {
    brand: {
      directional: string;
      spectrum: string;
      radial: string;
      voiceWave: string;
    };
    surface: {
      meshLight: string;
      meshDark: string;
    };
    expressive: {
      hero: string;
      container: string;
      fab: string;
    };
    semantic: {
      error: string;
      success: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  font: {
    heading: {
      h1: {
        family: string;
        weight: string;
        size: string;
        lineHeight: string;
        letterSpacing: string;
      };
    };
    body: {
      family: string;
      weight: string;
      size: string;
      lineHeight: string;
      letterSpacing: string;
    };
    label: {
      md: {
        family: string;
        weight: string;
        size: string;
        lineHeight: string;
        letterSpacing: string;
      };
      sm: {
        family: string;
        weight: string;
        size: string;
        lineHeight: string;
        letterSpacing: string;
      };
    };
    badge: {
      family: string;
      weight: string;
      size: string;
      lineHeight: string;
      letterSpacing: string;
    };
    input: {
      md: {
        family: string;
        weight: string;
        size: string;
        lineHeight: string;
        letterSpacing: string;
      };
      sm: {
        family: string;
        weight: string;
        size: string;
        lineHeight: string;
        letterSpacing: string;
      };
    };
  };
  elevation: {
    none: string;
    sm: string;
    md: string;
    lg: string;
  };
  motion: {
    duration: {
      instant: string;
      fast: string;
      normal: string;
      slow: string;
      deliberate: string;
      thinking: string;
    };
    easing: {
      standard: string;
      decelerate: string;
      accelerate: string;
      anticipate: string;
      thinking: string;
    };
  };
  radius: {
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    full: string;
  };
}

export const tokens = {
  color: {
    primary: '#268bd2',
    onPrimary: '#fdf6e3',
    primaryContainer: '#b3d9f5',
    onPrimaryContainer: '#002b36',
    secondary: '#2aa198',
    onSecondary: '#fdf6e3',
    secondaryContainer: '#b5e4e0',
    onSecondaryContainer: '#002b36',
    tertiary: '#6c71c4',
    onTertiary: '#fdf6e3',
    tertiaryContainer: '#d8d9f5',
    onTertiaryContainer: '#002b36',
    error: '#dc322f',
    onError: '#fdf6e3',
    errorContainer: '#f8d0d0',
    onErrorContainer: '#002b36',
    surface: '#fdf6e3',
    surfaceVariant: '#eee8d5',
    surfaceDim: '#e0dac7',
    surfaceBright: '#fffdf6',
    surfaceContainerLow: '#f5efdc',
    surfaceContainer: '#eee8d5',
    surfaceContainerHigh: '#e6e0cd',
    onSurface: '#657b83',
    onSurfaceVariant: '#586e75',
    outline: '#839496',
    outlineVariant: '#93a1a1',
    inverseSurface: '#002b36',
    inverseOnSurface: '#eee8d5',
    inversePrimary: '#7ec8f0',
    warning: '#b58900',
    success: '#859900',
    info: '#268bd2',
  },
  colorDark: {
    primary: '#268bd2',
    onPrimary: '#002b36',
    primaryContainer: '#073642',
    onPrimaryContainer: '#93a1a1',
    secondary: '#2aa198',
    onSecondary: '#002b36',
    secondaryContainer: '#073642',
    onSecondaryContainer: '#93a1a1',
    tertiary: '#6c71c4',
    onTertiary: '#002b36',
    tertiaryContainer: '#073642',
    onTertiaryContainer: '#93a1a1',
    error: '#dc322f',
    onError: '#fdf6e3',
    errorContainer: '#3b0b0b',
    onErrorContainer: '#f8d0d0',
    surface: '#002b36',
    surfaceVariant: '#073642',
    surfaceDim: '#001e28',
    surfaceBright: '#0a3342',
    surfaceContainerLow: '#07303e',
    surfaceContainer: '#073642',
    surfaceContainerHigh: '#0a3d4d',
    onSurface: '#839496',
    onSurfaceVariant: '#93a1a1',
    outline: '#586e75',
    outlineVariant: '#073642',
    inverseSurface: '#fdf6e3',
    inverseOnSurface: '#002b36',
    inversePrimary: '#1a6fa8',
    warning: '#b58900',
    success: '#859900',
    info: '#268bd2',
  },
  gradient: {
    brand: {
      directional: 'linear-gradient(135deg, #268bd2 90%, rgba(38,139,210,0) 100%)',
      spectrum: 'linear-gradient(135deg, #268bd2 0%, #2aa198 40%, #6c71c4 100%)',
      radial:
        'radial-gradient(ellipse at 30% 40%, #268bd2 0%, #2aa198 50%, rgba(108,113,196,0) 100%)',
      voiceWave:
        'radial-gradient(circle at 50% 50%, rgba(38,139,210,0.7) 0%, rgba(38,139,210,0.3) 40%, transparent 70%)',
    },
    surface: {
      meshLight:
        'radial-gradient(ellipse at 20% 20%, rgba(38,139,210,0.06) 0%, transparent 55%), radial-gradient(ellipse at 80% 75%, rgba(42,161,152,0.04) 0%, transparent 50%)',
      meshDark:
        'radial-gradient(ellipse at 20% 20%, rgba(38,139,210,0.10) 0%, transparent 55%), radial-gradient(ellipse at 80% 75%, rgba(108,113,196,0.08) 0%, transparent 50%)',
    },
    expressive: {
      hero: 'linear-gradient(160deg, #268bd2 0%, #2aa198 35%, #6c71c4 65%, rgba(108,113,196,0) 100%)',
      container:
        'radial-gradient(ellipse at 25% 30%, rgba(38,139,210,0.18) 0%, transparent 60%), radial-gradient(ellipse at 75% 70%, rgba(42,161,152,0.14) 0%, transparent 55%)',
      fab: 'linear-gradient(135deg, #268bd2 0%, #6c71c4 100%)',
    },
    semantic: {
      error: 'linear-gradient(135deg, #dc322f 85%, rgba(220,50,47,0) 100%)',
      success: 'linear-gradient(135deg, #859900 0%, #2aa198 100%)',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
  },
  font: {
    heading: {
      h1: {
        family: '"Almarai", sans-serif',
        weight: '700',
        size: '24px',
        lineHeight: '36px',
        letterSpacing: '0px',
      },
    },
    body: {
      family: '"Rubik", sans-serif',
      weight: '400',
      size: '14px',
      lineHeight: '21px',
      letterSpacing: '0px',
    },
    label: {
      md: {
        family: '"Rubik", sans-serif',
        weight: '500',
        size: '14px',
        lineHeight: '21px',
        letterSpacing: '0px',
      },
      sm: {
        family: '"Rubik", sans-serif',
        weight: '500',
        size: '12px',
        lineHeight: '21px',
        letterSpacing: '0px',
      },
    },
    badge: {
      family: '"Rubik", sans-serif',
      weight: '500',
      size: '13px',
      lineHeight: '19.5px',
      letterSpacing: '0px',
    },
    input: {
      md: {
        family: '"Rubik", sans-serif',
        weight: '400',
        size: '14px',
        lineHeight: '1',
        letterSpacing: '0px',
      },
      sm: {
        family: '"Rubik", sans-serif',
        weight: '400',
        size: '12px',
        lineHeight: '18px',
        letterSpacing: '0px',
      },
    },
  },
  elevation: {
    none: 'none',
    sm: '0 1px 2px rgba(0,43,54,0.12), 0 1px 3px rgba(0,43,54,0.08)',
    md: '0 2px 6px rgba(0,43,54,0.14), 0 1px 4px rgba(0,43,54,0.10)',
    lg: '0 4px 12px rgba(0,43,54,0.18), 0 2px 6px rgba(0,43,54,0.12)',
  },
  motion: {
    duration: {
      instant: '50ms',
      fast: '100ms',
      normal: '200ms',
      slow: '300ms',
      deliberate: '500ms',
      thinking: '1200ms',
    },
    easing: {
      standard: 'cubic-bezier(0.2, 0, 0, 1)',
      decelerate: 'cubic-bezier(0, 0, 0, 1)',
      accelerate: 'cubic-bezier(0.3, 0, 1, 1)',
      anticipate: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
      thinking: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
  radius: {
    none: '0px',
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '32px',
    full: '9999px',
  },
} as const satisfies TokenTree;
