# Bootstrap Guide

## Prerequisites

- **Node.js**: >= 22 LTS
- **pnpm**: Latest (managed via corepack or standalone install)

## Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd mono

# Install dependencies
pnpm install

# Verify workspace
npx nx show projects
```

## Verify Installation

```bash
# Type-check the workspace
pnpm typecheck

# Run lint
pnpm lint

# Check formatting
pnpm format
```

## Development Commands

### Web Application

```bash
pnpm --filter @mono/web dev
# Opens at http://localhost:5173
```

### Documentation

```bash
pnpm --filter @mono/docs dev
# Opens VitePress dev server
```

### Storybook

```bash
pnpm --filter @mono/storybook dev
# Opens at http://localhost:6006
```

## Working with Packages

### Create a new component in a package

1. Add the component source in `packages/<name>/src/`
2. Export it from `packages/<name>/src/index.ts`
3. Add a Storybook story in the same directory
4. Add a page object in `packages/test-utils/src/`
5. Update docs if the component is user-visible

### Run tests for a specific package

```bash
pnpm --filter @mono/<package-name> test
```

### Type-check a specific package

```bash
pnpm --filter @mono/<package-name> typecheck
```

## Validation

Before committing, run the full validation suite:

```bash
pnpm validate
```

For a changed slice, also run:

```bash
pnpm validate:unused
pnpm validate:slice
```

## Troubleshooting

### pnpm install fails

- Ensure Node.js >= 22 is installed: `node --version`
- Ensure pnpm is available: `pnpm --version`
- Clear the pnpm store and retry: `pnpm store prune && pnpm install`

### TypeScript errors across packages

- Run `pnpm typecheck` from the workspace root
- Check that `tsconfig.base.json` paths are correct
- Ensure the package's `tsconfig.json` extends the base config
