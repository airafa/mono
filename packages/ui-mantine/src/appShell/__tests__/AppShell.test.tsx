import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { AppShell } from '../index.js';
import { Logo, FlightInfrastructuresIcon, MissionsIcon } from '@wsl-ad/app-shell';

const navItems = [
  { id: 'flight-infra', label: 'Flight Infrastructures', icon: FlightInfrastructuresIcon },
  { id: 'missions', label: 'Missions', icon: MissionsIcon },
];

describe('Mantine AppShell', () => {
  it('renders the top bar with logo', () => {
    render(
      <AppShell logo={Logo} navItems={navItems} themeMode="light" onThemeToggle={() => {}}>
        <p>Content</p>
      </AppShell>,
    );
    expect(screen.getByTestId('app-shell-topbar')).toBeInTheDocument();
    expect(screen.getByLabelText('WSL-AD Logo')).toBeInTheDocument();
  });

  it('renders sidebar with navigation items', () => {
    render(
      <AppShell logo={Logo} navItems={navItems} themeMode="light" onThemeToggle={() => {}}>
        <p>Content</p>
      </AppShell>,
    );
    const sidebar = screen.getByTestId('app-shell-sidebar');
    expect(sidebar).toBeInTheDocument();

    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(nav).toBeInTheDocument();
    expect(screen.getByLabelText('Flight Infrastructures')).toBeInTheDocument();
    expect(screen.getByLabelText('Missions')).toBeInTheDocument();
  });

  it('renders the main content area with children', () => {
    render(
      <AppShell logo={Logo} navItems={navItems} themeMode="light" onThemeToggle={() => {}}>
        <p>Content</p>
      </AppShell>,
    );
    const content = screen.getByTestId('app-shell-content');
    expect(content).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('renders the app-shell root container', () => {
    render(
      <AppShell logo={Logo} navItems={navItems} themeMode="light" onThemeToggle={() => {}}>
        <p>Content</p>
      </AppShell>,
    );
    expect(screen.getByTestId('app-shell')).toBeInTheDocument();
  });

  it('renders theme toggle button', () => {
    render(
      <AppShell logo={Logo} navItems={navItems} themeMode="light" onThemeToggle={() => {}}>
        <p>Content</p>
      </AppShell>,
    );
    expect(screen.getByLabelText('Toggle theme')).toBeInTheDocument();
  });

  it('calls onThemeToggle when toggle button is clicked', () => {
    const onThemeToggle = vi.fn();
    render(
      <AppShell logo={Logo} navItems={navItems} themeMode="light" onThemeToggle={onThemeToggle}>
        <p>Content</p>
      </AppShell>,
    );
    fireEvent.click(screen.getByLabelText('Toggle theme'));
    expect(onThemeToggle).toHaveBeenCalledTimes(1);
  });

  it('renders in dark mode when themeMode is dark', () => {
    render(
      <AppShell logo={Logo} navItems={navItems} themeMode="dark" onThemeToggle={() => {}}>
        <p>Content</p>
      </AppShell>,
    );
    expect(screen.getByTestId('app-shell')).toBeInTheDocument();
  });
});
