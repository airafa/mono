import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AppShell } from '@mono/ui-mui/appShell';
import { Logo, FlightInfrastructuresIcon, MissionsIcon } from '@mono/app-shell';
import type { AppShellProps } from '@mono/ui-contracts';
import { buildMuiTheme } from '@mono/ui-mui/token-adapter';
import { tokens } from '@mono/ui-tokens';

// ─── helpers ──────────────────────────────────────────────────────────────────

const navItems: AppShellProps['navItems'] = [
  { id: 'flight-infra', label: 'Flight Infrastructures', icon: FlightInfrastructuresIcon },
  { id: 'missions', label: 'Missions', icon: MissionsIcon },
];

const code = (text: string) => (
  <pre
    style={{
      background: '#073642',
      color: '#93a1a1',
      padding: 16,
      borderRadius: 8,
      fontSize: 12,
      lineHeight: 1.6,
      overflow: 'auto',
      fontFamily: 'monospace',
      margin: '0 0 24px',
    }}
  >
    {text.trim()}
  </pre>
);

const sectionTitle = (t: string) => (
  <h2
    style={{
      fontFamily: '"Rubik", sans-serif',
      fontSize: 13,
      fontWeight: 600,
      color: '#657b83',
      textTransform: 'uppercase' as const,
      letterSpacing: '0.08em',
      marginBottom: 16,
      borderBottom: '1px solid #eee8d5',
      paddingBottom: 8,
    }}
  >
    {t}
  </h2>
);

// ─── Component ────────────────────────────────────────────────────────────────

function MuiDesignSystem({ themeMode }: { themeMode: 'light' | 'dark' | 'expressive' }) {
  const muiTheme = buildMuiTheme(themeMode);
  const c = themeMode === 'dark' ? tokens.colorDark : tokens.color;

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <div
        style={{
          padding: 32,
          background: c.surface,
          minHeight: '100vh',
          fontFamily: '"Rubik", sans-serif',
          color: c.onSurface,
        }}
      >
        <h1
          style={{
            fontFamily: '"Almarai", sans-serif',
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          MUI — Design Tokens
        </h1>
        <p style={{ color: c.onSurfaceVariant, fontSize: 13, marginBottom: 32 }}>
          Mode: <strong>{themeMode}</strong> · Solarized Palette + M3 Roles · Almarai + Rubik
          typefaces
        </p>

        {/* ── COLOR ── */}
        {sectionTitle('Color Roles (live MUI palette)')}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
          {(
            [
              [
                'primary.main',
                muiTheme.palette.primary.main,
                muiTheme.palette.primary.contrastText,
              ],
              [
                'secondary.main',
                muiTheme.palette.secondary.main,
                muiTheme.palette.secondary.contrastText,
              ],
              ['error.main', muiTheme.palette.error.main, muiTheme.palette.error.contrastText],
              ['background.default', muiTheme.palette.background.default, c.onSurface],
              ['background.paper', muiTheme.palette.background.paper, c.onSurface],
              ['text.primary', muiTheme.palette.text.primary, c.surface],
              ['divider', muiTheme.palette.divider, c.onSurface],
            ] as [string, string, string][]
          ).map(([name, bg, fg]) => (
            <div
              key={name}
              style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 140 }}
            >
              <div
                style={{
                  height: 48,
                  borderRadius: 8,
                  background: bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(0,0,0,0.06)',
                }}
              >
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 600,
                    color: fg,
                    fontFamily: '"Rubik", sans-serif',
                    padding: '0 4px',
                    textAlign: 'center',
                    wordBreak: 'break-all',
                  }}
                >
                  {bg}
                </span>
              </div>
              <span style={{ fontSize: 11, color: c.onSurfaceVariant }}>{name}</span>
            </div>
          ))}
        </div>

        {/* ── TYPOGRAPHY ── */}
        {sectionTitle('Typography Scale (MUI theme.typography)')}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            marginBottom: 32,
            padding: 20,
            background: c.surfaceContainerLow,
            borderRadius: 8,
          }}
        >
          <p style={{ ...muiTheme.typography.h1, margin: 0, color: c.onSurface }}>
            H1 — Almarai 700 {tokens.font.heading.h1.size}
          </p>
          <p style={{ ...muiTheme.typography.body1, margin: 0, color: c.onSurface }}>
            Body1 — Rubik 400 · The quick brown fox jumps over the lazy dog
          </p>
          <p style={{ ...muiTheme.typography.body2, margin: 0, color: c.onSurfaceVariant }}>
            Body2 — Rubik 400 · Secondary body text
          </p>
        </div>

        {/* ── EXPRESSIVE PREVIEW ── */}
        {themeMode === 'expressive' && (
          <>
            {sectionTitle('Expressive AppBar Gradient')}
            <div
              style={{
                height: 60,
                borderRadius: 8,
                background:
                  'linear-gradient(160deg, #268bd2 0%, #2aa198 35%, #6c71c4 65%, rgba(108,113,196,0) 100%)',
                marginBottom: 24,
                display: 'flex',
                alignItems: 'center',
                padding: '0 16px',
              }}
            >
              <span
                style={{ color: '#fdf6e3', fontFamily: '"Almarai", sans-serif', fontWeight: 700 }}
              >
                Gradient AppBar
              </span>
            </div>
          </>
        )}

        {/* ── OVERRIDES ── */}
        {sectionTitle('How to override per variant')}
        {code(`// packages/ui-mui/src/token-adapter.ts
import { createTheme } from '@mui/material/styles';
import { tokens } from '@mono/ui-tokens';

createTheme({
  // ── Font override ─────────────────────────────────────────────
  typography: {
    fontFamily: tokens.font.body.family,         // '"Rubik", sans-serif'
    h1: {
      fontFamily: tokens.font.heading.h1.family, // '"Almarai", sans-serif'
      fontWeight: parseInt(tokens.font.heading.h1.weight, 10),
      fontSize: '32px',  // ← override just for this variant
    },
    body2: {
      fontSize: '12px',  // ← tighter than canonical 14px
    },
  },

  // ── Color override ────────────────────────────────────────────
  palette: {
    primary:    { main: tokens.color.primary, contrastText: tokens.color.onPrimary },
    secondary:  { main: tokens.color.secondary },
    background: {
      default: tokens.color.surface,          // '#fdf6e3' Solarized cream
      paper:   tokens.color.surfaceContainer, // '#eee8d5'
    },
    text: {
      primary:   tokens.color.onSurface,
      secondary: tokens.color.onSurfaceVariant,
    },
    divider: tokens.color.outline,
  },
});`)}

        {/* ── LIVE SHELL ── */}
        {sectionTitle('Live AppShell')}
        {/* transform creates a containing block that traps position:fixed inside this box */}
        <div
          style={{
            position: 'relative',
            transform: 'scale(1)',
            height: 500,
            overflow: 'hidden',
            borderRadius: 8,
            border: '1px solid rgba(0,0,0,0.1)',
          }}
        >
          <AppShell logo={Logo} navItems={navItems} themeMode={themeMode} onThemeToggle={() => {}}>
            <h2 style={{ fontFamily: '"Almarai", sans-serif', fontWeight: 700 }}>
              MUI Shell — {themeMode}
            </h2>
            <p>Body text rendered in Rubik from the token system.</p>
          </AppShell>
        </div>
      </div>
    </ThemeProvider>
  );
}

// ─── meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof MuiDesignSystem> = {
  title: 'Design System/MUI',
  component: MuiDesignSystem,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof MuiDesignSystem>;

export const Light: Story = { args: { themeMode: 'light' } };
export const Dark: Story = { args: { themeMode: 'dark' } };
export const Expressive: Story = { args: { themeMode: 'expressive' } };
