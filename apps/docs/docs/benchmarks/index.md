# Benchmarks

Technology decisions in this project are backed by benchmark data (Constitution V). This section collects benchmark results for each feature that involves a technology choice.

## Running Benchmarks

### Bundle Size

```bash
pnpm --filter @wsl-ad/web build
# Check dist/assets/ for per-chunk sizes
```

### Lighthouse

```bash
# Start dev server
pnpm --filter @wsl-ad/web dev --port 4173

# Run Lighthouse for all variants
pnpm lighthouse

# Run for a single variant
pnpm lighthouse --variant mui

# Run against a custom URL
pnpm lighthouse --url http://localhost:5173
```

Reports are saved to `benchmarks/rendering/lighthouse/`.

### Unit Tests

```bash
pnpm test
```

## Feature Benchmarks

| Feature                            | Spec                           | Benchmark Results                  |
| ---------------------------------- | ------------------------------ | ---------------------------------- |
| [App Shell](/benchmarks/app-shell) | `specs/002-appshell-benchmark` | Bundle size, DX scores, Lighthouse |
