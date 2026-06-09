import type { ComponentType, ReactNode } from 'react';

export interface AppShellNavItem {
  id: string;
  label: string;
  icon: ComponentType;
}

export interface AppShellProps {
  logo: ComponentType;
  navItems: AppShellNavItem[];
  /**
   * Active theme mode.
   * - `'light'` / `'dark'` — toggled via `onThemeToggle`
   * - `'expressive'` — URL-param-only; `onThemeToggle` is a no-op
   */
  themeMode: 'light' | 'dark' | 'expressive';
  /** Cycles light ↔ dark only. No-op when `themeMode === 'expressive'`. */
  onThemeToggle: () => void;
  children?: ReactNode;
}

export type AppShellComponent = ComponentType<AppShellProps>;
