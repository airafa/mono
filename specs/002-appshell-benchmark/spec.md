# Feature Specification: App Shell UI Framework Benchmark

**Feature Branch**: `002-appshell-benchmark`

**Created**: 2026-05-31

**Status**: Draft

**Input**: User description: "Benchmark the App Shell component across 4 UI library variants (MUI, Mantine, Radix UI, Lit Web Components) measuring agent productivity, documentation/testing ease, and runtime performance."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Run App Shell with Selected UI Variant (Priority: P1)

As a developer, I can launch the web app with a specific UI framework variant for the app shell by using the `?ui={mui|mantine|radix|lit}` query parameter, so that I can compare visual output and runtime behavior across implementations.

**Why this priority**: The ability to switch between variants at runtime is the foundational capability that enables all subsequent benchmarking and comparison work.

**Independent Test**: Can be tested by launching the web app with each `?ui=` value and verifying the correct app shell renders with the expected layout (top row + icon sidebar at inline-start).

**Acceptance Scenarios**:

1. **Given** the web app is running, **When** a user navigates to `/?ui=mui`, **Then** the MUI-based app shell renders with a top bar, inline-start icon sidebar, logo, and two navigation icons (Flight Infrastructures, Missions).
2. **Given** the web app is running, **When** a user navigates to `/?ui=mantine`, **Then** the Mantine-based app shell renders with identical layout.
3. **Given** the web app is running, **When** a user navigates to `/?ui=radix`, **Then** the Radix UI-based app shell renders with identical layout.
4. **Given** the web app is running, **When** a user navigates to `/?ui=lit`, **Then** the Lit web-component-based app shell renders with identical layout.
5. **Given** no `?ui=` parameter is provided, **When** the app loads, **Then** the variant specified in the `.env` `VITE_UI_VARIANT` configuration is used as the default.

---

### User Story 2 - App Shell Supports Light and Dark Theme (Priority: P1)

As a user, I can view the app shell in both light and dark themes across all 4 variants, so that the theming capability of each framework can be evaluated.

**Why this priority**: Theme support is a core requirement of the app shell and critical for benchmarking each framework's theming ergonomics.

**Independent Test**: Can be tested by toggling theme mode and verifying that colors, contrast, and visual appearance update correctly in all 4 variants.

**Acceptance Scenarios**:

1. **Given** any variant is loaded in light mode, **When** the user clicks the theme toggle button in the top bar, **Then** the app shell re-renders with appropriate dark theme colors without layout shift.
2. **Given** any variant is loaded in dark mode, **When** the user clicks the theme toggle button in the top bar, **Then** the app shell re-renders with appropriate light theme colors without layout shift.
3. **Given** each variant, **When** rendered in both themes, **Then** there is zero CSS-in-JS runtime overhead (styles are pre-compiled or use vanilla CSS/extract).

---

### User Story 3 - Benchmark Data Collection (Priority: P2)

As a team lead, I can review benchmark data comparing all 4 app shell variants across three dimensions (agent productivity, documentation/testing ease, runtime performance), so that I can make an informed framework selection decision.

**Why this priority**: The benchmark data is the ultimate deliverable of this feature — but it requires the implementations to exist first.

**Independent Test**: Can be tested by verifying the benchmark report file exists and contains measured data for all 4 variants across all 3 scoring dimensions.

**Acceptance Scenarios**:

1. **Given** all 4 variants are implemented, **When** the benchmark is recorded, **Then** there is a score for "agent planning & implementation ease" for each variant.
2. **Given** all 4 variants are implemented, **When** the benchmark is recorded, **Then** there is a score for "docs, tests, and storybook ease" for each variant.
3. **Given** all 4 variants are implemented, **When** the benchmark is recorded, **Then** there are Lighthouse scores, bundle size measurements, and build/load/runtime performance numbers for each variant.

---

### User Story 4 - App Shell Layout Structure (Priority: P1)

As a user, I see a consistent app shell layout across all variants: a single row at the top containing the application logo, and a single-column icon sidebar at the inline-start side with navigation icons for "Flight Infrastructures" and "Missions".

**Why this priority**: The layout defines the exact visual and structural contract all variants must fulfill; without this, comparison is meaningless.

**Independent Test**: Can be tested by rendering each variant and verifying DOM structure contains: top bar with logo, sidebar at inline-start with exactly 2 icon buttons.

**Acceptance Scenarios**:

1. **Given** any variant is rendered, **When** the document direction is LTR, **Then** the icon sidebar appears on the left side.
2. **Given** any variant is rendered, **When** the document direction is RTL, **Then** the icon sidebar appears on the right side.
3. **Given** any variant is rendered, **When** inspecting the top bar, **Then** it contains the application logo.
4. **Given** any variant is rendered, **When** inspecting the sidebar, **Then** it contains exactly 2 icon navigation items: "Flight Infrastructures" and "Missions".

---

### Edge Cases

- What happens when an invalid `?ui=` value is provided? (Falls back to `.env` default)
- What happens when `.env` does not specify a UI_VARIANT? (Falls back to `mui` as the hardcoded default)
- What happens when the Lit web component variant is rendered inside a React tree? (Uses a React wrapper component for interop)
- How does each variant handle viewport resize (responsive behavior)? (Deferred to a future story — this slice implements desktop-fixed layout only; sidebar always shows icon-only column at all widths)

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render an app shell with a top bar row containing the application logo and a theme toggle button.
- **FR-002**: System MUST render a single-column icon sidebar at the inline-start position (left in LTR, right in RTL).
- **FR-003**: The sidebar MUST contain exactly 2 navigation icons: "Flight Infrastructures" and "Missions".
- **FR-004**: System MUST support light and dark theme switching in all 4 variants.
- **FR-005**: System MUST select the active UI variant based on the `?ui=` query parameter (`mui`, `mantine`, `radix`, `lit`).
- **FR-006**: System MUST fall back to the `VITE_UI_VARIANT` environment variable when no query parameter is provided.
- **FR-007**: Each variant MUST avoid runtime CSS-in-JS; prefer vanilla CSS extraction, CSS modules, or zero-runtime styling solutions as best practice for that framework.
- **FR-008**: The MUI variant MUST use MUI's default components with CSS theme variables mode (`cssVariables: true`). Note: Emotion is used for initial style hydration but theme switching occurs via CSS variable toggling with no additional runtime style injection.
- **FR-009**: The Mantine variant MUST use Mantine's default components with its built-in CSS modules approach.
- **FR-010**: The Radix UI variant MUST use Radix UI Themes with its built-in CSS approach.
- **FR-011**: The Lit variant MUST use Lit web components with native CSS (shadow DOM or constructable stylesheets).
- **FR-012**: System MUST separate refactoring work from new functional additions into distinct micro-tasks whenever both are needed.
- **FR-013**: System MUST validate and enforce removal of unused or dead code exposed by the change before the work is considered complete.
- **FR-014**: A benchmark results document MUST be produced after implementation and testing, recording scores for all 3 evaluation dimensions across all 4 variants.
- **FR-015**: All 4 variants MUST be registered in Storybook with stories demonstrating light/dark theme and layout.
- **FR-016**: All 4 variants MUST have unit/integration tests verifying layout structure and theme switching.
- **FR-017**: A shared `AppShell` component interface MUST be defined in `packages/app-shell` that all 4 variant packages implement, enabling type-safe variant switching at the host app level.

### Key Entities

- **AppShellVariant**: One of `mui | mantine | radix | lit` — identifies which UI framework implementation to load from `packages/ui-{variant}/src/appShell/`.
- **AppShellLayout**: The structural contract: top bar (logo) + inline-start sidebar (2 icon nav items).
- **BenchmarkResult**: A recorded measurement for a specific variant across a scoring dimension (agent ease, docs/test ease, performance metrics).
- **ThemeMode**: `light | dark` — the current visual theme applied to the app shell.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: All 4 app shell variants render the identical layout (top bar with logo, inline-start sidebar with 2 icons) verified by visual regression or DOM assertions.
- **SC-002**: Theme switch between light and dark completes in under 100ms with no visible layout shift in all variants.
- **SC-003**: Zero runtime CSS-in-JS detected at theme-switch time (no new `<style>` tag injection when toggling between light and dark) in all 4 variants. Note: MUI's initial Emotion hydration at first render is acceptable; the constraint applies to post-initial-load interactions.
- **SC-004**: Each variant has a Lighthouse Performance score recorded and documented.
- **SC-005**: Each variant's JavaScript bundle size for the app shell module is measured and documented.
- **SC-006**: Each variant's build time, initial page load time, and browser runtime paint metrics (FCP, LCP) are measured and documented.
- **SC-007**: Each variant has at least one Storybook story with light and dark theme demonstrations.
- **SC-008**: Each variant has passing unit/integration tests covering layout structure and theme toggle.
- **SC-009**: Agent productivity scores (planning/implementation ease and docs/test/storybook ease) are recorded for each variant on a 1–10 scale using a fixed rubric: time to implement, number of agent iterations/errors, lines of code generated. Each score includes mandatory qualitative notes.
- **SC-010**: Benchmark results document is available at `benchmarks/rendering/appshell-benchmark.md`.

## Clarifications

### Session 2026-05-31

- Q: Where should the 4 variant implementations live in the monorepo? → A: Separate packages per variant (`packages/ui-mui`, `packages/ui-mantine`, `packages/ui-radix`, `packages/ui-lit`) with app shell at `src/appShell`; each package is designed to host the full UI surface for that framework over time.
- Q: How should the theme toggle be triggered by the user? → A: A toggle button in the top bar, part of the app shell itself (user-controlled, no OS preference detection).
- Q: Should all 4 variants export the same TypeScript interface (common contract)? → A: Yes, define a shared `AppShell` interface in `packages/app-shell` that all 4 `packages/ui-*` variants implement; enables type-safe lazy loading and compile-time structural consistency.
- Q: What scoring scale and methodology for the "agent productivity" benchmark dimension? → A: 1–10 numeric scale with a fixed rubric (time to implement, number of iterations/errors, lines of code generated) and mandatory qualitative notes per score.
- Q: Are aria-labels and nav item labels internationalized? → A: Deferred. This slice uses hardcoded English strings for aria-labels and tooltip text. The i18n wiring will be added in a follow-up story when the full i18n pipeline is connected. The icon-only sidebar does not display visible text to users.

## Assumptions

- Each variant lives in its own package: `packages/ui-mui`, `packages/ui-mantine`, `packages/ui-radix`, `packages/ui-lit`, with the app shell exported from `src/appShell/`.
- These packages will grow to host the entire UI for each framework (not just the app shell), enabling continuous framework comparison.
- The existing `packages/app-shell` package defines the shared `AppShell` TypeScript interface that all variant packages implement.
- The web app (`apps/web`) is the host application that loads the selected variant via the shared interface.
- Vite is the bundler and dev server; environment variables use `VITE_` prefix.
- React is the primary framework for the web app; the Lit variant will use a thin React wrapper for integration.
- The `@wsl-ad/i18n` package already supports RTL direction detection for inline-start positioning.
- Storybook is configured in `apps/storybook` and can render components from workspace packages.
- Lighthouse measurements will be performed via `lighthouse-ci` or manual Chrome DevTools audit on production builds.
- Bundle size measurement uses the Vite build output or a tool like `source-map-explorer`.
- "Agent productivity" scores are subjective assessments recorded by the developer/agent after completing each variant's implementation.
