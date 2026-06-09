import { Component, lazy, Suspense, useCallback, useState } from 'react';
import type { ReactNode } from 'react';
import type { AppShellProps } from '@wsl-ad/ui-contracts';
import { Logo, FlightInfrastructuresIcon, MissionsIcon } from '@wsl-ad/app-shell';
import { getActiveVariant, getActiveTheme, loadVariant } from './config/variant-loader.js';

class VariantErrorBoundary extends Component<{ children: ReactNode }, { error: Error | null }> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div role="alert" style={{ padding: '2rem', fontFamily: 'system-ui' }}>
          <h1>Failed to load UI variant</h1>
          <p>
            Could not load the <strong>{getActiveVariant()}</strong> variant.
          </p>
          <pre style={{ color: 'red' }}>{this.state.error.message}</pre>
          <button onClick={() => window.location.reload()}>Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}

const LazyAppShell = lazy(() => loadVariant().then((m) => ({ default: m.AppShell })));

const navItems: AppShellProps['navItems'] = [
  { id: 'flight-infra', label: 'Flight Infrastructures', icon: FlightInfrastructuresIcon },
  { id: 'missions', label: 'Missions', icon: MissionsIcon },
];

export function App() {
  const [themeMode, setThemeMode] = useState<'light' | 'dark' | 'expressive'>(getActiveTheme());
  const toggleTheme = useCallback(() => {
    // expressive is URL-param only — toggle cycles light ↔ dark only
    setThemeMode((prev) => {
      if (prev === 'expressive') return prev;
      return prev === 'light' ? 'dark' : 'light';
    });
  }, []);

  return (
    <VariantErrorBoundary>
      <Suspense fallback={<div>Loading {getActiveVariant()} variant…</div>}>
        <LazyAppShell
          logo={Logo}
          navItems={navItems}
          themeMode={themeMode}
          onThemeToggle={toggleTheme}
        >
          <h1>WSL-AD</h1>
          <p>Active UI variant: {getActiveVariant()}</p>
        </LazyAppShell>
      </Suspense>
    </VariantErrorBoundary>
  );
}
