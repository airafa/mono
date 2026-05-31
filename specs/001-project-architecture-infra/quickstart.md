# Quickstart: Project Architecture And Infrastructure Baseline

## Goal

Turn the approved architecture baseline into the first implementation-ready slices without crossing the product/platform ownership boundary.

## Inputs

- [spec.md](./spec.md)
- [plan.md](./plan.md)
- [research.md](./research.md)
- [data-model.md](./data-model.md)
- [risk-register.md](./risk-register.md)
- [backend-interface-contracts.md](./contracts/backend-interface-contracts.md)
- [compliance-readiness-contract.md](./contracts/compliance-readiness-contract.md)
- [platform-readiness-contract.md](./contracts/platform-readiness-contract.md)
- [release-readiness-contract.md](./contracts/release-readiness-contract.md)

## Prerequisites

1. Node.js 22 LTS and pnpm are available locally.
2. Product, platform, and backend owners are identified before any non-local, transport, staging, or production-dependent slice begins.
3. The current compliance posture is reviewed and any formal obligations are either documented or explicitly marked absent before any staging or production-dependent slice begins.
4. Platform team can state which capabilities already exist versus require setup before any non-local environment slice begins.

## Execution Modes

- **Local-only planning and bootstrap**: May proceed now only for setup and foundational repository work such as root workspace setup, validator wiring, quality tooling, and prerequisite modeling that does not depend on external owners or platform onboarding.
- **Externally dependent implementation**: Remains blocked until backend owners, authentication ownership, compliance/release-control ownership, and platform onboarding decisions are explicitly recorded in the contracts and risk register.

## Agent Workflow

1. **Planner**: Convert the approved baseline into one micro-task or one tightly related micro-task bundle with explicit scope, affected paths, dependencies, tests, docs impact, and assumptions.
2. **Validator Gate**: Run `/speckit.validator` against the task breakdown before implementation starts. The slice only moves forward on `PASS` or on `WARN` with explicit follow-up actions.
3. **Implementer**: Execute only the validated slice, keeping refactor-only work separate from new behavior and collecting local validation evidence as the slice evolves.
4. **Validator Gate**: Re-run `/speckit.validator` against the changed slice, its validation evidence, and the touched contracts before review.
5. **Reviewer**: Review only slices that already have validator output, validation evidence, and explicit next actions for any remaining warnings.

## Sequence

### Track A. Local-only planning and bootstrap

- Generate `tasks.md` from the approved design artifacts.
- Run `/speckit.validator` on the generated tasks to challenge missing assumptions, dependency ordering, non-functional gaps, and missing test or documentation work.
- Initialize the local workspace baseline with pnpm, Nx, validator wiring, quality tooling, and local-only docs or package scaffolds.
- Do not start any transport, non-local, staging, or production-dependent slice until Track B is complete.

### Track B. External prerequisite resolution for dependent implementation

- Fill the platform readiness matrix for source control, artifact management, secrets, observability, hosting, networking, access control, and environment provisioning.
- Confirm whether any formal compliance framework applies beyond internal delivery controls.
- Confirm authentication and authorization ownership.
- Confirm backend owners for REST, GraphQL, and realtime contracts.
- Record release-blocking controls that must block staging or production.

- Do not start dependent implementation until validator output is either `PASS` or `WARN` with explicit follow-up ownership and the external prerequisites above are explicitly resolved.

### 2. Bootstrap the workspace

- Initialize an Nx workspace in the repository root using pnpm.
- Create `apps/web`, `apps/docs`, and `apps/storybook`.
- Create the shared packages defined in [plan.md](./plan.md).
- Add baseline lint, format, test, and typecheck targets for every app and package.

### 3. Establish shared foundations

- Build `packages/app-shell` for application framing and shared navigation.
- Build `packages/i18n` with English/Hebrew support and RTL/LTR toggling.
- Build `packages/test-utils` with Playwright page object conventions and shared helpers.
- Build placeholder transport packages for REST, GraphQL, and realtime clients using contract-first interfaces.

### 4. Establish documentation surfaces

- Publish architecture and package usage guidance through `apps/docs`.
- Publish reusable UI and interaction coverage through `apps/storybook`.
- Link docs and Storybook so design-system guidance remains discoverable from one path.

### 5. Create infrastructure and release checks

- Encode environment-specific configuration for local, dev/integration, staging, and production.
- Implement release gates as executable checks where possible and tracked approvals otherwise.
- Add dead-code validation through TypeScript unused checks, ESLint, and a repo-wide unused export audit.

### 6. Capture initial benchmark baselines

- Create rendering, realtime, and developer-workflow benchmark harnesses under `benchmarks/`.
- Record baseline measurements before adding non-default runtime or tooling deviations.

## First Small Task Bundles

1. Workspace bootstrap and quality targets
2. Docs plus Storybook integration
3. i18n and RTL/LTR support
4. Environment configuration model
5. REST, GraphQL, and realtime contract clients
6. Benchmark harness setup

## Exit Criteria

- The workspace structure exists and matches [plan.md](./plan.md).
- Every environment has a named owner and readiness state.
- Assumptions, risks, and blocked-gap severity are recorded in [risk-register.md](./risk-register.md) and linked from the readiness model.
- Required backend and platform contracts are documented and accepted.
- The first implementation slice has a recorded Planner handoff, validator output, and reviewer-ready evidence bundle.
- The first implementation task list can be generated without introducing new high-severity unknowns.