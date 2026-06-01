import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { AppShell } from '@wsl-ad/ui-mui/appShell';
import { Logo, FlightInfrastructuresIcon, MissionsIcon } from '@wsl-ad/app-shell';
import type { AppShellProps } from '@wsl-ad/app-shell';

const navItems: AppShellProps['navItems'] = [
  { id: 'flight-infra', label: 'Flight Infrastructures', icon: FlightInfrastructuresIcon },
  { id: 'missions', label: 'Missions', icon: MissionsIcon },
];

function MuiAppShellDemo({ themeMode: initialTheme }: { themeMode: 'light' | 'dark' }) {
  const [themeMode, setThemeMode] = useState(initialTheme);
  return (
    <AppShell
      logo={Logo}
      navItems={navItems}
      themeMode={themeMode}
      onThemeToggle={() => setThemeMode((p) => (p === 'light' ? 'dark' : 'light'))}
    >
      <h1>MUI App Shell</h1>
      <p>This is the MUI variant of the app shell.</p>
    </AppShell>
  );
}

const meta: Meta = {
  title: 'AppShell/MUI',
  component: MuiAppShellDemo,
};

export default meta;

type Story = StoryObj<typeof MuiAppShellDemo>;

export const Light: Story = {
  args: { themeMode: 'light' },
};

export const Dark: Story = {
  args: { themeMode: 'dark' },
};
