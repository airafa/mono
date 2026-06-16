# `@mono/ui-tokens` — Design Token API

The canonical token package for the mono design system. All color, spacing, elevation, motion,
and radius values used across UI variants must be sourced from this package.

## Installation

This package is a workspace dependency — no install needed in the monorepo. Add to `dependencies`:

```json
"@mono/ui-tokens": "workspace:*"
```

## Token Tree

Exported as `tokens` (light-mode defaults) and `colorDark` (dark overrides):

```ts
import { tokens, colorDark } from '@mono/ui-tokens';

tokens.color.primary; // '#268bd2'  Solarized Blue → M3 primary
tokens.color.surface; // '#fdf6e3'  Solarized Base3
tokens.spacing.md; // '16px'
tokens.elevation.sm; // '0 1px 2px 0 rgba(0,0,0,0.3)'
tokens.motion.duration.normal; // '200ms'
tokens.radius.md; // '8px'
```

### Token Branches

| Branch            | Keys                                                       |
| ----------------- | ---------------------------------------------------------- |
| `color`           | 30 M3 semantic roles (primary, surface, onSurface, …)      |
| `spacing`         | xs / sm / md / lg / xl / 2xl                               |
| `elevation`       | none / sm / md / lg                                        |
| `motion.duration` | instant / fast / normal / moderate / slow / deliberate     |
| `motion.easing`   | standard / decelerate / accelerate / anticipate / thinking |
| `radius`          | none / xs / sm / md / lg / xl / 2xl / full                 |

## Vanilla Extract Theme Contract

Three pre-built theme classes for CSS custom property propagation:

```ts
import { vars, lightThemeClass, darkThemeClass, expressiveThemeClass } from '@mono/ui-tokens';
```

Apply the class on your root element to activate all CSS vars:

```tsx
// In an AppShell component (built with VE Vite plugin):
import { lightThemeClass, darkThemeClass, expressiveThemeClass } from '@mono/ui-tokens';

const veClass =
  themeMode === 'dark'
    ? darkThemeClass
    : themeMode === 'expressive'
      ? expressiveThemeClass
      : lightThemeClass;

<div className={veClass} data-theme={themeMode}>
  ...
</div>;
```

> **Important**: `.css.ts` files and any file importing VE theme classes must be processed
> by `@vanilla-extract/vite-plugin`. Configure it in `vite.config.ts` **and** `vitest.config.ts`.

### Theme Class Differences

| Class                  | Base Colors     | Radius      | Motion           | Elevation        |
| ---------------------- | --------------- | ----------- | ---------------- | ---------------- |
| `lightThemeClass`      | Solarized light | Standard    | 200ms standard   | Standard shadows |
| `darkThemeClass`       | Solarized dark  | Standard    | 200ms standard   | Standard shadows |
| `expressiveThemeClass` | Solarized light | Bumped +4px | 250ms anticipate | Tinted shadows   |

## Density Recipe

```ts
import { densityRecipe } from '@mono/ui-tokens';
import type { DensityVariant } from '@mono/ui-tokens';

// In a *.css.ts or *.tsx (with VE plugin configured):
const cls = densityRecipe({ density: 'comfortable' }); // default
const cls = densityRecipe({ density: 'compact' });
const cls = densityRecipe({ density: 'spacious' });
```

| Variant       | padding           | gap               |
| ------------- | ----------------- | ----------------- |
| `compact`     | `vars.spacing.xs` | `vars.spacing.xs` |
| `comfortable` | `vars.spacing.md` | `vars.spacing.sm` |
| `spacious`    | `vars.spacing.lg` | `vars.spacing.md` |

## Motion Recipe

```ts
import { motionRecipe } from '@mono/ui-tokens';

const animated = motionRecipe({ reduced: false }); // default
const noMotion = motionRecipe({ reduced: true }); // transition: none
```

Use `reduced: true` when `prefers-reduced-motion: reduce` is detected.

## Layout Sprinkles

```ts
import { sprinkles } from '@mono/ui-tokens';
import type { Sprinkles } from '@mono/ui-tokens';

const cls = sprinkles({
  display: 'flex',
  gap: 'md',
  paddingBlock: { mobile: 'sm', tablet: 'md', desktop: 'lg' },
});
```

### Responsive Conditions

| Condition | Media Query              |
| --------- | ------------------------ |
| `mobile`  | (default, always active) |
| `tablet`  | `min-width: 768px`       |
| `desktop` | `min-width: 1024px`      |

### Available Properties

`display`, `flexDirection`, `alignItems`, `justifyContent`, `gap`,
`paddingBlock`, `paddingInline`, `marginBlock`, `marginInline`

**Shorthands**: `padding` (= paddingBlock + paddingInline), `margin` (= marginBlock + marginInline)

## Expressive Theme Governance

The expressive theme is activated **exclusively** via the `?theme=expressive` URL parameter.
It must not be exposed in the UI toggle or set as the default.

- Gradient surfaces use CSS attribute selectors (`[data-theme="expressive"] .header`)
  because multi-stop rgba gradients cannot be interpolated through CSS custom properties.
- The `data-theme="expressive"` attribute must be set on the shell root element.
- When `?theme=expressive` is active, the theme toggle is a no-op.
