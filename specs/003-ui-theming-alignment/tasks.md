# Tasks: UI Theming Alignment & Design Token Consolidation

**Input**: Design documents from `specs/003-ui-theming-alignment/`

**Prerequisites**: [plan.md](plan.md) · [spec.md](spec.md) · [research.md](research.md) · [data-model.md](data-model.md) · [contracts/](contracts/)

**User Stories**:
- **US1** (P1) — Centralized Design Token Consumption
- **US2** (P2) — UI Contracts Package for Shared Interfaces
- **US3** (P2) — Variant-Owned Component Implementation
- **US6** (P2) — Expressive Theme via URL Parameter
- **US4** (P3) — Vanilla Extract for Cross-Cutting Styles
- **US5** (P3) — Constitution and Enterprise UI Alignment

**MVP Scope**: Complete US1 (token package) alone delivers a working build with canonical tokens applied across all 4 variants.

---

## Phase 1: Setup

**Purpose**: Scaffold the two new packages (`ui-tokens`, `ui-contracts`) and wire them into the Nx workspace so all downstream phases can reference them.

- [X] T001 Create `packages/ui-tokens/` directory structure per [plan.md Project Structure](plan.md) and add `package.json` (`@mono/ui-tokens`) with `@vanilla-extract/css`, `@vanilla-extract/vite-plugin`, `@vanilla-extract/recipes`, `@vanilla-extract/sprinkles` as dependencies in `packages/ui-tokens/package.json`
- [X] T002 Add `packages/ui-tokens/tsconfig.json` extending `tsconfig.base.json` with `"moduleResolution": "bundler"` and `"composite": true`
- [X] T003 Add `packages/ui-tokens/vite.config.ts` registering `vanillaExtractPlugin()` from `@vanilla-extract/vite-plugin`
- [X] T004 Add `packages/ui-tokens/vitest.config.ts` extending the workspace vitest config
- [X] T005 [P] Create `packages/ui-contracts/` directory structure and add `package.json` (`@mono/ui-contracts`) with zero runtime dependencies in `packages/ui-contracts/package.json`
- [X] T006 [P] Add `packages/ui-contracts/tsconfig.json` extending `tsconfig.base.json`
- [X] T007 Register both new packages in `pnpm-workspace.yaml` (if not auto-discovered) and add path aliases `@mono/ui-tokens` and `@mono/ui-contracts` to `tsconfig.base.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Publish the token values and interface contracts so every user story can consume them. No US1–US6 work can begin until T008–T016 are complete.

**⚠️ CRITICAL**: Token and contract packages must build successfully before any variant work starts.

- [X] T008 Author the `TokenTree` type and light-mode `tokens` object (`as const`) in `packages/ui-tokens/src/tokens.ts` — includes all Solarized+M3 color roles, Gemini gradient tokens, Almarai/Rubik font scale, spacing, elevation, motion (with `anticipate`/`thinking` easings), and circle-based radius scale per [data-model.md §1.1](data-model.md)
- [X] T009 Author `packages/ui-tokens/src/tokens.dark.ts` — `colorDark` overrides (Solarized dark mapping) as `as const`
- [X] T010 Author `packages/ui-tokens/src/tokens.expressive.ts` — `ExpressiveOverrides` object (radius, motion, elevation overrides) as `as const` per [data-model.md §1.6](data-model.md)
- [X] T011 Author the `packages/ui-tokens/src/__tests__/tokens.typetest.ts` type-test asserting `tokens satisfies TokenTree`
- [X] T012 [P] Author `AppShellNavItem`, `AppShellProps` (`themeMode: 'light' | 'dark' | 'expressive'`), and `AppShellComponent` in `packages/ui-contracts/src/app-shell/index.ts` — migrated from [packages/app-shell/src/contracts/app-shell.ts](../../packages/app-shell/src/contracts/app-shell.ts) with `themeMode` union extended
- [X] T013 [P] Author `ListSortConfig`, `ListFilterConfig`, `ListPaginationConfig`, `ListProps`, `ListComponent` in `packages/ui-contracts/src/list/index.ts` per [data-model.md §2.2](data-model.md)
- [X] T014 [P] Author `FormFieldError`, `FormFieldProps`, `FormProps`, `FormComponent`, `TextInputProps`, `SelectOption`, `SelectProps`, `CheckboxProps`, `RadioOption`, `RadioGroupProps`, `TextAreaProps` in `packages/ui-contracts/src/forms/index.ts` per [data-model.md §2.3–2.4](data-model.md)
- [X] T015 [P] Author `packages/ui-contracts/src/index.ts` barrel re-exporting all contracts
- [X] T016 Run `pnpm -r build` scoped to `ui-tokens` and `ui-contracts`; fix any TypeScript errors before proceeding

**Checkpoint**: `@mono/ui-tokens` and `@mono/ui-contracts` build cleanly — US1–US6 can now start.

---

## Phase 3: User Story 1 — Centralized Design Token Consumption (P1) 🎯 MVP

**Goal**: All four variants import tokens from `@mono/ui-tokens` and their theme files use canonical values for color, spacing, typography, elevation, motion, and radius.

**Independent Test**: Change `tokens.color.primary` in `packages/ui-tokens/src/tokens.ts`; rebuild all variants; confirm all four render the new color without any per-variant file edit.

- [X] T017 [US1] Add `@mono/ui-tokens` as a dependency in `packages/ui-mantine/package.json` and register `vanillaExtractPlugin()` in `packages/ui-mantine/vite.config.ts` (if not already present)
- [X] T018 [P] [US1] Add `@mono/ui-tokens` dependency and `vanillaExtractPlugin()` to `packages/ui-mui/package.json` and `packages/ui-mui/vite.config.ts`
- [X] T019 [P] [US1] Add `@mono/ui-tokens` dependency and `vanillaExtractPlugin()` to `packages/ui-radix/package.json` and `packages/ui-radix/vite.config.ts`
- [X] T020 [P] [US1] Add `@mono/ui-tokens` dependency to `packages/ui-lit/package.json` (no VE plugin — Lit uses shadow DOM)
- [X] T021 [US1] Author `packages/ui-mantine/src/token-adapter.ts` — `buildMantineTheme(themeMode)` mapping canonical tokens to `MantineThemeOverride`; handles `'light'`, `'dark'`, `'expressive'` branches per [contracts/variant-adapter-contract.md](contracts/variant-adapter-contract.md)
- [X] T022 [P] [US1] Author `packages/ui-mui/src/token-adapter.ts` — `buildMuiTheme(themeMode)` mapping tokens to `ThemeOptions`; handles all three modes
- [X] T023 [P] [US1] Author `packages/ui-radix/src/token-adapter.ts` — `buildRadixThemeProps(themeMode)` returning `<Theme>` props; handles all three modes
- [X] T024 [P] [US1] Author `packages/ui-lit/src/token-adapter.ts` — `getLitTokenProperties(themeMode)` returning CSS custom property map; handles all three modes
- [X] T025 [US1] Update `packages/ui-mantine/src/appShell/` to consume `buildMantineTheme()` and `getMantineThemeClass()` from the new adapter
- [X] T026 [P] [US1] Update `packages/ui-mui/src/appShell/` to consume `buildMuiTheme()`
- [X] T027 [P] [US1] Update `packages/ui-radix/src/appShell/` to consume `buildRadixThemeProps()`
- [X] T028 [P] [US1] Update `packages/ui-lit/src/appShell/app-shell.ts` to apply `getLitTokenProperties()` CSS custom properties on the host element
- [X] T029 [US1] Add Google Fonts preconnect + stylesheet link for `Almarai:wght@700` and `Rubik:wght@400;500` to `apps/web/index.html`
- [X] T030 [US1] Run `pnpm -r build` across all four variants; run `pnpm test` on each variant; confirm zero TypeScript errors and token values visible in built output

---

## Phase 4: User Story 2 — UI Contracts Package for Shared Interfaces (P2)

**Goal**: All 20 consumers of `AppShellProps` import from `@mono/ui-contracts`. `app-shell` contracts are removed; a re-export shim bridges the migration.

**Independent Test**: After T031–T037, `grep -r "@mono/app-shell" --include="*.ts" --include="*.tsx"` returns only the shim itself and non-contract exports (Logo, icons, env).

- [X] T031 [US2] Add re-export shim to `packages/app-shell/src/index.ts`: `export type { AppShellNavItem, AppShellProps, AppShellComponent } from '@mono/ui-contracts'`
- [X] T032 [US2] Verify all existing consumers compile with the shim in place — run `pnpm tsc -p tsconfig.base.json --noEmit`
- [X] T036 [P] [US2] **⚠️ Must run before T033** — Add `@mono/ui-contracts` dependency to `packages/ui-mantine/package.json`, `packages/ui-mui/package.json`, `packages/ui-radix/package.json`, `packages/ui-lit/package.json`, `apps/web/package.json`, `apps/storybook/package.json`; run `pnpm install`
- [X] T033 [US2] Update all 20 import sites to import directly from `@mono/ui-contracts` instead of `@mono/app-shell`:
  - `packages/ui-mantine/src/appShell/`
  - `packages/ui-mui/src/appShell/`
  - `packages/ui-radix/src/appShell/`
  - `packages/ui-lit/src/appShell/`
  - `apps/storybook/stories/`
  - `apps/web/src/App.tsx`
  - `apps/docs/`
  (find all with `grep -r "app-shell" --include="*.ts" --include="*.tsx" -l`)
- [X] T034 [US2] Remove the re-export shim from `packages/app-shell/src/index.ts` and delete `packages/app-shell/src/contracts/app-shell.ts`
- [X] T035 [US2] Run `pnpm tsc -p tsconfig.base.json --noEmit` and `pnpm -r build` to confirm zero import errors after shim removal
- [X] T037 [US2] Run `node tools/quality/unused-exports.mjs` to confirm no orphaned exports remain in `packages/app-shell`

---

## Phase 5: User Story 3 — Variant-Owned Component Implementation & Package Retirement (P2)

**Goal**: Placeholder packages `ui-list`, `ui-forms`, `ui-form-controls` removed from workspace. Each active variant has stub list/form implementations satisfying `ui-contracts` interfaces.

**Independent Test**: `pnpm ls --depth 0` does not list `@mono/ui-list`, `@mono/ui-forms`, or `@mono/ui-form-controls`. `pnpm test` passes for all variants.

- [X] T038 [US3] Confirm placeholder packages have zero production consumers: run `grep -r "ui-list\|ui-forms\|ui-form-controls" --include="*.ts" --include="*.tsx" --include="*.json" -l` (expected: only their own `package.json`)
- [X] T039 [US3] Remove `packages/ui-list`, `packages/ui-forms`, `packages/ui-form-controls` from `pnpm-workspace.yaml` and delete all three directories
- [X] T040 [US3] Run `pnpm install` to update lockfile after package removal; run `pnpm -r build` to confirm no dangling references
- [X] T041 [US3] Create `packages/ui-mantine/src/list/index.ts` — Mantine `List` component stub satisfying `ListComponent` from `@mono/ui-contracts`
- [X] T042 [P] [US3] Create `packages/ui-mantine/src/forms/index.ts` — Mantine `Form` + `TextInput` + `Select` + `Checkbox` + `RadioGroup` + `TextArea` stubs satisfying their respective contracts
- [X] T043 [P] [US3] Create `packages/ui-mui/src/list/index.ts` and `packages/ui-mui/src/forms/index.ts` — MUI component stubs satisfying contracts
- [X] T044 [P] [US3] Create `packages/ui-radix/src/list/index.ts` and `packages/ui-radix/src/forms/index.ts` — Radix UI Themes component stubs satisfying contracts
- [X] T045 [P] [US3] Create `packages/ui-lit/src/list/index.ts` and `packages/ui-lit/src/forms/index.ts` — Lit web component stubs satisfying contracts (CSS custom property tokens, no VE)
- [X] T046 [US3] Add `src/contract.typetest.ts` to each variant asserting `AppShellComponent`, `ListComponent`, `FormComponent` satisfaction using `satisfies` per [contracts/ui-contracts-interface.md](contracts/ui-contracts-interface.md)
- [X] T047 [US3] Run `pnpm test` across all four variants; confirm type-tests pass and no references to retired packages remain

---

## Phase 6: User Story 6 — Expressive Theme via URL Parameter (P2)

**Goal**: `?theme=expressive` (alone or combined with `?ui={variant}`) activates Gemini-inspired gradient surfaces, heavy rounding, and kinetic motion on all four variants.

**Independent Test**: Load `http://localhost:5173/?ui=mantine&theme=expressive`; DevTools confirms `data-theme="expressive"` on shell root, `border-radius` ≥ 16px on a card, gradient on the header.

- [X] T048 [US6] Add `getActiveTheme(): 'light' | 'dark' | 'expressive'` to `apps/web/src/config/variant-loader.ts` — reads `URLSearchParams('theme')`, falls back to `'light'` for invalid values per [data-model.md §1.6](data-model.md)
- [X] T049 [US6] Update `apps/web/src/App.tsx` — change `useState<'light' | 'dark'>` to `useState<'light' | 'dark' | 'expressive'>`, seed with `getActiveTheme()`; make `onThemeToggle` a no-op when `themeMode === 'expressive'`
- [X] T050 [US6] Author `packages/ui-tokens/src/theme.css.ts` — `createThemeContract`, `lightThemeClass`, `darkThemeClass`, `expressiveThemeClass` using Vanilla Extract per [data-model.md §1.2](data-model.md)
- [X] T051 [US6] Update `packages/ui-mantine/src/token-adapter.ts` — wire `expressiveThemeClass`, `data-theme="expressive"` attribute on shell root, gradient header component style override; verify exhaustive `'expressive'` branch
- [X] T052 [P] [US6] Update `packages/ui-mui/src/token-adapter.ts` — expressive branch: `MuiAppBar` gradient override, larger `borderRadius`, tinted elevation shadows
- [X] T053 [P] [US6] Update `packages/ui-radix/src/token-adapter.ts` — expressive branch: `radius="large"` prop, `data-theme="expressive"` on shell root; gradient via CSS module selector
- [X] T054 [P] [US6] Update `packages/ui-lit/src/token-adapter.ts` — expressive branch: inject `--shell-radius-md`/`--shell-radius-lg` overrides; set `data-theme="expressive"` on host; shadow root CSS `:host([data-theme='expressive']) .header` applies gradient per [contracts/variant-adapter-contract.md](contracts/variant-adapter-contract.md)
- [X] T055 [US6] Manually verify all four `?ui={variant}&theme=expressive` URLs in the browser; confirm gradient header, rounded surfaces, kinetic transitions
- [X] T056 [US6] Run `node tools/quality/lighthouse-benchmark.mjs` for `?ui=mantine&theme=expressive` and confirm WCAG 2.1 AA contrast is maintained (SC-010)

---

## Phase 7: User Story 4 — Vanilla Extract for Cross-Cutting Styles (P3)

**Goal**: `densityRecipe`, `motionRecipe`, and `sprinkles` are available from `@mono/ui-tokens` and usable in any variant `.css.ts` file.

**Independent Test**: In `packages/ui-mantine`, import `densityRecipe`; apply `densityRecipe({ density: 'compact' })`; verify the built CSS contains a static class name and no `<style>` injection at runtime.

- [X] T057 [US4] Author `packages/ui-tokens/src/recipes/density.css.ts` — `DensityRecipe` with `compact`, `comfortable`, `spacious` variants consuming `vars.spacing.*` per [data-model.md §1.3](data-model.md)
- [X] T058 [P] [US4] Author `packages/ui-tokens/src/recipes/motion.css.ts` — `MotionRecipe` with `reduced: true` variant that sets `transition: 'none'` per [data-model.md §1.4](data-model.md)
- [X] T059 [P] [US4] Author `packages/ui-tokens/src/sprinkles/layout.css.ts` — `LayoutSprinkles` with responsive conditions (mobile/tablet/desktop), display, flex, gap, `paddingBlock`, `paddingInline`, `marginBlock`, `marginInline` (CSS logical properties) per [data-model.md §1.5](data-model.md)
- [X] T060 [US4] Re-export `densityRecipe`, `motionRecipe`, `sprinkles` from `packages/ui-tokens/src/index.ts`
- [X] T061 [US4] Add a usage example of `densityRecipe` in `packages/ui-mantine/src/list/index.ts` (apply `comfortable` density by default, accept `density` prop)
- [X] T062 [US4] Run `pnpm build` on `ui-tokens` and `ui-mantine`; inspect build output to confirm zero runtime style injection for recipes and sprinkles

---

## Phase 8: User Story 5 — Constitution and Enterprise UI Alignment (P3)

**Goal**: Constitution updated to v1.3 codifying the token-first architecture, `ui-contracts`, variant-owned components, VE cross-cutting role, and expressive theme governance.

**Independent Test**: A reviewer reads the updated constitution and finds explicit guidance on: token package, `ui-contracts`, variant adapter pattern, expressive theme URL param, retirement policy for placeholder packages.

- [X] T063 [US5] Read `.specify/memory/constitution.md` current version; draft amendments for Principle II ("Reusable UI") adding: token-first architecture, `ui-contracts` as contract authority, variant-owned implementations, VE as cross-cutting layer, expressive theme as URL-param-only feature flag
- [X] T064 [US5] Update `.specify/memory/constitution.md` — bump version to `1.3.0`; add or update the "Reusable UI" section per T063 draft
- [X] T065 [US5] Add a "Package Retirement Policy" note to the constitution: any package with zero production exports (confirmed by `unused-exports.mjs`) must be removed in the same feature branch that introduces its replacement
- [X] T066 [US5] Run `pnpm -r build && pnpm test` across the full workspace as the final quality gate; confirm all SC-001–SC-010 from [spec.md](spec.md) pass

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Dead code removal, RTL validation, Storybook coverage, docs.

- [X] T067 [P] Run `node tools/quality/unused-exports.mjs` on the full workspace; remove any orphaned exports surfaced by the tooling
- [X] T068 [P] Run `node tools/quality/validate-environment-readiness.mjs`; fix any reported gaps
- [X] T069 [P] Add Playwright test in `apps/web/` for LTR/RTL theme switching: assert logical property CSS on list items and form inputs when `dir="rtl"` is set on `<html>`
- [X] T070 [P] Add Playwright test for `?theme=expressive` URL param: assert `data-theme="expressive"`, `border-radius ≥ 16px`, gradient header background for MUI variant (representative smoke test)
- [X] T071 [P] Add Storybook stories in `apps/storybook/stories/` for `lightThemeClass`, `darkThemeClass`, `expressiveThemeClass` applied on the MUI AppShell (visual regression baseline)
- [X] T072 Update `apps/docs/` VitePress documentation: add pages for `@mono/ui-tokens` API and `@mono/ui-contracts` interfaces

---

## Phase 10: DESIGN.md Alignment & Visual Consistency

**Purpose**: Align the design system documentation with Google's DESIGN.md specification format and add Playwright visual regression tests confirming all 4 variants render consistently.

- [X] T073 [P] Create root-level `DESIGN.md` file following the [Google DESIGN.md specification](https://stitch.withgoogle.com/docs/design-md/specification) — YAML front matter with all design tokens (colors, typography, rounded, spacing, components) mapped from `packages/ui-tokens/src/tokens.ts` + markdown body with Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, Do's and Don'ts sections per [data-model.md](data-model.md)
- [X] T074 [P] Update `specs/003-ui-theming-alignment/spec.md` — add DESIGN.md alignment reference, add SC-011 (visual consistency across variants) and SC-012 (DESIGN.md lint validation) success criteria
- [X] T075 [P] Update `specs/003-ui-theming-alignment/plan.md` — add DESIGN.md to project structure, reference Google DESIGN.md specification
- [X] T076 [P] Update `specs/003-ui-theming-alignment/research.md` — add R-010 research decision for DESIGN.md format alignment
- [X] T077 Add Playwright visual consistency test `apps/web/src/__tests__/visual-consistency.e2e.ts` — for each theme mode (`light`, `dark`, `expressive`), capture screenshots of all 4 variants (MUI, Mantine, Radix, Lit) and compare them to verify structural/stylistic consistency (layout geometry, color application, spacing, typography)
- [X] T078 Run `npx @google/design.md lint DESIGN.md` to validate the DESIGN.md file passes structural checks with zero errors

---

## Phase 11: Design-Language & Cross-Variant Refinement

**Purpose**: Align the expressive theme with the official Material 3 Expressive motion spec, make fonts deterministic across environments, refactor the MUI variant onto Vanilla Extract, and close the cross-variant visual gaps surfaced by the consistency suite.

- [X] T079 Replace the custom "anticipate" expressive easing with official **Material 3 Expressive** spring curves (web conversion table) in `packages/ui-tokens/src/tokens.expressive.ts`; expand to `fastSpatial`/`slowSpatial`/`effects`/`fastEffects`; wire `expressiveThemeClass` durations (500/350/650ms) in `packages/ui-tokens/src/theme.css.ts` per [research.md R-012](research.md)
- [X] T080 Switch web-font loading from Google Fonts CDN to local `@fontsource/almarai` + `@fontsource/rubik` in `apps/storybook/.storybook/preview.ts` and the web entry; remove the CDN `<link>` injection per [research.md R-013](research.md)
- [X] T081 [US1] Refactor `packages/ui-mui` to Vanilla Extract: author all AppShell/forms layout in `appShell/AppShell.css.ts` and `forms/forms.css.ts`; remove every `sx` prop; replace `AppBar`/`Toolbar`/`Box` with semantic `header`/`aside`/`main`; add `@vanilla-extract/css` dependency per [research.md R-011](research.md)
- [X] T082 [US5] Add an ESLint `no-restricted-syntax` rule scoped to `packages/ui-mui/**` that bans the `sx` JSX attribute (message points to VE/recipes/sprinkles) in `eslint.config.mjs`
- [X] T083 [P] Fix cross-variant gaps surfaced by the visual-consistency suite (per [research.md R-014](research.md)): Lit shell `font-family`/`font-size` from CSS vars; Mantine `black`→`onSurface`; Radix `--color-on-surface`/`--color-surface-variant` + content color/font; MUI AppBar → `background.default`; sidebars standardized to `surfaceVariant`
- [X] T084 [P] Add Storybook design-system stories (ColorPalette, Typography, per-variant Mui/Mantine/Radix/Lit) with a `transform`-containing-block decorator so `position: fixed` AppShell elements stay inside the canvas; remove duplicate VE-prefixed MUI AppShell stories, keeping `Light`/`Dark`/`Expressive`
- [X] T085 Scope Radix overflow suppression to `.radix-themes:has(> .app-shell)` and switch the visual-consistency screenshots to viewport-clipped (`overflow: hidden` before measurement) so headed and headless runs match; refresh committed snapshot baselines
- [X] T086 Run `pnpm lint && pnpm -r build && pnpm test && pnpm test:e2e`; confirm zero `sx` props remain in `packages/ui-mui/src`, all 4 variants render identically (fonts, colors, geometry), and 72/72 e2e pass

---

## Dependencies

```
Phase 1 (T001–T007)
  └── Phase 2 (T008–T016)          ← token + contract packages must build
        ├── Phase 3 (T017–T030)    US1: all variants adopt tokens     [MVP]
        ├── Phase 4 (T031–T037)    US2: contract migration            [can start after T016]
        │     └── Phase 5 (T038–T047) US3: placeholder retirement    [after US2 complete]
        ├── Phase 6 (T048–T056)    US6: expressive theme              [after T016 + T050]
        ├── Phase 7 (T057–T062)    US4: VE recipes/sprinkles          [after T016]
        └── Phase 8 (T063–T066)    US5: constitution update           [after all US complete]
              └── Phase 9 (T067–T072) Polish                          [after Phase 8]
                    └── Phase 10 (T073–T078) DESIGN.md + visual tests [after Phase 9]
                          └── Phase 11 (T079–T086) design-language + cross-variant refinement [after Phase 10]
```

**Parallel opportunities per story**:
- **US1**: T018–T020 (add dependency to 3 variants), T022–T024 (adapters), T026–T028 (appShell wiring) all run in parallel
- **US2**: T036 (add dependency to 4 variants) in parallel
- **US3**: T042–T045 (stub components across variants) all in parallel; T046 (type-tests) in parallel
- **US6**: T052–T054 (expressive branch in 3 variants) in parallel
- **US4**: T058, T059 (motion recipe + sprinkles) in parallel
- **Phase 9**: T067–T072 all in parallel

---

## Implementation Strategy

1. **MVP first** — complete Phase 1–3 (T001–T030). This delivers a working token system consumed by all four variants. Shippable increment.
2. **Interface consolidation** — Phase 4–5 (T031–T047). Migrates contracts and retires dead packages. No user-visible change; reduces tech debt.
3. **Expressive theme** — Phase 6 (T048–T056). Additive feature, activated only via URL param. No risk to production default experience.
4. **VE cross-cutting** — Phase 7 (T057–T062). Additive layer; does not change existing component behavior.
5. **Governance** — Phase 8–9 (T063–T072). Constitution + dead code sweep + docs.
