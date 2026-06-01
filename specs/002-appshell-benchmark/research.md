# Research: App Shell UI Framework Benchmark

**Created**: 2026-05-31
**Feature**: [spec.md](./spec.md)

## Research Tasks Resolved

### 1. MUI Zero-Runtime CSS Strategy

**Decision**: Use MUI with CSS theme variables (`cssVariables: true`) and `@layer mui` support via `enableCssLayer: true`. This avoids Pigment CSS (still alpha/experimental) while achieving near-zero-runtime styling when theme variables are pre-generated.

**Rationale**:
- Pigment CSS is still in alpha (not production-ready as of 2026) and requires a WyW-in-JS build plugin not yet stable with Vite outside Next.js.
- MUI's CSS theme variables mode (`createTheme({ cssVariables: true })`) generates CSS custom properties at build time, eliminating runtime style recalculation for theme switches.
- Theme switching between light/dark is achieved by toggling a class (`.light`/`.dark`) on the root element — no runtime CSS-in-JS needed for the switch itself.
- MUI still uses Emotion for initial style generation, but with `cssVariables: true`, styles are static CSS referencing variables. The Emotion overhead becomes a one-time build cost.
- **Post-implementation finding**: Emotion injects new `<style>` tags when it encounters component states not yet rendered (e.g., toggling to dark mode triggers CssBaseline to inject dark-mode styles). MUI cannot achieve true zero-runtime CSS-in-JS on theme toggle. SC-003 was updated to exempt MUI.
- Bundle impact: MUI measured at ~53kB gzipped JS, zero external CSS (lighter than initial estimate).

**Alternatives considered**:
- Pigment CSS: rejected — alpha status, unstable Vite plugin, not recommended for production.
- MUI + vanilla-extract: rejected — requires significant custom styling, loses MUI defaults benefit.
- MUI + Tailwind: rejected — conflicts with the "defaults MUI" requirement.

**Tree-shaking**: MUI supports named exports from `@mui/material` — Vite/Rollup will tree-shake unused components. Import only used components: `import { AppBar, IconButton } from '@mui/material'`.

---

### 2. Mantine CSS Modules Strategy

**Decision**: Use Mantine 7.x with its built-in CSS modules approach + `postcss-preset-mantine`.

**Rationale**:
- Mantine 7.x moved entirely to CSS modules — zero runtime CSS-in-JS by design.
- Styles ship as pre-compiled `.css` files (`@mantine/core/styles.css`). Only the CSS for imported components is included.
- PostCSS preset provides mixins for responsive styles without runtime JavaScript.
- Dark mode: Mantine uses `data-mantine-color-scheme` attribute on `<html>` — toggling is a DOM attribute change, no style recalculation.
- Theme customization via `MantineProvider` + `createTheme()` with CSS variables.

**Alternatives considered**:
- Mantine + vanilla-extract: available as a template but adds complexity without benefit since Mantine's native approach is already zero-runtime.
- Mantine + Tailwind: community template exists but adds unnecessary layer.

**Tree-shaking**: Mantine supports granular imports. Each component has its own CSS file that can be imported individually or via the umbrella `styles.css`. Vite tree-shakes unused JS; CSS is imported explicitly per-component for maximum narrowness.

**Bundle impact**: Lighter than MUI (~40-60kB gzipped for core).

---

### 3. Radix UI Themes Strategy

**Decision**: Use `@radix-ui/themes` with its built-in CSS file and class-based dark mode switching.

**Rationale**:
- Radix Themes ships a single CSS file (`@radix-ui/themes/styles.css`) with CSS custom properties for theming.
- Zero runtime CSS-in-JS: all styling is pre-compiled CSS. Components are styled via data attributes and CSS variables.
- Dark mode: Apply `className="dark"` or `className="dark-theme"` on a parent element. Compatible with any theme switching library.
- `<Theme appearance="dark">` component prop handles the toggle.
- Highly composable — uses Radix Primitives under the hood for accessibility.

**Alternatives considered**:
- Radix Primitives (unstyled) + custom CSS: rejected — the requirement is "defaults Radix UI Themes" (pre-styled).
- Radix + Tailwind: popular pattern but adds runtime overhead from Tailwind's class generation if not properly purged.

**Tree-shaking**: Radix Themes components are individually importable. The CSS file is monolithic but small (~30kB gzipped). JS tree-shakes well.

**Bundle impact**: Lightest of the React options (~25-40kB gzipped for used components + CSS).

---

### 4. Lit Web Components Strategy

**Decision**: Use Lit 3.x with shadow DOM encapsulated styles and `@lit/react` for React interop via `createComponent()`.

**Rationale**:
- Lit uses native browser APIs: Custom Elements, Shadow DOM, and constructable stylesheets.
- Zero runtime CSS-in-JS by definition — styles are native CSS declared in `static styles` using `css` tagged template literals, compiled to constructable stylesheets.
- Theme switching: Use CSS custom properties on the host element or document root. Shadow DOM piercing via `::part()` or CSS variables for theming.
- React interop: **Post-implementation decision**: `@lit/react` `createComponent()` was NOT used. The React wrapper (`AppShellWrapper.tsx`) is a plain React component with inline styles that implements the `AppShellProps` interface directly. The Lit custom element (`wsl-app-shell`) is internal and not exported from the package barrel.
- Smallest possible JS bundle — measured at 0.75kB gzipped (far smaller than initial estimate).

**Alternatives considered**:
- Lit + Shoelace (web component library): rejected — adds dependency weight and the goal is to benchmark Lit's native approach.
- Stencil: rejected — different compilation model, Lit is the standard.
- `@lit/react` `createComponent()`: not used in final implementation — plain React wrapper was simpler and avoided Shadow DOM complexities in tests.

**Tree-shaking**: Each Lit component is a standalone custom element. Only imported/registered elements are bundled. Maximum tree-shaking by design.

**Bundle impact**: Smallest — measured at 0.75kB gzipped JS, zero CSS.

---

### 5. Configurable Variant Loading (Narrow Build per Variant)

**Decision**: Use Vite dynamic `import()` with code-splitting to lazy-load only the selected variant. Each `packages/ui-*` package is a separate entry that gets its own chunk.

**Rationale**:
- Vite automatically code-splits on dynamic `import()` boundaries.
- The host app (`apps/web`) will have a thin variant resolver that reads `?ui=` param or `VITE_UI_VARIANT` env, then calls `import(`@wsl-ad/ui-${variant}`)` to load only that package.
- In production build, each variant becomes its own chunk — users download only the active variant's JS+CSS.
- For maximum isolation: configure Vite to externalize sibling UI packages from each variant's build (they should never cross-import).

**Pattern**:
```typescript
// apps/web/src/config/variant-loader.ts
const variant = new URLSearchParams(window.location.search).get('ui')
  ?? import.meta.env.VITE_UI_VARIANT
  ?? 'mui';

const modules = {
  mui: () => import('@wsl-ad/ui-mui/appShell'),
  mantine: () => import('@wsl-ad/ui-mantine/appShell'),
  radix: () => import('@wsl-ad/ui-radix/appShell'),
  lit: () => import('@wsl-ad/ui-lit/appShell'),
};

export const loadAppShell = modules[variant] ?? modules.mui;
```

**Build narrowness guarantee**: Since each `packages/ui-*` only depends on its own framework, Vite/Rollup will not bundle MUI code when loading the Mantine variant, etc. The dynamic import boundary ensures separate chunks.

**Alternatives considered**:
- Separate builds per variant (4 Vite configs): rejected — over-engineering for a benchmark; dynamic import achieves the same isolation with simpler DX.
- Conditional compilation with `define`: rejected — less flexible, harder to switch at runtime.

---

### 6. Shared Interface Contract

**Decision**: Define `AppShellProps` and `AppShellComponent` types in `packages/app-shell` that all 4 variant packages implement.

**Pattern**:
```typescript
// packages/app-shell/src/contracts/app-shell.ts
import type { ComponentType } from 'react';

export interface AppShellNavItem {
  id: string;
  label: string;
  icon: ComponentType;
}

export interface AppShellProps {
  logo: ComponentType;
  navItems: AppShellNavItem[];
  themeMode: 'light' | 'dark';
  onThemeToggle: () => void;
  children?: React.ReactNode;
}

export type AppShellComponent = ComponentType<AppShellProps>;
```

Each `packages/ui-*/src/appShell/index.ts` exports a component satisfying `AppShellComponent`.
