# Research: UI Theming Alignment & Design Token Consolidation

**Feature**: [spec.md](spec.md)
**Phase**: 0 — Pre-design research
**Date**: 2026-06-01

---

## R-001: Token Authoring Format

**Question**: How should design tokens be authored in the canonical `ui-tokens` package?

**Decision**: TypeScript objects (`.ts` files)

**Rationale**:
- Directly consumable by Vanilla Extract's `createThemeContract` — no transform step
- Type-safe at authoring time; typos in token names are caught by the compiler
- No additional build tooling required beyond the existing Vite + TypeScript pipeline
- Nested objects map 1:1 to Vanilla Extract's theme contract structure and to CSS custom property hierarchies

**Alternatives considered**:
- **JSON / DTCG format**: Provides tool-ecosystem interoperability (Figma Tokens, Style Dictionary) but requires a codegen step to produce TypeScript types. Adds build pipeline complexity without clear benefit for a closed-system monorepo.
- **YAML with codegen**: Human-readable source but requires a custom transform pipeline. Same downsides as JSON with additional maintenance cost.

**Resolved concrete values**: See `data-model.md` §1.1 for the full typed token tree with Solarized + M3 color values and user-specified typography.

---

## R-002: Token Naming Convention

**Question**: What naming hierarchy should the canonical token package use?

**Decision**: Dot-separated semantic hierarchy mapped to nested TypeScript objects. Color tokens use M3 semantic role names (e.g., `color.primary`, `color.onSurface`) rather than a `color.brand.*` sub-tree — this aligns directly with M3's role system and eliminates an extra translation layer in each variant adapter.

**Rationale**:
- M3 role names (`primary`, `onPrimary`, `surface`, `onSurface`, etc.) are already semantic — no extra nesting needed
- Maps cleanly to flat CSS custom properties: `--color-primary`, `--color-on-surface`
- Vanilla Extract's `createThemeContract` accepts exactly this flat-within-nested object shape
- Font tokens are nested by use-case (`font.heading.h1`, `font.label.md`, `font.input.sm`) matching the user-specified typography scale

**Token categories and concrete keys**: See `data-model.md` §1.1 for the full token tree.

---

## R-003: Vanilla Extract Fit and Integration Strategy

**Question**: Where does Vanilla Extract fit in this monorepo's multi-variant architecture?

**Decision**: Vanilla Extract is a **complementary cross-cutting styling layer** for:
1. The `ui-tokens` package — to emit the `createThemeContract` definition that all variants can implement
2. A future `ui-styles` utility package (or within `ui-tokens`) — for shared layout recipes, density sprinkles, and animation patterns that apply across all variants

**What VE is NOT used for**:
- Replacing Mantine's CSS modules — Mantine's zero-runtime native approach is already optimal
- Replacing Radix CSS variables — Radix's approach is already zero-runtime
- Replacing MUI Emotion — accepted behavior per spec 002
- Replacing Lit shadow DOM CSS — Lit's CSS isolation model is incompatible with VE's class-based output

**VE API usage map**:

| API | Where Used | Purpose |
|-----|-----------|---------|
| `createThemeContract` | `packages/ui-tokens/src/contract.css.ts` | Define the typed CSS variable contract all variants must implement |
| `createTheme` | Each variant's `theme.css.ts` (Mantine and Radix only) | Implement the token contract with variant-specific values |
| `recipe` | `packages/ui-tokens/src/recipes/` | Layout density variants (compact/comfortable/spacious), shared animation classes |
| `sprinkles` | `packages/ui-tokens/src/sprinkles.css.ts` | Responsive layout atomic classes for cross-cutting use |
| `assignInlineVars` | NOT used in this feature — no runtime dynamic theming needed | — |

**VE + Vite integration**: Vanilla Extract ships an official Vite plugin (`@vanilla-extract/vite-plugin`). It integrates as a standard Vite plugin in `vite.config.ts`. All `.css.ts` files are processed at build time; zero additional runtime overhead. The plugin is framework-agnostic, so it works with the existing React + Vite setup. Vite plugin processes `.css.ts` at build time and outputs static CSS files, no FOUC risk.

**VE + Mantine**: Mantine uses PostCSS + CSS modules. VE-generated classes sit alongside Mantine classes; they do not conflict. The variant imports VE recipe class names and applies them as additional `className` props.

**VE + Radix**: Identical to Mantine — VE classes are additional `className` values alongside Radix's theme-scoped CSS variables.

**VE + Lit**: VE cannot be used inside Lit's shadow DOM. Lit components consume canonical tokens as CSS custom properties injected on `:root` or on the host element. VE does not apply to Lit component internals.

**VE + MUI**: The MUI variant uses Vanilla Extract for **all** custom layout styling. The Emotion `sx` prop is **disallowed** (enforced by an ESLint `no-restricted-syntax` rule scoped to `packages/ui-mui`). MUI's component internals (`IconButton`, `Tooltip`, `TextField`, etc.) still use Emotion for their own widget styling — that is intrinsic to MUI and not replaceable without forking the library — but every structural/layout style the variant authors lives in a `.css.ts` file (e.g. `appShell/AppShell.css.ts`, `forms/forms.css.ts`). See **R-011** for the rationale behind coexistence rather than replacement.

---


## R-004: Contract Compliance Enforcement

**Question**: How should `ui-contracts` contract compliance be enforced in each variant?

**Decision**: Dedicated type-test files using TypeScript's `satisfies` operator

**Rationale**:
- `satisfies` (TypeScript 4.9+) verifies that a value conforms to a type without widening — exact contract match without type assertions
- Dedicated test file gives CI a single named failure point: "contract.typetest.ts in packages/ui-mantine fails" vs. buried compiler output
- Zero runtime cost — type-test files are not emitted into the build
- Consistent with the project's test-first culture

**Pattern**:
```ts
// packages/ui-mantine/src/appShell/contract.typetest.ts
import type { AppShellComponent } from '@mono/ui-contracts';
import { AppShell } from './index';

// Type assertion: AppShell satisfies the AppShellComponent contract
// If this line has a type error, the contract is violated.
const _: AppShellComponent = AppShell;
void _;
```

**TypeScript version**: The repo uses `"target": "ES2022"` and `"strict": true`. `satisfies` is available from TS 4.9+; the repo's Vite + TypeScript setup is current so this is a safe assumption.

---

## R-005: Contract Versioning Strategy

**Question**: How should `ui-contracts` handle changes to interface definitions?

**Decision**: Atomic monorepo updates — contract change + all variant updates land together on the same feature branch as coordinated micro-tasks

**Rationale**:
- All packages live in the same monorepo, built together. No external consumer can import a stale version.
- Nx's dependency graph automatically flags affected packages when `ui-contracts` changes.
- The `noUnusedLocals` / `noUnusedParameters` strict TypeScript flags catch stale type-test files immediately.
- No versioning infrastructure overhead for a small team.

**Change protocol**:
1. Micro-task A (refactoring): Update `ui-contracts` interface
2. Micro-task B (variant N): Update variant to satisfy new contract + update type-test
3. Repeat B for each affected variant
4. Micro-tasks B1–B4 can be parallelized on the same branch

---

## R-006: App Shell Interface Migration Strategy

**Question**: How do existing consumers update from `@mono/app-shell` to `@mono/ui-contracts`?

**Affected imports** (all import `AppShellProps` from `@mono/app-shell`):
- 4 variant `AppShell.tsx` components
- 4 variant test files (import `Logo`, `FlightInfrastructuresIcon`, `MissionsIcon` — NOT contracts, these stay in `app-shell`)
- 4 Storybook story files
- `apps/web/src/App.tsx`
- `apps/docs/docs/design-system/app-shell.md`

**Migration approach** (two-micro-task pattern):
1. **Micro-task A (refactoring)**: Create `ui-contracts`, move interface definitions there. Add a re-export shim in `packages/app-shell/src/index.ts`:
   ```ts
   export type { AppShellProps, AppShellNavItem, AppShellComponent } from '@mono/ui-contracts';
   ```
   All existing consumers continue working. Zero breakage.

2. **Micro-task B (refactoring)**: Update all consumer imports from `@mono/app-shell` to `@mono/ui-contracts`. Remove the re-export shim from `app-shell`. Validate with `pnpm build`.

**Non-migrated imports**: `Logo`, `FlightInfrastructuresIcon`, `MissionsIcon`, `registerEnvironment`, `resolveEnvironmentId`, `EnvironmentConfig`, platform capabilities — these all stay in `@mono/app-shell` and are NOT affected.

---

## R-007: Package Structure for ui-tokens

**Decision**: `packages/ui-tokens/src/` structure:

```text
packages/ui-tokens/
├── package.json          # @mono/ui-tokens, devDep: @vanilla-extract/css, @vanilla-extract/vite-plugin
├── tsconfig.json
├── vite.config.ts        # includes vanillaExtractPlugin()
├── src/
│   ├── index.ts          # barrel: re-exports tokens, contract vars, recipe class names
│   ├── tokens.ts         # raw token values as TS const objects (color, spacing, font, elevation, motion, radius)
│   ├── contract.css.ts   # createThemeContract(tokens) → exports vars (typed CSS var references)
│   ├── light.css.ts      # createTheme(vars, lightValues) → lightThemeClass
│   ├── dark.css.ts       # createTheme(vars, darkValues) → darkThemeClass
│   ├── recipes/
│   │   ├── density.css.ts  # recipe({ variants: { density: { compact, comfortable, spacious } } })
│   │   └── motion.css.ts   # recipe({ variants: { reduced: { true: { ... } } } })
│   └── sprinkles.css.ts  # defineProperties + createSprinkles for responsive layout atoms
```

**What `vars` (the theme contract) provides**: Every component style that wants to consume tokens imports `vars` and references `vars.color.brand.primary` — at build time this becomes `var(--color-brand-primary)`. No magic strings.

---

## R-008: Package Structure for ui-contracts

**Decision**: `packages/ui-contracts/src/` structure:

```text
packages/ui-contracts/
├── package.json          # @mono/ui-contracts, peerDeps: react
├── tsconfig.json
├── src/
│   ├── index.ts          # barrel: re-exports all interfaces
│   ├── app-shell.ts      # AppShellProps, AppShellNavItem, AppShellComponent (migrated from app-shell)
│   ├── list.ts           # ListProps, ListItemProps, ListSortConfig, ListFilterConfig, ListPaginationConfig
│   ├── form.ts           # FormProps, FormFieldProps, FormSubmitProps
│   └── form-controls.ts  # TextInputProps, SelectProps, CheckboxProps, RadioProps, TextAreaProps
```

**Accessibility**: All interfaces include required accessibility members per clarification A4:
- `aria-label` (string) required on container components
- `role` where semantically necessary
- `id` on form controls for label association
- `aria-labelledby`/`aria-describedby` where applicable

---

## R-009: Placeholder Package Retirement Verification

**Confirmed**: `packages/ui-list/src/index.ts`, `packages/ui-forms/src/index.ts`, `packages/ui-form-controls/src/index.ts` are all doc-comment-only barrel files with no exports. No production code references `@mono/ui-list`, `@mono/ui-forms`, or `@mono/ui-form-controls` in any import statement. Retirement requires:
1. Remove the three `packages/` directories
2. Remove their entries from `pnpm-workspace.yaml` (if present)
3. Remove their `tsconfig.base.json` path aliases (if present)
4. `pnpm build` to confirm no dangling references

---

## Summary Table

| Unknown | Decision | Rationale |
|---------|----------|-----------|
| Token authoring format | TypeScript objects (`.ts`) | Type-safe, no extra tooling, direct VE integration |
| Token naming convention | Dot-separated semantic hierarchy | Maps to nested TS + readable CSS vars |
| VE fit | Complementary cross-cutting layer only | Variant-native styling systems are superior per-component |
| Contract enforcement | `satisfies` type-test files | Active CI enforcement with clear failure attribution |
| Contract versioning | Atomic monorepo micro-tasks | Small team, monorepo, Nx dependency graph handles it |
| App-shell migration | Two-step: shim then update consumers | Zero breakage at any point |
| ui-tokens structure | VE createThemeContract + light/dark themes + recipes + sprinkles | Full zero-runtime token pipeline |
| ui-contracts structure | One file per component domain, accessibility as required props | Clean, discoverable, extensible |
| Placeholder retirement | Safe to remove (zero production consumers) | Verified: empty barrel files |
| DESIGN.md format alignment | Root-level `DESIGN.md` with YAML tokens + markdown rationale | Machine-readable for AI agents, human-readable for design review, lintable via `@google/design.md` |
| MUI styling strategy | VE for all layout, Emotion for widgets, `sx` banned via ESLint | Emotion is intrinsic to MUI; VE keeps the variant's own styles zero-runtime and uniform with other variants |
| Expressive motion | Official M3 Expressive spring curves (overshoot) | Aligns with the design language; replaces the inverted custom anticipate curve |
| Web fonts | `@fontsource/almarai` + `@fontsource/rubik` (local) | CDN unreachable in air-gapped/CI; deterministic, benchmark-reproducible |
| Cross-variant consistency | Playwright visual-consistency suite (screenshot + layout + color) | Catches font/color/geometry drift between variants automatically |

---

## R-010: DESIGN.md Format Alignment

**Question**: How should the design system be documented for AI agent consumption and cross-tool interoperability?

**Decision**: Create a root-level `DESIGN.md` file following the [Google DESIGN.md specification](https://stitch.withgoogle.com/docs/design-md/specification) (version: alpha).

**Rationale**:
- DESIGN.md combines YAML front matter (machine-readable tokens) with markdown body (human-readable rationale) in a single file
- The `@google/design.md` CLI provides `lint`, `diff`, and `export` commands for validation and interoperability
- Tokens are exportable to Tailwind, DTCG (W3C Design Token Format), and CSS custom properties via `npx @google/design.md export`
- The format is AI-agent-native — designed specifically for coding agents to consume design system context
- Complements (does not replace) the TypeScript token objects in `packages/ui-tokens` — DESIGN.md is the documentation layer, tokens.ts is the implementation layer

**Token mapping**:
- DESIGN.md `colors.*` ↔ `tokens.color.*` (M3 semantic roles, kebab-case in DESIGN.md, camelCase in TS)
- DESIGN.md `typography.*` ↔ `tokens.font.*` (level names differ: `body-md` vs `font.body`)
- DESIGN.md `rounded.*` ↔ `tokens.radius.*`
- DESIGN.md `spacing.*` ↔ `tokens.spacing.*`
- DESIGN.md `components.*` ↔ variant adapter mappings in each `token-adapter.ts`

**Validation**: Run `npx @google/design.md lint DESIGN.md` in CI to catch structural issues, broken token references, and WCAG contrast violations.

---

## R-011: MUI — Vanilla Extract for Layout, Emotion for Widgets

**Question**: Should the MUI variant replace Emotion with Vanilla Extract, or run them in parallel?

**Decision**: Author **all** custom layout/structural styling in Vanilla Extract (`.css.ts`); ban the `sx` prop; keep MUI components (which use Emotion internally) for accessible widget behavior only.

**Rationale**:
- MUI is welded to Emotion — every component (`Button`, `AppBar`, `IconButton`, `TextField`) styles itself via `styled()` and the `sx` prop. Replacing Emotion means forking or rewriting MUI, which is a *framework replacement*, not a theming change. The repo already has Radix as a headless-leaning variant for that need.
- VE (build-time) and Emotion (runtime) operate on different layers and do not conflict. VE emits static `.css`; Emotion injects per-component `<style>` at first hydration.
- The cost is bounded: with `cssVariables: true` (MUI v6+), theme switching is already zero-runtime CSS-var reassignment — no new Emotion styles are injected on toggle. Emotion overhead is limited to one-time component hydration.
- Banning `sx` keeps the variant's *own* styles in the same zero-runtime VE pipeline the other three variants use, so cross-variant token consumption is uniform.

**Enforcement**: An ESLint `no-restricted-syntax` rule scoped to `packages/ui-mui/**` rejects any `sx` JSX attribute with a message pointing to VE/recipes/sprinkles. The variant adds `@vanilla-extract/css` as a direct dependency and registers `@vanilla-extract/vite-plugin` in both Vite and Vitest configs.

**Alternatives considered**:
- *Replace Emotion entirely*: rejected — not feasible without rebuilding MUI's component layer.
- *Allow `sx` for "small" styles*: rejected — porous boundaries erode the zero-runtime guarantee and make the variant inconsistent with the others.

---

## R-012: Expressive Motion — Material 3 Expressive Spring Curves

**Question**: What motion values should the expressive theme use?

**Decision**: Adopt the official **Material 3 Expressive** motion physics, converted to CSS `cubic-bezier` + duration using Google's published web conversion table (m3.material.io/styles/motion/overview/specs).

**Rationale**:
- M3 Expressive motion is spring-based with **overshoot** for spatial properties (position, size, rotation) and **smooth settle** for effects (color, opacity). The earlier custom "anticipate" curve (`cubic-bezier(0.36, 0, 0.66, -0.56)`) pulled *back before* settling — the opposite of the M3 Expressive feel, which bounces *past* the target then settles.
- Using the official values keeps the expressive theme defensible and aligned with the design language it claims to follow (M3 Expressive, building-with-m3-expressive).

**Resolved values** (in `tokens.expressive.ts`, consumed by `expressiveThemeClass` and variant adapters):

| Token | cubic-bezier | Duration |
|-------|--------------|----------|
| `standard` (default spatial) | `cubic-bezier(0.38, 1.21, 0.22, 1.00)` | 500ms |
| `fastSpatial` | `cubic-bezier(0.42, 1.67, 0.21, 0.90)` | 350ms |
| `slowSpatial` | `cubic-bezier(0.39, 1.29, 0.35, 0.98)` | 650ms |
| `effects` (default) | `cubic-bezier(0.34, 0.80, 0.34, 1.00)` | 200ms |
| `fastEffects` | `cubic-bezier(0.31, 0.94, 0.34, 1.00)` | 150ms |

The base (non-expressive) themes keep the M3 *standard* easing/duration set.

---

## R-013: Web Font Loading — `@fontsource` Local Packages

**Question**: How should Almarai (headings) and Rubik (body) be loaded?

**Decision**: Bundle fonts locally via `@fontsource/almarai` and `@fontsource/rubik` (imported in the app/Storybook entry) instead of the Google Fonts CDN `<link>`.

**Rationale**:
- The Google Fonts CDN is unreachable in offline/air-gapped enterprise and CI environments (observed `ERR_CERT_AUTHORITY_INVALID` / fetch failures), which made variants silently fall back to `Times New Roman` and broke cross-variant visual consistency.
- `@fontsource` packages are self-hosted, deterministic, and version-pinned — fonts load identically in dev, CI, and production with no external dependency.
- Aligns with the constitution's environment-agnostic and benchmark-reproducibility goals.

**Application**: `apps/storybook/.storybook/preview.ts` imports `@fontsource/almarai/700.css`, `@fontsource/rubik/400.css`, `@fontsource/rubik/500.css`. The web app loads the same families. Each variant's shell root applies `font-family`/`font-size` from the token CSS variables so the body font is consistent across MUI, Mantine, Radix, and Lit.

---

## R-014: Cross-Variant Visual Consistency Enforcement

**Question**: How do we guarantee all four variants render the same content identically?

**Decision**: A Playwright visual-consistency suite (`apps/web/src/__tests__/visual-consistency.e2e.ts`) captures each variant × theme and asserts: (1) screenshot match against a committed baseline, (2) structural layout parity (topbar/sidebar/content geometry within tolerance), (3) token-level color parity (computed background/text colors via RGB distance).

**Findings & fixes this iteration**:
- **Lit** did not apply `font-family`/`font-size` on the shell root → fixed by reading `--font-body-family`/`--font-body-size` CSS vars.
- **Mantine** mapped `black` to `inverseSurface` (too dark) → corrected to `onSurface`.
- **Radix** `<Theme>` overrode text color/font → added `--color-on-surface` and `--color-surface-variant` overrides plus explicit content color/font.
- **MUI** AppBar defaulted to the primary color → set to `background.default`; sidebars standardized to `surfaceVariant` across all variants.
- Headed vs headless scrollbar drift on Radix → contained `.radix-themes:has(> .app-shell)` overflow and switched the visual test to viewport-clipped screenshots with `overflow: hidden` before measurement.

