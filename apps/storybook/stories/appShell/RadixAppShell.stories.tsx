import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { AppShell } from '@wsl-ad/ui-radix/appShell';
import { Logo, FlightInfrastructuresIcon, MissionsIcon } from '@wsl-ad/app-shell';
import type { AppShellProps } from '@wsl-ad/ui-contracts';

const navItems: AppShellProps['navItems'] = [
  { id: 'flight-infra', label: 'Flight Infrastructures', icon: FlightInfrastructuresIcon },
  { id: 'missions', label: 'Missions', icon: MissionsIcon },
];

type ThemeMode = 'light' | 'dark' | 'expressive';

function RadixAppShellDemo({ themeMode: initialTheme }: { themeMode: ThemeMode }) {
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
      <h1>Radix App Shell</h1>
      <p>This is the Radix UI variant of the app shell.</p>
    </AppShell>
  );
}

const meta: Meta = {
  title: 'AppShell/Radix',
  component: RadixAppShellDemo,
};

export default meta;

type Story = StoryObj<typeof RadixAppShellDemo>;

export const Light: Story = {
  args: { themeMode: 'light' },
};

export const Dark: Story = {
  args: { themeMode: 'dark' },
};

export const Expressive: Story = {
  args: { themeMode: 'expressive' },
};
