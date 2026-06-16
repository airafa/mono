# Architecture Domains

## Overview

The mono frontend monorepo is organized into distinct architecture domains, each with clear ownership boundaries and responsibilities.

## Apps

| Domain    | Path             | Type          | Owner        | Purpose                                             |
| --------- | ---------------- | ------------- | ------------ | --------------------------------------------------- |
| Web       | `apps/web`       | app           | Product team | Primary web application for enterprise users        |
| Docs      | `apps/docs`      | documentation | Product team | Architecture and platform documentation (VitePress) |
| Storybook | `apps/storybook` | documentation | Product team | Design system catalog and interaction coverage      |

## Shared Packages

| Domain           | Path                        | Type    | Owner                      | Purpose                                             |
| ---------------- | --------------------------- | ------- | -------------------------- | --------------------------------------------------- |
| App Shell        | `packages/app-shell`        | package | Product team               | Application framing, navigation, environment config |
| i18n             | `packages/i18n`             | package | Product team               | English/Hebrew localization, RTL/LTR direction      |
| UI List          | `packages/ui-list`          | package | Product team               | Table and card list view wrappers                   |
| UI Forms         | `packages/ui-forms`         | package | Product team               | Form layout utilities                               |
| UI Form Controls | `packages/ui-form-controls` | package | Product team               | Documented form input controls                      |
| Map Core         | `packages/map-core`         | package | Product team               | 2D/3D mapping integration (deferred)                |
| API REST         | `packages/api-rest`         | package | Shared (product + backend) | REST transport layer using ky                       |
| API GraphQL      | `packages/api-graphql`      | package | Shared (product + backend) | GraphQL transport using urql + codegen              |
| Realtime         | `packages/realtime`         | package | Shared (product + backend) | SignalR-compatible realtime transport               |
| Test Utils       | `packages/test-utils`       | package | Product team               | Shared testing utilities and page objects           |

## Platform Boundaries

| Domain          | Path             | Type              | Owner        | Purpose                            |
| --------------- | ---------------- | ----------------- | ------------ | ---------------------------------- |
| Quality Tooling | `tools/quality/` | platform-boundary | Product team | Dead-code audit, slice validation  |
| Release Tooling | `tools/release/` | platform-boundary | Shared       | Release gates, promotion flow      |
| Benchmarks      | `benchmarks/`    | platform-boundary | Product team | Rendering, realtime, DX benchmarks |

## Ownership Rules

- **Product team** owns app behavior, UI packages, documentation, and test coverage.
- **Backend team** owns service contracts and API schemas.
- **Platform team** owns CI/CD, hosting, secrets, observability.
- **Shared** ownership applies where both product and platform/backend teams must agree on the contract.
- Transport packages (`api-rest`, `api-graphql`, `realtime`) have shared ownership because the frontend owns the client code but the backend owns the contract.
