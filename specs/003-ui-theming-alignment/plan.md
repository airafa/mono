# Implementation Plan: UI Theming Alignment & Design Token Consolidation

**Branch**: `003-ui-theming-alignment` | **Date**: 2026-06-01 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/003-ui-theming-alignment/spec.md`

**DESIGN.md Alignment**: The design system is documented in the root-level `DESIGN.md` following the [Google DESIGN.md specification](https://stitch.withgoogle.com/docs/design-md/specification) (YAML front matter for machine-readable tokens + markdown body for human-readable design rationale). The `DESIGN.md` serves as the canonical reference alongside `packages/ui-tokens` source code.

## Summary

Introduce a canonical design-token package (`packages/ui-tokens`) and a shared interface package (`packages/ui-contracts`) as the single sources of truth for all UI styling and component contracts. Migrate `AppShellProps` from `packages/app-shell` to `ui-contracts`. Retire empty placeholder packages (`ui-list`, `ui-forms`, `ui-form-controls`). Layer Vanilla Extract as a build-time cross-cutting styling API (density recipes, sprinkles, theme classes). Add an **expressive theme** — a Gemini-inspired visual mode (gradient surfaces, circle-based rounding, kinetic motion) — accessible exclusively via `?theme=expressive` URL param, combinable with `?ui={variant}`. Update the project constitution to v1.3.

Color system: Solarized palette (Ethan Schoonover) mapped to M3 semantic roles; gradient tokens follow the Gemini visual design language (design.google/library/gemini-ai-visual-design) — directional energy pointers with sharp opaque leading edges diffusing at the tail, and radial "thinking" gradients that ripple outward. Typography: Almarai (H1, RTL/LTR) + Rubik (body, labels, inputs, badges).

## Technical Context

**Language/Version**: TypeScript 5.x / Node.js 22 LTS

**Primary Dependencies**: React 18, Vite 6, pnpm 10.33.2, Nx, Vitest, Playwright; `@vanilla-extract/css`, `@vanilla-extract/vite-plugin`, `@vanilla-extract/recipes`, `@vanilla-extract/sprinkles`; Mantine v7, MUI v6, Radix UI Themes, Lit 3

**Storage**: N/A — token system is build-time only; theme state lives in `useState` + URL params

**Testing**: Vitest (unit + type-tests), Playwright (integration: theme switching, expressive URL param, cross-variant contract compliance), Storybook (visual coverage per variant)

**Target Platform**: Modern desktop browsers (Chromium, Firefox, Safari) in enterprise environments; RTL (Hebrew/Arabic) and LTR parity required

**Project Type**: Nx frontend monorepo — apps (`web`, `storybook`, `docs`), packages (UI variants, token system, contracts), benchmarks

**Performance Goals**:
- Theme switching (light ↔ dark): < 100 ms, zero layout shift — CSS var reassignment only
- Expressive theme activation (URL param on load): < 16 ms CSS class application (single `classList.add` on shell root)
- Vanilla Extract build output: zero runtime CSS generation for cross-cutting utilities

**Constraints**: pnpm-only installs; no manual version pins in new manifests; RTL/LTR parity; constitution-compliant; all changes in atomic micro-tasks that pass quick human review

**Scale/Scope**: 2–3 developers; 4 active UI variants; 20 existing consumers of `AppShellProps`; 3 packages to retire

## Constitution Check

*GATE: Must pass before implementation starts. Re-check after Phase 1 design.*

- ✅ **Monorepo decision**: Nx — already in use; this feature adds packages within the existing Nx workspace structure. Justified.
- ✅ **Runtime stack**: Vite + React + TypeScript. No TanStack Start. VE is a build-time tool only — no server-side routing changes.
- ✅ **State management**: Theme state is `useState` in `App.tsx`; expressive theme is URL-param activated (read-once on mount). No Zustand involvement — theme is UI state, not app state.
- ✅ **Documentation**: `quickstart.md` updated; Storybook coverage per variant required in micro-tasks; VitePress docs updated for new packages.
- ✅ **Internationalization / RTL**: Almarai (Arabic/Latin RTL) + Rubik (Hebrew/Latin RTL). CSS logical properties throughout token system and contracts. LTR/RTL Playwright tests required.
- ✅ **Quality**: Vitest unit + type-tests per contract per variant; Playwright integration for theme switching and `?theme=expressive`; Lighthouse accessibility check required (SC-010).
- ✅ **Data transport**: N/A — no REST or GraphQL changes in this feature.
- ✅ **Benchmarking**: Theme-switch < 100 ms benchmark exists (spec 002 SC-002 baseline); expressive activation measured at < 16 ms target.
- ✅ **Micro-task delivery**: Each unit (add package, migrate interface, retire package, add VE, expressive theme) is a distinct implementable task in `tasks.md`.
- ✅ **Refactoring vs. new features**: Separated — migration tasks (interfaces, retirement) are distinct from new-functionality tasks (VE, expressive theme).
- ✅ **Dead code validation**: `unused-exports.mjs` tool run after each retirement; orphaned imports caught by TypeScript strict mode.

**No gate violations.** No complexity tracking entries needed.

## Project Structure

### Documentation (this feature)

```text
specs/003-ui-theming-alignment/
├── plan.md              # This file
├── spec.md              # Feature specification
├── research.md          # Phase 0: 9 research decisions (R-001 – R-009)
├── data-model.md        # Phase 1: token tree, VE contract, interfaces, adapter patterns
├── quickstart.md        # Phase 1: developer onboarding guide
├── contracts/           # Phase 1: interface contract documents
│   ├── ui-tokens-contract.md
│   ├── ui-contracts-interface.md
│   └── variant-adapter-contract.md
└── tasks.md             # Phase 2 output (/speckit.tasks — NOT created by /speckit.plan)

DESIGN.md                            # Root-level: Google DESIGN.md format (YAML tokens + markdown rationale)
```

### Source Code (repository root)

```text
packages/
├── ui-tokens/                        # NEW — canonical design token source
│   ├── package.json                  # @wsl-ad/ui-tokens
│   ├── tsconfig.json
│   ├── vitest.config.ts
│   └── src/
│       ├── index.ts                  # barrel: exports tokens, lightTokens, darkTokens, expressiveOverrides
│       ├── tokens.ts                 # base TokenTree (as const) — light values
│       ├── tokens.dark.ts            # dark-mode overrides (colorDark.*)
│       ├── tokens.expressive.ts      # expressive override set (radius, motion, elevation, gradient)
│       ├── theme.css.ts              # VE: createThemeContract, lightThemeClass, darkThemeClass, expressiveThemeClass
│       ├── recipes/
│       │   ├── density.css.ts        # DensityRecipe (compact/comfortable/spacious)
│       │   └── motion.css.ts         # MotionRecipe (reduced-motion variant)
│       ├── sprinkles/
│       │   └── layout.css.ts         # LayoutSprinkles (responsive display/flex/gap/padding/margin)
│       └── __tests__/
│           └── tokens.typetest.ts    # satisfies TokenTree shape test
│
├── ui-contracts/                     # NEW — shared TypeScript interface contracts
│   ├── package.json                  # @wsl-ad/ui-contracts
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts                  # barrel
│       ├── app-shell/
│       │   └── index.ts              # AppShellNavItem, AppShellProps (themeMode: 'light'|'dark'|'expressive'), AppShellComponent
│       ├── list/
│       │   └── index.ts              # ListProps, ListSortConfig, ListFilterConfig, ListPaginationConfig, ListComponent
│       └── forms/
│           └── index.ts              # FormProps, FormFieldProps, FormFieldError, TextInputProps, SelectProps, CheckboxProps, RadioGroupProps, TextAreaProps
│
├── app-shell/                        # MODIFIED — remove contract interfaces; keep env/platform/icons/Logo
│   └── src/
│       ├── contracts/                # DELETED (interfaces moved to ui-contracts)
│       ├── index.ts                  # re-export shim: re-exports AppShellProps etc. from ui-contracts (migration step 1)
│       └── ...                       # Logo, icons, environment, platform, readiness unchanged
│
├── ui-mantine/                       # MODIFIED
│   └── src/
│       ├── appShell/
│       ├── token-adapter.ts          # maps ui-tokens → MantineThemeOverride; handles 'expressive' themeMode
│       └── contract.typetest.ts      # satisfies AppShellComponent, ListComponent, FormComponent
│
├── ui-mui/                           # MODIFIED — same structure as ui-mantine
├── ui-radix/                         # MODIFIED — same structure as ui-mantine
├── ui-lit/                           # MODIFIED — CSS custom property adapter; data-theme="expressive" on host
│
├── ui-list/                          # RETIRED — empty barrel, removed from workspace
├── ui-forms/                         # RETIRED — empty barrel, removed from workspace
└── ui-form-controls/                 # RETIRED — empty barrel, removed from workspace

apps/
└── web/
    └── src/
        ├── App.tsx                   # MODIFIED — useState<'light'|'dark'|'expressive'>; reads getActiveTheme()
        ├── __tests__/
        │   └── visual-consistency.e2e.ts # NEW — Playwright visual comparison across 4 variants
        └── config/
            └── variant-loader.ts     # MODIFIED — adds getActiveTheme(): 'light'|'dark'|'expressive'
```

**Structure Decision**: Nx monorepo (already in use). Two new packages own this feature: `ui-tokens` (token system, VE theme classes, recipes, sprinkles) and `ui-contracts` (shared TypeScript interfaces). All four variant packages are consumers. `apps/web` is the only runtime entry point and is the integration point for URL-param-based theme activation.

## Complexity Tracking

No constitution gate violations. No entries required.
