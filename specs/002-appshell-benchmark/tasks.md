# Tasks: App Shell UI Framework Benchmark

**Input**: Design documents from `specs/002-appshell-benchmark/`

**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/app-shell-interface.md

**Tests**: Included — the spec explicitly requires unit/integration tests (FR-016) and Storybook stories (FR-015).

**Organization**: Tasks are grouped by user story. US1 (variant switching) + US4 (layout) + US2 (theming) are all P1 and combined in phases since they are inseparable in implementation. US3 (benchmarking) is P2.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Exact file paths included in all task descriptions
- Refactoring tasks separated from new feature tasks

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the 4 UI packages, shared interface contract, and variant loader infrastructure

- [ ] T001 Define AppShellComponent interface contract in packages/app-shell/src/contracts/app-shell.ts
- [ ] T002 Export contract types from packages/app-shell/src/index.ts
- [ ] T003 [P] Create packages/ui-mui/package.json (with `"exports": { ".": "./src/index.ts", "./appShell": "./src/appShell/index.ts" }`), packages/ui-mui/tsconfig.json, and packages/ui-mui/vitest.config.ts (environment: jsdom) with MUI dependencies
- [ ] T004 [P] Create packages/ui-mantine/package.json (with `"exports": { ".": "./src/index.ts", "./appShell": "./src/appShell/index.ts" }`), packages/ui-mantine/tsconfig.json, packages/ui-mantine/vitest.config.ts (environment: jsdom), and packages/ui-mantine/postcss.config.cjs with Mantine dependencies
- [ ] T005 [P] Create packages/ui-radix/package.json (with `"exports": { ".": "./src/index.ts", "./appShell": "./src/appShell/index.ts" }`), packages/ui-radix/tsconfig.json, and packages/ui-radix/vitest.config.ts (environment: jsdom) with Radix Themes dependencies
- [ ] T006 [P] Create packages/ui-lit/package.json (with `"exports": { ".": "./src/index.ts", "./appShell": "./src/appShell/index.ts" }`), packages/ui-lit/tsconfig.json, and packages/ui-lit/vitest.config.ts (environment: jsdom) with Lit and @lit/react dependencies
- [ ] T007 Run pnpm install to resolve all new package dependencies and verify `tsc --noEmit` passes with new @wsl-ad/ui-* references
- [ ] T008 Create apps/web/.env with VITE_UI_VARIANT=mui default configuration
- [ ] T009 Implement variant loader in apps/web/src/config/variant-loader.ts with dynamic import routing

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared assets and host app wiring that MUST be complete before any variant implementation

**⚠️ CRITICAL**: No variant implementation can begin until this phase is complete

- [ ] T010 [P] Create shared logo component in packages/app-shell/src/components/Logo.tsx
- [ ] T011 [P] Create shared navigation icon components (FlightInfrastructures, Missions) in packages/app-shell/src/components/NavIcons.tsx
- [ ] T012 Update apps/web/src/App.tsx to use variant loader with React.lazy and Suspense
- [ ] T013 Add VITE_UI_VARIANT to apps/web/vite.config.ts env type declarations in apps/web/src/vite-env.d.ts
- [ ] T014 Register all 4 ui-* packages in pnpm-workspace.yaml (if not auto-detected)
- [ ] T015 Validate unused exports with tools/quality/unused-exports.mjs after contract addition

**Checkpoint**: Infrastructure ready — variant implementation can now begin in parallel

---

## Phase 3: User Story 4 + 1 — MUI App Shell Layout & Variant Switching (Priority: P1) 🎯 MVP

**Goal**: MUI variant implements the full app shell layout (top bar + logo + theme toggle + sidebar with 2 icons) and is selectable via `?ui=mui`

**Independent Test**: Navigate to `/?ui=mui` and verify top bar with logo, theme toggle button, and sidebar with 2 nav icons renders correctly in both LTR and RTL

### Tests for MUI Variant

- [ ] T016 [P] [US4] Create unit test for MUI AppShell layout structure in packages/ui-mui/src/appShell/__tests__/AppShell.test.tsx
- [ ] T017 [P] [US1] Create unit test for variant loader in apps/web/src/config/__tests__/variant-loader.test.ts (must cover: valid params, invalid param falls back to env default, missing env falls back to 'mui', import rejection falls back gracefully)

### Implementation for MUI Variant

- [ ] T018 [P] [US4] Create MUI theme configuration with cssVariables in packages/ui-mui/src/appShell/theme.ts
- [ ] T019 [US4] Implement MUI AppShell component (top bar, sidebar, content area) in packages/ui-mui/src/appShell/AppShell.tsx
- [ ] T020 [US4] Export AppShell from packages/ui-mui/src/appShell/index.ts and packages/ui-mui/src/index.ts
- [ ] T021 [US1] Verify variant loader correctly imports @wsl-ad/ui-mui/appShell via dynamic import

**Checkpoint**: MUI variant fully functional — `/?ui=mui` renders correct layout. This is the MVP.

---

## Phase 4: User Story 2 — MUI Theme Toggle (Priority: P1)

**Goal**: MUI variant supports light/dark theme switching via toggle button in top bar

**Independent Test**: Click theme toggle and verify colors change without layout shift; verify no runtime `<style>` injection

### Tests for MUI Theme

- [ ] T022 [P] [US2] Add theme toggle test to packages/ui-mui/src/appShell/__tests__/AppShell.test.tsx

### Implementation for MUI Theme

- [ ] T023 [US2] Add light/dark CSS variable themes to packages/ui-mui/src/appShell/theme.ts
- [ ] T024 [US2] Wire theme toggle button (onThemeToggle callback) in packages/ui-mui/src/appShell/AppShell.tsx

**Checkpoint**: MUI variant supports full light/dark theming

---

## Phase 5: User Story 4 + 1 + 2 — Mantine App Shell (Priority: P1)

**Goal**: Mantine variant implements full app shell layout with theme toggle

**Independent Test**: Navigate to `/?ui=mantine` and verify identical layout + theme toggle behavior

### Tests for Mantine Variant

- [ ] T025 [P] [US4] Create unit test for Mantine AppShell layout in packages/ui-mantine/src/appShell/__tests__/AppShell.test.tsx
- [ ] T026 [P] [US2] Add theme toggle test to packages/ui-mantine/src/appShell/__tests__/AppShell.test.tsx

### Implementation for Mantine Variant

- [ ] T027 [P] [US4] Create Mantine theme in packages/ui-mantine/src/appShell/theme.ts
- [ ] T028 [US4] Implement Mantine AppShell component in packages/ui-mantine/src/appShell/AppShell.tsx
- [ ] T029 [P] [US4] Create CSS module styles in packages/ui-mantine/src/appShell/AppShell.module.css
- [ ] T030 [US4] Export AppShell from packages/ui-mantine/src/appShell/index.ts and packages/ui-mantine/src/index.ts
- [ ] T031 [US2] Wire theme toggle using Mantine color scheme API in packages/ui-mantine/src/appShell/AppShell.tsx

**Checkpoint**: Mantine variant fully functional with theme toggle

---

## Phase 6: User Story 4 + 1 + 2 — Radix UI App Shell (Priority: P1)

**Goal**: Radix variant implements full app shell layout with theme toggle

**Independent Test**: Navigate to `/?ui=radix` and verify identical layout + theme toggle behavior

### Tests for Radix Variant

- [ ] T032 [P] [US4] Create unit test for Radix AppShell layout in packages/ui-radix/src/appShell/__tests__/AppShell.test.tsx
- [ ] T033 [P] [US2] Add theme toggle test to packages/ui-radix/src/appShell/__tests__/AppShell.test.tsx

### Implementation for Radix Variant

- [ ] T034 [P] [US4] Create Radix theme override CSS in packages/ui-radix/src/appShell/AppShell.css
- [ ] T035 [US4] Implement Radix AppShell component using Theme component in packages/ui-radix/src/appShell/AppShell.tsx
- [ ] T036 [US4] Export AppShell from packages/ui-radix/src/appShell/index.ts and packages/ui-radix/src/index.ts
- [ ] T037 [US2] Wire theme toggle using Radix Theme appearance prop in packages/ui-radix/src/appShell/AppShell.tsx

**Checkpoint**: Radix variant fully functional with theme toggle

---

## Phase 7: User Story 4 + 1 + 2 — Lit Web Components App Shell (Priority: P1)

**Goal**: Lit variant implements full app shell layout with theme toggle via React wrapper

**Independent Test**: Navigate to `/?ui=lit` and verify identical layout + theme toggle behavior

### Tests for Lit Variant

- [ ] T038 [P] [US4] Create unit test for Lit AppShell layout in packages/ui-lit/src/appShell/__tests__/AppShell.test.tsx
- [ ] T039 [P] [US2] Add theme toggle test to packages/ui-lit/src/appShell/__tests__/AppShell.test.tsx

### Implementation for Lit Variant

- [ ] T040 [P] [US4] Create Lit element styles in packages/ui-lit/src/appShell/styles.ts
- [ ] T041 [US4] Implement Lit custom element app-shell in packages/ui-lit/src/appShell/app-shell.ts
- [ ] T042 [US4] Create React wrapper using @lit/react createComponent in packages/ui-lit/src/appShell/AppShellWrapper.tsx
- [ ] T043 [US4] Export AppShell from packages/ui-lit/src/appShell/index.ts and packages/ui-lit/src/index.ts
- [ ] T044 [US2] Wire theme toggle via CSS custom properties and host attribute in packages/ui-lit/src/appShell/app-shell.ts

**Checkpoint**: Lit variant fully functional with theme toggle

---

## Phase 8: Storybook Stories (All Variants)

**Purpose**: Register all 4 variants in Storybook with light/dark theme demonstrations

- [ ] T045 [P] [US4] Create MUI AppShell story (light + dark) in apps/storybook/stories/appShell/MuiAppShell.stories.tsx
- [ ] T046 [P] [US4] Create Mantine AppShell story (light + dark) in apps/storybook/stories/appShell/MantineAppShell.stories.tsx
- [ ] T047 [P] [US4] Create Radix AppShell story (light + dark) in apps/storybook/stories/appShell/RadixAppShell.stories.tsx
- [ ] T048 [P] [US4] Create Lit AppShell story (light + dark) in apps/storybook/stories/appShell/LitAppShell.stories.tsx

**Checkpoint**: All 4 variants have Storybook stories demonstrating layout + themes

---

## Phase 9: Page Objects & Integration Tests

**Purpose**: Create AppShell page object (constitution III) and Playwright tests verifying variant switching and cross-variant consistency

- [ ] T049 [US4] Create AppShellPageObject in packages/test-utils/src/page-objects/app-shell.ts with selectors for topbar, sidebar, nav items, theme toggle, and documented interaction methods
- [ ] T050 [P] [US1] Create Playwright test for variant switching via ?ui= param in apps/web/src/__tests__/variant-switching.e2e.ts (uses AppShellPageObject)
- [ ] T051 [P] [US4] Create Playwright test for layout structure (top bar + sidebar) in apps/web/src/__tests__/appshell-layout.e2e.ts — must test BOTH LTR and RTL (set dir="rtl" and verify sidebar at inline-end)
- [ ] T052 [P] [US2] Create Playwright test for theme toggle in apps/web/src/__tests__/appshell-theme.e2e.ts

**Checkpoint**: All integration tests pass for all variants; page object documents supported interactions

---

## Phase 10: User Story 3 — Benchmark Data Collection (Priority: P2)

**Goal**: Collect and document benchmark data across all 3 dimensions for all 4 variants

**Independent Test**: Verify benchmarks/rendering/appshell-benchmark.md exists with data for all 4 variants × 3 dimensions

### Implementation

- [ ] T053 [US3] Build production bundle and measure per-variant chunk sizes in apps/web/dist/
- [ ] T054 [US3] Run Lighthouse audit for each variant and record scores (document: Chrome version, CPU throttling 4x, cold-cache, 3 runs averaged)
- [ ] T055 [US3] Measure build time, FCP, LCP, and theme toggle time for each variant
- [ ] T056 [US3] Record agent productivity scores (implementation ease) with rubric data for each variant
- [ ] T057 [US3] Record agent docs/test/storybook ease scores with rubric data for each variant
- [ ] T058 [US3] Create benchmark results document at benchmarks/rendering/appshell-benchmark.md

**Checkpoint**: Benchmark document complete with all measurements

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Cleanup, validation, dead-code removal, documentation

- [ ] T059 [P] Run tools/quality/unused-exports.mjs and remove any dead code exposed by the changes
- [ ] T060 [P] Run pnpm lint across all affected packages
- [ ] T061 [P] Run pnpm typecheck across all affected packages
- [ ] T062 Create minimal VitePress doc page at apps/docs/docs/design-system/app-shell.md describing the app shell contract, variant usage, and theme toggle API
- [ ] T063 Validate quickstart.md instructions work end-to-end
- [ ] T064 Update benchmarks/rendering/baseline.md with reference to the new appshell-benchmark.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 completion — BLOCKS all variant implementations
- **MUI Variant (Phase 3-4)**: Depends on Phase 2 — this is the MVP
- **Mantine Variant (Phase 5)**: Depends on Phase 2 — can run in parallel with Phases 3-4
- **Radix Variant (Phase 6)**: Depends on Phase 2 — can run in parallel with Phases 3-5
- **Lit Variant (Phase 7)**: Depends on Phase 2 — can run in parallel with Phases 3-6
- **Storybook (Phase 8)**: Depends on the variant it documents (each story can be added as soon as its variant is complete)
- **Page Objects & Integration Tests (Phase 9)**: Depends on all 4 variants being complete (Phases 3-7)
- **Benchmarking (Phase 10)**: Depends on all variants + tests complete (Phases 3-9)
- **Polish (Phase 11)**: Depends on all desired work being complete
- **Polish (Phase 11)**: Depends on all desired work being complete

### User Story Dependencies

- **US4 (Layout)**: Foundation for all — implemented within each variant's phase
- **US1 (Variant Switching)**: Depends on at least one variant existing (Phase 3 MVP)
- **US2 (Theming)**: Implemented per-variant alongside layout
- **US3 (Benchmarking)**: Depends on all of US1 + US2 + US4 being complete across all variants

### Parallel Opportunities Per Variant

After Phase 2 completes, all 4 variant implementations (Phases 3-7) can proceed in parallel:

```
Phase 2 complete
    ├── Phase 3-4 (MUI) ─────────┐
    ├── Phase 5 (Mantine) ───────┤
    ├── Phase 6 (Radix) ─────────┤── All complete → Phase 9 → Phase 10 → Phase 11
    └── Phase 7 (Lit) ───────────┘
                                  └── Phase 8 (stories added per-variant as each completes)
```

### Within Each Variant Phase

1. Tests written FIRST (T016/T025/T032/T038) — should FAIL initially
2. Theme configuration (T018/T027/T034/T040) — can parallel with tests
3. Component implementation (T019/T028/T035/T041)
4. Export wiring (T020/T030/T036/T043)
5. Theme toggle (T023-24/T031/T037/T044)
6. Tests pass — checkpoint

---

## Implementation Strategy

**MVP**: Phase 1 → Phase 2 → Phase 3-4 (MUI variant with layout + theme + variant switching). At this point the app works with `/?ui=mui`.

**Incremental delivery**: Each subsequent variant (Mantine, Radix, Lit) is an independent increment that can be merged separately.

**Benchmark last**: Phase 10 is the final measurement after all implementations are stable.
