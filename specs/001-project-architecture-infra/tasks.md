# Tasks: Project Architecture And Infrastructure Baseline

**Input**: Design documents from `/specs/001-project-architecture-infra/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Dedicated test-writing tasks are not listed because the specification does not request a TDD-first slice. The implementation still must wire Vitest, Playwright, page-object support, and executable validation gates as part of the baseline.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Bootstrap the greenfield repository into a pnpm + Nx workspace with the minimum root files needed for all later slices.

- [X] T001 Create the root workspace manifest and package scripts in package.json
- [X] T002 Create workspace topology and TypeScript baseline in pnpm-workspace.yaml, nx.json, and tsconfig.base.json
- [X] T003 [P] Create repository defaults in .gitignore, .npmrc, and .prettierignore
- [X] T004 [P] Create initial workspace directory markers in apps/.gitkeep, packages/.gitkeep, benchmarks/.gitkeep, and tools/.gitkeep

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish the shared quality and validation infrastructure that every user story depends on.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T005 Configure shared lint, format, typecheck, build, and task-runner defaults in package.json and nx.json
- [X] T006 [P] Configure workspace test runners in vitest.workspace.ts and playwright.config.ts
- [X] T007 [P] Create the shared testing utility package in packages/test-utils/package.json, packages/test-utils/src/index.ts, and packages/test-utils/README.md
- [X] T008 [P] Create dead-code and slice-validation tooling in tools/quality/unused-exports.mjs and tools/quality/validate-slice.mjs
- [X] T009 Create shared package TypeScript scaffolds in packages/app-shell/tsconfig.json, packages/i18n/tsconfig.json, packages/ui-list/tsconfig.json, packages/ui-forms/tsconfig.json, packages/ui-form-controls/tsconfig.json, packages/api-rest/tsconfig.json, packages/api-graphql/tsconfig.json, packages/realtime/tsconfig.json, and packages/map-core/tsconfig.json
- [X] T033 Adopt validator workflow hooks and handoffs as a foundational prerequisite in .github/agents/speckit.validator.agent.md, .github/agents/speckit.tasks.agent.md, .github/agents/speckit.implement.agent.md, and .specify/extensions.yml
- [~] T034 ⏸️ BLOCKED — Resolve and record named backend, platform, and compliance owners plus authentication and release-control prerequisites in specs/001-project-architecture-infra/contracts/backend-interface-contracts.md, specs/001-project-architecture-infra/contracts/compliance-readiness-contract.md, specs/001-project-architecture-infra/contracts/platform-readiness-contract.md, specs/001-project-architecture-infra/contracts/release-readiness-contract.md, and specs/001-project-architecture-infra/risk-register.md <!-- External owner decisions pending; local-only bootstrap proceeds without this -->

**Checkpoint**: Foundation ready only after validator workflow hooks are active and external owners, auth ownership, and release-control prerequisites are explicitly resolved. User story implementation can then begin in priority order or in parallel where staffing allows.

---

## Phase 3: User Story 1 - Define The Baseline (Priority: P1) 🎯 MVP

**Goal**: Create the baseline monorepo structure, primary apps, and shared package boundaries so the team has one concrete delivery foundation.

**Independent Test**: Review the created workspace tree and architecture docs to confirm stakeholders can identify the main apps, shared packages, domain boundaries, and ownership map from one source of truth.

- [X] T010 [P] [US1] Create the primary web app shell in apps/web/package.json, apps/web/vite.config.ts, apps/web/src/main.tsx, and apps/web/src/App.tsx
- [X] T011 [P] [US1] Create the documentation app shell in apps/docs/package.json, apps/docs/docs/.vitepress/config.ts, and apps/docs/docs/index.md
- [X] T012 [P] [US1] Create the Storybook app shell in apps/storybook/package.json, apps/storybook/.storybook/main.ts, and apps/storybook/.storybook/preview.ts
- [X] T013 [P] [US1] Create baseline transport and shell package entrypoints in packages/app-shell/src/index.ts, packages/i18n/src/index.ts, packages/api-rest/src/index.ts, packages/api-graphql/src/index.ts, and packages/realtime/src/index.ts
- [X] T014 [P] [US1] Create baseline UI and mapping package entrypoints in packages/ui-list/src/index.ts, packages/ui-forms/src/index.ts, packages/ui-form-controls/src/index.ts, and packages/map-core/src/index.ts
- [X] T035 [P] [US1] Create i18n locale dictionaries and direction helpers in packages/i18n/src/locales/en.ts, packages/i18n/src/locales/he.ts, and packages/i18n/src/direction.ts
- [X] T015 [US1] Document architecture domains and ownership boundaries in apps/docs/docs/architecture/domains.md and apps/docs/docs/architecture/dependency-map.md
- [X] T016 [US1] Link the documentation and design-system surfaces in apps/docs/docs/design-system/index.md and apps/storybook/.storybook/manager.ts
- [X] T036 [US1] Publish page-object conventions and interaction-contract guidance in packages/test-utils/src/page-objects.ts and apps/docs/docs/testing/page-objects.md

**Checkpoint**: User Story 1 is complete when the repo has one understandable baseline for apps, shared packages, and ownership boundaries.

---

## Phase 4: User Story 2 - Define Infrastructure Readiness (Priority: P2)

**Goal**: Encode the environment model and readiness data so missing platform prerequisites and ownership gaps are visible before delivery depends on them.

**Independent Test**: Review the environment configuration, platform capability registry, and readiness docs to confirm each capability has an owner, readiness state, and delivery impact.

- [X] T017 [P] [US2] Create the environment schema and resolver in packages/app-shell/src/config/environment-schema.ts and packages/app-shell/src/config/resolve-environment.ts
- [X] T018 [P] [US2] Create per-environment runtime configuration stubs in apps/web/src/config/local.ts, apps/web/src/config/dev-integration.ts, apps/web/src/config/staging.ts, and apps/web/src/config/production.ts
- [X] T019 [P] [US2] Create the platform capability and readiness registries in packages/app-shell/src/platform/capabilities.ts and packages/app-shell/src/platform/readiness-gaps.ts
- [X] T020 [P] [US2] Create onboarding placeholders for external owners in apps/docs/docs/platform/owners.md and apps/docs/docs/platform/onboarding-checklist.md
- [X] T021 [US2] Publish the readiness matrix and dependency impact guides in apps/docs/docs/platform/readiness-matrix.md and apps/docs/docs/platform/dependency-impact.md
- [X] T022 [US2] Add the environment readiness validation command in tools/quality/validate-environment-readiness.mjs and package.json
- [X] T037 [US2] Classify infrastructure capabilities by mvp, post-mvp, and future-scale in packages/app-shell/src/platform/capabilities.ts and apps/docs/docs/platform/readiness-matrix.md
- [X] T038 [US2] Record assumptions, risks, and blocked-gap severity in specs/001-project-architecture-infra/risk-register.md and packages/app-shell/src/platform/readiness-gaps.ts

**Checkpoint**: User Story 2 is complete when readiness states, owners, and gaps are explicit for local, dev/integration, staging, and production.

---

## Phase 5: User Story 3 - Align Delivery Constraints (Priority: P3)

**Goal**: Encode release gates, contract boundaries, benchmark hooks, and validator workflow so delivery slices stay reviewable and promotion-ready.

**Independent Test**: Review the delivery workflow docs and validation scripts to confirm a slice can be planned, challenged, implemented, and reviewed with explicit gates and evidence requirements.

- [X] T023 [P] [US3] Create backend contract placeholder modules in packages/api-rest/src/contracts.ts, packages/api-graphql/src/contracts.ts, and packages/realtime/src/contracts.ts
- [X] T024 [P] [US3] Create release gate definitions and promotion flow helpers in tools/release/gates.ts and tools/release/promotion-flow.ts
- [X] T025 [P] [US3] Create benchmark harness scaffolds in benchmarks/rendering/README.md, benchmarks/realtime/README.md, and benchmarks/developer-experience/README.md
- [X] T026 [US3] Extend validator workflow guidance and review-stage handoff docs in apps/docs/docs/delivery/agent-workflow.md and specs/001-project-architecture-infra/quickstart.md
- [X] T027 [US3] Publish release-gate and agent-workflow guidance in apps/docs/docs/delivery/release-gates.md and apps/docs/docs/delivery/agent-workflow.md
- [X] T028 [US3] Add release-gate validation and benchmark commands in tools/release/validate-release-gates.mjs and package.json
- [X] T039 [US3] Record initial benchmark measurements in benchmarks/rendering/baseline.md, benchmarks/realtime/baseline.md, and benchmarks/developer-experience/baseline.md

**Checkpoint**: User Story 3 is complete when delivery constraints, validation gates, and workflow handoffs are executable and documented.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final cross-story cleanup, discoverability, and quickstart verification.

- [X] T029 [P] Publish repository bootstrap guidance in README.md and apps/docs/docs/getting-started/bootstrap.md
- [X] T030 [P] Finalize dead-code audit and lint ignores in tools/quality/unused-exports.mjs and eslint.config.mjs
- [X] T031 [P] Validate docs and Storybook discoverability paths in apps/docs/docs/design-system/index.md and apps/storybook/.storybook/manager.ts
- [X] T032 Run quickstart validation and record verified bootstrap steps in specs/001-project-architecture-infra/quickstart.md and apps/docs/docs/getting-started/verification.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; starts immediately.
- **Foundational (Phase 2)**: Depends on Setup completion and blocks all user stories until validator workflow, external prerequisites, and shared quality tooling are in place and resolved.
- **User Story 1 (Phase 3)**: Starts after Foundational and delivers the MVP baseline.
- **User Story 2 (Phase 4)**: Starts after Foundational; can proceed after US1 or in parallel if ownership of shared files is coordinated.
- **User Story 3 (Phase 5)**: Starts after Foundational; depends on US1 package layout and is easier after US2 readiness structures exist.
- **Polish (Phase 6)**: Depends on completion of the desired user stories.

### User Story Dependencies

- **US1**: No dependency on other user stories; this is the MVP slice.
- **US2**: Depends on the package and app structure from US1 but remains independently reviewable once those paths exist.
- **US3**: Depends on the workspace paths from US1 and the readiness concepts from US2 for final delivery gate wiring and benchmark evidence.

### Within Each User Story

- Shared scaffolding before documentation or validation commands.
- External owner and release-control prerequisites must be resolved, not merely noted, before transport or non-local integration work.
- Data and configuration registries before guides that explain them.
- Validation scripts before release-gate documentation that references them.
- Refactoring-only cleanup before any dependent feature wiring in the same slice.
- Validator handoff before implementation starts and again before review for slices that use the agent workflow.

### Parallel Opportunities

- Setup tasks marked `[P]` can run together after T001-T002 establish the root workspace.
- Foundational tasks T006-T008 can run in parallel because they touch separate files.
- T033 and T034 remain blocking foundational tasks and should complete before any user-story work begins.
- In US1, app shell tasks T010-T012, package entrypoint tasks T013-T014, and i18n baseline task T035 can run in parallel.
- In US2, environment and readiness registry tasks T017-T020 can run in parallel before docs and validation wiring, then T037-T038 complete the criticality and risk model.
- In US3, contract placeholders, release gate helpers, and benchmark scaffolds in T023-T025 can run in parallel before initial benchmark recording in T039.
- Polish tasks T029-T031 can run in parallel before T032 captures the verified end state.

---

## Parallel Example: User Story 1

```bash
# Launch the three top-level app shells together:
Task: "Create the primary web app shell in apps/web/package.json, apps/web/vite.config.ts, apps/web/src/main.tsx, and apps/web/src/App.tsx"
Task: "Create the documentation app shell in apps/docs/package.json, apps/docs/docs/.vitepress/config.ts, and apps/docs/docs/index.md"
Task: "Create the Storybook app shell in apps/storybook/package.json, apps/storybook/.storybook/main.ts, and apps/storybook/.storybook/preview.ts"

# Launch the shared package entrypoints together:
Task: "Create baseline transport and shell package entrypoints in packages/app-shell/src/index.ts, packages/i18n/src/index.ts, packages/api-rest/src/index.ts, packages/api-graphql/src/index.ts, and packages/realtime/src/index.ts"
Task: "Create baseline UI and mapping package entrypoints in packages/ui-list/src/index.ts, packages/ui-forms/src/index.ts, packages/ui-form-controls/src/index.ts, and packages/map-core/src/index.ts"
Task: "Create i18n locale dictionaries and direction helpers in packages/i18n/src/locales/en.ts, packages/i18n/src/locales/he.ts, and packages/i18n/src/direction.ts"
```

---

## Parallel Example: User Story 2

```bash
# Launch the environment and readiness model tasks together:
Task: "Create the environment schema and resolver in packages/app-shell/src/config/environment-schema.ts and packages/app-shell/src/config/resolve-environment.ts"
Task: "Create per-environment runtime configuration stubs in apps/web/src/config/local.ts, apps/web/src/config/dev-integration.ts, apps/web/src/config/staging.ts, and apps/web/src/config/production.ts"
Task: "Create the platform capability and readiness registries in packages/app-shell/src/platform/capabilities.ts and packages/app-shell/src/platform/readiness-gaps.ts"
Task: "Create onboarding placeholders for external owners in apps/docs/docs/platform/owners.md and apps/docs/docs/platform/onboarding-checklist.md"

# Then complete the readiness classification layer:
Task: "Classify infrastructure capabilities by mvp, post-mvp, and future-scale in packages/app-shell/src/platform/capabilities.ts and apps/docs/docs/platform/readiness-matrix.md"
```

---

## Parallel Example: User Story 3

```bash
# Launch the delivery-constraint scaffolds together:
Task: "Create backend contract placeholder modules in packages/api-rest/src/contracts.ts, packages/api-graphql/src/contracts.ts, and packages/realtime/src/contracts.ts"
Task: "Create release gate definitions and promotion flow helpers in tools/release/gates.ts and tools/release/promotion-flow.ts"
Task: "Create benchmark harness scaffolds in benchmarks/rendering/README.md, benchmarks/realtime/README.md, and benchmarks/developer-experience/README.md"

# Record the first benchmark evidence after scaffolding exists:
Task: "Record initial benchmark measurements in benchmarks/rendering/baseline.md, benchmarks/realtime/baseline.md, and benchmarks/developer-experience/baseline.md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational.
3. Complete Phase 3: User Story 1.
4. Run the validator workflow that was established in Foundational and verify the architecture baseline is reviewable from docs plus workspace structure.
5. Stop and review before expanding into environment readiness or release constraints.

### Incremental Delivery

1. Bootstrap the workspace and quality foundations.
2. Deliver US1 to create the baseline apps, packages, and ownership documentation.
3. Deliver US2 to make infrastructure readiness and environment gaps explicit.
4. Deliver US3 to encode release gates, contract placeholders, benchmarks, and validator workflow.
5. Finish with Phase 6 to verify the quickstart and remove residual dead-code or discoverability gaps.

### Parallel Team Strategy

1. One developer completes Setup plus Foundational or coordinates the shared root files.
2. After Foundational is complete:
   - Developer A can take US1 app shells and package entrypoints.
   - Developer B can take US2 readiness registries and docs.
   - Developer C can take US3 release-gate, benchmark, and validator workflow scaffolds.
3. Rejoin for the Polish phase and quickstart verification.

---

## Notes

- `[P]` means the task can run in parallel with other tasks that touch different files.
- `[US1]`, `[US2]`, and `[US3]` preserve story traceability from spec to implementation.
- Every task includes an exact file path so an implementation agent can execute it without additional discovery.
- The validator workflow is a foundational prerequisite for implementation, while US3 extends the delivery-stage guidance around it.
- External owner naming, compliance approval, and backend contract acceptance remain real dependencies; T034 is intentionally a blocking resolution task rather than a placeholder-recording task.