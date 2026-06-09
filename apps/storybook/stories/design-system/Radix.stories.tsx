import type { Meta, StoryObj } from '@storybook/react';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { AppShell } from '@wsl-ad/ui-radix/appShell';
import { Logo, FlightInfrastructuresIcon, MissionsIcon } from '@wsl-ad/app-shell';
import type { AppShellProps } from '@wsl-ad/ui-contracts';
import { buildRadixThemeProps } from '@wsl-ad/ui-radix/token-adapter';
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

function RadixDesignSystem({ themeMode }: { themeMode: 'light' | 'dark' | 'expressive' }) {
  const themeProps = buildRadixThemeProps(themeMode);
  const c = themeMode === 'dark' ? tokens.colorDark : tokens.color;

  return (
    <Theme
      appearance={themeProps.appearance}
      radius={themeProps.radius}
      accentColor="blue"
      style={
        {
          /* Override Radix Theme defaults with Solarized tokens */
          '--default-font-family': '"Rubik", sans-serif',
          '--color-text': c.onSurface,
          background: c.surface,
        } as React.CSSProperties
      }
    >
      <div
        data-theme={themeMode}
        style={{
          padding: 32,
          background: c.surface,
          minHeight: '100vh',
          fontFamily: '"Rubik", sans-serif',
          fontSize: 14,
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
          Radix — Design Tokens
        </h1>
        <p style={{ color: c.onSurfaceVariant, fontSize: 13, marginBottom: 8 }}>
          Mode: <strong>{themeMode}</strong> · Solarized Palette + M3 Roles · Almarai + Rubik
          typefaces
        </p>
        <p style={{ color: c.onSurfaceVariant, fontSize: 12, marginBottom: 32 }}>
          Radix UI uses its own <code>--color-background</code> CSS variable. This variant overrides
          it to Solarized surface values via data-attribute CSS selectors in{' '}
          <code>AppShell.css</code>.
        </p>

        {/* ── COLOR ── */}
        {sectionTitle('Color Roles (Solarized → Radix CSS vars override)')}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
          {(
            [
              ['primary', c.primary, c.onPrimary],
              ['secondary', c.secondary, c.onSecondary],
              ['tertiary', c.tertiary, c.onTertiary],
              ['surface', c.surface, c.onSurface],
              ['surfaceVariant', c.surfaceVariant, c.onSurfaceVariant],
              ['surfaceContainerLow', c.surfaceContainerLow, c.onSurface],
              ['error', c.error, c.onError],
              ['warning', c.warning, '#fdf6e3'],
              ['success', c.success, '#fdf6e3'],
            ] as [string, string, string][]
          ).map(([name, bg, fg]) => (
            <div
              key={name}
              style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 130 }}
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
            Body — Rubik 400 14px · The quick brown fox
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
            Label — Rubik 500 14px
          </p>
          <p
            style={{
              fontFamily: '"Rubik", sans-serif',
              fontSize: 12,
              fontWeight: 500,
              margin: 0,
              color: c.outline,
            }}
          >
            Small — Rubik 500 12px
          </p>
        </div>

        {/* ── EXPRESSIVE ── */}
        {themeMode === 'expressive' && (
          <>
            {sectionTitle('Expressive Gradient Header')}
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
                Gradient Topbar (via CSS selector)
              </span>
            </div>
          </>
        )}

        {/* ── OVERRIDES ── */}
        {sectionTitle('How to override per variant')}
        {code(`/* packages/ui-radix/src/appShell/AppShell.css */

/* ── Color: override Radix --color-background with Solarized values ── */
.app-shell[data-theme="light"],
.app-shell[data-theme="expressive"] {
  --color-background: #fdf6e3;   /* Solarized light surface */
}
.app-shell[data-theme="dark"] {
  --color-background: #002b36;   /* Solarized dark surface */
}

/* ── Expressive gradient topbar ── */
[data-theme="expressive"] .app-shell-topbar {
  background: linear-gradient(
    160deg,
    #268bd2 0%,
    #2aa198 35%,
    #6c71c4 65%,
    rgba(108, 113, 196, 0) 100%
  );
  border-block-end: none;
}

/* ── Typography: Radix exposes --default-font-family ── */
.app-shell {
  --default-font-family: "Rubik", sans-serif;
  --heading-font-family: "Almarai", sans-serif;
}
/* Override font-size for this variant only: */
.app-shell .app-shell-content {
  font-size: 13px; /* tighter than canonical 14px */
}

// packages/ui-radix/src/token-adapter.ts
export function buildRadixThemeProps(mode: ThemeMode) {
  return {
    appearance: mode === 'dark' ? 'dark' : 'light',
    // radius comes from expressiveOverrides when expressive:
    radius: mode === 'expressive' ? 'full' : 'medium',
  };
}`)}

        {/* ── LIVE SHELL ── */}
        {sectionTitle('Live AppShell')}
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
              Radix Shell — {themeMode}
            </h2>
            <p>Body text rendered in Rubik from the token system.</p>
          </AppShell>
        </div>
      </div>
    </Theme>
  );
}

// ─── meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof RadixDesignSystem> = {
  title: 'Design System/Radix',
  component: RadixDesignSystem,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof RadixDesignSystem>;

export const Light: Story = { args: { themeMode: 'light' } };
export const Dark: Story = { args: { themeMode: 'dark' } };
export const Expressive: Story = { args: { themeMode: 'expressive' } };
