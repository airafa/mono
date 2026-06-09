import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { AppShell } from '@wsl-ad/ui-lit/appShell';
import { Logo, FlightInfrastructuresIcon, MissionsIcon } from '@wsl-ad/app-shell';
import type { AppShellProps } from '@wsl-ad/ui-contracts';

const navItems: AppShellProps['navItems'] = [
  { id: 'flight-infra', label: 'Flight Infrastructures', icon: FlightInfrastructuresIcon },
  { id: 'missions', label: 'Missions', icon: MissionsIcon },
];

type ThemeMode = 'light' | 'dark' | 'expressive';

function LitAppShellDemo({ themeMode: initialTheme }: { themeMode: ThemeMode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>(initialTheme);
  return (
    <AppShell
      logo={Logo}
      navItems={navItems}
      themeMode={themeMode}
      onThemeToggle={() =>
        setThemeMode((p) => {
          if (p === 'expressive') return p;
          return p === 'light' ? 'dark' : 'light';
        })
      }
    >
      <h1>Lit App Shell</h1>
      <p>This is the Lit Web Components variant of the app shell.</p>
    </AppShell>
  );
}

const meta: Meta = {
  title: 'AppShell/Lit',
  component: LitAppShellDemo,
};

export default meta;

type Story = StoryObj<typeof LitAppShellDemo>;

export const Light: Story = {
  args: { themeMode: 'light' },
};

export const Dark: Story = {
  args: { themeMode: 'dark' },
};

export const Expressive: Story = {
  args: { themeMode: 'expressive' },
};
