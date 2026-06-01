# App Shell UI Framework Benchmark Results

**Date**: 2026-05-31
**Branch**: 002-appshell-benchmark
**Environment**: Node.js 22 LTS, Vite 8.0.14, React 19.2.6
**Build tool**: Vite 8.0.14 (production mode, code-split per variant)

---

## 1. Bundle Size (Production Build)

### Per-Variant Chunks

| Variant | JS Chunk               | JS Raw    | JS Gzip  | CSS Chunk               | CSS Raw   | CSS Gzip |
| ------- | ---------------------- | --------- | -------- | ----------------------- | --------- | -------- |
| MUI     | `appShell-DsAh__KH.js` | 158.14 kB | 53.44 kB | —                       | 0 kB      | 0 kB     |
| Mantine | `appShell-DT8tH7iX.js` | 81.12 kB  | 24.60 kB | `appShell-BxnZf1Ed.css` | 214.34 kB | 31.61 kB |
| Radix   | `appShell-RwKk7GTN.js` | 28.02 kB  | 9.82 kB  | `appShell-BTTqhRws.css` | 684.54 kB | 82.29 kB |
| Lit     | `appShell-HzcFkSnb.js` | 1.74 kB   | 0.75 kB  | —                       | 0 kB      | 0 kB     |

### Shared Chunks (loaded by all variants)

| Chunk                               | Description                           | Raw       | Gzip     |
| ----------------------------------- | ------------------------------------- | --------- | -------- |
| `index-K21O_pTn.js`                 | React + app framework                 | 195.35 kB | 62.08 kB |
| `floating-ui.react-dom-DoMHq5AF.js` | Tooltip positioning (Mantine + Radix) | 23.48 kB  | 8.99 kB  |
| `clsx-CjueKrWZ.js`                  | Class name utility                    | 0.41 kB   | 0.27 kB  |

### Total Per-Variant Load (JS + CSS gzip, excl. shared)

| Variant     | Variant-Only Gzip | Notes                                                                         |
| ----------- | ----------------- | ----------------------------------------------------------------------------- |
| **Lit**     | **0.75 kB**       | Inline styles, zero CSS files                                                 |
| **Radix**   | **92.11 kB**      | 9.82 kB JS + 82.29 kB CSS (`@radix-ui/themes/styles.css` — full theme system) |
| **Mantine** | **56.21 kB**      | 24.60 kB JS + 31.61 kB CSS (`@mantine/core/styles.css`)                       |
| **MUI**     | **53.44 kB**      | All JS (Emotion runtime baked in), zero external CSS                          |

### Observations

- **Lit** is the smallest by a huge margin — React wrapper with inline styles, no framework overhead
- **MUI** and **Mantine** are similar in total gzip (~53-56 kB) but MUI is JS-heavy while Mantine is CSS-heavy
- **Radix** JS is tiny (9.82 kB) but `@radix-ui/themes/styles.css` (82 kB gz) is the largest CSS file — this is the full Radix design system; it's static and highly cacheable
- Only Lit achieves true zero-CSS-in-JS with zero external CSS

---

## 2. Build & Quality Metrics

| Metric                    | Value                                                                                                         |
| ------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Production build time     | 506ms                                                                                                         |
| Total modules transformed | 1,879                                                                                                         |
| Unit tests                | 39 passing (7 per variant + 5 app-shell + 6 web)                                                              |
| Test files                | 7 passing                                                                                                     |
| TypeScript                | 6/6 packages pass `tsc --noEmit`                                                                              |
| ESLint                    | 6/6 packages pass lint                                                                                        |
| Storybook stories         | 4 stories × 2 themes (Light + Dark) = 8 story variants                                                        |
| Playwright e2e tests      | 45 tests across 3 files (variant switching, layout LTR+RTL, theme toggle + data-theme + SC-003 + SC-002 perf) |

---

## 2.5 Lighthouse Scores (Production Build)

Collected against `vite preview` using Lighthouse 13.3.0 + Playwright Chromium (headless).

| Variant | Performance | Accessibility | Best Practices | SEO | FCP   | LCP   |
| ------- | ----------- | ------------- | -------------- | --- | ----- | ----- |
| MUI     | 99          | 100           | 96             | 82  | 1.4 s | 1.7 s |
| Mantine | 99          | 100           | 96             | 82  | 1.4 s | 1.8 s |
| Radix   | 99          | 100           | 96             | 82  | 1.2 s | 1.8 s |
| Lit     | 100         | 100           | 96             | 82  | 1.1 s | 1.4 s |

### Observations

- All variants exceed the SC-004 target of Performance > 90
- **Lit** achieves a perfect 100 with the fastest FCP (1.1 s) and LCP (1.4 s), consistent with its 0.75 kB bundle
- **Radix** has the fastest FCP among the full-framework variants (1.2 s) despite its large CSS — static CSS is highly cacheable
- **Accessibility** is 100 across all variants — all pass WCAG automated checks
- **Best Practices** at 96 across the board (minor console warning from Vite preview mode)
- **SEO** at 82 — expected for an SPA with no SSR/meta tags; not a target for this benchmark

---

## 3. Developer Experience — Agent Productivity Scores

### Implementation Ease (1-10 scale)

| Variant | Score | Rationale                                                                                                               |
| ------- | ----- | ----------------------------------------------------------------------------------------------------------------------- |
| Radix   | 9/10  | Simplest API: `<Theme appearance={mode}>` + plain HTML + CSS classes. Zero provider complexity.                         |
| Lit     | 8/10  | React wrapper is straightforward; Lit element itself is minimal. No provider nesting.                                   |
| Mantine | 7/10  | `MantineProvider` + `forceColorScheme` is clean. **Gotcha**: must import `@mantine/core/styles.css` or nothing renders. |
| MUI     | 6/10  | Requires `ThemeProvider` + `CssBaseline` + `createTheme` with `cssVariables: true`. More boilerplate.                   |

### Documentation & Testing Ease (1-10 scale)

| Variant | Score | Rationale                                                                              |
| ------- | ----- | -------------------------------------------------------------------------------------- |
| Lit     | 9/10  | Plain HTML output in tests, no provider mocking needed, testing-library works directly |
| Radix   | 9/10  | No mocking needed, standard React testing patterns, simple CSS output                  |
| MUI     | 7/10  | Tests work well with ThemeProvider. jsdom compatible without extra mocks.              |
| Mantine | 6/10  | Requires `window.matchMedia` mock in vitest setup. Otherwise straightforward.          |

### Storybook Integration Ease (1-10 scale)

| Variant | Score | Rationale                                                                    |
| ------- | ----- | ---------------------------------------------------------------------------- |
| Radix   | 9/10  | Just wrap in `<Theme>`, import CSS file. Zero configuration.                 |
| Lit     | 9/10  | React wrapper renders normally in Storybook. No special config.              |
| MUI     | 8/10  | ThemeProvider wraps stories cleanly. Emotion works out of the box.           |
| Mantine | 7/10  | MantineProvider + `@mantine/core/styles.css` import + PostCSS config needed. |

### Composite DX Score

| Variant | Impl | Test | Storybook | **Average** |
| ------- | ---- | ---- | --------- | ----------- |
| Radix   | 9    | 9    | 9         | **9.0**     |
| Lit     | 8    | 9    | 9         | **8.7**     |
| MUI     | 6    | 7    | 8         | **7.0**     |
| Mantine | 7    | 6    | 7         | **6.7**     |

---

## 4. Summary Ranking

| Dimension              | 1st           | 2nd             | 3rd                | 4th              |
| ---------------------- | ------------- | --------------- | ------------------ | ---------------- |
| JS Bundle (gzip)       | Lit (0.75 kB) | Radix (9.82 kB) | Mantine (24.60 kB) | MUI (53.44 kB)   |
| Total Load (JS+CSS gz) | Lit (0.75 kB) | MUI (53.44 kB)  | Mantine (56.21 kB) | Radix (92.11 kB) |
| Implementation Ease    | Radix (9)     | Lit (8)         | Mantine (7)        | MUI (6)          |
| Testing Ease           | Lit/Radix (9) | Lit/Radix (9)   | MUI (7)            | Mantine (6)      |
| Storybook Ease         | Radix/Lit (9) | Radix/Lit (9)   | MUI (8)            | Mantine (7)      |
| Composite DX           | Radix (9.0)   | Lit (8.7)       | MUI (7.0)          | Mantine (6.7)    |

---

## 5. Recommendations

### For zero-runtime CSS priority

1. **Radix UI** — Best DX (9.0), small JS, built-in theming. CSS is large but static and cacheable.
2. **Lit** — Smallest total bundle by far (0.75 kB). Requires React interop layer knowledge.
3. **Mantine** — Good CSS Modules story, moderate total. Gotcha: must import core CSS explicitly.
4. **MUI** — Largest JS. `cssVariables: true` helps but Emotion runtime still adds weight.

### For smallest total payload

1. **Lit** (0.75 kB) — No contest, but limited component ecosystem
2. **MUI** (53.44 kB) — All JS, no external CSS, tree-shakeable
3. **Mantine** (56.21 kB) — Similar to MUI but CSS adds to first load
4. **Radix** (92.11 kB) — JS is tiny but full theme CSS is heavy on first load
