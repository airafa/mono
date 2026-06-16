# Quickstart: UI Theming Alignment & Design Token Consolidation

**Feature**: `003-ui-theming-alignment` | **Spec**: [spec.md](spec.md) | **Plan**: [plan.md](plan.md)

---

## Prerequisites

```bash
node --version   # must be >= 22
pnpm --version   # must be >= 10
```

## Running the app with a specific theme

```bash
# Default (MUI variant, light theme)
pnpm dev

# Switch variant
http://localhost:5173/?ui=mantine
http://localhost:5173/?ui=radix
http://localhost:5173/?ui=lit

# Activate expressive theme (Gemini visual design — gradient surfaces, heavy rounding, kinetic motion)
http://localhost:5173/?theme=expressive
http://localhost:5173/?ui=mantine&theme=expressive
http://localhost:5173/?ui=radix&theme=expressive
http://localhost:5173/?ui=lit&theme=expressive
```

The expressive theme is **URL-param only** — it does not appear in the in-app toggle. Navigate to the URL to activate it.

---

## Package map

| Package               | Purpose |
|-----------------------|---------|
| `@mono/ui-tokens`   | Canonical design tokens (Solarized + M3 color roles; Almarai/Rubik typography; Gemini gradient language). Vanilla Extract theme classes, recipes, and sprinkles. |
| `@mono/ui-contracts`| TypeScript interface contracts for all shared UI components (`AppShellProps`, `ListProps`, `FormProps`, …). |
| `@mono/ui-mantine`  | Mantine-based AppShell + components implementing ui-contracts using Mantine's native styling. |
| `@mono/ui-mui`      | MUI-based AppShell + components. |
| `@mono/ui-radix`    | Radix UI Themes-based AppShell + components. |
| `@mono/ui-lit`      | Lit web component-based AppShell (shadow DOM). |

---

## Consuming design tokens

### In a variant `.css.ts` file (Vanilla Extract)

```ts
// packages/ui-mantine/src/header.css.ts
import { vars } from '@mono/ui-tokens';
import { style } from '@vanilla-extract/css';

export const header = style({
  backgroundColor: vars.color.surface,
  borderBlockEnd: `1px solid ${vars.color.outline}`,
  paddingInline: vars.spacing.md,      // logical property — RTL/LTR safe
  borderRadius: vars.radius.md,
  transition: `background-color ${vars.motion.duration.normal} ${vars.motion.easing.standard}`,
});
```

### In a variant `.ts` / `.tsx` file (plain token values)

```ts
import { tokens, darkTokens, expressiveOverrides } from '@mono/ui-tokens';

// Build a Mantine theme from canonical tokens
const baseRadius = tokens.radius.md;                   // '12px'
const expressiveRadius = expressiveOverrides.radius.md; // '16px'
```

### Using density recipes

```ts
import { densityRecipe } from '@mono/ui-tokens';

// In component JSX
<div className={densityRecipe({ density: 'compact' })}>...</div>
<div className={densityRecipe({ density: 'comfortable' })}>...</div>
```

### Using responsive sprinkles

```ts
import { sprinkles } from '@mono/ui-tokens';

<div className={sprinkles({ display: { mobile: 'block', tablet: 'flex' }, gap: 'md' })}>
```

---

## Adding the expressive theme to a new variant

1. **Read the theme param** — `getActiveTheme()` in `apps/web/src/config/variant-loader.ts` already handles this; `App.tsx` passes `themeMode` to the shell.

2. **In the variant's `token-adapter.ts`**, add the `'expressive'` branch:

   ```ts
   import { expressiveOverrides, lightThemeClass, expressiveThemeClass } from '@mono/ui-tokens';

   if (themeMode === 'expressive') {
     // Apply VE classes
     root.className = `${lightThemeClass} ${expressiveThemeClass}`;
     // Apply data attribute for gradient CSS selectors
     root.setAttribute('data-theme', 'expressive');
     // Apply variant-native overrides (larger radius, gradient header)
   }
   ```

3. **Write a contract type-test** in `src/contract.typetest.ts`:

   ```ts
   import type { AppShellComponent } from '@mono/ui-contracts';
   import { AppShell } from './appShell/index.js';
   const _: AppShellComponent = AppShell satisfies AppShellComponent;
   ```

4. **Write a Playwright test** covering `?ui={variant}&theme=expressive`:
   - Assert `data-theme="expressive"` on shell root
   - Assert computed `border-radius` on a card ≥ `16px`
   - Assert Lighthouse contrast score ≥ standard light baseline

---

## Color system reference

| Solarized name | Hex       | Light mode role      | Dark mode role       |
|----------------|-----------|----------------------|----------------------|
| base3          | `#fdf6e3` | Background (surface) | —                    |
| base2          | `#eee8d5` | Surface variant      | —                    |
| base00         | `#657b83` | Body text            | —                    |
| base01         | `#586e75` | Secondary text       | —                    |
| base0          | `#839496` | —                    | Body text            |
| base1          | `#93a1a1` | —                    | Secondary text       |
| base03         | `#002b36` | —                    | Background           |
| base02         | `#073642` | —                    | Surface variant      |
| blue           | `#268bd2` | Primary brand        | Primary brand        |
| cyan           | `#2aa198` | Secondary brand      | Secondary brand      |
| violet         | `#6c71c4` | Tertiary             | Tertiary             |
| red            | `#dc322f` | Error                | Error                |
| yellow         | `#b58900` | Warning              | Warning              |
| green          | `#859900` | Success              | Success              |

Full M3 role → Solarized mapping: [data-model.md §1.1](data-model.md#11-token-object-shape)

---

## Typography

| Token              | Font    | Weight | Size  | Line-height |
|--------------------|---------|--------|-------|-------------|
| `font.heading.h1`  | Almarai | 700    | 24px  | 36px        |
| `font.label.md`    | Rubik   | 500    | 14px  | 21px        |
| `font.label.sm`    | Rubik   | 500    | 12px  | 21px        |
| `font.body`        | Rubik   | 400    | 14px  | 21px        |
| `font.badge`       | Rubik   | 500    | 13px  | 19.5px      |
| `font.input.md`    | Rubik   | 400    | 14px  | 100%        |
| `font.input.sm`    | Rubik   | 400    | 12px  | 18px        |

Load via Google Fonts in `apps/web/index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Almarai:wght@700&family=Rubik:wght@400;500&display=swap">
```

Both fonts support RTL (Almarai: Arabic/Latin; Rubik: Hebrew/Latin).

---

## Running tests

```bash
# Unit + type-tests
pnpm test

# Integration (theme switching, expressive URL param, RTL)
pnpm test:e2e

# Lighthouse benchmark
node tools/quality/lighthouse-benchmark.mjs

# Check for unused exports after package retirement
node tools/quality/unused-exports.mjs
```
