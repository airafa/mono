# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]

**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., TypeScript 5.x / Node.js 22 LTS or NEEDS CLARIFICATION]

**Primary Dependencies**: [e.g., React, Vite, Zustand, VitePress, Storybook, Mantine or Radix UI Themes or Lit wrappers, ky, urql, GraphQL Code Generator, Vitest, Playwright]

**Storage**: [e.g., browser storage, server APIs, static build artifacts for translations, or N/A]

**Testing**: [e.g., Vitest, Playwright with documented page objects, Storybook interaction coverage]

**Target Platform**: [e.g., modern desktop browsers in enterprise environments, responsive mobile web, internal docs tooling]

**Project Type**: [e.g., frontend monorepo/workspace with apps, packages, docs, and design-system surfaces]

**Performance Goals**: [e.g., map interactions remain responsive, real-time updates stay within agreed freshness budgets, docs/storybook builds stay within CI budget]

**Constraints**: [e.g., pnpm-only installs using latest compatible versions, no manual version pin edits in new package manifests, RTL/LTR parity, long-term maintainability for a 20-year horizon]

**Scale/Scope**: [e.g., 2-3 developers, enterprise real-time frontend platform, shared component library, 2D/3D mapping, multiple feature apps]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Monorepo decision is explicit: Nx or Turborepo is selected and justified for this feature scope.
- Runtime stack is explicit: Vite + React + TypeScript by default; TanStack Start requires a written justification tied to routing, data loading, or SSR constraints.
- State management scope is explicit: Zustand is the default client state layer; any added utility wrappers are documented with ownership and escape hatches.
- Documentation plan is explicit: VitePress docs and Storybook coverage are updated together, with Storybook integration points to VitePress identified.
- Internationalization and layout direction are covered: English and Hebrew copy, RTL/LTR behavior, and build-time string aggregation to public static assets are specified.
- Quality strategy is explicit: Vitest unit coverage, Playwright integration coverage, and page object documentation requirements for affected components are defined.
- Data transport choices are explicit: ky for REST, urql + codegen for GraphQL, and real-time compatibility requirements for SignalR ASP.NET and GraphQL subscriptions are addressed.
- Mapping and real-time constraints are explicit when relevant: 2D and 3D map behavior, enterprise real-time expectations, and observable performance budgets are documented.
- Benchmarking is planned for any technology selection or change that affects runtime, rendering, real-time delivery, or developer workflow.
- Delivery is sliced into micro-tasks that can pass human review quickly; any task too large for a short MR must be split before implementation starts.
- Refactoring-only work and new functional additions are separated into distinct micro-tasks, and the plan explains any justified exception.
- The validation plan explicitly checks for unused or dead code introduced or exposed by the change, and records how that code will be removed or why it must temporarily remain.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths. The delivered plan must not include placeholder package names.
-->

```text
apps/
├── web/
├── storybook/
└── docs/

packages/
├── app-shell/
├── map-core/
├── list-view/
├── form-wrapper/
├── form-components/
├── i18n/
├── api-rest/
├── api-graphql/
├── realtime/
└── test-utils/

benchmarks/
├── rendering/
├── realtime/
└── developer-experience/

specs/
└── [###-feature-name]/
```

**Structure Decision**: [Document the selected monorepo layout, identify the owning app/package for this feature, and note whether Nx or Turborepo was chosen and why]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., TanStack Start instead of Vite SPA] | [current need] | [why the default baseline is insufficient] |
| [e.g., additional shared utility around Zustand] | [specific problem] | [why plain Zustand usage is insufficient] |
