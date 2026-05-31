# Platform Readiness Matrix

## Current State

| Capability          | Owner         | Local          | Dev/Integration | Staging        | Production     | Criticality |
| ------------------- | ------------- | -------------- | --------------- | -------------- | -------------- | ----------- |
| Source Control      | Product team  | ✅ available   | ✅ available    | ✅ available   | ✅ available   | MVP         |
| CI/CD Baseline      | Platform team | ✅ available   | ⏳ needs-setup  | ⏳ needs-setup | ⏳ needs-setup | MVP         |
| Artifact Management | Platform team | ✅ available   | ⏳ needs-setup  | ⏳ needs-setup | ⏳ needs-setup | MVP         |
| Secrets Management  | Platform team | ⏳ needs-setup | ⏳ needs-setup  | ⏳ needs-setup | ⏳ needs-setup | MVP         |
| Observability       | Platform team | ⏳ needs-setup | ⏳ needs-setup  | ⏳ needs-setup | ⏳ needs-setup | Post-MVP    |
| Hosting             | Platform team | ✅ available   | ⏳ needs-setup  | ⏳ needs-setup | ⏳ needs-setup | MVP         |
| Networking/Access   | Platform team | ✅ available   | ⏳ needs-setup  | ⏳ needs-setup | ⏳ needs-setup | MVP         |
| Compliance Controls | Shared        | ⏳ needs-setup | ⏳ needs-setup  | 🚫 blocked     | 🚫 blocked     | Post-MVP    |

## Legend

- ✅ **available** — Capability exists and can be consumed
- ⏳ **needs-setup** — Approved but not yet provisioned or integrated
- 🚫 **blocked** — Unresolved ownership, policy, or access prevents use

## Criticality Classification

- **MVP**: Required for first delivery milestone. Must be resolved before non-local environment work.
- **Post-MVP**: Required for production readiness but not blocking initial development.
- **Future-Scale**: Needed for long-term operational health but not for initial delivery.

## Blocking Conditions

1. **Transport implementation** cannot start without named backend owners (REST, GraphQL, Realtime contracts).
2. **Non-local environment work** cannot start without secrets, access control, and environment ownership.
3. **Staging/production planning** cannot start without compliance owner and release policy.

## Source of Truth

The programmatic readiness model lives in:

- `packages/app-shell/src/platform/capabilities.ts`
- `packages/app-shell/src/platform/readiness-gaps.ts`

This document is the human-readable view. Keep both in sync when ownership or readiness changes.
