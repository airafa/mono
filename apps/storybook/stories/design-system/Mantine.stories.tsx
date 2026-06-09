import type { Meta, StoryObj } from '@storybook/react';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { AppShell } from '@wsl-ad/ui-mantine/appShell';
import { Logo, FlightInfrastructuresIcon, MissionsIcon } from '@wsl-ad/app-shell';
import type { AppShellProps } from '@wsl-ad/ui-contracts';
import { buildMantineTheme } from '@wsl-ad/ui-mantine/token-adapter';
import { tokens } from '@wsl-ad/ui-tokens';

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
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginBottom: 16,
      borderBottom: '1px solid #eee8d5',
      paddingBottom: 8,
    }}
  >
    {t}
  </h2>
);

// ─── Color + Typography Showcase ─────────────────────────────────────────────

function MantineDesignSystem({ themeMode }: { themeMode: 'light' | 'dark' | 'expressive' }) {
  const theme = buildMantineTheme(themeMode);
  const c = themeMode === 'dark' ? tokens.colorDark : tokens.color;

  return (
    <MantineProvider theme={theme} forceColorScheme={themeMode === 'dark' ? 'dark' : 'light'}>
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
          Mantine — Design Tokens
        </h1>
        <p style={{ color: c.onSurfaceVariant, fontSize: 13, marginBottom: 32 }}>
          Mode: <strong>{themeMode}</strong> · Solarized Palette + M3 Roles · Almarai + Rubik
          typefaces
        </p>

        {/* ── COLOR ── */}
        {sectionTitle('Color Roles (live Mantine CSS vars)')}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
          {(
            [
              ['primary', c.primary, c.onPrimary],
              ['secondary', c.secondary, c.onSecondary],
              ['tertiary', c.tertiary, c.onTertiary],
              ['surface', c.surface, c.onSurface],
              ['surfaceVariant', c.surfaceVariant, c.onSurfaceVariant],
              ['error', c.error, c.onError],
              ['warning', c.warning, '#fdf6e3'],
              ['success', c.success, '#fdf6e3'],
            ] as [string, string, string][]
          ).map(([name, bg, fg]) => (
            <div
              key={name}
              style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 120 }}
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
                    fontSize: 10,
                    fontWeight: 600,
                    color: fg,
                    fontFamily: '"Rubik", sans-serif',
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
        {sectionTitle('Typography Scale')}
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
          <p
            style={{
              fontFamily: '"Almarai", sans-serif',
              fontSize: 24,
              fontWeight: 700,
              margin: 0,
              color: c.onSurface,
            }}
          >
            H1 — Almarai 700 24px
          </p>
          <p
            style={{
              fontFamily: '"Rubik", sans-serif',
              fontSize: 14,
              fontWeight: 400,
              margin: 0,
              color: c.onSurface,
            }}
          >
            Body — Rubik 400 14px · The quick brown fox jumps over the lazy dog
          </p>
          <p
            style={{
              fontFamily: '"Rubik", sans-serif',
              fontSize: 14,
              fontWeight: 500,
              margin: 0,
              color: c.onSurfaceVariant,
            }}
          >
            Label Medium — Rubik 500 14px
          </p>
          <p
            style={{
              fontFamily: '"Rubik", sans-serif',
              fontSize: 12,
              fontWeight: 500,
              margin: 0,
              color: c.onSurfaceVariant,
            }}
          >
            Label Small — Rubik 500 12px
          </p>
          <p
            style={{
              fontFamily: '"Rubik", sans-serif',
              fontSize: 13,
              fontWeight: 500,
              margin: 0,
              color: c.outline,
            }}
          >
            Badge — Rubik 500 13px · STATUS
          </p>
        </div>

        {/* ── EXPRESSIVE PREVIEW ── */}
        {themeMode === 'expressive' && (
          <>
            {sectionTitle('Expressive Gradient Header Preview')}
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
                Gradient Topbar
              </span>
            </div>
          </>
        )}

        {/* ── OVERRIDES ── */}
        {sectionTitle('How to override per variant')}
        {code(`// packages/ui-mantine/src/token-adapter.ts
import { createTheme } from '@mantine/core';
import { tokens } from '@wsl-ad/ui-tokens';

export function buildMantineTheme(mode: ThemeMode): MantineThemeOverride {
  return createTheme({
    // ── Font override ─────────────────────────────────────────────
    fontFamily: tokens.font.body.family,      // '"Rubik", sans-serif'
    headings: {
      fontFamily: tokens.font.heading.h1.family, // '"Almarai", sans-serif'
      sizes: {
        h1: { fontSize: '32px' }, // ← bump h1 for this variant only
      },
    },
    fontSizes: {
      xs: '10px', sm: '12px',
      md: tokens.font.body.size, lg: '16px', xl: '18px',
    },

    // ── Color override ────────────────────────────────────────────
    // 'white' drives --mantine-color-body in light mode
    white: tokens.color.surface,              // '#fdf6e3' (Solarized cream)
    black: tokens.color.inverseSurface,       // '#002b36'

    // Override Mantine's dark palette for dark mode body:
    colors: {
      dark: [
        tokens.colorDark.onSurface,           // [0] text
        tokens.colorDark.onSurfaceVariant,    // [1]
        tokens.colorDark.outline,             // [2]
        tokens.colorDark.outlineVariant,      // [3]
        tokens.colorDark.surfaceContainerHigh,// [4]
        tokens.colorDark.surfaceContainer,    // [5]
        tokens.colorDark.surfaceContainerLow, // [6]
        tokens.colorDark.surface,             // [7] ← body bg (#002b36)
        tokens.colorDark.inverseSurface,      // [8]
        tokens.colorDark.inverseOnSurface,    // [9]
      ],
    },
  });
}`)}

        {/* ── LIVE SHELL ── */}
        {sectionTitle('Live AppShell')}
        <AppShell logo={Logo} navItems={navItems} themeMode={themeMode} onThemeToggle={() => {}}>
          <h2 style={{ fontFamily: '"Almarai", sans-serif', fontWeight: 700 }}>
            Mantine Shell — {themeMode}
          </h2>
          <p>Body text rendered in Rubik from the token system.</p>
        </AppShell>
      </div>
    </MantineProvider>
  );
}

// ─── meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof MantineDesignSystem> = {
  title: 'Design System/Mantine',
  component: MantineDesignSystem,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof MantineDesignSystem>;

export const Light: Story = { args: { themeMode: 'light' } };
export const Dark: Story = { args: { themeMode: 'dark' } };
export const Expressive: Story = { args: { themeMode: 'expressive' } };
