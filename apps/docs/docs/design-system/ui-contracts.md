# `@wsl-ad/ui-contracts` — Shared Component Interfaces

The contract package defines all shared TypeScript interfaces for the WSL-AD component system.
It has zero runtime dependencies — it is a types-only package.

## Installation

```json
"@wsl-ad/ui-contracts": "workspace:*"
```

## Principle

Each UI variant (`ui-mantine`, `ui-mui`, `ui-radix`, `ui-lit`) must implement all interfaces
defined here. Contracts use TypeScript structural typing (`satisfies`) to enforce compatibility
at type-check time with no runtime cost:

```ts
// In a variant's contract.typetest.ts:
import type { AppShellComponent, ListComponent, FormComponent } from '@wsl-ad/ui-contracts';
import { AppShell } from '../appShell/index.js';
import { List } from '../list/index.js';
import { Form } from '../forms/index.js';

it('AppShell satisfies AppShellComponent', () => {
  AppShell satisfies AppShellComponent;
});
it('List satisfies ListComponent<unknown>', () => {
  List satisfies ListComponent<unknown>;
});
it('Form satisfies FormComponent', () => {
  Form satisfies FormComponent;
});
```

## `AppShellComponent`

```ts
import type { AppShellProps, AppShellComponent } from '@wsl-ad/ui-contracts';
```

### `AppShellProps`

| Prop            | Type                                | Required | Description                                       |
| --------------- | ----------------------------------- | -------- | ------------------------------------------------- |
| `logo`          | `ComponentType`                     | Yes      | Logo component for the top bar                    |
| `navItems`      | `AppShellNavItem[]`                 | Yes      | Navigation items for the sidebar                  |
| `themeMode`     | `'light' \| 'dark' \| 'expressive'` | Yes      | Active theme mode                                 |
| `onThemeToggle` | `() => void`                        | Yes      | Callback for theme toggle (no-op when expressive) |
| `children`      | `ReactNode`                         | Yes      | Main content area                                 |
| `dir`           | `'ltr' \| 'rtl'`                    | No       | Layout direction (default: `'ltr'`)               |

### `AppShellNavItem`

```ts
interface AppShellNavItem {
  id: string;
  label: string;
  icon?: ComponentType;
}
```

## `ListComponent<T>`

```ts
import type { ListProps, ListComponent } from '@wsl-ad/ui-contracts';
```

### `ListProps<T>`

| Prop         | Type                     | Required | Description                   |
| ------------ | ------------------------ | -------- | ----------------------------- |
| `items`      | `T[]`                    | Yes      | Data items to render          |
| `renderItem` | `(item: T) => ReactNode` | Yes      | Render function for each item |
| `aria-label` | `string`                 | Yes      | Accessible label for the list |
| `loading`    | `boolean`                | No       | Show loading state            |
| `emptyState` | `ReactNode`              | No       | Content when `items` is empty |

## Form Components

```ts
import type {
  FormComponent,
  FormProps,
  TextInputProps,
  SelectProps,
  CheckboxProps,
  RadioGroupProps,
  TextAreaProps,
} from '@wsl-ad/ui-contracts';
```

| Export          | Description                                         |
| --------------- | --------------------------------------------------- |
| `FormComponent` | `form` wrapper with submit handler and submit label |
| `TextInput`     | Single-line text input with label and validation    |
| `Select`        | Dropdown select with typed options                  |
| `Checkbox`      | Boolean checkbox with label                         |
| `RadioGroup`    | Group of mutually exclusive radio buttons           |
| `TextArea`      | Multi-line text input                               |

### Common field props

All form controls share:

- `label: string` — accessible label
- `name: string` — form field name
- `value` / `onChange` — controlled value + handler
- `error?: string | string[]` — validation error message(s)
- `disabled?: boolean`
- `required?: boolean`

## Adding a New Contract

1. Add the interface to the appropriate file in `packages/ui-contracts/src/`
2. Re-export from `packages/ui-contracts/src/index.ts`
3. Add a `satisfies` type test to each variant's `src/__tests__/contract.typetest.ts`
4. Run `pnpm test` across all variants to confirm compliance
