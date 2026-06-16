import type { Meta, StoryObj } from '@storybook/react';
import { tokens } from '@mono/ui-tokens';

// ─── helpers ──────────────────────────────────────────────────────────────────

const row = (
  role: string,
  family: string,
  weight: string,
  size: string,
  lineHeight: string,
  sample: string,
) => (
  <tr key={role} style={{ borderBottom: '1px solid #eee8d5' }}>
    <td
      style={{
        padding: '12px 8px',
        fontFamily: '"Rubik", sans-serif',
        fontSize: 12,
        color: '#657b83',
        whiteSpace: 'nowrap',
      }}
    >
      {role}
    </td>
    <td
      style={{
        padding: '12px 8px',
        fontFamily: family,
        fontSize: size,
        fontWeight: weight,
        lineHeight,
        color: '#002b36',
      }}
    >
      {sample}
    </td>
    <td
      style={{
        padding: '12px 8px',
        fontFamily: '"Rubik", sans-serif',
        fontSize: 11,
        color: '#839496',
        whiteSpace: 'nowrap',
      }}
    >
      {family.replace(/"/g, '')}
    </td>
    <td
      style={{
        padding: '12px 8px',
        fontFamily: '"Rubik", sans-serif',
        fontSize: 11,
        color: '#839496',
      }}
    >
      {weight}
    </td>
    <td
      style={{
        padding: '12px 8px',
        fontFamily: '"Rubik", sans-serif',
        fontSize: 11,
        color: '#839496',
      }}
    >
      {size}
    </td>
    <td
      style={{
        padding: '12px 8px',
        fontFamily: '"Rubik", sans-serif',
        fontSize: 11,
        color: '#839496',
      }}
    >
      {lineHeight}
    </td>
  </tr>
);

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
      fontFamily: '"Rubik", monospace',
    }}
  >
    {text.trim()}
  </pre>
);

// ─── main component ───────────────────────────────────────────────────────────

function TypographyShowcase() {
  const f = tokens.font;
  const tableHeader = (
    <tr style={{ background: '#eee8d5' }}>
      {['Role', 'Preview', 'Family', 'Weight', 'Size', 'LineHeight'].map((h) => (
        <th
          key={h}
          style={{
            padding: '8px 8px',
            textAlign: 'left',
            fontFamily: '"Rubik", sans-serif',
            fontSize: 11,
            fontWeight: 600,
            color: '#586e75',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          {h}
        </th>
      ))}
    </tr>
  );

  return (
    <div
      style={{
        padding: 32,
        background: tokens.color.surface,
        minHeight: '100vh',
        fontFamily: '"Rubik", sans-serif',
      }}
    >
      {/* Title */}
      <h1
        style={{
          fontFamily: '"Almarai", sans-serif',
          fontSize: 24,
          fontWeight: 700,
          color: tokens.color.onSurface,
          marginBottom: 4,
        }}
      >
        Typography System
      </h1>
      <p style={{ color: tokens.color.onSurfaceVariant, fontSize: 13, marginBottom: 32 }}>
        <strong>Almarai</strong> — headings (Arabic+Latin, RTL/LTR) · <strong>Rubik</strong> — body,
        labels, inputs, badges (Hebrew+Latin, RTL/LTR)
      </p>

      {/* Scale table */}
      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
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
          Type Scale
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 600 }}>
            <thead>{tableHeader}</thead>
            <tbody>
              {row(
                'heading.h1',
                f.heading.h1.family,
                f.heading.h1.weight,
                f.heading.h1.size,
                f.heading.h1.lineHeight,
                'The quick brown fox',
              )}
              {row(
                'body',
                f.body.family,
                f.body.weight,
                f.body.size,
                f.body.lineHeight,
                'The quick brown fox jumps over the lazy dog',
              )}
              {row(
                'label.md',
                f.label.md.family,
                f.label.md.weight,
                f.label.md.size,
                f.label.md.lineHeight,
                'Label Medium',
              )}
              {row(
                'label.sm',
                f.label.sm.family,
                f.label.sm.weight,
                f.label.sm.size,
                f.label.sm.lineHeight,
                'Label Small',
              )}
              {row(
                'badge',
                f.badge.family,
                f.badge.weight,
                f.badge.size,
                f.badge.lineHeight,
                'BADGE 42',
              )}
              {row(
                'input.md',
                f.input.md.family,
                f.input.md.weight,
                f.input.md.size,
                f.input.md.lineHeight,
                'Input text medium',
              )}
              {row(
                'input.sm',
                f.input.sm.family,
                f.input.sm.weight,
                f.input.sm.size,
                f.input.sm.lineHeight,
                'Input text small',
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* RTL preview */}
      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
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
          RTL Preview (Hebrew + Arabic)
        </h2>
        <div
          dir="rtl"
          style={{
            background: '#fffdf6',
            border: '1px solid #eee8d5',
            borderRadius: 8,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <p
            style={{
              fontFamily: '"Almarai", sans-serif',
              fontSize: 24,
              fontWeight: 700,
              color: tokens.color.onSurface,
              margin: 0,
            }}
          >
            عنوان بالخط العربي — Almarai H1
          </p>
          <p
            style={{
              fontFamily: '"Rubik", sans-serif',
              fontSize: 14,
              color: tokens.color.onSurface,
              margin: 0,
            }}
          >
            טקסט בעברית עם גופן רוביק — Rubik body
          </p>
          <p
            style={{
              fontFamily: '"Rubik", sans-serif',
              fontSize: 14,
              color: tokens.color.onSurfaceVariant,
              margin: 0,
            }}
          >
            Mixed: English text alongside עברית and العربية in the same line.
          </p>
        </div>
      </section>

      {/* Usage guide */}
      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
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
          Usage — Token API
        </h2>
        {code(`import { tokens } from '@mono/ui-tokens';

// In any component:
const style = {
  fontFamily: tokens.font.body.family,  // '"Rubik", sans-serif'
  fontSize:   tokens.font.body.size,    // '14px'
  fontWeight: tokens.font.body.weight,  // '400'
};

// Heading:
const headingStyle = {
  fontFamily: tokens.font.heading.h1.family,  // '"Almarai", sans-serif'
  fontWeight: tokens.font.heading.h1.weight,  // '700'
  fontSize:   tokens.font.heading.h1.size,    // '24px'
};`)}
      </section>

      {/* Per-variant override guide */}
      <section style={{ marginBottom: 40 }}>
        <h2
          style={{
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
          Per-Variant Override — How To
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div>
            <h3 style={{ fontSize: 12, fontWeight: 600, color: '#268bd2', marginBottom: 8 }}>
              Mantine — via createTheme()
            </h3>
            {code(`// packages/ui-mantine/src/token-adapter.ts
import { createTheme } from '@mantine/core';
import { tokens } from '@mono/ui-tokens';

createTheme({
  fontFamily: tokens.font.body.family,        // default: Rubik
  headings: {
    fontFamily: tokens.font.heading.h1.family, // default: Almarai
    sizes: {
      h1: { fontSize: '32px' }, // ← override h1 size here
    },
  },
  // Variant-specific: add a custom font scale for dense UI
  fontSizes: {
    xs: '10px',
    sm: '12px',
    md: tokens.font.body.size,    // '14px'
    lg: '16px',
    xl: '18px',
  },
});`)}
          </div>

          <div>
            <h3 style={{ fontSize: 12, fontWeight: 600, color: '#268bd2', marginBottom: 8 }}>
              MUI — via createTheme() typography
            </h3>
            {code(`// packages/ui-mui/src/token-adapter.ts
import { createTheme } from '@mui/material/styles';
import { tokens } from '@mono/ui-tokens';

createTheme({
  typography: {
    fontFamily: tokens.font.body.family,       // Rubik
    h1: {
      fontFamily: tokens.font.heading.h1.family, // Almarai
      fontWeight: 700,
      fontSize: tokens.font.heading.h1.size,
    },
    // Override for this variant only:
    body2: {
      fontSize: '12px',  // tighter than the canonical 14px
    },
  },
});`)}
          </div>

          <div>
            <h3 style={{ fontSize: 12, fontWeight: 600, color: '#268bd2', marginBottom: 8 }}>
              Radix — via CSS custom properties
            </h3>
            {code(`/* packages/ui-radix/src/appShell/AppShell.css */

/* Radix UI uses --default-font-family and --heading-font-family */
.app-shell {
  --default-font-family: "Rubik", sans-serif;
  --heading-font-family: "Almarai", sans-serif;
}

/* Variant override — e.g. monospace code areas: */
.app-shell .code-block {
  font-family: "Roboto Mono", monospace;
  font-size: 12px;
}`)}
          </div>

          <div>
            <h3 style={{ fontSize: 12, fontWeight: 600, color: '#268bd2', marginBottom: 8 }}>
              Lit — via CSS custom properties on host
            </h3>
            {code(`// packages/ui-lit/src/token-adapter.ts
// getLitTokenProperties() injects CSS vars on the host element:
return {
  '--font-body-family':   tokens.font.body.family,        // Rubik
  '--font-heading-h1-family': tokens.font.heading.h1.family, // Almarai

  // Variant override: use a different body size
  '--font-body-size': '13px',  // narrower than canonical 14px
};

/* In the Lit shadow root CSS: */
/* styles.ts */
css\`
  :host { font-family: var(--font-body-family); }
  h1    { font-family: var(--font-heading-h1-family); }
\``)}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Design System/Typography',
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const Scale: StoryObj = { render: () => <TypographyShowcase /> };
