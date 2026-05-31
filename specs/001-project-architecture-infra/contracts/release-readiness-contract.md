# Release Readiness Contract

## Purpose

Define the gates a delivery slice must satisfy before it can move from one environment to the next.

## Release Gates

| Gate | Applies To | Evidence | Approver | Blocking |
|------|------------|----------|----------|----------|
| Quality gate | All environments beyond local | Passing lint, typecheck, unit tests, integration tests, and page object updates where relevant | Product team lead | Yes |
| Documentation gate | Dev/Integration, staging, production | Updated docs and Storybook coverage for reusable or user-visible changes | Product team lead | Yes |
| Dead-code gate | All environments beyond local | No new unused imports, exports, stale selectors, or superseded helpers in the touched slice | Product team lead | Yes |
| Platform readiness gate | Dev/Integration, staging, production | Required platform capabilities are `available` for the target environment | Platform team | Yes |
| Contract readiness gate | Dev/Integration, staging, production | Backend and external interface contracts are versioned and accepted | Shared product/backend ownership | Yes |
| Compliance gate | Staging and production | Required compliance evidence and approvals are attached, or an explicit decision records that no named formal regime applies beyond internal controls | Compliance or platform owner | Yes |
| Secrets gate | Dev/Integration, staging, production | Secrets-management onboarding and access approvals are complete for the target environment | Platform team | Yes |
| Benchmark gate | Any non-default tooling or runtime change, and any performance-sensitive mapping or realtime slice | Benchmark report stored in-repo and linked from the slice | Product team lead | Yes |

## Current Provisional Policy

- There is no final release policy decision yet.
- Until a stricter policy is approved, staging and production should treat compliance approval, secrets readiness, and benchmark evidence as mandatory blockers.
- Observability remains a mandatory platform-readiness prerequisite before promotion, even though it is currently enforced through the platform readiness gate rather than as a separate named gate in this release contract.
- The absence of a named formal regulatory framework does not remove the need for an explicit approval decision before staging or production.

## Promotion Flow

1. Local validation proves the slice is internally correct.
2. Dev/Integration proves shared dependencies, contracts, and documentation are aligned.
3. Staging proves release behavior and operational readiness.
4. Production requires all previous gates plus environment-specific approval.

## Mandatory Notes

- CI/CD execution is owned by the platform team, but slice-level evidence remains the product team's responsibility.
- A blocked platform capability blocks promotion even if product-level tests pass.
- A missing compliance definition blocks staging and production by default.