# Feature Specification: UI Theming Alignment & Design Token Consolidation

**Feature Branch**: `003-ui-theming-alignment`

**Created**: 2026-06-01

**Status**: Draft

**Input**: User description: "Handle design tokens in one place for UI variant packages, enable global theming, research Vanilla Extract for CSS variants/themes/recipes, consolidate placeholder packages (ui-list, ui-form-controls, ui-forms) into variants, move app-shell interfaces to ui-contracts, define full UI alignment spec for enterprise functions, and update the constitution."

**DESIGN.md Alignment**: The canonical design tokens and visual identity are documented in the root-level `DESIGN.md` file following the [Google DESIGN.md specification](https://stitch.withgoogle.com/docs/design-md/specification). This file serves as the machine-readable + human-readable single source of truth for the design system, consumable by both developers and AI coding agents.

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Centralized Design Token Consumption (Priority: P1)

A developer working on any UI variant package (Mantine, Radix, MUI, or Lit) references a single, canonical set of design token definitions for spacing, color, typography, elevation, and motion. When the design team updates a token value, the change propagates to every variant without the developer touching each variant's theme file individually.

**Why this priority**: Without a shared token source, each variant diverges over time, creating visual inconsistency and multiplying maintenance effort. This is the foundation for all other theming work.

**Independent Test**: A developer can import the canonical token definitions from a single package, apply them in a variant's theme file, and verify that the rendered output reflects the token values across light and dark modes.

**Acceptance Scenarios**:

1. **Given** a canonical design-token package exists with spacing, color, typography, elevation, and motion tokens, **When** a developer imports tokens into a Mantine theme file, **Then** the compiled output uses the canonical token values and the component renders correctly in both LTR and RTL layouts.
2. **Given** a token value (e.g., primary brand color) is updated in the canonical package, **When** each variant package is rebuilt, **Then** all four variants reflect the updated value without additional per-variant changes.
3. **Given** the canonical token package defines light and dark color schemes, **When** a variant switches between themes at runtime, **Then** the switch completes in under 100 ms with no layout shift, using only CSS variable reassignment (zero runtime CSS generation).

---

### User Story 2 — UI Contracts Package for Shared Interfaces (Priority: P2)

A developer building a new component (list, form, dialog, etc.) starts by consulting the `ui-contracts` package for the canonical TypeScript interface that every variant must implement. The app-shell interfaces currently living in `packages/app-shell/src/contracts/` are relocated to `ui-contracts`, alongside new contracts for lists, forms, and form controls.

**Why this priority**: Shared interfaces decouple component contracts from any single package's implementation, enabling each variant to implement components independently while guaranteeing type-safe interchangeability at the host-app level.

**Independent Test**: A developer can import an interface (e.g., `AppShellProps`, `ListProps`, `FormFieldProps`) from `ui-contracts`, implement it in a variant package, and the TypeScript compiler confirms full contract satisfaction.

**Acceptance Scenarios**:

1. **Given** the `ui-contracts` package exports `AppShellProps`, `AppShellNavItem`, and `AppShellComponent`, **When** a variant package imports and implements these types, **Then** the TypeScript compiler reports zero type errors and the variant passes all existing contract-compliance tests.
2. **Given** the `ui-contracts` package defines a new `ListProps` interface with sorting, filtering, and pagination capabilities, **When** a variant implements a list component against this contract, **Then** the implementation satisfies the contract and the component is independently testable via the documented acceptance scenarios.
3. **Given** the app-shell interfaces are removed from `packages/app-shell/src/contracts/`, **When** all consuming code is updated to import from `ui-contracts`, **Then** no import errors exist and all existing tests continue to pass.

---

### User Story 3 — Variant-Owned Component Implementation (Priority: P2)

A developer implementing a list or form component does so entirely within the variant package (e.g., `packages/ui-mantine/src/list/`, `packages/ui-radix/src/form/`). The standalone placeholder packages `ui-list`, `ui-forms`, and `ui-form-controls` are retired, and their intended responsibilities are absorbed by each variant.

**Why this priority**: Placeholder packages that sit outside variants create false boundaries — components must be styled with the variant's native tooling, and splitting them out forces awkward cross-package theming. Keeping component implementations co-located with the variant simplifies dependency graphs and ensures each component inherits the variant's design tokens natively.

**Independent Test**: A developer can implement a list component inside `packages/ui-mantine/src/list/` that satisfies the `ListProps` contract from `ui-contracts`, uses Mantine's native styling, and passes unit tests without depending on any retired placeholder package.

**Acceptance Scenarios**:

1. **Given** the `ui-list`, `ui-forms`, and `ui-form-controls` packages are retired, **When** a developer searches for list or form component contracts, **Then** they find them exclusively in `ui-contracts` and implementations exclusively inside variant packages.
2. **Given** a variant implements a form component using its native styling system, **When** the form is rendered, **Then** it uses the canonical design tokens from the shared token package and satisfies the `FormProps` contract.

---

### User Story 4 — Vanilla Extract for Cross-Cutting Styles (Priority: P3)

For UI surfaces that are shared across variants and not covered by a variant's native component library (e.g., custom layout utilities, shared animation patterns, or cross-variant recipe-based component variants), a developer uses Vanilla Extract's `createThemeContract`, `recipe`, and `sprinkles` APIs to define zero-runtime, type-safe styles that consume the canonical design tokens.

**Why this priority**: Vanilla Extract fills the gap between the canonical design tokens and the variant-native styling systems. It is not a replacement for Mantine's CSS modules or Radix's theme variables — it is a complementary layer for cross-cutting concerns where no single variant's tooling is appropriate.

**Independent Test**: A developer can create a shared layout utility using Vanilla Extract recipes that consumes canonical design tokens, and use it from any variant package without runtime CSS generation.

**Acceptance Scenarios**:

1. **Given** a cross-cutting layout utility is defined using Vanilla Extract's `recipe` API with variants for `compact`, `comfortable`, and `spacious` density, **When** a variant package imports and applies the recipe, **Then** the correct CSS class is applied at build time with zero runtime overhead.
2. **Given** Vanilla Extract's `createThemeContract` defines a contract matching the canonical design token structure, **When** each variant creates a theme implementation for the contract, **Then** the compiled CSS contains only CSS variable declarations and no duplicated style rules.
3. **Given** Vanilla Extract `sprinkles` are defined for common responsive layout properties (display, flex, padding, margin), **When** a developer uses sprinkles in a `.css.ts` file, **Then** the output is atomic CSS classes resolved at build time.

---

### User Story 5 — Constitution and Enterprise UI Alignment (Priority: P3)

The project constitution is updated to codify the design-token-first architecture, the `ui-contracts` package role, the retirement of standalone placeholder packages, and the role of Vanilla Extract as a cross-cutting styling layer. Enterprise UI patterns (app shell, lists, forms, data grids, dialogs, notifications) are documented as first-class capabilities that each variant must implement against shared contracts.

**Why this priority**: The constitution is the governance document. Without updating it, the new architecture lacks enforcement teeth and future specs may contradict the new structure.

**Independent Test**: A reviewer can read the updated constitution and verify that it describes the design-token package, `ui-contracts`, variant-owned components, and Vanilla Extract's role without ambiguity.

**Acceptance Scenarios**:

1. **Given** the constitution is updated, **When** a reviewer checks the "Reusable UI" guidance in Principle II, **Then** it references the canonical design-token package, the `ui-contracts` package, and the requirement for variant-owned component implementations.
2. **Given** the constitution is updated, **When** a new spec is created for a UI component, **Then** the spec template and constitution together require the component to have a contract in `ui-contracts`, implementations in each active variant, and token consumption from the shared design-token package.

---

### User Story 6 — Expressive Theme via URL Parameter (Priority: P2)

A developer or QA engineer can activate the **expressive theme** — a Gemini-inspired visual mode with gradient surfaces, heavy circular rounding, and kinetic motion — by appending `?theme=expressive` to any app URL. The expressive theme can be combined with any UI variant: `?ui=mantine&theme=expressive`, `?ui=radix&theme=expressive`, etc.

**Why this priority**: The expressive theme is a design preview / feature-flag capability. It is deliberately restricted to URL parameter access (no toggle button in the UI) so it can be tested in staging and demoed without affecting the default user experience.

**Independent Test**: A developer navigates to `/?ui=mantine&theme=expressive` and observes gradient surfaces on the app-shell header, rounded containers using `radius.xl`/`radius.2xl` tokens, and kinetic anticipate/release transitions on interactive elements. Navigating to `/?ui=mantine` returns to the standard light theme.

**Acceptance Scenarios**:

1. **Given** a user loads `/?theme=expressive`, **When** the app mounts, **Then** the expressive Vanilla Extract theme class and `data-theme="expressive"` attribute are applied to the app-shell root element, activating gradient surfaces and heavier rounding.
2. **Given** a user loads `/?ui=radix&theme=expressive`, **When** the app mounts, **Then** the Radix variant receives `themeMode="expressive"` and its token adapter applies the expressive radius scale and gradient header; the Radix-native `radius="large"` prop is set.
3. **Given** the `?theme=` param is set to any value other than `light`, `dark`, or `expressive`, **When** the app mounts, **Then** it falls back to `light` theme without error.
4. **Given** the expressive theme is active, **When** the user clicks the theme-toggle button, **Then** the toggle has no effect (expressive is URL-param-only and does not cycle to light/dark via the button).
5. **Given** the expressive theme is active on any variant, **When** the page passes Lighthouse accessibility audit, **Then** it meets the same WCAG 2.1 AA color contrast thresholds as the standard light theme (gradient surfaces must not reduce text contrast).

---

### Edge Cases

- What happens when a variant's native token naming conflicts with the canonical token names? Each variant's theme adapter is responsible for mapping canonical tokens to variant-native variable names. The canonical token package defines the semantic names; the variant adapter translates them.
- How does the system handle a new variant being added in the future? The `ui-contracts` package defines the full interface surface. A new variant must implement all active contracts and map canonical tokens through its own theme adapter. No changes to other variants or the canonical package are required.
- What happens when a variant's component library does not support a feature required by a contract (e.g., native data grid)? The contract marks that capability as optional with a `supported: boolean` flag, and the variant may provide a custom implementation or declare the capability unsupported. The host app handles the fallback.
- How does the system handle Vanilla Extract integration with Lit web components? Lit uses Shadow DOM with scoped styles. Vanilla Extract's build-time CSS is best suited for light-DOM React components. For Lit components, the canonical design tokens are consumed as CSS custom properties defined on the host element, not through Vanilla Extract's class-based API.

## Clarifications

### Session 2026-06-01

- Q: How should design tokens be authored in the canonical package? → A: TypeScript objects (`.ts` files) — type-safe at authoring time, directly consumable by Vanilla Extract and variant adapters, no extra tooling.
- Q: Should ui-contracts enforce contract compliance at build time via a type-test pattern, or rely only on the TypeScript compiler? → A: Dedicated type-test files in each variant (e.g., `contract.typetest.ts`) that explicitly assert `satisfies`/`extends` against ui-contracts interfaces — active enforcement with clear CI messages.
- Q: What versioning/change strategy should ui-contracts use when a contract interface changes? → A: Atomic monorepo updates — a contract change and all variant updates land in coordinated micro-tasks on the same feature branch, no independent versioning.
- Q: What accessibility contract scope should ui-contracts define for new component interfaces? → A: Accessibility props as required interface members — `aria-label`, `role`, label-association IDs are required props in the TypeScript contract, enforced by type-tests.
- Q: What token naming convention should the canonical design-token package use? → A: Dot-separated semantic hierarchy — `color.brand.primary`, `spacing.md`, `font.body.size`, `elevation.sm` — maps to nested TS objects and readable CSS custom properties (`--color-brand-primary`).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide a single canonical design-token package (`packages/ui-tokens` or equivalent) that defines spacing, color, typography, elevation, and motion tokens as platform-agnostic values. Tokens MUST be authored as TypeScript objects (`.ts` files) for type safety at authoring time and direct consumption by Vanilla Extract and variant adapters. Tokens MUST follow a dot-separated semantic naming hierarchy (e.g., `color.brand.primary`, `spacing.md`, `font.body.size`) that maps to nested TypeScript objects and produces readable CSS custom properties (e.g., `--color-brand-primary`).
- **FR-002**: System MUST export design tokens in a format consumable by each variant's native theming system (CSS custom properties as the universal interchange format). The TypeScript source objects are the canonical source; CSS custom property output is derived at build time.
- **FR-003**: System MUST provide a `ui-contracts` package (`packages/ui-contracts`) that exports TypeScript interfaces for all shared UI component contracts (app shell, list, form, form controls, and future components). Contract changes MUST follow an atomic monorepo update strategy: a contract change and all variant updates land in coordinated micro-tasks on the same feature branch, with no independent versioning.
- **FR-004**: System MUST migrate the existing `AppShellProps`, `AppShellNavItem`, and `AppShellComponent` interfaces from `packages/app-shell/src/contracts/` to `packages/ui-contracts/src/app-shell/`.
- **FR-005**: System MUST retire the placeholder packages `ui-list`, `ui-forms`, and `ui-form-controls` and remove them from the workspace after confirming no production code depends on them.
- **FR-006**: Each variant package MUST implement components (lists, forms, form controls) within its own source tree, consuming contracts from `ui-contracts` and tokens from the canonical design-token package. Each variant MUST include dedicated type-test files (e.g., `contract.typetest.ts`) that explicitly assert contract satisfaction using `satisfies` or `extends` against each `ui-contracts` interface, providing active enforcement with clear CI error attribution.
- **FR-007**: System MUST integrate Vanilla Extract as a build-time styling layer for cross-cutting UI concerns that are not covered by a variant's native component library.
- **FR-008**: Vanilla Extract usage MUST be limited to cross-cutting utilities (layout recipes, shared animation patterns, density variants) and MUST NOT replace a variant's native styling system for variant-owned components.
- **FR-009**: System MUST support light, dark, and expressive color/styling schemes through the canonical design tokens, with theme switching implemented via CSS variable reassignment (zero runtime CSS generation for Mantine, Radix, and Lit).
- **FR-010**: The project constitution MUST be updated to a new minor version reflecting the design-token-first architecture, `ui-contracts` role, variant-owned component model, and Vanilla Extract's complementary role.
- **FR-011**: System MUST separate refactoring work (migrating interfaces, retiring packages) from new functional additions (implementing new components, adding Vanilla Extract) into distinct micro-tasks.
- **FR-012**: System MUST validate and enforce removal of unused or dead code exposed by the migration (orphaned imports, stale re-exports from retired packages, abandoned type definitions) before the work is considered complete.
- **FR-013**: The `packages/app-shell` package MUST retain its non-contract exports (environment configuration, platform capabilities, readiness gaps, UI components like Logo and navigation icons) and only its contract interfaces move to `ui-contracts`.
- **FR-014**: Design tokens MUST support both LTR and RTL layout directions using CSS logical properties, consistent with the existing architecture standard.
- **FR-015**: System MUST support an **expressive theme** activated exclusively via `?theme=expressive` URL parameter. Valid `theme` param values are `light`, `dark`, and `expressive`; any other value MUST fall back to `light` without error.
- **FR-016**: The expressive theme MUST be combinable with the `?ui={variant}` parameter. The URL combination `?ui={variant}&theme=expressive` MUST activate the expressive Vanilla Extract theme class and `data-theme="expressive"` attribute on the app-shell root element for the specified variant.
- **FR-017**: The expressive theme MUST NOT be accessible via the standard theme-toggle button in the UI. `onThemeToggle` MUST cycle only between `light` and `dark`; when `themeMode === 'expressive'`, the toggle is a no-op.
- **FR-018**: `apps/web/src/config/variant-loader.ts` MUST export a `getActiveTheme(): 'light' | 'dark' | 'expressive'` function that reads the `theme` URL param with the fallback logic defined in FR-015.
- **FR-019**: Each variant's token adapter MUST handle `themeMode === 'expressive'` by applying the expressive radius override scale, kinetic easing (`motion.easing.anticipate`), tinted elevation shadows, and gradient surfaces on the app-shell header element. Gradient surfaces MUST be applied via `data-theme="expressive"` CSS selectors (not VE CSS vars) due to multi-stop rgba CSS gradient limitations.

### Key Entities

- **Design Token**: A platform-agnostic named value (e.g., `color.brand.primary`, `spacing.md`, `font.body`) that represents a single design decision. Tokens are organized into categories: color, spacing, typography, elevation, motion. Authored as TypeScript objects for type safety. Named using a dot-separated semantic hierarchy that maps to nested TS objects and CSS custom properties (e.g., `--color-brand-primary`).
- **Theme Contract**: A typed structure of CSS variables that a variant must populate. Defined once in the canonical token package or via Vanilla Extract's `createThemeContract`, implemented per variant.
- **UI Contract**: A TypeScript interface defining the props, behavior, and accessibility requirements for a shared component (e.g., `AppShellProps`, `ListProps`, `FormFieldProps`). Lives in `ui-contracts`. Accessibility props (`aria-label`, `role`, label-association IDs) are required interface members, enforced by type-tests in each variant.
- **Variant**: A UI library implementation (Mantine, Radix, MUI, Lit) that implements UI contracts using its native component and styling system, mapping canonical design tokens to its own theming mechanism.
- **Theme Adapter**: A variant-specific module that maps canonical design tokens to the variant's native token format (e.g., Mantine CSS variables, MUI `createTheme` input, Radix theme variables).
- **Cross-Cutting Style**: A style definition that applies across variants and is not tied to any single variant's component library. Implemented via Vanilla Extract recipes, sprinkles, or shared CSS.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A single token value change in the canonical package propagates to all four variant builds without per-variant modifications.
- **SC-002**: All existing app-shell contract-compliance tests pass after interfaces are migrated from `app-shell` to `ui-contracts`, with no test code changes beyond import paths.
- **SC-003**: The placeholder packages `ui-list`, `ui-forms`, and `ui-form-controls` are fully removed from the workspace and no remaining code references them.
- **SC-004**: Theme switching between light and dark modes completes in under 100 ms with zero layout shift across all four variants, consistent with the existing SC-002 benchmark requirement.
- **SC-005**: Vanilla Extract build output for cross-cutting utilities produces zero runtime CSS — all styles are resolved to static CSS at build time.
- **SC-006**: The updated constitution explicitly documents the design-token package, `ui-contracts` role, variant-owned component model, and Vanilla Extract's cross-cutting role.
- **SC-007**: Each variant package can independently build and pass its test suite after the migration, with no cross-variant build dependencies beyond `ui-contracts` and the design-token package.
- **SC-008**: No orphaned imports, stale re-exports, or dead code from retired packages remains in the workspace after migration is complete.
- **SC-009**: All UI contracts in `ui-contracts` are fully typed with no `any` types and include JSDoc documentation for each prop.
- **SC-010**: Loading `/?ui={variant}&theme=expressive` for each of the four variants produces: gradient header surface, radius overrides (`radius.md ≥ 16px`, `radius.2xl ≥ 48px`), `data-theme="expressive"` attribute on the shell root, and a Lighthouse accessibility score ≥ the standard light theme score (expressive gradients must not drop contrast below WCAG 2.1 AA).
- **SC-011**: All four UI variants (MUI, Mantine, Radix, Lit) pass Playwright visual comparison tests confirming structural and stylistic consistency — matching layout geometry, color application, typography, and spacing — when rendering the same content with the same theme mode.
- **SC-012**: The root-level `DESIGN.md` file passes validation with `npx @google/design.md lint DESIGN.md` with zero errors, confirming alignment with the Google DESIGN.md format specification.

## Assumptions

- The four existing UI variant packages (Mantine, Radix, MUI, Lit) remain the active variants. No new variant is added as part of this feature.
- The placeholder packages `ui-list`, `ui-forms`, and `ui-form-controls` currently contain no production code (confirmed: they export only empty barrel files). Their retirement requires no code migration, only workspace cleanup.
- The `packages/app-shell` package will continue to exist for environment configuration, platform capabilities, readiness gaps, and shared UI components (Logo, icons). Only the TypeScript contract interfaces (`AppShellProps`, `AppShellNavItem`, `AppShellComponent`) move to `ui-contracts`.
- Vanilla Extract is used as a complementary layer, not a replacement for variant-native styling. Each variant continues to use its own styling system (Mantine CSS modules, MUI Emotion/CSS variables, Radix CSS variables, Lit shadow DOM CSS).
- The design-token package outputs CSS custom properties as the universal interchange format. Each variant's theme adapter is responsible for consuming these and mapping them to its native token system.
- MUI's Emotion-based runtime `<style>` injection on new component states is accepted behavior (documented in spec 002) and is not a blocker for the zero-runtime CSS goal — the goal applies to theme switching, not to first-render component hydration.
- Constitution amendments will follow the existing governance process (documented proposal, semantic versioning, ratification).
- Enterprise UI patterns beyond app shell (lists, forms, data grids, dialogs, notifications) will have contracts defined in `ui-contracts` but implementations will be delivered incrementally in future specs, not all at once in this feature.
