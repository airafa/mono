# Design System

## Overview

The WSL-AD design system is documented through two integrated surfaces:

- **This documentation site** (VitePress) — architecture guidance, usage constraints, and integration patterns.
- **Storybook** — interactive component catalog with visual testing and interaction coverage. Run locally with `pnpm --filter @wsl-ad/storybook dev`.

## Packages

| Package                    | Purpose                               | Storybook Coverage |
| -------------------------- | ------------------------------------- | ------------------ |
| `@wsl-ad/ui-mui`           | MUI variant (Emotion + CSS Variables) | 2 stories          |
| `@wsl-ad/ui-mantine`       | Mantine variant (CSS Modules)         | 2 stories          |
| `@wsl-ad/ui-radix`         | Radix variant (Static CSS)            | 2 stories          |
| `@wsl-ad/ui-lit`           | Lit variant (Inline Styles)           | 2 stories          |
| `@wsl-ad/ui-list`          | Table and card list views             | Planned            |
| `@wsl-ad/ui-forms`         | Form layout utilities                 | Planned            |
| `@wsl-ad/ui-form-controls` | Documented form controls              | Planned            |

## Principles

1. **Documentation-as-product**: Every reusable UI surface ships with matching docs and Storybook stories.
2. **Component contracts**: Each component's supported interactions, states, and selectors are documented through page objects.
3. **RTL/LTR parity**: All UI components must support both layout directions.
4. **Accessibility**: Components follow WAI-ARIA patterns where applicable.

## Getting Started

To view the design system locally:

```bash
# Start Storybook
pnpm --filter @wsl-ad/storybook dev

# Start documentation
pnpm --filter @wsl-ad/docs dev
```
