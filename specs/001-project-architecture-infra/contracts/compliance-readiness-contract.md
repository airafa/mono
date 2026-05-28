# Compliance Readiness Contract

## Purpose

Capture what is currently known about compliance obligations, what is explicitly not yet known, and what must be decided before staging and production work is planned.

## Current Known State

- No named external regulatory or compliance framework has been identified yet for the MVP baseline.
- No security or compliance owner has been named in the current planning inputs.
- There is no final approved release policy yet.
- The current provisional blockers selected for later-environment release planning are compliance approval, secrets-management readiness, and benchmark evidence where performance-sensitive behavior or non-default architecture changes are involved.

## Current Working Assumption

- Until stricter requirements are identified, the project will plan against an internal enterprise delivery-control baseline rather than a named formal regime.
- This assumption is only sufficient for planning and early local setup. It is not sufficient to authorize staging or production promotion without an explicit owner decision.

## Decisions Required

| Decision | Why It Matters | Required Before |
|----------|----------------|-----------------|
| Is any formal regime in scope | Determines mandatory controls and evidence | Staging task generation |
| Who owns compliance/security approval | Names approver for release gates | Dev/Integration external onboarding |
| What evidence is mandatory | Defines audit artifacts, checklists, and review steps | Staging promotion |
| Which controls block release | Prevents ambiguous go/no-go decisions | Staging and production planning |

## Minimum Evidence If No Formal Regime Is Named

- Explicit owner sign-off that no additional formal regime currently applies
- Secrets-management onboarding evidence for the target environment
- Benchmark evidence for performance-sensitive or non-default architecture changes
- Record of release-control decision for staging and production

## Open Follow-Ups

- Name the security or compliance owner.
- Confirm whether privacy, audit, retention, encryption, or data-residency controls apply.
- Confirm whether internal enterprise security baseline requirements exist even if no external regime is named.