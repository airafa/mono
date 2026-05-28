# Research: Project Architecture And Infrastructure Baseline

## Decision 1: Select Nx as the monorepo orchestrator

**Decision**: Use Nx with pnpm for the initial frontend monorepo baseline.

**Rationale**: The repository is currently greenfield, and the constitution requires explicit monorepo governance, micro-task decomposition, benchmark visibility, and long-term maintainability. Nx provides graph-aware task orchestration, enforceable boundaries, and clear integration points for tests, docs, and benchmark workflows.

**Alternatives considered**: Turborepo was considered because it is simpler to bootstrap, but it provides less built-in structure for dependency boundaries and architecture governance across a long-lived enterprise workspace.

## Decision 2: Keep the runtime baseline on Vite + React + TypeScript

**Decision**: Use Vite + React + TypeScript as the default runtime stack and do not introduce TanStack Start in the baseline.

**Rationale**: The spec defines architecture and infrastructure readiness, not SSR or server-driven routing requirements. The constitution sets Vite + React + TypeScript as the default and requires a written justification before adopting TanStack Start.

**Alternatives considered**: TanStack Start was rejected for the MVP baseline because the spec does not yet describe SSR, server data loading, or routing constraints that justify the extra lifecycle complexity.

## Decision 3: Use a three-app documentation and delivery surface

**Decision**: Plan for `apps/web`, `apps/docs`, and `apps/storybook` as separate apps from the start.

**Rationale**: The specification must serve product, engineering, and operations stakeholders while the constitution requires both VitePress and Storybook. Separating the product app from documentation surfaces keeps ownership and deployability clear.

**Alternatives considered**: Folding docs into the main app was rejected because it couples user delivery to documentation publishing and weakens architecture boundaries.

## Decision 4: Split transport responsibilities into dedicated packages

**Decision**: Reserve dedicated packages for REST, GraphQL, realtime, i18n, and shared UI foundations.

**Rationale**: The spec requires explicit dependency mapping and ownership boundaries. Package-level separation keeps backend contracts, transport libraries, and shared UI concerns reviewable and replaceable without contaminating application code.

**Alternatives considered**: Keeping transport code in a single app-local service layer was rejected because it would obscure ownership boundaries and make future multi-app reuse harder.

## Decision 5: Model infrastructure readiness as a capability matrix across four environments

**Decision**: Represent readiness per capability and per environment across local, dev/integration, staging, and production.

**Rationale**: The spec explicitly asks for readiness states, delivery impact, ownership, and environment baselines. A capability matrix makes blockers and phased rollout visible without forcing all environments to reach the same maturity at once.

**Alternatives considered**: A single global readiness list was rejected because it hides environment-specific gaps and release risks.

## Decision 6: Treat compliance, platform inventory, and backend ownership as external planning inputs

**Decision**: Carry compliance constraints, platform readiness inventory, authentication details, and backend contract ownership as mandatory external inputs to implementation planning.

**Rationale**: The specification is ready for planning, but those inputs are not enumerated in the repository yet. Documenting them as follow-up inputs keeps the plan truthful and prevents false confidence when creating implementation tasks.

**Alternatives considered**: Inventing compliance or platform assumptions inside the plan was rejected because it would violate the spec's requirement for explicit constraints and ownership.

## Decision 7: Validate unused and dead code through layered quality checks

**Decision**: Use TypeScript unused checks, ESLint rules, and a repo-wide unused export audit as the default dead-code validation approach.

**Rationale**: The constitution and the spec both require dead-code removal or justification in every slice. Layered checks catch different classes of waste early without depending on manual review alone.

**Alternatives considered**: Manual code review alone was rejected because it is inconsistent and weak for a long-lived monorepo.

## Decision 8: Benchmark before adopting non-default architecture deviations

**Decision**: Create baseline benchmark tracks for rendering, realtime, and developer workflow before changing the default stack or introducing heavier abstractions.

**Rationale**: The constitution requires benchmark-led decisions for runtime, rendering, realtime delivery, and tooling changes. Planning those benchmark surfaces up front avoids introducing unmeasured deviations later.

**Alternatives considered**: Deferring all benchmarks until after implementation begins was rejected because it weakens the decision gate for future tooling and architecture changes.