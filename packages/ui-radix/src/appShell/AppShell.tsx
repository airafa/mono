import { Theme } from '@radix-ui/themes';
import type { AppShellProps } from '@mono/ui-contracts';
import '@radix-ui/themes/styles.css';
import './AppShell.css';
import { buildRadixThemeProps } from '../token-adapter.js';
import { lightThemeClass, darkThemeClass, expressiveThemeClass } from '@mono/ui-tokens';

export function AppShell({
  logo: LogoComponent,
  navItems,
  themeMode,
  onThemeToggle,
  children,
}: AppShellProps) {
  const themeProps = buildRadixThemeProps(themeMode);
  const veClass =
    themeMode === 'dark'
      ? darkThemeClass
      : themeMode === 'expressive'
        ? expressiveThemeClass
        : lightThemeClass;

  return (
    <Theme appearance={themeProps.appearance} radius={themeProps.radius} accentColor="blue">
      <div data-testid="app-shell" data-theme={themeMode} className={`app-shell ${veClass}`}>
        <div className="app-shell-inner">
          <header data-testid="app-shell-topbar" className="app-shell-topbar">
            <LogoComponent />
            <button
              onClick={themeMode === 'expressive' ? undefined : onThemeToggle}
              className="theme-toggle"
              aria-label="Toggle theme"
              data-testid="theme-toggle"
              type="button"
            >
              {themeMode === 'light' ? '🌙' : '☀️'}
            </button>
          </header>

          <div className="app-shell-body">
            <aside data-testid="app-shell-sidebar" className="app-shell-sidebar">
              <nav aria-label="Main navigation">
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.id} style={{ paddingInlineStart: '0.5rem' }}>
                        <button className="nav-button" aria-label={item.label} type="button">
                          <Icon />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>

            <main data-testid="app-shell-content" className="app-shell-content">
              {children}
            </main>
          </div>
        </div>
      </div>
    </Theme>
  );
}
