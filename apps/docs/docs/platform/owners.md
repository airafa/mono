# Platform Owners

## Current State

Platform ownership for this repository is **pending resolution**. The following roles must be filled before non-local environment work can proceed.

## Required Owners

| Role                           | Scope                                             | Current Owner | Status     |
| ------------------------------ | ------------------------------------------------- | ------------- | ---------- |
| CI/CD Onboarding               | Pipeline setup, build agents, deployment triggers | TBD           | ⏳ Pending |
| Artifact Management            | Package registry, build artifact storage          | TBD           | ⏳ Pending |
| Secrets Management             | API keys, credentials, token storage              | TBD           | ⏳ Pending |
| Observability                  | Logging, metrics, tracing, dashboards, alerts     | TBD           | ⏳ Pending |
| Hosting                        | Application deployment targets per environment    | TBD           | ⏳ Pending |
| Networking / Access            | Network policies, access control, firewall rules  | TBD           | ⏳ Pending |
| Compliance / Security          | Release approval, audit controls, security review | TBD           | ⏳ Pending |
| Backend Contracts (REST)       | REST API schema, versioning, auth rules           | TBD           | ⏳ Pending |
| Backend Contracts (GraphQL)    | GraphQL schema, codegen cadence                   | TBD           | ⏳ Pending |
| Backend Contracts (Realtime)   | SignalR hub contracts, event payloads             | TBD           | ⏳ Pending |
| Authentication / Authorization | Identity provider, token model, claims            | TBD           | ⏳ Pending |

## Escalation Path

Until owners are named, escalation defaults to the product team lead.

## How to Update

When an owner is confirmed:

1. Update this table with the team/person name and set status to ✅ Confirmed.
2. Update the corresponding contract document in `specs/001-project-architecture-infra/contracts/`.
3. Update readiness states in `packages/app-shell/src/platform/capabilities.ts`.
