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
| CI/CD baseline | Platform team | needs-setup | needs-setup | needs-setup | needs-setup | Explicitly outside frontend ownership |
| Artifact management | Platform team | needs-setup | needs-setup | needs-setup | needs-setup | Needed for app, docs, and Storybook outputs |
| Secrets management | Platform team | needs-setup | needs-setup | needs-setup | needs-setup | Required before non-local integrations |
| Observability baseline | Platform team | needs-setup | needs-setup | needs-setup | needs-setup | Logging, metrics, tracing, and alert routing |
| Hosting baseline | Platform team | needs-setup | needs-setup | needs-setup | needs-setup | Hosting for web app and docs surfaces |
| Networking and access control | Platform team | needs-setup | needs-setup | needs-setup | needs-setup | Includes ingress, ACLs, and environment access |
| Compliance controls | Shared | blocked | blocked | blocked | blocked | Awaiting explicit regulatory and audit inputs |

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
- Release planning cannot start until compliance controls are enumerated.
- Staging or production slices cannot proceed without artifact, hosting, and observability readiness.