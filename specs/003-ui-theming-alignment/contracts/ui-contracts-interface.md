# Contract: `@mono/ui-contracts`

**Package**: `packages/ui-contracts`
**Version target**: 1.0.0 (new package)
**Consumers**: all four UI variant packages, `packages/app-shell` (re-export shim), `apps/web`, `apps/storybook`, `apps/docs`

---

## Public API Surface

### Named exports from `@mono/ui-contracts`

| Export                  | Category      | Replaces / migrated from |
|-------------------------|---------------|--------------------------|
| `AppShellNavItem`       | Interface     | `packages/app-shell/src/contracts/app-shell.ts` |
| `AppShellProps`         | Interface     | `packages/app-shell/src/contracts/app-shell.ts` |
| `AppShellComponent`     | Type alias    | `packages/app-shell/src/contracts/app-shell.ts` |
| `ListSortConfig`        | Interface     | new |
| `ListFilterConfig`      | Interface     | new |
| `ListPaginationConfig`  | Interface     | new |
| `ListProps`             | Interface     | new (replaces empty `ui-list`) |
| `ListComponent`         | Type alias    | new |
| `FormFieldError`        | Interface     | new (replaces empty `ui-forms`) |
| `FormFieldProps`        | Interface     | new |
| `FormProps`             | Interface     | new |
| `FormComponent`         | Type alias    | new |
| `TextInputProps`        | Interface     | new (replaces empty `ui-form-controls`) |
| `SelectOption`          | Interface     | new |
| `SelectProps`           | Interface     | new |
| `CheckboxProps`         | Interface     | new |
| `RadioOption`           | Interface     | new |
| `RadioGroupProps`       | Interface     | new |
| `TextAreaProps`         | Interface     | new |

---

## Interface Definitions

### AppShell

```ts
interface AppShellNavItem {
  id: string;
  /** Also used as aria-label on the nav icon button */
  label: string;
  icon: ComponentType;
}

interface AppShellProps {
  logo: ComponentType;
  navItems: AppShellNavItem[];
  /** 'expressive' is activated via ?theme=expressive URL param only — no toggle button */
  themeMode: 'light' | 'dark' | 'expressive';
  /** Cycles light ↔ dark only. No-op when themeMode === 'expressive'. */
  onThemeToggle: () => void;
  'aria-label'?: string;
  children?: ReactNode;
}

type AppShellComponent = ComponentType<AppShellProps>;
```

### List

Full definitions: see `specs/003-ui-theming-alignment/data-model.md §2.2`.

Key accessibility requirements:
- `ListProps['aria-label']` — **required**, WCAG 2.1 list landmark
- `ListProps.renderItem` — caller is responsible for accessible item markup

### Form & Form Controls

Full definitions: see `specs/003-ui-theming-alignment/data-model.md §2.3 – §2.4`.

Key accessibility requirements:
- `FormProps['aria-label']` — **required**, WCAG 2.1 form landmark
- `FormFieldProps.id` — **required**, used for `<label htmlFor>` association
- `RadioGroupProps.legend` — **required**, rendered via `<fieldset>/<legend>`
- `CheckboxProps.id` — **required**, used for `<label htmlFor>` association

---

## Migration: `@mono/app-shell` re-export shim

During migration (Step 1), `packages/app-shell/src/index.ts` adds:

```ts
// Migration shim — remove once all consumers update to @mono/ui-contracts
export type { AppShellNavItem, AppShellProps, AppShellComponent } from '@mono/ui-contracts';
```

All 20 existing import sites continue to compile without changes. After all consumers are updated to import directly from `@mono/ui-contracts`, the shim is removed (Step 2).

---

## Contract Compliance Enforcement

Each variant package MUST contain `src/contract.typetest.ts` (or per-contract files) with:

```ts
import type { AppShellComponent } from '@mono/ui-contracts';
import { AppShell } from './appShell/index.js';

// If this line produces a TypeScript error, the variant does not satisfy the contract.
const _: AppShellComponent = AppShell satisfies AppShellComponent;
```

The same pattern applies for `ListComponent` and `FormComponent` when implemented.

---

## Versioning and Change Policy

- Contract changes require **atomic monorepo micro-tasks**: the interface change and all variant updates land on the same feature branch.
- No independent semver bumps to `ui-contracts` without corresponding variant updates in the same branch.
- `themeMode: 'expressive'` is a non-breaking addition (union widening) — existing `'light' | 'dark'` implementations type-check as before; each variant must add the `'expressive'` case explicitly.
