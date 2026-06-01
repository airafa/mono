# Quickstart: App Shell UI Framework Benchmark

## Prerequisites

- Node.js 22 LTS
- pnpm 9+
- This monorepo cloned and on branch `002-appshell-benchmark`

## Setup

```bash
pnpm install
```

## Running the App with a Specific Variant

```bash
# Default variant (from .env VITE_UI_VARIANT, defaults to 'mui')
pnpm --filter @wsl-ad/web dev

# Override variant via URL
# http://localhost:5173/?ui=mantine
# http://localhost:5173/?ui=radix
# http://localhost:5173/?ui=lit
```

## Running Tests

```bash
# All variant tests
pnpm --filter "@wsl-ad/ui-*" test

# Specific variant
pnpm --filter @wsl-ad/ui-mui test
pnpm --filter @wsl-ad/ui-mantine test
pnpm --filter @wsl-ad/ui-radix test
pnpm --filter @wsl-ad/ui-lit test
```

## Storybook

```bash
pnpm --filter @wsl-ad/storybook dev
```

All 4 variants have stories under "App Shell / {MUI,Mantine,Radix,Lit}".

## Building for Benchmark Measurement

```bash
# Build the web app (will code-split per variant)
pnpm --filter @wsl-ad/web build

# Measure bundle sizes
ls -la apps/web/dist/assets/*.js | awk '{print $5, $9}'
```

## Lighthouse Benchmarks

Lighthouse CLI is installed as a workspace dev dependency (`lighthouse@13.3.0`).

```bash
# Start the dev server on a fixed port
pnpm --filter @wsl-ad/web dev --port 4173

# Run Lighthouse for all 4 variants
pnpm lighthouse

# Run for a single variant
pnpm lighthouse --variant mui

# Run against a custom URL
pnpm lighthouse --url http://localhost:5173
```

HTML and JSON reports are saved to `benchmarks/rendering/lighthouse/`.

## Playwright E2E Tests

Playwright auto-starts a dev server on port 4173 via the `webServer` config:

```bash
# Run headless
pnpm exec playwright test

# Run with visible browser
pnpm exec playwright test --headed

# Run with UI mode
pnpm exec playwright test --ui
```

## Environment Configuration

Create/edit `apps/web/.env`:

```env
VITE_UI_VARIANT=mui
```

Valid values: `mui`, `mantine`, `radix`, `lit`

## Release Gate Validation

The release gates script validates quality, documentation, and benchmark readiness:

```bash
# Run all gates (Quality, Documentation, Benchmark, Dead Code)
node tools/release/validate-release-gates.mjs --env dev-integration
```

Gates perform real checks: lint + typecheck + test (Quality), file existence (Documentation/Benchmark), and unused exports scan (Dead Code).
