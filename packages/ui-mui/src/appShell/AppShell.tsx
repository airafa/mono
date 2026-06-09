import { ThemeProvider, CssBaseline } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import type { AppShellProps } from '@wsl-ad/ui-contracts';
import { buildMuiTheme } from '../token-adapter.js';
import { lightThemeClass, darkThemeClass, expressiveThemeClass } from '@wsl-ad/ui-tokens';

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
      <Box
        data-testid="app-shell"
        data-theme={themeMode}
        className={veClass}
        sx={{ display: 'flex', minHeight: '100vh' }}
      >
        <AppBar
          position="fixed"
          data-testid="app-shell-topbar"
          sx={{
            zIndex: (t) => t.zIndex.drawer + 1,
            ...(themeMode === 'expressive' && {
              background:
                'linear-gradient(160deg, #268bd2 0%, #2aa198 35%, #6c71c4 65%, rgba(108,113,196,0) 100%)',
              boxShadow: 'none',
            }),
          }}
        >
          <Toolbar>
            <LogoComponent />
            <Box sx={{ flexGrow: 1 }} />
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
          </Toolbar>
        </AppBar>

        <Box
          component="aside"
          data-testid="app-shell-sidebar"
          sx={{
            width: 60,
            flexShrink: 0,
            position: 'fixed',
            top: 64,
            insetInlineStart: 0,
            bottom: 0,
            borderInlineEnd: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: 2,
            bgcolor: 'background.paper',
          }}
        >
          <nav aria-label="Main navigation">
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id} style={{ paddingInlineStart: '0.5rem' }}>
                    <Tooltip title={item.label} placement="right">
                      <IconButton aria-label={item.label} sx={{ mb: 1 }}>
                        <Icon />
                      </IconButton>
                    </Tooltip>
                  </li>
                );
              })}
            </ul>
          </nav>
        </Box>

        <Box
          component="main"
          data-testid="app-shell-content"
          sx={{
            flexGrow: 1,
            marginInlineStart: '60px',
            marginTop: '64px',
            p: 3,
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
