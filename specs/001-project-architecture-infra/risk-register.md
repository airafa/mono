# Risk Register: Project Architecture And Infrastructure Baseline

## Purpose

Track the assumptions, open risks, blocked prerequisites, and mitigations that can invalidate the current baseline or delay implementation.

## Assumptions And Risks

| ID | Type | Description | Severity | State | Owner | Mitigation |
|----|------|-------------|----------|-------|-------|------------|
| R-001 | assumption | No named external compliance regime currently applies beyond internal delivery controls. | high | open | Planner | Confirm compliance owner decision before any staging or production task generation. |
| R-002 | risk | Backend owners for REST, GraphQL, and realtime contracts are not yet named. | critical | open | Planner | Resolve named backend owners and escalation paths through T034 before transport implementation starts. |
| R-003 | risk | Authentication and authorization ownership and token model remain undecided. | critical | open | Planner | Record identity provider, claims model, and owning team before transport or protected-environment work starts. |
| R-004 | risk | Platform onboarding owners for CI/CD, artifact flow, hosting, secrets, and observability are not yet assigned for this repository. | high | open | Planner | Confirm platform ownership and onboarding path before any non-local environment slice begins. |
| R-005 | risk | Staging and production release-control approval path is not yet explicitly assigned. | high | open | Planner | Name release approver and evidence path before staging or production tasks are generated. |
| R-006 | assumption | Local-only bootstrap work may proceed before external dependencies are resolved. | medium | open | Planner | Keep all transport and non-local slices blocked until prerequisite owners and controls are recorded. |

## Blocked-Gap Mapping

| Gap ID | Related Capability Or Contract | Severity | Blocking Condition | Resolution Trigger |
|--------|--------------------------------|----------|--------------------|--------------------|
| G-001 | Backend interface contracts | critical | No transport implementation may start without named backend owners. | Backend owners and auth model are recorded in the contracts. |
| G-002 | Compliance controls | high | Staging and production planning remain blocked without a compliance owner and release policy decision. | Compliance owner and release-control decision are recorded. |
| G-003 | Platform onboarding | high | Non-local environment work remains blocked without onboarding owners for secrets, observability, and hosting. | Platform onboarding ownership and flow are recorded. |

## Review Rule

- Update this register whenever a blocked capability, external prerequisite, or planning assumption changes state.
- No blocked gap may be downgraded without naming the owner who accepted the risk.