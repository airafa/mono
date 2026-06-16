import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { AppShell } from '@wsl-ad/ui-mui/appShell';
import { Logo, FlightInfrastructuresIcon, MissionsIcon } from '@wsl-ad/app-shell';
import type { AppShellProps } from '@wsl-ad/ui-contracts';

const navItems: AppShellProps['navItems'] = [
  { id: 'flight-infra', label: 'Flight Infrastructures', icon: FlightInfrastructuresIcon },
  { id: 'missions', label: 'Missions', icon: MissionsIcon },
];

type ThemeMode = 'light' | 'dark' | 'expressive';

function MuiAppShellDemo({ themeMode: initialTheme }: { themeMode: ThemeMode }) {
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
      <h1>MUI App Shell</h1>
      <p>This is the MUI variant of the app shell.</p>
    </AppShell>
  );
}

const meta: Meta = {
  title: 'AppShell/MUI',
  component: MuiAppShellDemo,
  decorators: [
    (Story) => (
      // transform creates a new containing block that traps position:fixed
      // elements inside the Storybook canvas instead of the browser viewport
      <div
        style={{ position: 'relative', transform: 'scale(1)', height: '100vh', overflow: 'auto' }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof MuiAppShellDemo>;

export const Light: Story = {
  args: { themeMode: 'light' },
};

export const Dark: Story = {
  args: { themeMode: 'dark' },
};

export const Expressive: Story = {
  args: { themeMode: 'expressive' },
};
