import { Theme } from '@radix-ui/themes';
import type { AppShellProps } from '@wsl-ad/app-shell';
import '@radix-ui/themes/styles.css';
import './AppShell.css';

export function AppShell({
  logo: LogoComponent,
  navItems,
  themeMode,
  onThemeToggle,
  children,
}: AppShellProps) {
  return (
    <Theme appearance={themeMode}>
      <div data-testid="app-shell" data-theme={themeMode} className="app-shell">
        <div className="app-shell-inner">
          <header data-testid="app-shell-topbar" className="app-shell-topbar">
            <LogoComponent />
            <button
              onClick={onThemeToggle}
              className="theme-toggle"
              aria-label="Toggle theme"
              type="button"
            >
              {themeMode === 'light' ? '🌙' : '☀️'}
            </button>
          </header>

          <div className="app-shell-body">
            <aside data-testid="app-shell-sidebar" className="app-shell-sidebar">
              <nav aria-label="Main navigation">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      className="nav-button"
                      aria-label={item.label}
                      type="button"
                    >
                      <Icon />
                    </button>
                  );
                })}
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
