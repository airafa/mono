# Backend Interface Contracts

## Purpose

Define the minimum contracts that the frontend monorepo requires from backend-owned services without taking ownership of backend architecture.

## Contract Inventory

| Contract | Purpose | Expected Consumer | Provider Owner | Required Artifact | Blocking If Missing |
|----------|---------|-------------------|----------------|-------------------|---------------------|
| REST API | CRUD and workflow endpoints for browser clients | `packages/api-rest`, `apps/web` | Backend team | Endpoint catalog plus auth rules | Yes |
| GraphQL API | Structured query/mutation access with generated client types | `packages/api-graphql`, `apps/web` | Backend team | Schema document and versioning policy | Yes |
| Realtime SignalR | Push updates for live operational views | `packages/realtime`, `apps/web` | Backend team | Hub contract and event payload catalog | Yes |
| GraphQL Subscriptions | Event-driven updates where GraphQL is the transport | `packages/realtime`, `apps/web` | Backend team | Subscription schema and topic ownership | Conditional |
| Authentication and Authorization | Identity, token, claims, and permission model | All apps and transport packages | Platform or backend team | Auth flow, token model, and role/claim mapping | Yes |

## Required Fields Per Contract

- Contract name and versioning policy
- Owning team and escalation path
- Consumer package or app
- Authentication requirements
- Environment availability by local, dev/integration, staging, and production
- Backward-compatibility policy
- Error model and retry expectations
- Observability requirements and correlation identifiers

## Acceptance Rules

- No transport package implementation starts before its corresponding contract owner is named.
- GraphQL client code generation does not start until schema delivery and update cadence are agreed.
- Realtime work does not start until payload ordering, reconnect behavior, and stale event handling are documented.
- Any backend contract that differs by environment must document the difference explicitly.

## Open Follow-Ups

- Name the concrete backend owners for REST, GraphQL, and realtime contracts.
- Confirm whether GraphQL subscriptions are required in the MVP or only after initial delivery.
- Confirm the identity provider and token/claims model.