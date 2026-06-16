import { ThemeProvider, CssBaseline } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import type { AppShellProps } from '@wsl-ad/ui-contracts';
import { buildMuiTheme } from '../token-adapter.js';
import { lightThemeClass, darkThemeClass, expressiveThemeClass } from '@wsl-ad/ui-tokens';
import * as styles from './AppShell.css.js';

export function AppShell({
  logo: LogoComponent,
  navItems,
  themeMode,
  onThemeToggle,
  children,
}: AppShellProps) {
  const theme = buildMuiTheme(themeMode);
  const veClass =
    themeMode === 'dark'
      ? darkThemeClass
      : themeMode === 'expressive'
        ? expressiveThemeClass
        : lightThemeClass;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div data-testid="app-shell" data-theme={themeMode} className={`${veClass} ${styles.shell}`}>
        <header data-testid="app-shell-topbar" className={styles.topbar}>
          <LogoComponent />
          <div className={styles.toolbarGrow} />
          <Tooltip title="Toggle theme">
            <span>
              <IconButton
                onClick={themeMode === 'expressive' ? undefined : onThemeToggle}
                color="inherit"
                aria-label="Toggle theme"
                data-testid="theme-toggle"
              >
                {themeMode === 'light' ? '🌙' : '☀️'}
              </IconButton>
            </span>
          </Tooltip>
        </header>

        <aside data-testid="app-shell-sidebar" className={styles.sidebar}>
          <nav aria-label="Main navigation">
            <ul className={styles.navList}>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id} className={styles.navItem}>
                    <Tooltip title={item.label} placement="right">
                      <IconButton aria-label={item.label} className={styles.navButton}>
                        <Icon />
                      </IconButton>
                    </Tooltip>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <main data-testid="app-shell-content" className={styles.content}>
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
}
