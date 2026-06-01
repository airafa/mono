# App Shell Benchmark

**Spec**: `specs/002-appshell-benchmark` | **Branch**: `002-appshell-benchmark`

Benchmarks the app shell component across 4 UI framework variants: MUI, Mantine, Radix UI, and Lit Web Components.

## Bundle Size (Production Build — Gzip)

| Variant | JS Gzip  | CSS Gzip | Total Gzip   |
| ------- | -------- | -------- | ------------ |
| Lit     | 0.75 kB  | 0 kB     | **0.75 kB**  |
| MUI     | 53.44 kB | 0 kB     | **53.44 kB** |
| Mantine | 24.60 kB | 31.61 kB | **56.21 kB** |
| Radix   | 9.82 kB  | 82.29 kB | **92.11 kB** |

Shared chunks (loaded by all variants): `index.js` (62.08 kB gz), `floating-ui` (8.99 kB gz), `clsx` (0.27 kB gz).

## Developer Experience Scores

| Variant | Implementation | Testing | Storybook | **Average** |
| ------- | -------------- | ------- | --------- | ----------- |
| Radix   | 9              | 9       | 9         | **9.0**     |
| Lit     | 8              | 9       | 9         | **8.7**     |
| MUI     | 6              | 7       | 8         | **7.0**     |
| Mantine | 7              | 6       | 7         | **6.7**     |

## Quality Metrics

| Metric                    | Value                     |
| ------------------------- | ------------------------- |
| Production build time     | 506ms                     |
| Total modules transformed | 1,879                     |
| Unit tests                | 39 passing                |
| Playwright e2e tests      | 41 tests across 3 files   |
| TypeScript                | 6/6 packages pass         |
| ESLint                    | 6/6 packages pass         |
| Storybook stories         | 8 (4 variants × 2 themes) |

## Lighthouse Scores (Production Build)

| Variant | Performance | FCP   | LCP   | Accessibility | Best Practices |
| ------- | ----------- | ----- | ----- | ------------- | -------------- |
| MUI     | 99          | 1.4 s | 1.7 s | 100           | 96             |
| Mantine | 99          | 1.4 s | 1.8 s | 100           | 96             |
| Radix   | 99          | 1.2 s | 1.8 s | 100           | 96             |
| Lit     | 100         | 1.1 s | 1.4 s | 100           | 96             |

Scores collected against `vite preview` production build using Lighthouse 13.3.0 + Playwright Chromium.

## Recommendations

### For zero-runtime CSS priority

1. **Radix UI** — Best DX (9.0), small JS, built-in theming. CSS is large but static and cacheable.
2. **Lit** — Smallest total bundle (0.75 kB). Requires React interop layer.

### For smallest total payload

1. **Lit** (0.75 kB) — No contest, but limited component ecosystem.
2. **MUI** (53.44 kB) — All JS, no external CSS, tree-shakeable.

## Full Report

See `benchmarks/rendering/appshell-benchmark.md` in the repository root for the complete raw data.
