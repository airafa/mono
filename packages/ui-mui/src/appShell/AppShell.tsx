import { ThemeProvider, CssBaseline } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import type { AppShellProps } from '@wsl-ad/app-shell';
import { getTheme } from './theme.js';

export function AppShell({
  logo: LogoComponent,
  navItems,
  themeMode,
  onThemeToggle,
  children,
}: AppShellProps) {
  const theme = getTheme(themeMode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        data-testid="app-shell"
        data-theme={themeMode}
        sx={{ display: 'flex', minHeight: '100vh' }}
      >
        <AppBar
          position="fixed"
          data-testid="app-shell-topbar"
          sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <LogoComponent />
            <Box sx={{ flexGrow: 1 }} />
            <Tooltip title="Toggle theme">
              <IconButton onClick={onThemeToggle} color="inherit" aria-label="Toggle theme">
                {themeMode === 'light' ? '🌙' : '☀️'}
              </IconButton>
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
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Tooltip key={item.id} title={item.label} placement="right">
                  <IconButton aria-label={item.label} sx={{ mb: 1 }}>
                    <Icon />
                  </IconButton>
                </Tooltip>
              );
            })}
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
