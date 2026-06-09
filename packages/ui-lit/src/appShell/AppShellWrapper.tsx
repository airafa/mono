import type { AppShellProps } from '@wsl-ad/ui-contracts';
import { getLitTokenProperties } from '../token-adapter.js';
import { lightThemeClass, darkThemeClass, expressiveThemeClass } from '@wsl-ad/ui-tokens';

export function AppShell({
  logo: LogoComponent,
  navItems,
  themeMode,
  onThemeToggle,
  children,
}: AppShellProps) {
  const cssProps = getLitTokenProperties(themeMode);
  const veClass =
    themeMode === 'dark'
      ? darkThemeClass
      : themeMode === 'expressive'
        ? expressiveThemeClass
        : lightThemeClass;

  return (
    <div
      data-testid="app-shell"
      data-theme={themeMode}
      className={veClass}
      style={{
        ...cssProps,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'var(--color-surface)',
        color: 'var(--color-on-surface)',
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
          borderBlockEnd: themeMode === 'expressive' ? 'none' : `1px solid var(--color-outline)`,
          background:
            themeMode === 'expressive'
              ? 'linear-gradient(160deg, #268bd2 0%, #2aa198 35%, #6c71c4 65%, rgba(108,113,196,0) 100%)'
              : 'var(--color-surface-variant)',
        }}
      >
        <LogoComponent />
        <button
          onClick={themeMode === 'expressive' ? undefined : onThemeToggle}
          aria-label="Toggle theme"
          data-testid="theme-toggle"
          type="button"
          style={{
            background: 'none',
            border: 'none',
            cursor: themeMode === 'expressive' ? 'default' : 'pointer',
            padding: '0.5rem',
            borderRadius: 'var(--radius-md)',
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
            paddingBlockStart: 'var(--spacing-sm)',
            width: '60px',
            borderInlineEnd: `1px solid var(--color-outline)`,
            background: 'var(--color-surface-variant)',
          }}
        >
          <nav aria-label="Main navigation">
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id} style={{ paddingInlineStart: '0.5rem' }}>
                    <button
                      aria-label={item.label}
                      type="button"
                      style={{
                        marginBlockEnd: 'var(--spacing-xs)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 'var(--spacing-xs)',
                        borderRadius: 'var(--radius-sm)',
                        color: 'inherit',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon />
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        <main data-testid="app-shell-content" style={{ padding: 'var(--spacing-lg)', flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
