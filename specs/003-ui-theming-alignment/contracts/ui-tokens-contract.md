# Contract: `@wsl-ad/ui-tokens`

**Package**: `packages/ui-tokens`
**Version target**: 1.0.0 (new package)
**Consumers**: `packages/ui-mantine`, `packages/ui-mui`, `packages/ui-radix`, `packages/ui-lit`, `packages/ui-contracts` (type reference only)

---

## Public API Surface

### Named exports from `@wsl-ad/ui-tokens`

| Export               | Type                              | Description |
|----------------------|-----------------------------------|-------------|
| `tokens`             | `TokenTree` (as const)            | Light-mode base token tree |
| `darkTokens`         | `Partial<TokenTree>` (as const)   | Dark-mode color overrides (`colorDark.*`) |
| `expressiveOverrides`| `ExpressiveOverrides` (as const)  | Expressive theme overrides (radius, motion, elevation, gradient) |
| `lightThemeClass`    | `string`                          | VE CSS class — sets all CSS vars to light values on element |
| `darkThemeClass`     | `string`                          | VE CSS class — sets all CSS vars to dark values on element |
| `expressiveThemeClass`| `string`                         | VE CSS class — overrides radius/motion/elevation for expressive mode |
| `vars`               | `ThemeContract`                   | VE theme contract — typed `var(--...)` references for use in `.css.ts` files |
| `densityRecipe`      | `RecipeVariants<DensityRecipe>`   | VE recipe — compact/comfortable/spacious density variants |
| `motionRecipe`       | `RecipeVariants<MotionRecipe>`    | VE recipe — standard/reduced-motion variants |
| `sprinkles`          | `SprinklesFn`                     | VE sprinkles — responsive layout atoms (display, flex, gap, padding, margin) |

### `TokenTree` shape (top-level categories)

```ts
interface TokenTree {
  color: ColorRoles;       // M3 semantic roles (primary, surface, onSurface, …) — light values
  colorDark: ColorRoles;   // Same shape — dark values
  gradient: GradientTokens;
  spacing: SpacingScale;
  font: FontScale;
  elevation: ElevationScale;
  motion: MotionTokens;
  radius: RadiusScale;
}
```

Full leaf values: see `specs/003-ui-theming-alignment/data-model.md §1.1`.

### `ExpressiveOverrides` shape

```ts
interface ExpressiveOverrides {
  radius: Pick<RadiusScale, 'md' | 'lg' | 'xl' | '2xl'>;
  motion: { easing: Pick<EasingTokens, 'standard'>; duration: Pick<DurationTokens, 'normal'> };
  elevation: Pick<ElevationScale, 'sm' | 'md'>;
}
```

---

## CSS Custom Property Naming Convention

All tokens produce CSS custom properties following the pattern `--{category}-{...path}`:

| Token path             | CSS custom property           |
|------------------------|-------------------------------|
| `color.primary`        | `--color-primary`             |
| `color.onSurface`      | `--color-on-surface`          |
| `spacing.md`           | `--spacing-md`                |
| `font.heading.h1.size` | `--font-heading-h1-size`      |
| `radius.xl`            | `--radius-xl`                 |
| `motion.easing.anticipate` | `--motion-easing-anticipate` |
| `gradient.expressive.hero` | `--gradient-expressive-hero` |

---

## Theme Class Application

```
Root element class composition:
  Standard light:      className={lightThemeClass}
  Standard dark:       className={darkThemeClass}
  Expressive:          className={`${lightThemeClass} ${expressiveThemeClass}`}
                       + data-theme="expressive" attribute

Note: Gradient surfaces (gradient.expressive.*) are applied via [data-theme="expressive"] CSS selectors,
NOT via CSS vars, because CSS gradient strings containing multi-stop rgba cannot be interpolated
through custom properties in all target browsers.
```

---

## Breaking-Change Policy

- `TokenTree` interface is a **public contract**. Adding new leaf properties is non-breaking. Removing or renaming any leaf property is a breaking change requiring an atomic monorepo update (see [variant-adapter-contract.md](variant-adapter-contract.md)).
- `vars.*` references in `.css.ts` files across variant packages are derived from the contract — any structure change regenerates the VE theme contract and will produce TypeScript errors in all consumers.
- `ExpressiveOverrides` may grow new optional keys in minor versions.

---

## Vanilla Extract Integration Notes

- Import `vars` only in `.css.ts` files (VE build-time constraint).
- Import `tokens`, `darkTokens`, `expressiveOverrides` in `.ts` / `.tsx` files (runtime-safe plain objects).
- The `@vanilla-extract/vite-plugin` must be registered in each consuming package's `vite.config.ts`.
- Lit packages: do **not** use `vars` or theme classes. Consume `tokens` object directly and inject as CSS custom properties on the host element.
