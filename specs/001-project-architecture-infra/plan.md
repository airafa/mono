# Implementation Plan: Project Architecture And Infrastructure Baseline

**Branch**: `[001-project-architecture-infra]` | **Date**: 2026-05-28 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-project-architecture-infra/spec.md`

**Note**: This plan assumes a greenfield repository that currently contains planning assets only. The plan therefore defines the target baseline structure, ownership model, and dependency contracts that must exist before implementation tasks begin.

## Summary

Define the initial architecture and infrastructure baseline for a frontend monorepo that will support a primary web application, shared platform packages, documentation, design-system coverage, and future real-time and mapping features. The plan selects Nx on top of pnpm, keeps the runtime baseline on Vite + React + TypeScript, formalizes four environments, establishes product-versus-platform ownership boundaries, creates the interface and readiness contracts needed to break follow-on work into small implementation slices, and defines a Planner -> Implementer -> Validator -> Reviewer workflow for those slices.

## Technical Context

**Language/Version**: TypeScript 5.x, Node.js 22 LTS

**Primary Dependencies**: pnpm, Nx, React, Vite, Zustand, VitePress, Storybook, ky, urql, GraphQL Code Generator, Vitest, Playwright, SignalR-compatible realtime client support

**Storage**: Browser local/session storage only for client preferences and transient UX state; server APIs for business data; static build artifacts for docs, Storybook, translations, and benchmark reports

**Testing**: Vitest unit coverage, Playwright integration coverage with page objects, Storybook interaction coverage for reusable UI, architecture benchmark checks for rendering, realtime, and developer workflow

**Target Platform**: Modern enterprise desktop browsers, responsive web for non-map surfaces, internal documentation portals used by product, engineering, and operations stakeholders

**Project Type**: Greenfield frontend monorepo with multiple apps, shared packages, benchmark suites, contract documentation, and environment-specific runtime configuration

**Performance Goals**: Keep app shell, list interactions, and baseline navigation visibly responsive on supported corporate hardware; define benchmark-backed freshness budgets for realtime feeds before realtime implementation begins; keep docs and Storybook builds within the central platform CI budget

**Constraints**: pnpm-only dependency management with latest compatible versions during setup, English and Hebrew localization with RTL/LTR parity, hybrid ownership between product and platform teams, CI/CD baseline outside frontend ownership, backend contracts in scope but backend service design out of scope, compliance constraints must be explicit before release planning, and each slice must validate removal of newly exposed unused or dead code

**Scale/Scope**: One primary web app plus docs and Storybook apps, shared UI and platform packages, four delivery environments, platform-owned runtime capabilities, and future 2D/3D mapping plus realtime support

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Pre-Phase 0 Result**: PASS

- Monorepo decision is explicit: Nx is selected because the repository is greenfield and needs enforceable boundaries, graph-aware task orchestration, and future benchmark/test integration across many packages.
- Runtime stack is explicit: Vite + React + TypeScript is the default baseline; TanStack Start is not selected because the spec does not justify SSR or server-driven routing yet.
- State management scope is explicit: Zustand remains the default client-state layer; no custom wrapper is planned until a later feature proves it is needed.
- Documentation plan is explicit: VitePress lives in `apps/docs`, Storybook lives in `apps/storybook`, and both are required deliverables for reusable UI.
- Internationalization and layout direction are covered: English/Hebrew copy, RTL/LTR parity, and build-time translation aggregation are baseline requirements.
- Quality strategy is explicit: Vitest, Playwright, Storybook interactions, page objects, and benchmark artifacts are part of the first platform slices.
- Data transport choices are explicit: ky, urql + code generation, and SignalR/GraphQL-subscription compatibility are captured as default interface patterns.
- Mapping and realtime constraints are explicit when relevant: the structure reserves dedicated packages and benchmark tracks even though mapping implementation is deferred.
- Benchmarking is planned: rendering, realtime, and developer-experience benchmarks are first-class repository outputs.
- Delivery slicing is explicit: follow-on work will be decomposed into small reviewable slices, with refactors separated from feature additions.
- Dead-code validation is explicit: lint, TypeScript unused checks, and a repo-wide unused export audit will be part of slice completion.

**Post-Phase 1 Result**: PASS FOR LOCAL-ONLY PLANNING, BLOCKED FOR DEPENDENT IMPLEMENTATION

- The design artifacts define the baseline entities, ownership model, contracts, and readiness flow needed for implementation planning.
- External follow-ups remain mandatory before implementation tasks begin beyond local-only bootstrap work: named backend contract owners, authentication/authorization ownership, release-control ownership, and platform onboarding ownership.

## Compliance Refinement

- No concrete external regulatory framework has been identified yet for the MVP baseline.
- Until a stricter obligation is named, compliance planning is limited to a provisional internal release-control posture rather than a named formal regime.
- The current provisional release blockers selected for later environments are compliance approval, secrets-management readiness, and benchmark evidence for non-default or performance-sensitive changes.
- A formal compliance owner and any audit-specific evidence requirements remain unassigned and must be resolved before staging or production tasks are generated.

## Platform Readiness Refinement

- Organizational baselines appear to exist for CI/CD, artifact management, hosting target, and network/access control.
- Those capabilities are not yet confirmed as onboarded for this repository, so they remain `needs-setup` at the project level rather than fully `available` outside local work.
- Secrets management and observability readiness remain unconfirmed and require direct platform-team input.
- The plan can proceed only for local-only bootstrap and planning slices. Implementation tasks that depend on external environments, transport contracts, release-control decisions, or platform onboarding remain blocked until those prerequisites are explicitly resolved.

## Project Structure

### Documentation (this feature)

```text
specs/001-project-architecture-infra/
├── plan.md
├── research.md
├── data-model.md
├── risk-register.md
├── quickstart.md
├── contracts/
│   ├── backend-interface-contracts.md
│   ├── compliance-readiness-contract.md
│   ├── platform-readiness-contract.md
│   └── release-readiness-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
apps/
├── web/
├── docs/
└── storybook/

packages/
├── app-shell/
├── i18n/
├── ui-list/
├── ui-forms/
├── ui-form-controls/
├── map-core/
├── api-rest/
├── api-graphql/
├── realtime/
└── test-utils/

benchmarks/
├── rendering/
├── realtime/
└── developer-experience/

specs/
└── 001-project-architecture-infra/
```

**Structure Decision**: Nx is selected over Turborepo because this baseline needs explicit project graphs, enforceable module boundaries, and predictable orchestration across apps, packages, tests, docs, and benchmarks. This planning feature is owned at the repository-governance level rather than by a single runtime app, but it establishes `apps/web` as the primary product surface and the shared `packages/*` tree as the reusable delivery foundation for future work.

## Phase 0 Research Summary

- Choose Nx as the monorepo orchestrator for graph-aware task execution and long-lived architectural governance.
- Keep the default runtime stack on Vite + React + TypeScript and defer any SSR-oriented framework until a later feature provides benchmark-backed justification.
- Model infrastructure readiness as a capability matrix across local, dev/integration, staging, and production.
- Treat backend interfaces and platform capabilities as explicit contracts owned across team boundaries.
- Require benchmark outputs for rendering, realtime, and developer workflow before adopting non-default platform decisions.
- Require dead-code validation as part of every implementation slice.

## Phase 1 Design Summary

- The data model defines architecture domains, infrastructure capabilities, environments, dependencies, readiness gaps, release gates, compliance constraints, and owners.
- The contract set defines the minimum backend, platform, and release-readiness agreements required before implementation slices can be generated safely.
- The refined readiness contracts now separate organizational capability existence from repository-specific onboarding status.
- The quickstart flow describes how to turn this plan into repository scaffolding and small follow-on tasks without crossing ownership boundaries.

## Task Decomposition Preview

1. Bootstrap the Nx workspace with `apps/web`, `apps/docs`, and `apps/storybook`.
2. Establish shared packages for app shell, i18n, forms, lists, transport, realtime, map support, and test utilities.
3. Implement environment configuration and ownership metadata for local, dev/integration, staging, and production.
4. Integrate VitePress and Storybook into the documentation flow.
5. Define backend API and realtime client contracts with owning backend teams.
6. Establish baseline quality gates: Vitest, Playwright, page objects, linting, and dead-code detection.
7. Capture initial benchmark baselines for rendering, realtime, and developer workflow.

## Agent Workflow Template

| Role | Primary Responsibility | Required Inputs | Exit Gate | Handoff |
|------|------------------------|-----------------|-----------|---------|
| Planner | Convert approved architecture decisions into reviewable micro-tasks with explicit scope boundaries | `spec.md`, `plan.md`, `research.md`, contracts, readiness gaps, open assumptions | Each slice names affected paths, owners, tests/docs/benchmarks impact, and known assumptions | Send the slice definition to Validator before implementation starts |
| Implementer | Execute one validated slice without widening scope or mixing refactor-only work with new behavior | Validated task, affected contracts, acceptance criteria, applicable release gates | Code/docs/tests/page objects/config changes are complete and local validation evidence exists | Send the changed slice and validation evidence to Validator |
| Validator | Challenge assumptions and proposed or implemented work for gaps, bugs, missing tests, and release-risk omissions | `spec.md`, `plan.md`, `tasks.md`, contracts, local validation evidence, changed files | Emit `PASS`, `WARN`, or `BLOCKED` with concrete findings and required follow-ups | `BLOCKED` returns to Planner or Implementer; `PASS` or `WARN` moves to Reviewer |
| Reviewer | Decide merge readiness for a narrow slice and confirm follow-up actions are explicit | Validator report, diff summary, test evidence, release-gate evidence | Approve the slice, request changes, or send it back for re-planning | Return to Planner for scope issues or Implementer for local fixes |

### Workflow Gates

1. **Planning Gate**: Planner cannot hand off a slice until scope, ownership, file paths, and quality impacts are explicit.
2. **Pre-Implementation Validation Gate**: Validator must challenge the slice definition before `/speckit.implement` starts.
3. **Implementation Completion Gate**: Implementer must provide executable validation evidence, docs impact, and dead-code cleanup status before handoff.
4. **Review Readiness Gate**: Reviewer only sees slices that already passed validator challenge or include explicit warnings with accepted follow-up actions.

## Complexity Tracking

No constitution violations are currently planned.
