# @wsl-ad/test-utils

Shared testing utilities for the WSL-AD frontend monorepo.

## Contents

- **Page Objects**: Playwright page object factory for stable automation selectors.
- **Test Helpers**: Common test fixtures and utilities shared across packages.

## Usage

```typescript
import { createPageObject } from '@wsl-ad/test-utils';
```

## Conventions

- Every interactive React component should have a page object representation.
- Page objects document supported interactions, states, and selectors.
- See the testing guidance in `apps/docs` for full conventions.
