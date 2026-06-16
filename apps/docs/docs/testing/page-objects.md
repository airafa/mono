# Page Object Conventions

## Purpose

Page objects provide a stable automation layer between UI components and test code. They document the supported interactions, observable states, and stable selectors for each interactive component.

## Why Page Objects

- **Stability**: When a component's internal structure changes, only the page object needs updating — not every test.
- **Documentation**: Page objects serve as living documentation of what a component can do.
- **Reusability**: The same page object works in Playwright integration tests and Storybook interaction tests.

## Structure

Every page object must define:

1. **Root locator**: The top-level element selector
2. **Interactions**: Methods for user actions (click, type, select)
3. **Assertions**: Methods for verifying state (isVisible, isDisabled, hasError)
4. **Selectors**: Stable `data-testid` attributes used for targeting

## Example

```typescript
import type { Page, Locator } from '@playwright/test';
import { createPageObject } from '@mono/test-utils';

export function createLoginFormPageObject(page: Page) {
  const base = createPageObject(page, '[data-testid="login-form"]');

  return {
    ...base,

    // Interactions
    async fillEmail(email: string) {
      await base.root.locator('[data-testid="email-input"]').fill(email);
    },

    async fillPassword(password: string) {
      await base.root.locator('[data-testid="password-input"]').fill(password);
    },

    async submit() {
      await base.root.locator('[data-testid="submit-button"]').click();
    },

    // Assertions
    get errorMessage(): Locator {
      return base.root.locator('[data-testid="error-message"]');
    },

    get submitButton(): Locator {
      return base.root.locator('[data-testid="submit-button"]');
    },
  };
}
```

## Selector Convention

Use `data-testid` attributes for all automation selectors:

```tsx
<form data-testid="login-form">
  <input data-testid="email-input" />
  <button data-testid="submit-button">Submit</button>
</form>
```

## Rules

1. **One page object per interactive component** — not per test file.
2. **Page objects live in `packages/test-utils`** or colocated with the component's package.
3. **Never use CSS classes or element structure** as selectors — only `data-testid`.
4. **Page object methods return `Promise<void>`** for interactions and `Locator` for assertions.
5. **Update the page object when the component changes** — the page object is part of the component contract.
