# App Shell Interface Contract

**Created**: 2026-05-31
**Feature**: [spec.md](../spec.md)
**Location**: `packages/app-shell/src/contracts/app-shell.ts`

## Purpose

Defines the shared TypeScript interface that all 4 UI variant packages (`packages/ui-mui`, `packages/ui-mantine`, `packages/ui-radix`, `packages/ui-lit`) must implement for their app shell export.

## Contract Definition

```typescript
import type { ComponentType, ReactNode } from 'react';

/**
 * A navigation item rendered as an icon button in the sidebar.
 */
export interface AppShellNavItem {
  /** Unique identifier for the nav item */
  id: string;
  /** Human-readable label (used for tooltip and aria-label) */
  label: string;
  /** Icon component to render */
  icon: ComponentType;
}

/**
 * Props accepted by all AppShell variant implementations.
 */
export interface AppShellProps {
  /** Logo component rendered in the top bar */
  logo: ComponentType;
  /** Navigation items rendered in the sidebar */
  navItems: AppShellNavItem[];
  /** Current theme mode */
  themeMode: 'light' | 'dark';
  /** Callback when user clicks the theme toggle button */
  onThemeToggle: () => void;
  /** Main content area */
  children?: ReactNode;
}

/**
 * The type that each variant's app shell export must satisfy.
 */
export type AppShellComponent = ComponentType<AppShellProps>;
```

## Variant Export Contract

Each `packages/ui-*/src/appShell/index.ts` MUST export:

```typescript
export { AppShell } from './AppShell';
// where AppShell satisfies AppShellComponent
```

## Consumer Contract

The host app (`apps/web`) imports the active variant via dynamic import:

```typescript
const { AppShell } = await loadAppShell();
// AppShell: AppShellComponent
```

## Layout Contract (DOM Structure)

All implementations MUST render the following semantic structure:

```
<div data-testid="app-shell" data-theme="{light|dark}">
  <header data-testid="app-shell-topbar">
    <Logo />
    <ThemeToggleButton />
  </header>
  <nav data-testid="app-shell-sidebar" style="inset-inline-start: 0">
    {navItems.map(item => <IconButton />)}
  </nav>
  <main data-testid="app-shell-content">
    {children}
  </main>
</div>
```

- `data-testid` attributes are mandatory for test automation.
- The sidebar MUST use `inset-inline-start` (or equivalent logical property) for RTL support.
- Theme toggle button MUST be in the top bar.

## Accessibility Requirements

- Sidebar navigation items MUST have `aria-label` set to `navItem.label`.
- Theme toggle MUST have `aria-label` describing current action (e.g., "Switch to dark mode").
- Sidebar MUST use `<nav>` element with `aria-label="Main navigation"`.
