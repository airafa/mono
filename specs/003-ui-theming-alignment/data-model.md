# Data Model: UI Theming Alignment & Design Token Consolidation

**Feature**: [spec.md](spec.md)
**Phase**: 1 — Design
**Date**: 2026-06-01

---

## 1. Design Token Package (`packages/ui-tokens`)

### 1.1 Token Object Shape

All tokens are authored as `as const` TypeScript objects. This structure is the single source of truth; everything downstream (CSS variables, Vanilla Extract contracts, variant adapters) is derived from it.

**Color Sources**:
- Solarized palette (Ethan Schoonover, v1.0.0) — provides the complete 16-color base: eight perceptually-balanced monotones and eight accent hues designed for symmetrical light/dark inversion.
- Material Design 3 (M3) semantic color roles — provides the naming structure: primary, secondary, tertiary, error, surface, outline, and their tonal companions.
- Material Design Expressive gradient system (direction established at Google I/O 2025, extended at Google I/O 2026) — provides mesh gradient and tonal overlay definitions for branded surfaces.

> **Note on IO 2026 gradient spec**: The specific gradient token values from Google I/O 2026 cannot be fully verified from public documentation at this time. The gradient definitions below follow the Material Design Expressive direction as publicly available through IO 2025 and apply Solarized tonal values as gradient stops. These MUST be reviewed and reconciled against the official IO 2026 Gemini design spec sheet before implementation.

**Solarized Base Palette (canonical hex values)**:

| Token name       | Hex       | Role in light mode                    | Role in dark mode                   |
|------------------|-----------|---------------------------------------|-------------------------------------|
| `solarized.base03` | `#002b36` | —                                     | Background (darkest)                |
| `solarized.base02` | `#073642` | —                                     | Background highlights               |
| `solarized.base01` | `#586e75` | Optional emphasized content           | Comments / secondary content        |
| `solarized.base00` | `#657b83` | Comments / secondary content          | Body text                           |
| `solarized.base0`  | `#839496` | Body text                             | —                                   |
| `solarized.base1`  | `#93a1a1` | Optional emphasized content           | —                                   |
| `solarized.base2`  | `#eee8d5` | Background highlights                 | —                                   |
| `solarized.base3`  | `#fdf6e3` | Background (lightest)                 | —                                   |
| `solarized.yellow`   | `#b58900` | Accent                                | Accent                              |
| `solarized.orange`   | `#cb4b16` | Accent                                | Accent                              |
| `solarized.red`      | `#dc322f` | Error / danger                        | Error / danger                      |
| `solarized.magenta`  | `#d33682` | Accent                                | Accent                              |
| `solarized.violet`   | `#6c71c4` | Tertiary / complementary              | Tertiary / complementary            |
| `solarized.blue`     | `#268bd2` | Primary brand                         | Primary brand                       |
| `solarized.cyan`     | `#2aa198` | Secondary brand                       | Secondary brand                     |
| `solarized.green`    | `#859900` | Success / positive                    | Success / positive                  |

**M3 Role → Solarized Mapping**:

| M3 Role               | Light value          | Dark value           |
|-----------------------|----------------------|----------------------|
| `primary`             | `#268bd2` (blue)     | `#268bd2` (blue)     |
| `onPrimary`           | `#fdf6e3` (base3)    | `#002b36` (base03)   |
| `primaryContainer`    | `#b3d9f5` (blue+95%) | `#073642` (base02)   |
| `onPrimaryContainer`  | `#002b36` (base03)   | `#93a1a1` (base1)    |
| `secondary`           | `#2aa198` (cyan)     | `#2aa198` (cyan)     |
| `onSecondary`         | `#fdf6e3` (base3)    | `#002b36` (base03)   |
| `secondaryContainer`  | `#b5e4e0` (cyan+95%) | `#073642` (base02)   |
| `onSecondaryContainer`| `#002b36` (base03)   | `#93a1a1` (base1)    |
| `tertiary`            | `#6c71c4` (violet)   | `#6c71c4` (violet)   |
| `onTertiary`          | `#fdf6e3` (base3)    | `#002b36` (base03)   |
| `tertiaryContainer`   | `#d8d9f5` (violet+95%)| `#073642` (base02)  |
| `error`               | `#dc322f` (red)      | `#dc322f` (red)      |
| `onError`             | `#fdf6e3` (base3)    | `#fdf6e3` (base3)    |
| `errorContainer`      | `#f8d0d0` (red+90%)  | `#3b0b0b` (red+10%)  |
| `surface`             | `#fdf6e3` (base3)    | `#002b36` (base03)   |
| `surfaceVariant`      | `#eee8d5` (base2)    | `#073642` (base02)   |
| `surfaceDim`          | `#e0dac7` (base2-5%) | `#001e28` (base03-5%)|
| `surfaceBright`       | `#fffdf6` (base3+2%) | `#0a3342` (base02+2%)|
| `surfaceContainerLow` | `#f5efdc` (base2+3%) | `#07303e` (base02-2%)|
| `surfaceContainer`    | `#eee8d5` (base2)    | `#073642` (base02)   |
| `surfaceContainerHigh`| `#e6e0cd` (base2-3%) | `#0a3d4d` (base02+3%)|
| `onSurface`           | `#657b83` (base00)   | `#839496` (base0)    |
| `onSurfaceVariant`    | `#586e75` (base01)   | `#93a1a1` (base1)    |
| `outline`             | `#839496` (base0)    | `#586e75` (base01)   |
| `outlineVariant`      | `#93a1a1` (base1)    | `#073642` (base02)   |
| `inverseSurface`      | `#002b36` (base03)   | `#fdf6e3` (base3)    |
| `inverseOnSurface`    | `#eee8d5` (base2)    | `#002b36` (base03)   |
| `inversePrimary`      | `#7ec8f0` (blue+80%) | `#1a6fa8` (blue-20%) |

**Gradient Tokens — Gemini Visual Design Language**:

> Source: design.google/library/gemini-ai-visual-design. Gemini gradients serve as *context builders* — directional energy pointers with a sharp opaque leading edge that diffuse at the tail. Two categories: **directional** (guides eye, indicates action) and **thinking/radial** (ripple outward, conveys AI processing). The expressive theme activates these; the standard light/dark themes use only subtle surface washes.

| Token name                        | Value                                                                                                    | Category     | Usage |
|-----------------------------------|----------------------------------------------------------------------------------------------------------|--------------|-------|
| `gradient.brand.directional`      | `linear-gradient(135deg, #268bd2 90%, rgba(38,139,210,0) 100%)`                                         | Directional  | Hero surfaces, primary CTA — sharp leading edge, diffuse tail |
| `gradient.brand.spectrum`         | `linear-gradient(135deg, #268bd2 0%, #2aa198 40%, #6c71c4 100%)`                                        | Directional  | Branded cards, spectrum shift (blue→cyan→violet) |
| `gradient.brand.radial`           | `radial-gradient(ellipse at 30% 40%, #268bd2 0%, #2aa198 50%, rgba(108,113,196,0) 100%)`                | Thinking     | Thinking/loading state overlay, voice transcription indicator |
| `gradient.brand.voiceWave`        | `radial-gradient(circle at 50% 50%, rgba(38,139,210,0.7) 0%, rgba(38,139,210,0.3) 40%, transparent 70%)` | Thinking   | Voice-input ripple (animated via CSS `@keyframes` expand) |
| `gradient.surface.meshLight`      | `radial-gradient(ellipse at 20% 20%, rgba(38,139,210,0.06) 0%, transparent 55%), radial-gradient(ellipse at 80% 75%, rgba(42,161,152,0.04) 0%, transparent 50%)` | Surface wash | Light-mode ambient surface glow (standard themes only) |
| `gradient.surface.meshDark`       | `radial-gradient(ellipse at 20% 20%, rgba(38,139,210,0.10) 0%, transparent 55%), radial-gradient(ellipse at 80% 75%, rgba(108,113,196,0.08) 0%, transparent 50%)` | Surface wash | Dark-mode ambient surface glow (standard themes only) |
| `gradient.expressive.hero`        | `linear-gradient(160deg, #268bd2 0%, #2aa198 35%, #6c71c4 65%, rgba(108,113,196,0) 100%)`               | Expressive   | Expressive theme: app-shell header, hero panel |
| `gradient.expressive.container`   | `radial-gradient(ellipse at 25% 30%, rgba(38,139,210,0.18) 0%, transparent 60%), radial-gradient(ellipse at 75% 70%, rgba(42,161,152,0.14) 0%, transparent 55%)` | Expressive   | Expressive theme: card/container background wash |
| `gradient.expressive.fab`         | `linear-gradient(135deg, #268bd2 0%, #6c71c4 100%)`                                                     | Expressive   | Expressive theme: FAB, primary action button |
| `gradient.semantic.error`         | `linear-gradient(135deg, #dc322f 85%, rgba(220,50,47,0) 100%)`                                          | Directional  | Error state — sharp leading edge emphasis |
| `gradient.semantic.success`       | `linear-gradient(135deg, #859900 0%, #2aa198 100%)`                                                     | Directional  | Success state emphasis |

```
TokenTree
├── color
│   ├── primary: '#268bd2'
│   ├── onPrimary: '#fdf6e3'
│   ├── primaryContainer: '#b3d9f5'
│   ├── onPrimaryContainer: '#002b36'
│   ├── secondary: '#2aa198'
│   ├── onSecondary: '#fdf6e3'
│   ├── secondaryContainer: '#b5e4e0'
│   ├── onSecondaryContainer: '#002b36'
│   ├── tertiary: '#6c71c4'
│   ├── onTertiary: '#fdf6e3'
│   ├── tertiaryContainer: '#d8d9f5'
│   ├── onTertiaryContainer: '#002b36'
│   ├── error: '#dc322f'
│   ├── onError: '#fdf6e3'
│   ├── errorContainer: '#f8d0d0'
│   ├── onErrorContainer: '#002b36'
│   ├── surface: '#fdf6e3'
│   ├── surfaceVariant: '#eee8d5'
│   ├── surfaceDim: '#e0dac7'
│   ├── surfaceBright: '#fffdf6'
│   ├── surfaceContainerLow: '#f5efdc'
│   ├── surfaceContainer: '#eee8d5'
│   ├── surfaceContainerHigh: '#e6e0cd'
│   ├── onSurface: '#657b83'
│   ├── onSurfaceVariant: '#586e75'
│   ├── outline: '#839496'
│   ├── outlineVariant: '#93a1a1'
│   ├── inverseSurface: '#002b36'
│   ├── inverseOnSurface: '#eee8d5'
│   ├── inversePrimary: '#7ec8f0'
│   ├── warning: '#b58900'
│   ├── success: '#859900'
│   └── info: '#268bd2'
├── colorDark
│   ├── primary: '#268bd2'
│   ├── onPrimary: '#002b36'
│   ├── primaryContainer: '#073642'
│   ├── onPrimaryContainer: '#93a1a1'
│   ├── secondary: '#2aa198'
│   ├── onSecondary: '#002b36'
│   ├── secondaryContainer: '#073642'
│   ├── onSecondaryContainer: '#93a1a1'
│   ├── tertiary: '#6c71c4'
│   ├── onTertiary: '#002b36'
│   ├── tertiaryContainer: '#073642'
│   ├── onTertiaryContainer: '#93a1a1'
│   ├── error: '#dc322f'
│   ├── onError: '#fdf6e3'
│   ├── errorContainer: '#3b0b0b'
│   ├── onErrorContainer: '#f8d0d0'
│   ├── surface: '#002b36'
│   ├── surfaceVariant: '#073642'
│   ├── surfaceDim: '#001e28'
│   ├── surfaceBright: '#0a3342'
│   ├── surfaceContainerLow: '#07303e'
│   ├── surfaceContainer: '#073642'
│   ├── surfaceContainerHigh: '#0a3d4d'
│   ├── onSurface: '#839496'
│   ├── onSurfaceVariant: '#93a1a1'
│   ├── outline: '#586e75'
│   ├── outlineVariant: '#073642'
│   ├── inverseSurface: '#fdf6e3'
│   ├── inverseOnSurface: '#002b36'
│   ├── inversePrimary: '#1a6fa8'
│   ├── warning: '#b58900'
│   ├── success: '#859900'
│   └── info: '#268bd2'
├── gradient
│   ├── brand
│   │   ├── directional: 'linear-gradient(135deg, #268bd2 90%, rgba(38,139,210,0) 100%)'
│   │   ├── spectrum:    'linear-gradient(135deg, #268bd2 0%, #2aa198 40%, #6c71c4 100%)'
│   │   ├── radial:      'radial-gradient(ellipse at 30% 40%, #268bd2 0%, #2aa198 50%, rgba(108,113,196,0) 100%)'
│   │   └── voiceWave:   'radial-gradient(circle at 50% 50%, rgba(38,139,210,0.7) 0%, rgba(38,139,210,0.3) 40%, transparent 70%)'
│   ├── surface
│   │   ├── meshLight: 'radial-gradient(ellipse at 20% 20%, rgba(38,139,210,0.06) 0%, transparent 55%), radial-gradient(ellipse at 80% 75%, rgba(42,161,152,0.04) 0%, transparent 50%)'
│   │   └── meshDark:  'radial-gradient(ellipse at 20% 20%, rgba(38,139,210,0.10) 0%, transparent 55%), radial-gradient(ellipse at 80% 75%, rgba(108,113,196,0.08) 0%, transparent 50%)'
│   ├── expressive
│   │   ├── hero:      'linear-gradient(160deg, #268bd2 0%, #2aa198 35%, #6c71c4 65%, rgba(108,113,196,0) 100%)'
│   │   ├── container: 'radial-gradient(ellipse at 25% 30%, rgba(38,139,210,0.18) 0%, transparent 60%), radial-gradient(ellipse at 75% 70%, rgba(42,161,152,0.14) 0%, transparent 55%)'
│   │   └── fab:       'linear-gradient(135deg, #268bd2 0%, #6c71c4 100%)'
│   └── semantic
│       ├── error:   'linear-gradient(135deg, #dc322f 85%, rgba(220,50,47,0) 100%)'
│       └── success: 'linear-gradient(135deg, #859900 0%, #2aa198 100%)'
├── spacing
│   ├── xs: '4px'
│   ├── sm: '8px'
│   ├── md: '16px'
│   ├── lg: '24px'
│   ├── xl: '32px'
│   └── 2xl: '48px'
├── font
│   ├── heading
│   │   ├── h1
│   │   │   ├── family: '"Almarai", sans-serif'
│   │   │   ├── weight: '700'
│   │   │   ├── size: '24px'
│   │   │   ├── lineHeight: '36px'
│   │   │   └── letterSpacing: '0px'
│   │   └── // h2–h6 to be defined in subsequent spec
│   ├── body
│   │   ├── family: '"Rubik", sans-serif'
│   │   ├── weight: '400'
│   │   ├── size: '14px'
│   │   ├── lineHeight: '21px'
│   │   └── letterSpacing: '0px'
│   ├── label
│   │   ├── md
│   │   │   ├── family: '"Rubik", sans-serif'
│   │   │   ├── weight: '500'
│   │   │   ├── size: '14px'
│   │   │   ├── lineHeight: '21px'
│   │   │   └── letterSpacing: '0px'
│   │   └── sm
│   │       ├── family: '"Rubik", sans-serif'
│   │       ├── weight: '500'
│   │       ├── size: '12px'
│   │       ├── lineHeight: '21px'
│   │       └── letterSpacing: '0px'
│   ├── badge
│   │   ├── family: '"Rubik", sans-serif'
│   │   ├── weight: '500'
│   │   ├── size: '13px'
│   │   ├── lineHeight: '19.5px'
│   │   └── letterSpacing: '0px'
│   └── input
│       ├── md
│       │   ├── family: '"Rubik", sans-serif'
│       │   ├── weight: '400'
│       │   ├── size: '14px'
│       │   ├── lineHeight: '1'           // 100%
│       │   └── letterSpacing: '0px'
│       └── sm
│           ├── family: '"Rubik", sans-serif'
│           ├── weight: '400'
│           ├── size: '12px'
│           ├── lineHeight: '18px'
│           └── letterSpacing: '0px'
├── elevation
│   ├── none: 'none'
│   ├── sm: '0 1px 2px rgba(0,43,54,0.12), 0 1px 3px rgba(0,43,54,0.08)'
│   ├── md: '0 2px 6px rgba(0,43,54,0.14), 0 1px 4px rgba(0,43,54,0.10)'
│   └── lg: '0 4px 12px rgba(0,43,54,0.18), 0 2px 6px rgba(0,43,54,0.12)'
├── motion
│   │
│   │  Gemini kinetics: every animation has a defined start + end point (directional flow).
│   │  Inner activity (thinking state) uses a distinct looping easing + longer duration.
│   │  anticipate = brief overshoot before settling (kinetic curve — gives sense of energy release).
│   │
│   ├── duration
│   │   ├── instant:   '50ms'   // micro-feedback: ripple hit, icon swap
│   │   ├── fast:      '100ms'  // hover state, color change
│   │   ├── normal:    '200ms'  // standard transitions (enter/exit)
│   │   ├── slow:      '300ms'  // modal open, panel slide
│   │   ├── deliberate:'500ms'  // page-level transition
│   │   └── thinking:  '1200ms' // looping thinking/loading indicator cycle
│   └── easing
│       ├── standard:    'cubic-bezier(0.2, 0, 0, 1)'      // M3 standard — smooth decelerate into rest
│       ├── decelerate:  'cubic-bezier(0, 0, 0, 1)'        // entering — starts fast, lands softly
│       ├── accelerate:  'cubic-bezier(0.3, 0, 1, 1)'      // exiting — starts slow, exits fast
│       ├── anticipate:  'cubic-bezier(0.36, 0, 0.66, -0.56)' // Gemini kinetic: pulls back then releases
│       └── thinking:    'cubic-bezier(0.4, 0, 0.6, 1)'    // symmetric ease-in-out for continuous loops
└── radius
    │
    │  Gemini circle language: heavy rounding throughout. Gemini's own logo is
    │  built from the negative space of four adjoining circles. Containers and
    │  interactive elements echo the circle via large corner radii.
    │
    ├── none: '0px'
    ├── xs:   '4px'    // subtle rounding — table cells, dense list rows
    ├── sm:   '8px'    // small components — badges, chips, tags
    ├── md:   '12px'   // standard — inputs, cards, dialogs
    ├── lg:   '16px'   // prominent — panels, drawers, popovers
    ├── xl:   '24px'   // expressive — hero cards, hero containers
    ├── 2xl:  '32px'   // heavy rounding — FAB, bottom sheets
    └── full: '9999px' // pill/circle — icon buttons, avatars, toggle chips
```

**Font loading notes**:
- `Almarai` — Arabic + Latin, supports RTL/LTR. Load via Google Fonts: `family=Almarai:wght@700`. Use for all `font.heading.h1` surfaces.
- `Rubik` — Latin + Hebrew, supports RTL/LTR. Load via Google Fonts: `family=Rubik:wght@400;500`. Use for all body, label, badge, and input surfaces.
- Both fonts provide native RTL support, satisfying the LTR/RTL parity requirement from the constitution.

---

### 1.6 Expressive Theme Override Set

The **expressive theme** is a Gemini-inspired visual mode that activates gradient surfaces, heavier rounding, and kinetic motion. It is **not** a standalone base theme — it layers *override tokens* on top of either `light` or `dark` base colors. Access is intentionally restricted to `?theme=expressive` URL parameter (optionally combined with `?ui={variant}`).

**Design rationale** (source: design.google/library/gemini-ai-visual-design):
- Gradients convey directional energy and AI "thinking state" rather than static decoration
- Circle-based heavy rounding signals warmth, harmony, and playful optimism
- Kinetic anticipate/release curves give a sense of responsiveness and intelligence
- Softness and approachability are central — the system should feel "ethereal, rounded, optimistic"

**Activation mechanism**:
```
URL params:
  ?theme=expressive          → expressive on default variant (mui)
  ?ui=mantine&theme=expressive  → expressive on Mantine variant
  ?ui=radix&theme=expressive    → expressive on Radix variant
  (any valid ui value + theme=expressive)

Valid theme values: 'light' | 'dark' | 'expressive'
Default (no param): 'light'
```

**Token overrides** (applied on top of `light` base; the expressive theme is light-based with gradient overlays):

```
ExpressiveThemeOverrides
├── gradient (all expressive.* tokens are activated)
│   ├── surface → gradient.expressive.container    // replaces flat surface color
│   └── hero    → gradient.expressive.hero         // app-shell header background
├── radius
│   ├── md:   '16px'   // bumped up from 12px — more circular
│   ├── lg:   '24px'   // bumped up from 16px
│   ├── xl:   '32px'   // bumped up from 24px
│   └── 2xl:  '48px'   // extra-heavy rounding for hero elements
├── motion
│   ├── easing.standard → easing.anticipate       // kinetic feel over smooth
│   └── duration.normal → '250ms'                 // slightly slower to feel deliberate
└── elevation
    ├── sm: '0 2px 8px rgba(38,139,210,0.16), 0 1px 3px rgba(0,43,54,0.08)'  // tinted shadow
    └── md: '0 4px 16px rgba(38,139,210,0.20), 0 2px 6px rgba(0,43,54,0.10)' // tinted shadow
```

**Vanilla Extract expressive theme class**:
```
expressiveThemeClass (createTheme output)
├── Inherits all lightThemeClass CSS var values
├── Overrides vars.radius.md → '16px'
├── Overrides vars.radius.lg → '24px'
├── Overrides vars.radius.xl → '32px'
├── Overrides vars.radius.2xl → '48px'
├── Overrides vars.motion.easing.standard → 'cubic-bezier(0.36, 0, 0.66, -0.56)'
├── Overrides vars.motion.duration.normal → '250ms'
├── Overrides vars.elevation.sm → '0 2px 8px rgba(38,139,210,0.16), 0 1px 3px rgba(0,43,54,0.08)'
└── Overrides vars.elevation.md → '0 4px 16px rgba(38,139,210,0.20), 0 2px 6px rgba(0,43,54,0.10)'

Note: Gradient surfaces are applied via className on the host element (not via VE vars)
because CSS gradients cannot be CSS-variable-interpolated when they contain
multi-stop rgba sequences. The app-shell host receives:
  data-theme="expressive"  →  CSS rule applies gradient.expressive.hero on the header
```

**`getActiveTheme()` — variant-loader addition**:
```
getActiveTheme(): 'light' | 'dark' | 'expressive'
├── Reads URLSearchParams('theme')
├── Valid values: 'light', 'dark', 'expressive'
├── Falls back to 'light' for any invalid / missing value
└── Export from apps/web/src/config/variant-loader.ts alongside getActiveVariant()
```

**App.tsx integration**:
```
const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'expressive'>(
  getActiveTheme()   // reads ?theme= on mount
);
// toggleTheme only cycles 'light' ↔ 'dark' (expressive is URL-param only — no toggle button)
// expressive is activated by URL param at page load; onThemeToggle has no effect in expressive mode
```

**Variant adapter responsibility**: Each variant's `token-adapter.ts` must handle `themeMode === 'expressive'` by applying:
1. `expressiveThemeClass` VE CSS vars
2. `data-theme="expressive"` attribute on the root element
3. Its own expressive overrides if the variant's native theming API supports gradient surfaces

### 1.2 Vanilla Extract Theme Contract

The VE contract is the typed CSS variable reference tree — same shape as `TokenTree` but values are `var(--...)` references at build time.

```
ThemeContract (createThemeContract output)
├── color                          // flat M3 role keys, e.g. vars.color.primary === 'var(--color-primary)'
├── colorDark                      // same structure, dark variant
├── gradient                       // vars.gradient.brand.linear === 'var(--gradient-brand-linear)'
├── spacing                        // vars.spacing.md === 'var(--spacing-md)'
├── font
│   ├── heading.h1.*               // vars.font.heading.h1.size === 'var(--font-heading-h1-size)'
│   ├── body.*
│   ├── label.md.* / label.sm.*
│   ├── badge.*
│   └── input.md.* / input.sm.*
├── elevation
├── motion
└── radius
```

**Generated CSS classes**:
- `lightThemeClass` — applies all `color.*` light values and `gradient.surface.meshLight`
- `darkThemeClass` — applies all `colorDark.*` values and `gradient.surface.meshDark`

**Theme switching**: Swapping `lightThemeClass`/`darkThemeClass` on the root element reassigns all CSS vars simultaneously — zero runtime CSS generation, completing in well under the 100 ms budget.

### 1.3 Recipe: Density

```
DensityRecipe
├── base: { ... base layout rules }
└── variants
    └── density
        ├── compact:      { padding: vars.spacing.xs, gap: vars.spacing.xs }
        ├── comfortable:  { padding: vars.spacing.md, gap: vars.spacing.sm }
        └── spacious:     { padding: vars.spacing.lg, gap: vars.spacing.md }
```

### 1.4 Recipe: Motion

```
MotionRecipe
├── base: { transition: `all ${vars.motion.duration.normal} ${vars.motion.easing.standard}` }
└── variants
    └── reduced
        └── true: { transition: 'none' }  // respects prefers-reduced-motion
```

### 1.5 Sprinkles Properties

```
LayoutSprinkles
├── conditions: { mobile: {}, tablet: @media >=768px, desktop: @media >=1024px }
├── properties
│   ├── display:         ['none', 'flex', 'block', 'inline', 'grid']
│   ├── flexDirection:   ['row', 'column']
│   ├── alignItems:      ['stretch', 'flex-start', 'center', 'flex-end']
│   ├── justifyContent:  ['stretch', 'flex-start', 'center', 'flex-end', 'space-between']
│   ├── gap:             vars.spacing (all spacing tokens)
│   ├── paddingBlock:    vars.spacing
│   ├── paddingInline:   vars.spacing
│   ├── marginBlock:     vars.spacing
│   └── marginInline:    vars.spacing
└── shorthands
    ├── padding: [paddingBlock, paddingInline]
    └── margin:  [marginBlock, marginInline]
```

Note: `paddingBlock`, `paddingInline`, `marginBlock`, `marginInline` are CSS logical properties, ensuring RTL/LTR parity.

---

## 2. UI Contracts Package (`packages/ui-contracts`)

### 2.1 AppShell Interfaces

Migrated from `packages/app-shell/src/contracts/app-shell.ts` without change. All variants already implement this contract.

```
AppShellNavItem
├── id: string                         (required)
├── label: string                      (required — also serves as aria-label)
└── icon: ComponentType                (required)

AppShellProps
├── logo: ComponentType                (required)
├── navItems: AppShellNavItem[]        (required)
├── themeMode: 'light' | 'dark' | 'expressive'  (required)
├── onThemeToggle: () => void                    (required — cycles light↔dark only; expressive is URL-param activated)
├── 'aria-label'?: string                        (optional — shell-level accessible label)
└── children?: ReactNode                         (optional)

AppShellComponent = ComponentType<AppShellProps>
```

Note: `navItems[n].label` is used as the `aria-label` on the nav icon button; no additional `aria-label` prop needed at the nav item level.

`themeMode === 'expressive'`: When received, the shell applies `expressiveThemeClass` (VE) and `data-theme="expressive"` on its root element. `onThemeToggle` is a no-op when `themeMode` is `'expressive'`.

### 2.2 List Interfaces

```
ListSortConfig<T>
├── key: keyof T                       (required)
└── direction: 'asc' | 'desc'         (required)

ListFilterConfig
├── key: string                        (required)
└── value: unknown                     (required)

ListPaginationConfig
├── page: number                       (required)
├── pageSize: number                   (required)
└── total: number                      (required)

ListProps<T>
├── items: T[]                         (required)
├── renderItem: (item: T) => ReactNode (required)
├── 'aria-label': string               (REQUIRED — accessible name for the list)
├── sort?: ListSortConfig<T>           (optional)
├── onSortChange?: (s: ListSortConfig<T>) => void  (optional)
├── filter?: ListFilterConfig[]        (optional)
├── onFilterChange?: (f: ListFilterConfig[]) => void (optional)
├── pagination?: ListPaginationConfig  (optional)
├── onPageChange?: (p: number) => void (optional)
├── loading?: boolean                  (optional)
└── emptyState?: ReactNode             (optional)

ListComponent<T> = ComponentType<ListProps<T>>
```

### 2.3 Form Interfaces

```
FormFieldError
├── message: string                    (required)
└── type?: 'required' | 'pattern' | 'min' | 'max' | 'custom' (optional)

FormFieldProps
├── id: string                         (REQUIRED — for label association)
├── name: string                       (required)
├── label: string                      (required)
├── value: unknown                     (required)
├── onChange: (value: unknown) => void (required)
├── error?: FormFieldError             (optional)
├── required?: boolean                 (optional)
├── disabled?: boolean                 (optional)
├── 'aria-describedby'?: string        (optional — ID of helper/error element)
└── hint?: string                      (optional)

FormProps
├── onSubmit: (values: Record<string, unknown>) => void (required)
├── 'aria-label': string               (REQUIRED — accessible name for the form)
├── children: ReactNode                (required)
├── loading?: boolean                  (optional)
└── id?: string                        (optional)

FormComponent = ComponentType<FormProps>
```

### 2.4 Form Control Interfaces

```
TextInputProps extends FormFieldProps
└── type?: 'text' | 'email' | 'password' | 'search' | 'url' | 'tel' (optional, default 'text')

SelectOption
├── value: string                      (required)
├── label: string                      (required)
└── disabled?: boolean                 (optional)

SelectProps extends FormFieldProps
├── options: SelectOption[]            (required)
└── placeholder?: string              (optional)

CheckboxProps
├── id: string                         (REQUIRED — for label association)
├── name: string                       (required)
├── label: string                      (required)
├── checked: boolean                   (required)
├── onChange: (checked: boolean) => void (required)
├── disabled?: boolean                 (optional)
└── 'aria-describedby'?: string        (optional)

RadioOption
├── value: string                      (required)
└── label: string                      (required)

RadioGroupProps
├── id: string                         (REQUIRED)
├── name: string                       (required)
├── legend: string                     (REQUIRED — accessible group label via <fieldset>/<legend>)
├── options: RadioOption[]             (required)
├── value: string                      (required)
├── onChange: (value: string) => void  (required)
└── disabled?: boolean                 (optional)

TextAreaProps extends FormFieldProps
├── rows?: number                      (optional)
└── maxLength?: number                 (optional)
```

---

## 3. Variant Theme Adapter Pattern

Each variant contains a `token-adapter.ts` file that maps `@wsl-ad/ui-tokens` values to its native theming API.

### 3.1 Mantine Adapter Pattern

```
MantineTokenAdapter
├── Input: tokens (from @wsl-ad/ui-tokens), themeMode: 'light' | 'dark' | 'expressive'
└── Output: MantineThemeOverride
    ├── primaryColor: derived from tokens.color.primary
    ├── spacing: mapped from tokens.spacing.*
    ├── fontFamily: from tokens.font.body.family
    ├── headings.fontFamily: from tokens.font.heading.h1.family
    ├── radius: mapped from tokens.radius.* (expressive overrides use larger scale)
    └── [expressive] components.AppShell.styles: applies gradient.expressive.hero on header
```

### 3.2 MUI Adapter Pattern

```
MuiTokenAdapter
├── Input: tokens (from @wsl-ad/ui-tokens), themeMode: 'light' | 'dark' | 'expressive'
└── Output: ThemeOptions (for createTheme)
    ├── cssVariables: true             (always — for zero-runtime theme switching)
    ├── palette.primary.main: tokens.color.primary
    ├── spacing: function mapped to tokens.spacing scale
    ├── typography.fontFamily: tokens.font.body.family
    ├── shape.borderRadius: parsed from tokens.radius.md (expressive: tokens.radius.lg)
    └── [expressive] components.MuiAppBar.styleOverrides.root: gradient.expressive.hero
```

### 3.3 Radix Adapter Pattern

```
RadixTokenAdapter
├── Input: tokens (from @wsl-ad/ui-tokens), themeMode: 'light' | 'dark' | 'expressive'
└── Output: CSS custom property assignments on <Theme> component
    ├── accentColor: derived from tokens.color.primary
    ├── radius: 'large' when expressive, else mapped from tokens.radius scale
    └── scaling: density factor mapped from spacing tokens
```

Note: Radix CSS variables (`--space-*`, `--color-background`, `--gray-*`) have their own naming system. The adapter maps canonical tokens to the nearest Radix scale equivalent.

### 3.4 Lit Adapter Pattern

```
LitTokenAdapter
├── Input: tokens (from @wsl-ad/ui-tokens), themeMode: 'light' | 'dark' | 'expressive'
└── Output: CSS custom properties injected on :root or passed via host element attributes
    ├── --shell-bg: tokens.color.surface (light/dark/expressive)
    ├── --shell-surface: tokens.color.surfaceVariant
    ├── --shell-border: tokens.color.outline
    ├── --shell-text: tokens.color.onSurface
    ├── --shell-topbar-height: static (not from tokens — structural constant)
    └── [expressive] --shell-header-bg: gradient.expressive.hero (CSS gradient string)
```

Note: Lit's shadow DOM prevents VE class-based application. Tokens reach Lit components exclusively through CSS custom properties on the host element boundary. For expressive gradients, the host element additionally receives `data-theme="expressive"` so that a `:host([data-theme='expressive'])` CSS rule in the component's shadow root can apply the gradient.

---

## 4. Type-Test Pattern

```
ContractTypeTest (per variant, per contract)
├── Import: ComponentType from variant (e.g., AppShell from ui-mantine)
├── Import: ContractType from @wsl-ad/ui-contracts (e.g., AppShellComponent)
└── Assertion: const _: ContractType = ComponentExport; void _;
    - Zero runtime output
    - TypeScript compiler fails the file if contract is violated
    - Nx marks the package as affected in CI
```

---

## 5. Migration State Transitions

### App Shell Contract Migration

```
State A (current):
  packages/app-shell/src/contracts/app-shell.ts → AppShellProps, AppShellNavItem, AppShellComponent
  All consumers import from '@wsl-ad/app-shell'

State B (micro-task MT-01):
  packages/ui-contracts/src/app-shell.ts → AppShellProps, AppShellNavItem, AppShellComponent
  packages/app-shell/src/contracts/app-shell.ts → re-export shim from '@wsl-ad/ui-contracts'
  All consumers STILL import from '@wsl-ad/app-shell' (zero breakage)

State C (micro-task MT-02):
  All consumers updated to import from '@wsl-ad/ui-contracts'
  Re-export shim removed from app-shell
  packages/app-shell/src/contracts/ directory removed
```

### Placeholder Package Retirement

```
State A (current):
  packages/ui-list/, packages/ui-forms/, packages/ui-form-controls/ — empty barrel stubs
  Listed in pnpm-workspace.yaml

State B (micro-task MT-03):
  Three directories removed
  pnpm-workspace.yaml entries removed
  tsconfig.base.json path aliases removed (if any)
  pnpm build confirms no dangling references
```
