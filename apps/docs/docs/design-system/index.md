# Design System

## Overview

The mono design system is documented through two integrated surfaces:

- **This documentation site** (VitePress) — architecture guidance, usage constraints, and integration patterns.
- **Storybook** — interactive component catalog with visual testing and interaction coverage. Run locally with `pnpm --filter @mono/storybook dev`.

## Packages

| Package              | Purpose                                                                                       | Storybook Coverage                |
| -------------------- | --------------------------------------------------------------------------------------------- | --------------------------------- |
| `@mono/ui-tokens`    | Canonical design tokens, VE theme contract, recipes                                           | See VE Themes story               |
| `@mono/ui-contracts` | Shared TypeScript interfaces (AppShell, List, Form)                                           | N/A (types only)                  |
| `@mono/ui-mui`       | MUI variant (Vanilla Extract for layout; Emotion only inside MUI widgets; `sx` ESLint-banned) | 3 stories (Light/Dark/Expressive) |
| `@mono/ui-mantine`   | Mantine variant (CSS Modules + VE theme classes)                                              | 3 stories                         |
| `@mono/ui-radix`     | Radix variant (CSS variables + VE theme classes)                                              | 3 stories                         |
| `@mono/ui-lit`       | Lit variant (Shadow DOM CSS custom properties)                                                | 3 stories                         |

> `@mono/ui-list`, `@mono/ui-forms`, and `@mono/ui-form-controls` were retired in feature
> `003-ui-theming-alignment`. Their implementations now live in each variant package.
> See [ui-contracts](./ui-contracts.md) for the shared interfaces.

## Principles

1. **Documentation-as-product**: Every reusable UI surface ships with matching docs and Storybook stories.
2. **Component contracts**: Each component's supported interactions, states, and selectors are documented through page objects.
3. **RTL/LTR parity**: All UI components must support both layout directions.
4. **Accessibility**: Components follow WAI-ARIA patterns where applicable.

## Getting Started

To view the design system locally:

```bash
# Start Storybook
pnpm --filter @mono/storybook dev

# Start documentation
pnpm --filter @mono/docs dev
```
