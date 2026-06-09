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

**VE + MUI**: MUI Emotion takes precedence for component styling. VE can be used for layout wrappers and non-MUI-component surfaces within a MUI variant page.

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
import type { AppShellComponent } from '@wsl-ad/ui-contracts';
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

**Question**: How do existing consumers update from `@wsl-ad/app-shell` to `@wsl-ad/ui-contracts`?

**Affected imports** (all import `AppShellProps` from `@wsl-ad/app-shell`):
- 4 variant `AppShell.tsx` components
- 4 variant test files (import `Logo`, `FlightInfrastructuresIcon`, `MissionsIcon` — NOT contracts, these stay in `app-shell`)
- 4 Storybook story files
- `apps/web/src/App.tsx`
- `apps/docs/docs/design-system/app-shell.md`

**Migration approach** (two-micro-task pattern):
1. **Micro-task A (refactoring)**: Create `ui-contracts`, move interface definitions there. Add a re-export shim in `packages/app-shell/src/index.ts`:
   ```ts
   export type { AppShellProps, AppShellNavItem, AppShellComponent } from '@wsl-ad/ui-contracts';
   ```
   All existing consumers continue working. Zero breakage.

2. **Micro-task B (refactoring)**: Update all consumer imports from `@wsl-ad/app-shell` to `@wsl-ad/ui-contracts`. Remove the re-export shim from `app-shell`. Validate with `pnpm build`.

**Non-migrated imports**: `Logo`, `FlightInfrastructuresIcon`, `MissionsIcon`, `registerEnvironment`, `resolveEnvironmentId`, `EnvironmentConfig`, platform capabilities — these all stay in `@wsl-ad/app-shell` and are NOT affected.

---

## R-007: Package Structure for ui-tokens

**Decision**: `packages/ui-tokens/src/` structure:

```text
packages/ui-tokens/
├── package.json          # @wsl-ad/ui-tokens, devDep: @vanilla-extract/css, @vanilla-extract/vite-plugin
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
├── package.json          # @wsl-ad/ui-contracts, peerDeps: react
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

**Confirmed**: `packages/ui-list/src/index.ts`, `packages/ui-forms/src/index.ts`, `packages/ui-form-controls/src/index.ts` are all doc-comment-only barrel files with no exports. No production code references `@wsl-ad/ui-list`, `@wsl-ad/ui-forms`, or `@wsl-ad/ui-form-controls` in any import statement. Retirement requires:
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
