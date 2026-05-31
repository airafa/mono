# Rendering Benchmarks

## Purpose

Measure and track rendering performance for the primary web application and shared UI components.

## Metrics

| Metric                  | Target  | Measurement Method           |
| ----------------------- | ------- | ---------------------------- |
| App shell first paint   | < 500ms | Lighthouse / Performance API |
| List render (100 items) | < 100ms | Vitest bench                 |
| Form render (10 fields) | < 50ms  | Vitest bench                 |
| Component re-render     | < 16ms  | React Profiler               |

## Baseline

No baseline measurements recorded yet. Record baseline after initial UI components are implemented.

## Running Benchmarks

```bash
# When benchmark suite is implemented:
# pnpm --filter @wsl-ad/benchmarks-rendering test
```

## Evidence Requirements

Per the constitution, any non-default rendering approach or architecture deviation must include benchmark data stored in this directory and referenced from the relevant spec or plan.
