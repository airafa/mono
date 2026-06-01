import '@mantine/core/styles.css';
import { MantineProvider, ActionIcon, Tooltip } from '@mantine/core';
import type { AppShellProps } from '@wsl-ad/app-shell';
import { theme } from './theme.js';
import classes from './AppShell.module.css';

export function AppShell({
  logo: LogoComponent,
  navItems,
  themeMode,
  onThemeToggle,
  children,
}: AppShellProps) {
  return (
    <MantineProvider theme={theme} forceColorScheme={themeMode}>
      <div data-testid="app-shell" data-theme={themeMode} className={classes.shell}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <header data-testid="app-shell-topbar" className={classes.topbar}>
            <LogoComponent />
            <Tooltip label="Toggle theme">
              <ActionIcon
                onClick={onThemeToggle}
                variant="subtle"
                aria-label="Toggle theme"
                size="lg"
              >
                {themeMode === 'light' ? '🌙' : '☀️'}
              </ActionIcon>
            </Tooltip>
          </header>

          <div className={classes.body}>
            <aside data-testid="app-shell-sidebar" className={classes.sidebar}>
              <nav aria-label="Main navigation">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Tooltip key={item.id} label={item.label} position="right">
                      <ActionIcon
                        variant="subtle"
                        aria-label={item.label}
                        size="lg"
                        className={classes.navButton}
                      >
                        <Icon />
                      </ActionIcon>
                    </Tooltip>
                  );
                })}
              </nav>
            </aside>

            <main data-testid="app-shell-content" className={classes.content}>
              {children}
            </main>
          </div>
        </div>
      </div>
    </MantineProvider>
  );
}
