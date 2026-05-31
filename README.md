# WSL-AD Frontend Monorepo

Enterprise frontend monorepo built with pnpm, Nx, Vite, React, and TypeScript.

## Quick Start

```bash
# Prerequisites: Node.js >= 22, pnpm
pnpm install
```

## Workspace Structure

```
apps/
├── web/          # Primary web application (Vite + React)
├── docs/         # Architecture documentation (VitePress)
└── storybook/    # Design system catalog (Storybook)

packages/
├── app-shell/    # Application framing, environment config
├── i18n/         # English/Hebrew localization, RTL/LTR
├── ui-list/      # Table and card list views
├── ui-forms/     # Form layout utilities
├── ui-form-controls/  # Documented form controls
├── api-rest/     # REST transport (ky)
├── api-graphql/  # GraphQL transport (urql + codegen)
├── realtime/     # Realtime transport (SignalR)
├── map-core/     # 2D/3D mapping support
└── test-utils/   # Shared testing utilities, page objects

benchmarks/
├── rendering/    # Rendering performance benchmarks
├── realtime/     # Realtime transport benchmarks
└── developer-experience/  # DX workflow benchmarks

tools/
├── quality/      # Dead-code audit, slice validation
└── release/      # Release gates, promotion flow
```

## Commands

| Command                 | Purpose                          |
| ----------------------- | -------------------------------- |
| `pnpm build`            | Build all packages and apps      |
| `pnpm lint`             | Lint all packages and apps       |
| `pnpm format`           | Check formatting                 |
| `pnpm format:fix`       | Fix formatting                   |
| `pnpm typecheck`        | Type-check all packages and apps |
| `pnpm test`             | Run all unit tests               |
| `pnpm test:e2e`         | Run all E2E tests                |
| `pnpm validate`         | Run lint + typecheck + test      |
| `pnpm validate:unused`  | Audit for unused exports         |
| `pnpm validate:slice`   | Validate a changed slice         |
| `pnpm validate:env`     | Check environment readiness      |
| `pnpm validate:release` | Check release gate status        |

## Development

```bash
# Start the web app
pnpm --filter @wsl-ad/web dev

# Start documentation
pnpm --filter @wsl-ad/docs dev

# Start Storybook
pnpm --filter @wsl-ad/storybook dev
```

## Architecture

See [apps/docs](apps/docs/) for full architecture documentation including:

- [Domain boundaries and ownership](apps/docs/docs/architecture/domains.md)
- [Dependency map](apps/docs/docs/architecture/dependency-map.md)
- [Platform readiness matrix](apps/docs/docs/platform/readiness-matrix.md)
- [Release gates](apps/docs/docs/delivery/release-gates.md)
- [Agent workflow](apps/docs/docs/delivery/agent-workflow.md)

## License

Private — internal use only.
