# Dependency Map

## Package Dependency Graph

```mermaid
graph TD
    WEB[apps/web] --> SHELL[packages/app-shell]
    WEB --> I18N[packages/i18n]
    WEB --> UIL[packages/ui-list]
    WEB --> UIF[packages/ui-forms]
    WEB --> UIFC[packages/ui-form-controls]
    WEB --> REST[packages/api-rest]
    WEB --> GQL[packages/api-graphql]
    WEB --> RT[packages/realtime]
    WEB --> MAP[packages/map-core]

    DOCS[apps/docs] -.-> SHELL
    SB[apps/storybook] --> UIL
    SB --> UIF
    SB --> UIFC

    SHELL --> I18N

    REST -.->|contract| BACKEND_REST[Backend REST API]
    GQL -.->|contract| BACKEND_GQL[Backend GraphQL API]
    RT -.->|contract| BACKEND_RT[Backend SignalR Hub]

    classDef app fill:#4a9eff,color:#fff
    classDef pkg fill:#50c878,color:#fff
    classDef ext fill:#ff6b6b,color:#fff

    class WEB,DOCS,SB app
    class SHELL,I18N,UIL,UIF,UIFC,REST,GQL,RT,MAP pkg
    class BACKEND_REST,BACKEND_GQL,BACKEND_RT ext
```

## Dependency Rules

1. **Apps depend on packages** — never the reverse.
2. **Packages may depend on other packages** — but only on packages that are lower in the dependency graph.
3. **Transport packages** (`api-rest`, `api-graphql`, `realtime`) depend on backend contracts but never on UI packages.
4. **UI packages** (`ui-list`, `ui-forms`, `ui-form-controls`) never depend on transport packages.
5. **`app-shell`** may depend on `i18n` but not on UI or transport packages directly.
6. **External services** are always consumed through dedicated transport packages, never directly from apps.

## Cross-Cutting Concerns

| Concern            | Owned By              | Consumed By               |
| ------------------ | --------------------- | ------------------------- |
| Environment config | `packages/app-shell`  | All apps                  |
| Localization       | `packages/i18n`       | All apps, UI packages     |
| Test utilities     | `packages/test-utils` | All apps, all packages    |
| Quality tooling    | `tools/quality/`      | CI/CD, developer workflow |
| Release gates      | `tools/release/`      | CI/CD, promotion flow     |
