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

# Run Lighthouse (requires Chrome)
npx lighthouse http://localhost:4173/?ui=mui --output=json --output-path=./benchmarks/rendering/lighthouse-mui.json
```

## Environment Configuration

Create/edit `apps/web/.env`:

```env
VITE_UI_VARIANT=mui
```

Valid values: `mui`, `mantine`, `radix`, `lit`
