import type { Meta, StoryObj } from '@storybook/react';
import { AppShell } from '@mono/ui-lit/appShell';
import { Logo, FlightInfrastructuresIcon, MissionsIcon } from '@mono/app-shell';
import type { AppShellProps } from '@mono/ui-contracts';
import { getLitTokenProperties } from '@mono/ui-lit/token-adapter';
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

function LitDesignSystem({ themeMode }: { themeMode: 'light' | 'dark' | 'expressive' }) {
  const cssProps = getLitTokenProperties(themeMode);
  const c = themeMode === 'dark' ? tokens.colorDark : tokens.color;

  return (
    <div
      style={{
        ...cssProps,
        padding: 32,
        background: c.surface,
        minHeight: '100vh',
        fontFamily: 'var(--font-body-family, "Rubik", sans-serif)',
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
        Lit — Design Tokens
      </h1>
      <p style={{ color: c.onSurfaceVariant, fontSize: 13, marginBottom: 8 }}>
        Mode: <strong>{themeMode}</strong> · Solarized Palette + M3 Roles · Almarai + Rubik
        typefaces
      </p>
      <p style={{ color: c.onSurfaceVariant, fontSize: 12, marginBottom: 32 }}>
        Lit uses <strong>CSS custom properties</strong> injected on the host element (no MUI/Mantine
        theme provider). All token values arrive as <code>--token-name</code> CSS vars via{' '}
        <code>getLitTokenProperties()</code>.
      </p>

      {/* ── COLOR ── */}
      {sectionTitle('Color Roles (injected as CSS vars on host)')}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
        {(
          [
            ['--color-primary', cssProps['--color-primary'], cssProps['--color-on-primary']],
            ['--color-secondary', cssProps['--color-secondary'], cssProps['--color-on-secondary']],
            ['--color-tertiary', cssProps['--color-tertiary']],
            ['--color-surface', cssProps['--color-surface'], cssProps['--color-on-surface']],
            [
              '--color-surface-variant',
              cssProps['--color-surface-variant'],
              cssProps['--color-on-surface-variant'],
            ],
            ['--color-on-surface', cssProps['--color-on-surface'], cssProps['--color-surface']],
            ['--color-outline', cssProps['--color-outline'], cssProps['--color-surface']],
            ['--color-error', cssProps['--color-error']],
          ] as [string, string, string?][]
        ).map(([name, bg, fg]) => (
          <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 150 }}>
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
                  color: fg ?? c.onSurface,
                  fontFamily: '"Rubik", sans-serif',
                  padding: '0 4px',
                  textAlign: 'center',
                  wordBreak: 'break-all',
                }}
              >
                {bg}
              </span>
            </div>
            <span style={{ fontSize: 10, color: c.onSurfaceVariant, wordBreak: 'break-all' }}>
              {name}
            </span>
          </div>
        ))}
      </div>

      {/* ── TYPOGRAPHY ── */}
      {sectionTitle('Typography Scale (via CSS vars)')}
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
            fontFamily: 'var(--font-heading-h1-family)',
            fontSize: 'var(--font-heading-h1-size)',
            fontWeight: 'var(--font-heading-h1-weight)' as string,
            margin: 0,
            color: c.onSurface,
          }}
        >
          H1 — var(--font-heading-h1-family) Almarai 700
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body-family)',
            fontSize: 'var(--font-body-size)',
            fontWeight: 'var(--font-body-weight)' as string,
            margin: 0,
            color: c.onSurface,
          }}
        >
          Body — var(--font-body-family) Rubik 400 · The quick brown fox jumps over the lazy dog
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body-family)',
            fontSize: 12,
            fontWeight: 500,
            margin: 0,
            color: c.onSurfaceVariant,
          }}
        >
          Label — Rubik 500 12px · uses --font-body-family
        </p>
      </div>

      {/* ── RADIUS SCALE ── */}
      {sectionTitle(
        `Radius Scale ${themeMode === 'expressive' ? '(expressive overrides active)' : ''}`,
      )}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
        {(['xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((key) => {
          const val = cssProps[`--radius-${key}`];
          return (
            <div
              key={key}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  background: c.primaryContainer,
                  borderRadius: val,
                  border: `1px solid ${c.outline}`,
                }}
              />
              <span style={{ fontSize: 11, color: c.onSurfaceVariant }}>{key}</span>
              <span style={{ fontSize: 10, color: c.outline }}>{val}</span>
            </div>
          );
        })}
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
              Gradient Header (inline style)
            </span>
          </div>
        </>
      )}

      {/* ── OVERRIDES ── */}
      {sectionTitle('How to override per variant')}
      {code(`// packages/ui-lit/src/token-adapter.ts
import { tokens, expressiveOverrides } from '@mono/ui-tokens';

export function getLitTokenProperties(mode: ThemeMode): CssPropertyMap {
  const color = mode === 'dark' ? tokens.colorDark : tokens.color;
  const isExpressive = mode === 'expressive';

  return {
    // ── Color override ─────────────────────────────────────────────────
    '--color-primary':         color.primary,      // '#268bd2'
    '--color-surface':         color.surface,      // '#fdf6e3' Solarized cream
    '--color-surface-variant': color.surfaceVariant,

    // ── Font override ──────────────────────────────────────────────────
    '--font-body-family':           tokens.font.body.family,        // Rubik
    '--font-heading-h1-family':     tokens.font.heading.h1.family,  // Almarai
    '--font-body-size':             '13px',   // ← override for this variant

    // ── Radius override (expressive uses heavier rounding) ─────────────
    '--radius-md': isExpressive ? expressiveOverrides.radius.md : tokens.radius.md,
    '--radius-lg': isExpressive ? expressiveOverrides.radius.lg : tokens.radius.lg,
    '--radius-xl': isExpressive ? expressiveOverrides.radius.xl : tokens.radius.xl,
    '--radius-2xl': isExpressive ? expressiveOverrides.radius['2xl'] : tokens.radius['2xl'],
  };
}

// AppShellWrapper.tsx — header uses inline background:
// background: isExpressive
//   ? 'linear-gradient(160deg, #268bd2 0%, #2aa198 35%, ...)'
//   : 'var(--color-surface-variant)'`)}

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
            Lit Shell — {themeMode}
          </h2>
          <p>Body text rendered via CSS custom properties from the token adapter.</p>
        </AppShell>
      </div>
    </div>
  );
}

// ─── meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof LitDesignSystem> = {
  title: 'Design System/Lit',
  component: LitDesignSystem,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof LitDesignSystem>;

export const Light: Story = { args: { themeMode: 'light' } };
export const Dark: Story = { args: { themeMode: 'dark' } };
export const Expressive: Story = { args: { themeMode: 'expressive' } };
