<!--
Sync Impact Report
- Version change: 1.3.0 -> 1.4.0
- Modified principles:
        - Principle II ("Reusable UI — Token-First Architecture") expanded:
          • MUI variant authors all custom layout in Vanilla Extract; Emotion `sx` forbidden
          • Web fonts MUST be bundled locally via `@fontsource` (no Google Fonts CDN)
          • Expressive motion MUST use official Material 3 Expressive spring curves
          • Cross-variant visual consistency MUST be enforced by a Playwright suite
- Added sections:
        - None (amendments folded into Principle II)
- Removed sections:
        - None
- Templates requiring updates:
        - ✅ reviewed, no update required: .specify/templates/plan-template.md
        - ✅ reviewed, no update required: .specify/templates/spec-template.md
        - ✅ reviewed, no update required: .specify/templates/tasks-template.md
- Follow-up TODOs:
        - None
-->

# mono Frontend Monorepo Constitution

## Core Principles

### I. Monorepo Frontend Baseline
All product development MUST occur in a frontend monorepo managed by either
Nx or Turborepo. Each feature MUST declare its owning app and shared packages,
and reusable capabilities MUST live in packages before they are wired into an
app. The default runtime stack is Vite, React, TypeScript, and Zustand. TanStack
Start MAY be adopted only when the feature spec includes a written justification
for routing, server rendering, or data-loading benefits that outweigh the extra
lifecycle cost.

Rationale: a small team needs strict boundaries, fast workspace tooling, and a
shared deployment model that remains understandable over decades.

### II. Reusable UI — Token-First Architecture
Every reusable UI surface MUST ship with matching developer and consumer
documentation. VitePress is the canonical documentation system. Storybook is the
canonical design-system catalog and MUST stay integrated with VitePress so
component guidance, usage constraints, and examples are discoverable from one
documentation path.

**Token-first**: All color, spacing, elevation, motion, and radius values MUST be
sourced from `@mono/ui-tokens`. Hard-coded literal values (hex colors, pixel
margins, etc.) are forbidden in component implementations. The token package owns
all Solarized+M3 role mappings, Gemini gradient references, Almarai/Rubik font
scale, and all theming overrides for dark and expressive modes.

**ui-contracts as contract authority**: All shared component interfaces (AppShell,
List, Form, and their sub-components) MUST be defined in `@mono/ui-contracts`.
No variant package may define its own public interface that duplicates or diverges
from a contract already in `@mono/ui-contracts`. Contracts use TypeScript
structural typing (`satisfies`) to enforce compatibility at type-test time without
imposing runtime overhead.

**Variant-owned implementations**: Each UI variant (`ui-mantine`, `ui-mui`,
`ui-radix`, `ui-lit`) MUST own its full component implementation and MUST satisfy
the corresponding contract from `@mono/ui-contracts`. Variant packages MUST NOT
re-export other variants' components. Wrapper packages that proxy a single source
of truth are forbidden; each variant is a self-contained, independently deployable
component suite.

**Vanilla Extract as cross-cutting layer**: Cross-cutting utility styles (density
recipes, motion recipes, layout sprinkles) MUST be authored as Vanilla Extract
`.css.ts` files in `@mono/ui-tokens`. They MUST reference the VE theme contract
(`vars`) so they respond to theme switching automatically. Variant packages that
consume VE utilities MUST configure `@vanilla-extract/vite-plugin` in both their
Vite and Vitest configs to ensure build-time CSS generation and test compatibility.
A variant MAY also author its own structural/layout styles in Vanilla Extract. The
MUI variant does so exclusively: its custom layout lives in `.css.ts` files and the
Emotion `sx` prop is forbidden (enforced by an ESLint `no-restricted-syntax` rule
scoped to `packages/ui-mui`). MUI components still use Emotion for their own widget
internals — that is intrinsic to MUI — but the variant's own styles MUST be VE.

**Web fonts**: Brand fonts (Almarai for headings, Rubik for body) MUST be bundled
locally via `@fontsource` packages. The Google Fonts CDN MUST NOT be relied upon at
runtime — it is unreachable in air-gapped and CI environments and causes silent font
fallbacks that break cross-variant visual consistency and benchmark reproducibility.

**Expressive theme governance**: The expressive theme MUST be activated exclusively
via the `?theme=expressive` URL query parameter. It MUST NOT be exposed in the UI
toggle and MUST NOT be the default. The `data-theme="expressive"` attribute MUST
be set on the app-shell root element; gradient surfaces MUST be implemented via
CSS attribute selectors, not CSS custom properties, because multi-stop rgba
gradients cannot be interpolated through CSS variables. Expressive motion MUST use
the official **Material 3 Expressive** spring curves (spatial overshoot, smooth
effects), not ad-hoc easing.

**Cross-variant visual consistency**: All active variants MUST render the same
content identically (fonts, colors, spacing, layout geometry). This MUST be enforced
by an automated Playwright visual-consistency suite that compares screenshots,
structural layout, and computed token colors across MUI, Mantine, Radix, and Lit.

**DESIGN.md as agent-readable design reference**: The root-level `DESIGN.md` file
MUST follow the [Google DESIGN.md specification](https://stitch.withgoogle.com/docs/design-md/specification)
and MUST be kept in sync with `@mono/ui-tokens` token values. `DESIGN.md` is the
authoritative human+AI-readable representation of the design system; `tokens.ts`
is the authoritative implementation. Changes to token values MUST update both files
in the same micro-task.

Rationale: long-lived enterprise systems decay first in understanding, not only
in code. Token-first + contract-first + variant-owned creates a clear separation
that survives designer, developer, and framework churn over decades.

### III. Test And Interaction Contracts
Every shipped change MUST include the tests needed for its risk profile. Unit
coverage MUST use Vitest. Integration coverage MUST use Playwright. Each changed
interactive React component MUST have a page object representation, and that page
object MUST document the supported interactions, states, and selectors needed for
stable automation. No feature is complete until tests fail first, pass after the
change, and document the user-visible interaction contract.

Rationale: a small team cannot afford brittle regressions or undocumented UI
behavior hidden inside end-to-end tests.

### IV. Real-Time And Mapping Resilience
The platform MUST support enterprise real-time use cases over a multi-decade
lifetime. REST requests MUST use ky. GraphQL operations MUST use urql with code
generation. Real-time transport MUST preserve compatibility with SignalR on
ASP.NET backends and GraphQL subscriptions where applicable. Features touching
map behavior MUST explicitly state whether 2D, 3D, or both are in scope and MUST
define observable performance and correctness expectations for rendering,
streaming updates, and recovery from delayed or out-of-order events.

Rationale: real-time mapping surfaces fail at system boundaries first; transport
and rendering contracts must be explicit and testable.

### V. Benchmark-Led Technology Decisions
Technology adoption, replacement, or deviation from the baseline stack MUST be
backed by benchmark data or operational evidence. This applies to workspace
tooling, rendering approaches, map libraries, transport layers, UI abstraction
layers, and major utility additions around Zustand or component systems.
Benchmark artifacts MUST be stored in-repo and referenced from the relevant spec
or plan. Preference, novelty, or vendor familiarity alone is not sufficient.

Rationale: a 20-year enterprise frontend needs decisions that can be defended,
retested, and revisited with data.

## Architecture Standards

- Package management MUST use pnpm.
- New repository setup MUST install the latest compatible package versions with
        pnpm installation workflows; maintainers MUST NOT hand-edit dependency version
        numbers in new package manifests during initial setup.
- Internationalization MUST support English and Hebrew.
- Layout direction MUST support both LTR and RTL across app shell, reusable
        components, forms, lists, and map-adjacent UI.
- Translation strings MUST be owned close to the relevant component or feature
        source and aggregated into public static assets only at build time.
- Initial platform capabilities MUST be decomposable into small reviewed steps,
        including an app shell, map integration, list wrappers for table and card
        views, a form wrapper, and documented form controls.

## Delivery Workflow

- The team MUST work in a spec-driven, agent-assisted development lifecycle.
- Every spec, plan, and task list MUST map work into micro-tasks small enough to
        pass human review in a very short merge request.
- A merge request MUST keep scope narrow: one micro-task or one tightly related
        micro-task bundle that preserves reviewability.
- Refactoring-only work and new functional additions MUST be planned as separate
        micro-tasks. If a change needs both, they MUST be reviewed in two distinct
        micro-tasks and SHOULD land in separate merge requests unless the plan documents
        why separation would break correctness.
- Before implementation starts, the plan MUST identify the chosen monorepo tool,
        affected packages, documentation impact, testing impact, transport impact, and
        any required benchmark.
- Every code change MUST validate that newly orphaned, unused, or dead code has
        been removed or explicitly justified. A change is not complete while unused
        imports, unreachable branches, abandoned components, obsolete selectors, stale
        types, or superseded helpers remain in the touched slice.
- A feature is not ready for merge until code, docs, translations, tests, and
        page objects are updated together.

### Package Retirement Policy

Any package with zero production exports — confirmed by `node tools/quality/unused-exports.mjs`
— MUST be removed in the same feature branch that introduces its replacement. Retention
of zero-export packages is prohibited: they accumulate maintenance cost, confuse dependency
graphs, and mask build-time dead code. A retirement MUST be recorded in the relevant spec's
task list with an explicit confirmation step (`grep -r <package-name>` confirms zero
production consumers before deletion). If a package cannot be retired in the same branch
due to a genuine cross-team dependency, the retention MUST be documented in the feature
plan with a hard deadline for removal.

## Governance

This constitution overrides local preferences when they conflict with the
project's baseline architecture or delivery discipline. Amendments MUST be made
through a documented proposal that explains the change, the migration impact,
and whether the change is major, minor, or patch level under semantic versioning.
Compliance MUST be checked in every spec, implementation plan, task list, and
merge request review. Versioning policy is as follows: MAJOR for incompatible
governance changes or principle removal, MINOR for new principles or materially
expanded mandatory guidance, and PATCH for clarifications that do not change
required behavior.

**Version**: 1.4.0 | **Ratified**: 2026-05-28 | **Last Amended**: 2026-06-16
