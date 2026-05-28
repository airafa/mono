<!--
Sync Impact Report
- Version change: 1.1.0 -> 1.2.0
- Modified principles:
	- Delivery Workflow guidance expanded to enforce unused and dead code validation after each change
- Added sections:
	- Architecture Standards
	- Delivery Workflow
- Removed sections:
	- None
- Templates requiring updates:
	- ✅ updated: .specify/templates/plan-template.md
	- ✅ updated: .specify/templates/spec-template.md
	- ✅ updated: .specify/templates/tasks-template.md
	- ✅ reviewed, no update required: .specify/extensions/git/commands/speckit.git.initialize.md
	- ✅ reviewed, no update required: .specify/extensions/git/commands/speckit.git.commit.md
- Follow-up TODOs:
	- None
-->

# WSL-AD Frontend Monorepo Constitution

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

### II. Documentation-As-Product
Every reusable UI surface MUST ship with matching developer and consumer
documentation. VitePress is the canonical documentation system. Storybook is the
canonical design-system catalog and MUST stay integrated with VitePress so
component guidance, usage constraints, and examples are discoverable from one
documentation path. Reusable UI MUST be built directly or through documented
wrappers around Mantine, Radix UI Themes, Lit web components, or an approved
combination of them.

Rationale: long-lived enterprise systems decay first in understanding, not only
in code. Documentation must be maintained as a deliverable, not as an afterthought.

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

**Version**: 1.2.0 | **Ratified**: 2026-05-28 | **Last Amended**: 2026-05-28
