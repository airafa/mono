# App Shell Benchmark — Feature Tutorial

This page is a complete walkthrough of the `002-appshell-benchmark` feature — what it does, why it exists, and exactly how it was built from start to finish.

## What Is This Feature?

The App Shell Benchmark is a structured comparison of **4 UI framework variants** implementing the same component (an app shell with a top bar, sidebar, and content area) inside our monorepo. The goal is to produce hard data across three evaluation dimensions so the team can make an informed framework selection:

1. **Agent Productivity** — How easy is it for an AI coding agent to plan, implement, and iterate on each framework?
2. **Documentation & Testing Ease** — How straightforward are unit tests, Storybook stories, and integration tests for each?
3. **Runtime Performance** — Bundle size, Lighthouse scores, FCP/LCP, and theme-switch latency.

The 4 variants are:

| Variant     | Framework                 | Styling Approach                           |
| ----------- | ------------------------- | ------------------------------------------ |
| **MUI**     | `@mui/material` + Emotion | CSS theme variables (`cssVariables: true`) |
| **Mantine** | `@mantine/core`           | CSS Modules + PostCSS                      |
| **Radix**   | `@radix-ui/themes`        | Static CSS + CSS custom properties         |
| **Lit**     | `lit` (Web Components)    | Inline styles in a React wrapper           |

## Why This Feature?

Choosing a UI framework affects every future feature. Rather than debating opinions, this benchmark lets the codebase speak: identical component, identical contract, measured with identical tools. The results live in the repo and can be re-run as frameworks evolve.

## Architecture Overview

### Monorepo Layout

```text
packages/
├── app-shell/          # Shared TypeScript interface (AppShellProps, AppShellComponent)
├── ui-mui/             # MUI implementation
├── ui-mantine/         # Mantine implementation
├── ui-radix/           # Radix implementation
└── ui-lit/             # Lit implementation

apps/
├── web/                # Host app — loads the active variant via dynamic import
├── storybook/          # Stories for all 4 variants (Light + Dark)
└── docs/               # This VitePress site

benchmarks/
└── rendering/
    └── appshell-benchmark.md   # Final benchmark results document
```

### Shared Interface Contract

All 4 variants implement the same TypeScript interface, defined in `packages/app-shell/src/contracts/app-shell.ts`:

```typescript
export interface AppShellProps {
  logo: ComponentType;
  navItems: AppShellNavItem[];
  themeMode: 'light' | 'dark';
  onThemeToggle: () => void;
  children?: React.ReactNode;
}

export type AppShellComponent = ComponentType<AppShellProps>;
```

This means the host app (`apps/web`) can swap variants at runtime without any code changes — just change the `?ui=` query parameter or the `VITE_UI_VARIANT` environment variable.

### Variant Loading

The host app uses a dynamic import router in `apps/web/src/config/variant-loader.ts`:

```typescript
const variant =
  new URLSearchParams(window.location.search).get('ui') ?? import.meta.env.VITE_UI_VARIANT ?? 'mui';
```

Vite code-splits each variant into its own chunk. Only the active variant's JS + CSS is downloaded by the browser.

## Step-by-Step: How It Was Built

### Phase 1 — Setup (Shared Infrastructure)

**Tasks T001–T009**

The first phase created the skeleton:

1. **Defined the contract** — `AppShellProps` and `AppShellComponent` types in `packages/app-shell`
2. **Created 4 UI packages** — `packages/ui-{mui,mantine,radix,lit}`, each with its own `package.json`, `tsconfig.json`, and `vitest.config.ts`
3. **Installed dependencies** — Each package gets only its framework's dependencies (e.g., `ui-mui` gets `@mui/material`, `@emotion/react`, `@emotion/styled`)
4. **Set up variant loader** — `apps/web/src/config/variant-loader.ts` with dynamic import routing
5. **Created `.env`** — Default `VITE_UI_VARIANT=mui`

### Phase 2 — Foundational Prerequisites

**Tasks T010–T015**

Before any variant could be implemented, shared components were needed:

- **Logo component** — `packages/app-shell/src/components/Logo.tsx`
- **Navigation icons** — `packages/app-shell/src/components/NavIcons.tsx` (Flight Infrastructures + Missions)
- **Host app wiring** — Updated `apps/web/src/App.tsx` to use `React.lazy` + `Suspense` with a `VariantErrorBoundary` for failed dynamic imports
- **Workspace registration** — Verified all 4 packages are in `pnpm-workspace.yaml`

> **Key decision**: The error boundary catches failed dynamic imports and shows a reload button — this prevents a white screen if a variant chunk fails to load.

### Phase 3–4 — MUI Variant (MVP)

**Tasks T016–T024**

MUI was the first variant implemented (the MVP):

1. **Tests first** (TDD) — Unit tests for layout structure and theme toggle written before the component
2. **Theme config** — `createTheme({ cssVariables: true })` generates CSS custom properties
3. **Component** — Uses `AppBar`, `IconButton`, `Box` from `@mui/material`
4. **Theme toggle** — Switches between light/dark via `ThemeProvider`

**Discovery**: Emotion injects new `<style>` tags when encountering component states not yet rendered (e.g., dark-mode `CssBaseline`). MUI cannot achieve true zero-runtime CSS-in-JS. The spec was updated to exempt MUI from the SC-003 zero-style-injection requirement.

### Phase 5 — Mantine Variant

**Tasks T025–T031**

- Uses `MantineProvider` + `forceColorScheme` for theme switching
- Styles in `AppShell.module.css` (CSS Modules)
- **Gotcha**: Must import `@mantine/core/styles.css` explicitly or nothing renders
- **Gotcha**: Tests require a `window.matchMedia` mock in vitest setup

### Phase 6 — Radix Variant

**Tasks T032–T037**

- Simplest API: `<Theme appearance={mode}>` wraps everything
- Pure CSS styling in `AppShell.css` using CSS custom properties
- Zero provider complexity beyond the `<Theme>` wrapper
- Highest DX score (9.0/10) of all variants

### Phase 7 — Lit Variant

**Tasks T038–T044**

- Lit custom element (`wsl-app-shell`) defined in `app-shell.ts` with inline styles
- React wrapper (`AppShellWrapper.tsx`) implements `AppShellProps` directly — **`@lit/react` was NOT used**
- The Lit element is internal; only the React wrapper is the public API
- **Smallest bundle**: 0.75 kB gzipped (no framework overhead)

> **Key decision**: `@lit/react`'s `createComponent()` was considered but rejected. A plain React component with inline styles was simpler, avoided Shadow DOM complexities in tests, and kept the bundle smaller.

### Phase 8 — Storybook Stories

**Tasks T045–T048**

Each variant gets 2 stories (Light + Dark theme), registered in `apps/storybook/stories/appShell/`:

- `MuiAppShell.stories.tsx`
- `MantineAppShell.stories.tsx`
- `RadixAppShell.stories.tsx`
- `LitAppShell.stories.tsx`

### Phase 9 — Page Objects & Integration Tests

**Tasks T049–T052**

Following the project's Page Object convention:

1. **`AppShellPageObject`** — Created in `packages/test-utils/src/page-objects/app-shell.ts` with selectors for topbar, sidebar, nav items, theme toggle
2. **Variant switching e2e** — Verifies `?ui=` parameter loads the correct variant
3. **Layout e2e** — Tests LTR and RTL layout (sidebar at inline-start)
4. **Theme toggle e2e** — Tests theme switch, `data-theme` attribute, SC-003 no-style-injection (MUI exempt), and SC-002 performance (< 100ms, CLS = 0)

**Test counts**: 39 unit tests + 45 e2e tests = 84 total tests

### Phase 10 — Benchmark Data Collection

**Tasks T053–T058**

1. **Production build** — `pnpm build` (506ms, 1,879 modules)
2. **Bundle size** — Measured per-variant chunk sizes from `apps/web/dist/`
3. **Lighthouse audits** — Run via `pnpm lighthouse` using Playwright's Chromium (`CHROME_PATH` env var)
4. **Scoring rubric** — Agent productivity and DX scores on a 1–10 scale with qualitative notes
5. **Results document** — Written to `benchmarks/rendering/appshell-benchmark.md`

### Phase 11 — Polish & Validation

**Tasks T059–T064 + V001–V008**

- Dead code removal (unused exports check)
- Lint + typecheck across all packages
- VitePress documentation pages
- Release gate validation
- Validator challenge findings (error boundary, `data-theme` attribute, MUI exemption enforcement, Lighthouse script security hardening)

## Key Findings

### Bundle Size (Gzipped, Variant-Only)

| Variant |       JS |      CSS |        Total |
| ------- | -------: | -------: | -----------: |
| Lit     |  0.75 kB |        0 |  **0.75 kB** |
| MUI     | 53.44 kB |        0 | **53.44 kB** |
| Mantine | 24.60 kB | 31.61 kB | **56.21 kB** |
| Radix   |  9.82 kB | 82.29 kB | **92.11 kB** |

### Lighthouse Scores

| Variant | Performance | Accessibility | Best Practices | SEO |
| ------- | :---------: | :-----------: | :------------: | :-: |
| MUI     |     99      |      100      |       96       | 82  |
| Mantine |     99      |      100      |       96       | 82  |
| Radix   |     99      |      100      |       96       | 82  |
| Lit     |     100     |      100      |       96       | 82  |

### Developer Experience (Composite Average)

| Variant |  Score  |
| ------- | :-----: |
| Radix   | **9.0** |
| Lit     | **8.7** |
| MUI     | **7.0** |
| Mantine | **6.7** |

## Recommendations

- **Best overall DX**: Radix — simplest API, smallest JS, highest composite score
- **Smallest bundle**: Lit — 0.75 kB total, but limited React ecosystem
- **Most familiar**: MUI — largest community, heaviest bundle
- **Best CSS story**: Mantine — true CSS Modules, zero runtime CSS-in-JS

See the full results at [App Shell Benchmark Results](/benchmarks/app-shell).
