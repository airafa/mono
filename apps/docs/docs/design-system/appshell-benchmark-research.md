# App Shell Benchmark — Research & Technical Decisions

This page documents the research phase that preceded the App Shell Benchmark implementation. Each section covers a technical decision, what alternatives were considered, and what was ultimately chosen — with post-implementation findings where the initial assumptions were wrong.

## Framework Styling Strategies

### MUI: CSS Theme Variables

**Decision**: Use MUI with `cssVariables: true` in `createTheme()`.

**How it works**: MUI generates CSS custom properties (e.g., `--mui-palette-primary-main`) at build time. Theme switching between light and dark toggles a CSS class on the root element — no JavaScript style recalculation is needed for the switch itself.

**Why not Pigment CSS?** MUI's next-gen zero-runtime engine (Pigment CSS) was evaluated but rejected — it's still in alpha (as of 2026), requires a WyW-in-JS build plugin that isn't stable with Vite outside Next.js, and is not recommended for production.

**Post-implementation finding**: Emotion (MUI's runtime CSS-in-JS engine) still injects new `<style>` tags when encountering component states not yet rendered. For example, toggling to dark mode triggers `CssBaseline` to inject dark-mode styles it hasn't generated yet. This means **MUI cannot achieve true zero-runtime CSS-in-JS on theme toggle**. The spec was updated to exempt MUI from the zero-style-injection success criterion (SC-003).

**Measured bundle impact**: 53.44 kB gzipped JS, zero external CSS. Lighter than initial estimates.

---

### Mantine: Native CSS Modules

**Decision**: Use Mantine 7.x with its built-in CSS Modules approach + `postcss-preset-mantine`.

**How it works**: Mantine 7.x ships pre-compiled `.css` files. Dark mode uses the `data-mantine-color-scheme` attribute on `<html>` — toggling is a DOM attribute change with no style recalculation. Theme customization goes through `MantineProvider` + `createTheme()` with CSS variables.

**Key gotcha discovered**: You **must** import `@mantine/core/styles.css` explicitly or the components render completely unstyled (no visual output at all). This is easy to miss and caused confusion during implementation.

**Testing gotcha**: Vitest tests require a `window.matchMedia` mock because Mantine queries it for color scheme detection. Without the mock, tests fail with `TypeError: window.matchMedia is not a function`.

---

### Radix: Static CSS + Custom Properties

**Decision**: Use `@radix-ui/themes` with its built-in CSS file and class-based dark mode.

**How it works**: Radix Themes ships a single CSS file (`@radix-ui/themes/styles.css`) containing all component styles as CSS custom properties. Dark mode is toggled via `<Theme appearance="dark">`. Zero runtime CSS-in-JS by design.

**Trade-off discovered**: The CSS file is **82.29 kB gzipped** — the largest CSS payload of all 4 variants. This is the full Radix design system (colors, spacing, typography for all components). However, it's static and highly cacheable, and the JS itself is only 9.82 kB gzipped.

**DX finding**: Radix scored highest in developer experience (9.0/10 composite) because its API is the simplest — `<Theme>` wrapper, plain HTML, CSS classes. No providers, no theme objects, no boilerplate.

---

### Lit: React Wrapper with Inline Styles

**Decision**: Use Lit 3.x to define a custom element, but export only a React wrapper component.

**Initial plan vs. reality**:

- **Plan**: Use `@lit/react`'s `createComponent()` to wrap the Lit element for React interop
- **Reality**: A plain React component with inline styles was simpler, avoided Shadow DOM complexities in tests, and kept the bundle smaller. `@lit/react` was removed as an unused dependency.

The Lit custom element (`wsl-app-shell`) is defined in `app-shell.ts` using `static styles` with `css` tagged template literals. However, it's **not exported** from the package barrel — it exists as an internal implementation detail reserved for potential future non-React consumers.

**Measured bundle impact**: 0.75 kB gzipped JS, zero CSS. By far the smallest variant — essentially just a React component with inline style objects.

---

## Variant Loading Strategy

**Decision**: Use Vite dynamic `import()` with code-splitting.

The host app reads the variant selection from three sources (in priority order):

1. `?ui=` query parameter
2. `VITE_UI_VARIANT` environment variable
3. Hardcoded default: `'mui'`

Then calls `import('@wsl-ad/ui-{variant}/appShell')` to lazy-load only the selected variant.

**Why not separate builds?** Four separate Vite configs (one per variant) were considered but rejected as over-engineering. Dynamic imports achieve the same chunk isolation with simpler DX and a single build command.

**Build narrowness guarantee**: Since each `packages/ui-*` only depends on its own framework, Vite/Rollup never bundles MUI code when loading the Mantine variant. The dynamic import boundary ensures separate chunks automatically.

**Error handling**: A `VariantErrorBoundary` class component wraps `<Suspense>` in the host app. If a variant chunk fails to load (network error, corrupted chunk), it catches the error and renders a message with a reload button instead of a white screen.

---

## Testing Strategy

### Unit Tests (Vitest + jsdom)

Each variant has its own test file in `packages/ui-*/src/appShell/__tests__/AppShell.test.tsx` covering:

- Layout structure (top bar, sidebar, 2 nav icons)
- Theme toggle (clicking changes `data-theme` attribute)
- Provider setup (each framework's wrapping requirements)

**Total**: 39 unit tests across 7 test files.

### Integration Tests (Playwright)

Three e2e test files in `apps/web/src/__tests__/`:

| File                       | What It Tests                                                                                             |
| -------------------------- | --------------------------------------------------------------------------------------------------------- |
| `variant-switching.e2e.ts` | `?ui=` parameter loads the correct variant                                                                |
| `appshell-layout.e2e.ts`   | Layout structure in LTR and RTL directions                                                                |
| `appshell-theme.e2e.ts`    | Theme toggle, `data-theme` attribute, SC-003 style injection check, SC-002 performance (< 100ms, CLS = 0) |

**Total**: 45 e2e tests across 3 files.

All tests use `AppShellPageObject` from `packages/test-utils` — following the project's Page Object convention for reusable selectors and interaction methods.

### Performance Tests

The e2e suite includes automated SC-002 verification:

- Theme switch must complete in **< 100ms** (measured with `performance.now()`)
- Cumulative Layout Shift must be **0** during toggle (measured with `PerformanceObserver`)

---

## Lighthouse Benchmarking

### Setup

Lighthouse 13.3.0 is installed as a workspace dev dependency and runs via `pnpm lighthouse`. The benchmark script (`tools/quality/lighthouse-benchmark.mjs`) was hardened for security:

- **`execFileSync`** instead of `execSync` to prevent shell injection
- URL validation with `new URL()` constructor
- Variant whitelist (`['mui', 'mantine', 'radix', 'lit']`)
- Path construction via `path.join()` / `path.resolve()`
- Auto-detects Playwright's Chromium via `CHROME_PATH` environment variable

### WSL-Specific Challenge

Running Lighthouse in WSL with a Windows Chrome binary fails because Chrome opens a Windows GUI window that can't connect back to the WSL network. **Solution**: Use Playwright's headless Chromium (which runs natively in WSL Linux) by setting `CHROME_PATH` to the Playwright Chromium binary path and passing `--headless=new`.

### Results

All 4 variants exceed the Performance > 90 target. Lit achieves a perfect 100 with the fastest FCP (1.1s) and LCP (1.4s), consistent with its 0.75 kB bundle. Accessibility is 100 across all variants.

---

## Key Lessons Learned

1. **MUI's "zero-runtime" claim is aspirational** — `cssVariables: true` eliminates runtime theme recalculation but Emotion still injects styles for new component states. For truly zero-runtime CSS, use Mantine, Radix, or Lit.

2. **Radix's large CSS file is a red herring** — 82 kB gzipped CSS sounds scary, but it's static, cacheable, and loaded once. The JS (9.82 kB) is tiny. Total DX is best-in-class.

3. **Lit is the smallest by a huge margin** — 0.75 kB total. But it requires React interop knowledge and has a limited component ecosystem compared to MUI/Mantine/Radix.

4. **CSS Modules just work** — Mantine's approach (and the project's own `*.module.css` files) require zero runtime overhead and integrate cleanly with Vite's built-in CSS Modules support.

5. **Test isolation matters** — Each variant's unit tests must set up their framework's provider correctly. Mantine needs `matchMedia` mocks. MUI needs `ThemeProvider`. Radix and Lit need nothing special.

6. **Dynamic imports give you free code-splitting** — No complex build configuration needed. Vite handles chunk splitting automatically at `import()` boundaries.
