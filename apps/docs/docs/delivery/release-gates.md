# Release Gates

## Overview

Every delivery slice must satisfy a set of gates before it can move from one environment to the next. Gates are defined in `tools/release/gates.ts` and documented here.

## Gate Summary

| Gate               | Environments              | Blocking | Status                           |
| ------------------ | ------------------------- | -------- | -------------------------------- |
| Quality            | All beyond local          | Yes      | ✅ Active                        |
| Documentation      | Dev+, Staging, Production | Yes      | ✅ Active                        |
| Dead Code          | All beyond local          | Yes      | ✅ Active                        |
| Platform Readiness | Dev+, Staging, Production | Yes      | ⏳ Pending platform onboarding   |
| Contract Readiness | Dev+, Staging, Production | Yes      | ⏳ Pending backend owners        |
| Compliance         | Staging, Production       | Yes      | 🚫 Blocked — no compliance owner |
| Secrets            | Dev+, Staging, Production | Yes      | ⏳ Pending secrets platform      |
| Benchmark          | Non-default changes       | Yes      | ✅ Active                        |

## Gate Details

### Quality Gate

- **Evidence**: Passing lint, typecheck, unit tests, integration tests, page object updates
- **Approver**: Product team lead
- **Command**: `pnpm validate`

### Documentation Gate

- **Evidence**: Updated docs and Storybook coverage for user-visible changes
- **Approver**: Product team lead

### Dead Code Gate

- **Evidence**: No new unused imports, exports, stale selectors, or superseded helpers
- **Approver**: Product team lead
- **Command**: `pnpm validate:unused`

### Platform Readiness Gate

- **Evidence**: Required platform capabilities are `available` for the target environment
- **Approver**: Platform team
- **Command**: `pnpm validate:env -- --env <environment>`

### Contract Readiness Gate

- **Evidence**: Backend and external interface contracts are versioned and accepted
- **Approver**: Shared product/backend ownership

### Compliance Gate

- **Evidence**: Compliance approvals attached, or explicit decision that no formal regime applies
- **Approver**: Compliance or platform owner

### Secrets Gate

- **Evidence**: Secrets management onboarding and access approvals complete
- **Approver**: Platform team

### Benchmark Gate

- **Evidence**: Benchmark report stored in `benchmarks/` and linked from slice
- **Approver**: Product team lead
- **Applies when**: Non-default tooling/runtime change, or performance-sensitive mapping/realtime slice

## Promotion Flow

```
Local → Dev/Integration → Staging → Production
```

Each promotion requires all applicable gates to pass. A blocked platform capability blocks promotion even if product-level tests pass.

## Validation Commands

```bash
# Quality gate
pnpm validate

# Dead code gate
pnpm validate:unused

# Slice validation
pnpm validate:slice

# Environment readiness
pnpm validate:env -- --env local
pnpm validate:env -- --env staging

# Release gate validation (when implemented)
# pnpm validate:release -- --env dev-integration
```

## Source of Truth

- Gate definitions: `tools/release/gates.ts`
- Promotion flow: `tools/release/promotion-flow.ts`
- Release contract: `specs/001-project-architecture-infra/contracts/release-readiness-contract.md`
