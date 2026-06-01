import type { AppShellProps } from '@wsl-ad/app-shell';

export function AppShell({
  logo: LogoComponent,
  navItems,
  themeMode,
  onThemeToggle,
  children,
}: AppShellProps) {
  return (
    <div
      data-testid="app-shell"
      data-theme={themeMode}
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: themeMode === 'dark' ? '#1a1a2e' : '#ffffff',
        color: themeMode === 'dark' ? '#e0e0e0' : '#212529',
      }}
    >
      <header
        data-testid="app-shell-topbar"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1rem',
          height: '60px',
          borderBlockEnd: `1px solid ${themeMode === 'dark' ? '#2a2a4a' : '#dee2e6'}`,
          background: themeMode === 'dark' ? '#16213e' : '#f8f9fa',
        }}
      >
        <LogoComponent />
        <button
          onClick={onThemeToggle}
          aria-label="Toggle theme"
          type="button"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            borderRadius: '4px',
            color: 'inherit',
            fontSize: '1.25rem',
          }}
        >
          {themeMode === 'light' ? '🌙' : '☀️'}
        </button>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        <aside
          data-testid="app-shell-sidebar"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBlockStart: '0.75rem',
            width: '60px',
            borderInlineEnd: `1px solid ${themeMode === 'dark' ? '#2a2a4a' : '#dee2e6'}`,
            background: themeMode === 'dark' ? '#16213e' : '#f8f9fa',
          }}
        >
          <nav aria-label="Main navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  aria-label={item.label}
                  type="button"
                  style={{
                    marginBlockEnd: '0.5rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.5rem',
                    borderRadius: '4px',
                    color: 'inherit',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon />
                </button>
              );
            })}
          </nav>
        </aside>

        <main data-testid="app-shell-content" style={{ padding: '1.5rem', flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
