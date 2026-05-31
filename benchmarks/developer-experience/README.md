# Developer Experience Benchmarks

## Purpose

Measure and track developer workflow performance to ensure the monorepo tooling stays productive.

## Metrics

| Metric                   | Target | Measurement Method |
| ------------------------ | ------ | ------------------ |
| Cold install time        | < 60s  | Timer script       |
| Incremental build time   | < 5s   | Nx affected build  |
| Full workspace typecheck | < 30s  | `tsc --noEmit`     |
| Lint full workspace      | < 15s  | `eslint .`         |
| Single package test      | < 10s  | Vitest             |
| Docs build               | < 30s  | VitePress build    |
| Storybook build          | < 60s  | Storybook build    |

## Baseline

No baseline measurements recorded yet. Record baseline after workspace setup is complete and all packages are scaffolded.

## Running Benchmarks

```bash
# When benchmark suite is implemented:
# pnpm --filter @wsl-ad/benchmarks-dx test
```

## Evidence Requirements

Per the constitution, workspace tooling changes must be backed by benchmark data. This includes monorepo orchestrator changes, build tool changes, and major dependency additions.
