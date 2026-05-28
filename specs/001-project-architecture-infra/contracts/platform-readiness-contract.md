# Platform Readiness Contract

## Purpose

Define what the central platform team must provide, what the product team consumes, and how readiness is classified across environments.

## Readiness States

- `available`: Capability exists and can be consumed by the product team.
- `needs-setup`: Capability is approved but not yet provisioned or integrated.
- `blocked`: Capability cannot support the target slice because ownership, provisioning, policy, or access is unresolved.

## Capability Matrix

| Capability | Owner | Local | Dev/Integration | Staging | Production | Notes |
|------------|-------|-------|-----------------|---------|------------|-------|
| Source control workflow | Product team | available | available | available | available | Repository and review flow already exist |
| CI/CD baseline | Platform team | available | needs-setup | needs-setup | needs-setup | Organizational baseline exists, but project onboarding is not confirmed |
| Artifact management | Platform team | available | needs-setup | needs-setup | needs-setup | Organizational registry exists, but project artifact flow is not configured |
| Secrets management | Platform team | needs-setup | needs-setup | needs-setup | needs-setup | Required before non-local integrations; current platform status is unconfirmed |
| Observability baseline | Platform team | needs-setup | needs-setup | needs-setup | needs-setup | Logging, metrics, tracing, and alert routing remain unconfirmed for this project |
| Hosting baseline | Platform team | available | needs-setup | needs-setup | needs-setup | Approved hosting target appears to exist, but repository onboarding is not confirmed |
| Networking and access control | Platform team | available | needs-setup | needs-setup | needs-setup | Organizational access baseline exists, but environment-level rules are not project-specific yet |
| Compliance controls | Shared | needs-setup | needs-setup | blocked | blocked | No formal regime identified yet; staging and production remain blocked pending explicit control definition |

## Current Interpretation

- `available` means the organization already has the capability in principle and local work can assume the baseline exists.
- `needs-setup` means the capability is not yet onboarded, configured, or confirmed for this repository or environment.
- `blocked` means downstream release use is intentionally stopped until a missing decision or control is defined.

## Known Inputs Captured

- CI/CD, artifact registry, hosting, and network/access baselines appear to exist at the organizational level.
- Secrets management and observability still require explicit platform-team confirmation.
- Repository-specific onboarding status is unknown for every non-local environment capability.

## Required Platform Decisions Before Task Generation

- Name the platform owner or team for onboarding this repository into CI/CD, artifact publishing, hosting, and access control.
- Confirm the secrets-management system and project onboarding flow.
- Confirm the observability baseline, including logs, metrics, traces, dashboards, and alert ownership.
- Confirm whether staging and production environments already exist or must be provisioned for this project.

## Product Team Responsibilities

- Define package and app consumers of each platform capability.
- Supply environment-specific configuration needs and expected usage patterns.
- Report blockers early when platform dependencies block MVP slices.
- Keep architecture, docs, tests, and package boundaries aligned with the agreed platform baseline.

## Platform Team Responsibilities

- Publish availability and onboarding rules for each shared capability.
- Name owners and escalation paths per capability.
- Define CI/CD, hosting, secrets, observability, and runtime access expectations.
- Provide evidence when a capability moves from `needs-setup` or `blocked` to `available`.

## Blocking Conditions

- Implementation tasks that require external connectivity cannot start without secrets, access control, and environment ownership.
- Staging and production task generation cannot start until compliance controls are enumerated.
- Staging or production slices cannot proceed without artifact, hosting, and observability readiness.