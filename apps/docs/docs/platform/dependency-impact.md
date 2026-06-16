# Dependency Impact Guide

## Purpose

Document how missing platform capabilities affect delivery timelines and what breaks when dependencies are unavailable.

## Impact Matrix

| Missing Capability     | Affected Packages      | Blocked Work                                  | Severity | Mitigation                                             |
| ---------------------- | ---------------------- | --------------------------------------------- | -------- | ------------------------------------------------------ |
| Backend REST owner     | `@mono/api-rest`       | REST transport implementation                 | Critical | Name backend owner, agree on endpoint catalog          |
| Backend GraphQL owner  | `@mono/api-graphql`    | GraphQL schema codegen, client implementation | Critical | Name backend owner, deliver schema + versioning policy |
| Backend Realtime owner | `@mono/realtime`       | SignalR hub integration                       | Critical | Name backend owner, deliver hub contract               |
| Auth owner             | All transport packages | Any authenticated API call                    | Critical | Name identity provider and token model                 |
| CI/CD onboarding       | All apps               | Automated testing and deployment              | High     | Confirm platform ownership, begin pipeline setup       |
| Secrets management     | Transport packages     | Non-local API integration                     | High     | Confirm secrets system and project onboarding          |
| Compliance owner       | Release tooling        | Staging and production promotion              | High     | Name compliance owner, confirm applicable controls     |
| Observability          | `@mono/app-shell`      | Error tracking, performance monitoring        | Medium   | Confirm logging/metrics/tracing with platform team     |

## Dependency Chain

```mermaid
graph TD
    LOCAL[Local Development] -->|no blockers| DEV[Dev/Integration]
    DEV -->|secrets + CI/CD + hosting| STAGING[Staging]
    STAGING -->|compliance + release gates| PROD[Production]

    BACKEND[Backend Owners] -->|contracts| DEV
    AUTH[Auth Owner] -->|token model| DEV
    PLATFORM[Platform Onboarding] -->|CI/CD + secrets| DEV
    COMPLIANCE[Compliance Owner] -->|release policy| STAGING

    classDef ready fill:#50c878,color:#fff
    classDef blocked fill:#ff6b6b,color:#fff
    classDef pending fill:#ffa500,color:#fff

    class LOCAL ready
    class DEV,STAGING,PROD blocked
    class BACKEND,AUTH,PLATFORM,COMPLIANCE pending
```

## What You Can Do Now

- All local development, scaffolding, documentation, and test infrastructure work.
- Architecture decisions, package structure, and ownership documentation.
- Benchmark harness setup and baseline recording.
- Quality tooling and release gate definitions.

## What Requires External Resolution

- Any transport package implementation beyond contract placeholder modules.
- Any environment-specific configuration with real endpoints.
- Any CI/CD pipeline execution or deployment.
- Any staging or production release planning.
