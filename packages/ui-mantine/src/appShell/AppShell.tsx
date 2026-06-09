import '@mantine/core/styles.css';
import { MantineProvider, ActionIcon, Tooltip } from '@mantine/core';
import type { AppShellProps } from '@wsl-ad/ui-contracts';
import { buildMantineTheme, getMantineColorScheme } from '../token-adapter.js';
import { lightThemeClass, darkThemeClass, expressiveThemeClass } from '@wsl-ad/ui-tokens';
import classes from './AppShell.module.css';

export function AppShell({
  logo: LogoComponent,
  navItems,
  themeMode,
  onThemeToggle,
  children,
}: AppShellProps) {
  const theme = buildMantineTheme(themeMode);
  const colorScheme = getMantineColorScheme(themeMode);
  const veClass =
    themeMode === 'dark'
      ? darkThemeClass
      : themeMode === 'expressive'
        ? expressiveThemeClass
        : lightThemeClass;

  return (
    <MantineProvider theme={theme} forceColorScheme={colorScheme}>
      <div data-testid="app-shell" data-theme={themeMode} className={`${classes.shell} ${veClass}`}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <header data-testid="app-shell-topbar" className={classes.topbar}>
            <LogoComponent />
            <Tooltip label="Toggle theme">
              <ActionIcon
                onClick={themeMode === 'expressive' ? undefined : onThemeToggle}
                variant="subtle"
                aria-label="Toggle theme"
                data-testid="theme-toggle"
                size="lg"
              >
                {themeMode === 'light' ? '🌙' : '☀️'}
              </ActionIcon>
            </Tooltip>
          </header>

          <div className={classes.body}>
            <aside data-testid="app-shell-sidebar" className={classes.sidebar}>
              <nav aria-label="Main navigation">
                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.id} style={{ paddingInlineStart: '0.5rem' }}>
                        <Tooltip label={item.label} position="right">
                          <ActionIcon
                            variant="subtle"
                            aria-label={item.label}
                            size="lg"
                            className={classes.navButton}
                          >
                            <Icon />
                          </ActionIcon>
                        </Tooltip>
                      </li>
                    );
                  })}
                </ul>
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
