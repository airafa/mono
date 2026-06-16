# App Shell

The app shell provides the top-level layout frame for the mono web application: a fixed top bar, an inline-start sidebar with icon navigation, and a flexible main content area.

## Contract

All app shell variants implement a shared TypeScript interface:

```typescript
import type { AppShellComponent, AppShellProps } from '@mono/app-shell';
```

### `AppShellProps`

| Prop            | Type                | Description                               |
| --------------- | ------------------- | ----------------------------------------- |
| `logo`          | `ComponentType`     | Logo component rendered in the top bar    |
| `navItems`      | `AppShellNavItem[]` | Navigation items with id, label, and icon |
| `themeMode`     | `'light' \| 'dark'` | Current theme mode                        |
| `onThemeToggle` | `() => void`        | Callback when theme toggle is clicked     |
| `children`      | `ReactNode`         | Content rendered in the main area         |

### DOM Contract

All variants render these `data-testid` attributes:

- `app-shell` — root container
- `app-shell-topbar` — top bar / header
- `app-shell-sidebar` — sidebar panel
- `app-shell-content` — main content area

### Accessibility

- `<nav aria-label="Main navigation">` wraps nav items
- Each nav button has `aria-label` matching the item label
- Theme toggle has `aria-label="Toggle theme"`
- Logo has `aria-label="mono Logo"`

## Variants

| Package            | Framework           | CSS Strategy                                                         |
| ------------------ | ------------------- | -------------------------------------------------------------------- |
| `@mono/ui-mui`     | MUI Material        | Vanilla Extract for layout (`sx` banned); Emotion inside MUI widgets |
| `@mono/ui-mantine` | Mantine             | CSS Modules + PostCSS + VE theme classes                             |
| `@mono/ui-radix`   | Radix Themes        | CSS Variables + VE theme classes                                     |
| `@mono/ui-lit`     | Lit + React Wrapper | Shadow DOM CSS custom properties                                     |

## Usage

The active variant is selected via URL parameter or environment variable:

```
/?ui=mui        # MUI variant
/?ui=mantine    # Mantine variant
/?ui=radix      # Radix variant
/?ui=lit        # Lit variant
```

Default: `VITE_UI_VARIANT` in `.env` (falls back to `mui`).

## Theme Toggle API

Each variant respects `themeMode` prop and calls `onThemeToggle` on button click. Theme state is managed by the host application (`apps/web/src/App.tsx`).

## Benchmark Results

See the [App Shell Benchmark](/benchmarks/app-shell) page or `benchmarks/rendering/appshell-benchmark.md` in the repository root for bundle size, performance, and developer experience comparisons.
