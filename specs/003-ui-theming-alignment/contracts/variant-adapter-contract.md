# Contract: Variant Theme Adapter Pattern

**Applies to**: `packages/ui-mantine`, `packages/ui-mui`, `packages/ui-radix`, `packages/ui-lit`

Each variant owns a `src/token-adapter.ts` module that maps `@mono/ui-tokens` values to its native theming API and handles all three theme modes: `'light'`, `'dark'`, and `'expressive'`.

---

## Adapter Interface

```ts
// Conceptual shape — not a formal TypeScript interface (output types differ per variant)
interface VariantTokenAdapter {
  /** Returns the variant's native theme configuration object for the given mode */
  buildTheme(themeMode: 'light' | 'dark' | 'expressive'): VariantThemeOutput;

  /** Returns the VE theme class(es) to apply on the shell root element */
  getThemeClass(themeMode: 'light' | 'dark' | 'expressive'): string;

  /** Returns the data-theme attribute value, or undefined for standard modes */
  getDataThemeAttr(themeMode: 'light' | 'dark' | 'expressive'): string | undefined;
}
```

---

## Per-Variant Adapter Specification

### Mantine (`packages/ui-mantine/src/token-adapter.ts`)

```ts
import { tokens, darkTokens, expressiveOverrides, lightThemeClass, darkThemeClass, expressiveThemeClass } from '@mono/ui-tokens';
import type { MantineThemeOverride } from '@mantine/core';

export function buildMantineTheme(themeMode: 'light' | 'dark' | 'expressive'): MantineThemeOverride {
  const isDark = themeMode === 'dark';
  const isExpressive = themeMode === 'expressive';

  return {
    primaryColor: 'brand',
    colors: { brand: [/* 10-stop tonal ramp derived from tokens.color.primary */] },
    fontFamily: tokens.font.body.family,
    headings: { fontFamily: tokens.font.heading.h1.family },
    spacing: { xs: tokens.spacing.xs, sm: tokens.spacing.sm, md: tokens.spacing.md, lg: tokens.spacing.lg, xl: tokens.spacing.xl },
    radius: {
      sm: isExpressive ? expressiveOverrides.radius.md  : tokens.radius.sm,
      md: isExpressive ? expressiveOverrides.radius.lg  : tokens.radius.md,
      lg: isExpressive ? expressiveOverrides.radius.xl  : tokens.radius.lg,
      xl: isExpressive ? expressiveOverrides.radius['2xl'] : tokens.radius.xl,
    },
    // Expressive: gradient header via component style override
    components: isExpressive ? {
      AppShell: {
        styles: { header: { backgroundImage: tokens.gradient.expressive.hero } },
      },
    } : {},
  };
}

export function getMantineThemeClass(themeMode: 'light' | 'dark' | 'expressive'): string {
  if (themeMode === 'dark') return darkThemeClass;
  if (themeMode === 'expressive') return `${lightThemeClass} ${expressiveThemeClass}`;
  return lightThemeClass;
}
```

---

### MUI (`packages/ui-mui/src/token-adapter.ts`)

> **Styling note**: The MUI variant authors all of its custom layout in Vanilla Extract
> (`appShell/AppShell.css.ts`, `forms/forms.css.ts`). The Emotion `sx` prop is **disallowed**
> (ESLint `no-restricted-syntax` scoped to `packages/ui-mui`). `buildMuiTheme` configures the
> MUI palette/typography/shape for the MUI components' *own* Emotion-based widget styling
> (`IconButton`, `Tooltip`, `TextField`, …); the variant's structural styles do not use `sx`.

```ts
import type { ThemeOptions } from '@mui/material';

export function buildMuiTheme(themeMode: 'light' | 'dark' | 'expressive'): ThemeOptions {
  const isExpressive = themeMode === 'expressive';
  return {
    cssVariables: true,
    palette: {
      mode: themeMode === 'dark' ? 'dark' : 'light',
      primary: { main: tokens.color.primary },
      secondary: { main: tokens.color.secondary },
      error: { main: tokens.color.error },
      background: { default: themeMode === 'dark' ? tokens.colorDark.surface : tokens.color.surface },
    },
    typography: {
      fontFamily: tokens.font.body.family,
      h1: { fontFamily: tokens.font.heading.h1.family, fontWeight: tokens.font.heading.h1.weight, fontSize: tokens.font.heading.h1.size, lineHeight: tokens.font.heading.h1.lineHeight },
    },
    shape: { borderRadius: parseInt(isExpressive ? expressiveOverrides.radius.md : tokens.radius.md) },
  };
}
```

> The expressive gradient on the topbar is applied in `AppShell.css.ts` via a
> `[data-theme="expressive"] &` selector (not a `MuiAppBar` style override), consistent
> with the other variants.

---

### Radix (`packages/ui-radix/src/token-adapter.ts`)

```ts
// Radix UI Themes uses its own prop-based theming; no createTheme call.
// The adapter returns props to spread on the <Theme> component.

export function buildRadixThemeProps(themeMode: 'light' | 'dark' | 'expressive') {
  return {
    appearance: themeMode === 'dark' ? 'dark' : 'light',
    accentColor: 'blue',      // nearest Radix scale to Solarized blue (#268bd2)
    grayColor: 'sage',        // nearest to Solarized base tones
    radius: themeMode === 'expressive' ? 'large' : 'medium',
    scaling: '100%',
  } as const;
}

// Expressive: gradient applied via data-theme CSS selector on the shell root.
// No Radix-native mechanism for gradient surfaces — use className + CSS module.
```

---

### Lit (`packages/ui-lit/src/token-adapter.ts`)

```ts
// Lit uses Shadow DOM. No VE class API. Tokens reach Lit components as CSS
// custom properties injected on the host element or :root.

export function getLitTokenProperties(themeMode: 'light' | 'dark' | 'expressive'): Record<string, string> {
  const isDark = themeMode === 'dark';
  const isExpressive = themeMode === 'expressive';
  return {
    '--shell-bg':           isDark ? tokens.colorDark.surface       : tokens.color.surface,
    '--shell-surface':      isDark ? tokens.colorDark.surfaceVariant : tokens.color.surfaceVariant,
    '--shell-border':       isDark ? tokens.colorDark.outline        : tokens.color.outline,
    '--shell-text':         isDark ? tokens.colorDark.onSurface      : tokens.color.onSurface,
    '--shell-primary':      tokens.color.primary,
    '--shell-radius-md':    isExpressive ? expressiveOverrides.radius.md  : tokens.radius.md,
    '--shell-radius-lg':    isExpressive ? expressiveOverrides.radius.lg  : tokens.radius.lg,
    // Gradient is applied via :host([data-theme='expressive']) rule inside shadow root
  };
}
```

Lit shell's shadow root CSS:

```css
:host([data-theme='expressive']) .header {
  background-image: var(--shell-header-gradient, linear-gradient(160deg, #268bd2 0%, #2aa198 35%, #6c71c4 65%, rgba(108,113,196,0) 100%));
}
```

---

## `data-theme` Attribute Matrix

| `themeMode`   | VE class(es)                              | `data-theme` attr   | Gradient surface |
|---------------|-------------------------------------------|---------------------|-----------------|
| `'light'`     | `lightThemeClass`                         | none                | mesh wash only  |
| `'dark'`      | `darkThemeClass`                          | none                | mesh wash only  |
| `'expressive'`| `lightThemeClass expressiveThemeClass`    | `expressive`        | full hero gradient |

---

## Adapter Change Policy

- Adapters are **variant-internal** — no cross-package imports between adapters.
- When `TokenTree` adds a new category, each adapter must be updated in the same atomic micro-task.
- `themeMode === 'expressive'` handling is **required** — any variant missing the expressive branch will produce a TypeScript exhaustiveness error via a `never` check in the adapter.
