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

// --- VE Theme Class baseline stories (visual regression) ---
// Inspect the shell root in DevTools → Elements to see the CSS custom properties
// set by each Vanilla Extract theme class (lightThemeClass / darkThemeClass / expressiveThemeClass).

/** lightThemeClass applied — Solarized light base, M3 color roles */
export const VeLightTheme: Story = {
  name: 'VE: Light Theme Class',
  args: { themeMode: 'light' },
};

/** darkThemeClass applied — Solarized dark inversion */
export const VeDarkTheme: Story = {
  name: 'VE: Dark Theme Class',
  args: { themeMode: 'dark' },
};

/** expressiveThemeClass applied — Gemini gradient surfaces, heavy rounding, kinetic motion */
export const VeExpressiveTheme: Story = {
  name: 'VE: Expressive Theme Class',
  args: { themeMode: 'expressive' },
};
