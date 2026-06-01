import type { ComponentType, ReactNode } from 'react';

export interface AppShellNavItem {
  id: string;
  label: string;
  icon: ComponentType;
}

export interface AppShellProps {
  logo: ComponentType;
  navItems: AppShellNavItem[];
  themeMode: 'light' | 'dark';
  onThemeToggle: () => void;
  children?: ReactNode;
}

export type AppShellComponent = ComponentType<AppShellProps>;
