# Quickstart: Project Architecture And Infrastructure Baseline

## Goal

Turn the approved architecture baseline into the first implementation-ready slices without crossing the product/platform ownership boundary.

## Inputs

- [spec.md](./spec.md)
- [plan.md](./plan.md)
- [research.md](./research.md)
- [data-model.md](./data-model.md)
- [backend-interface-contracts.md](./contracts/backend-interface-contracts.md)
- [platform-readiness-contract.md](./contracts/platform-readiness-contract.md)
- [release-readiness-contract.md](./contracts/release-readiness-contract.md)

## Prerequisites

1. Node.js 22 LTS and pnpm are available locally.
2. Product, platform, and backend owners are identified.
3. Compliance and regulatory constraints are enumerated.
4. Platform team can state which capabilities already exist versus require setup.

## Sequence

### 1. Confirm external planning inputs

- Fill the platform readiness matrix for source control, artifact management, secrets, observability, hosting, networking, access control, and environment provisioning.
- Confirm authentication and authorization ownership.
- Confirm backend owners for REST, GraphQL, and realtime contracts.
- Record compliance constraints that must block release or adoption.

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
- Required backend and platform contracts are documented and accepted.
- The first implementation task list can be generated without introducing new high-severity unknowns.