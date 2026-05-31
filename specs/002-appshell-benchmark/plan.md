# Implementation Plan: App Shell UI Framework Benchmark

**Branch**: `002-appshell-benchmark` | **Date**: 2026-05-31 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/002-appshell-benchmark/spec.md`

## Summary

Implement the app shell component in 4 UI framework variants (MUI, Mantine, Radix UI Themes, Lit) as separate packages, with a shared TypeScript interface contract in `packages/app-shell`. The host app (`apps/web`) loads the selected variant via dynamic import based on `?ui=` query parameter or `VITE_UI_VARIANT` env. Each variant uses zero-runtime CSS approaches. After implementation, benchmark data is collected across agent productivity, docs/test ease, and runtime performance dimensions.

## Technical Context

**Language/Version**: TypeScript 5.x / Node.js 22 LTS

**Primary Dependencies**:
- Shared: React 18+, Vite 6+, Vitest, Playwright, Storybook
- MUI variant: `@mui/material`, `@emotion/react`, `@emotion/styled` (with `cssVariables: true` for zero-runtime theme switching)
- Mantine variant: `@mantine/core`, `@mantine/hooks`, `postcss-preset-mantine`, `postcss-simple-vars`
- Radix variant: `@radix-ui/themes`
- Lit variant: `lit`, `@lit/react`

**Storage**: N/A (no persistent storage; theme preference held in React state)

**Testing**: Vitest unit tests for component structure + theme toggle; Playwright for visual/DOM integration; Storybook stories for all variants with light/dark theme

**Target Platform**: Modern desktop browsers (Chrome 111+, Firefox 114+, Edge 111+, Safari 16.4+)

**Project Type**: Frontend monorepo (pnpm workspaces + Nx) with apps, packages, docs, and design-system surfaces

**Performance Goals**: 
- Zero runtime CSS-in-JS (no `<style>` injection post-initial-load)
- Theme switch < 100ms with no layout shift
- Each variant's app shell JS chunk < 100kB gzipped (target: MUI ~80kB, Mantine ~50kB, Radix ~35kB, Lit ~10kB)
- Lighthouse Performance score > 90 for each variant

**Constraints**: pnpm-only installs using latest compatible versions; no manual version pin edits; RTL/LTR parity via logical properties (`inline-start`); only the active variant's code shipped to browser

**Scale/Scope**: 1-2 developers, 4 parallel UI packages, shared contract in app-shell, benchmark document as final deliverable

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] Monorepo decision is explicit: Nx is used for task orchestration; pnpm workspaces for package management. Each UI variant is a separate package for maximum isolation.
- [x] Runtime stack is explicit: Vite + React + TypeScript. No TanStack Start needed — this is a pure SPA benchmark.
- [x] State management scope is explicit: Theme state is local React state (useState). No Zustand needed for this feature — the toggle is a single boolean.
- [x] Documentation plan is explicit: Each variant will have Storybook stories (light/dark); benchmark results will be documented in `benchmarks/rendering/appshell-benchmark.md`.
- [x] Internationalization and layout direction are covered: All 4 variants use CSS logical properties (`inline-start`, `inline-end`) for RTL/LTR parity. No translation strings in the app shell itself (icon-only sidebar).
- [x] Quality strategy is explicit: Vitest unit tests verify DOM structure + theme toggle for each variant. Playwright integration tests verify variant switching via `?ui=` param.
- [x] Data transport choices are explicit: N/A — no API calls in this feature.
- [x] Mapping and real-time constraints are explicit: N/A — no map or real-time in this feature.
- [x] Benchmarking is planned: This feature IS the benchmark. Lighthouse, bundle size, build time, FCP/LCP, and agent productivity scores are all recorded.
- [x] Delivery is sliced into micro-tasks: Each variant is an independent micro-task; shared infrastructure is a separate task.
- [x] Refactoring-only work and new functional additions are separated: The shared interface contract (refactoring `packages/app-shell`) is a distinct task from variant implementations.
- [x] Validation plan checks for dead code: After each variant implementation, unused exports from `packages/app-shell` will be validated; the existing `tools/quality/unused-exports.mjs` script will be run.

## Project Structure

### Documentation (this feature)

```text
specs/002-appshell-benchmark/
├── plan.md              # This file
├── research.md          # Phase 0 output (completed)
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
│   └── app-shell-interface.md
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
apps/
├── web/
│   ├── src/
│   │   ├── config/
│   │   │   └── variant-loader.ts    # Dynamic import router for UI variants
│   │   ├── App.tsx                   # Updated to use variant loader
│   │   └── main.tsx
│   └── .env                          # VITE_UI_VARIANT=mui (default)
├── storybook/
└── docs/

packages/
├── app-shell/
│   └── src/
│       ├── index.ts                  # Existing exports + new contract
│       └── contracts/
│           └── app-shell.ts          # Shared AppShellComponent interface
├── ui-mui/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts
│       └── appShell/
│           ├── index.ts              # Export AppShell component
│           ├── AppShell.tsx           # MUI implementation
│           ├── AppShell.module.css    # Supplementary styles (if needed)
│           └── theme.ts              # MUI createTheme with cssVariables
├── ui-mantine/
│   ├── package.json
│   ├── tsconfig.json
│   ├── postcss.config.cjs
│   └── src/
│       ├── index.ts
│       └── appShell/
│           ├── index.ts
│           ├── AppShell.tsx           # Mantine implementation
│           ├── AppShell.module.css    # Mantine CSS modules
│           └── theme.ts              # Mantine createTheme
├── ui-radix/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts
│       └── appShell/
│           ├── index.ts
│           ├── AppShell.tsx           # Radix Themes implementation
│           └── AppShell.css           # Radix theme overrides
├── ui-lit/
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts
│       └── appShell/
│           ├── index.ts              # React wrapper export
│           ├── app-shell.ts          # Lit custom element
│           ├── AppShellWrapper.tsx    # @lit/react createComponent wrapper
│           └── styles.ts             # css tagged template styles
├── i18n/
├── map-core/
├── realtime/
├── api-rest/
├── api-graphql/
└── test-utils/

benchmarks/
├── rendering/
│   ├── baseline.md
│   └── appshell-benchmark.md         # Final benchmark results
├── realtime/
└── developer-experience/
```

**Structure Decision**: Nx workspace with pnpm. Each UI variant is its own package (`packages/ui-*`) for clean dependency isolation and independent bundle measurement. The shared contract lives in `packages/app-shell` (the existing package) to avoid a new package just for types.

## Complexity Tracking

No constitution violations. All gates pass.
