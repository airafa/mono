import type { Meta, StoryObj } from '@storybook/react';
import { tokens } from '@mono/ui-tokens';

// ─── helpers ─────────────────────────────────────────────────────────────────

const swatch = (name: string, hex: string, _textColor = '#002b36') => (
  <div
    key={name}
    title={hex}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: 4,
      width: 130,
    }}
  >
    <div
      style={{
        width: '100%',
        height: 56,
        borderRadius: 8,
        background: hex,
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.10)',
      }}
    />
    <span
      style={{ fontFamily: '"Rubik", sans-serif', fontSize: 11, fontWeight: 500, color: '#002b36' }}
    >
      {name}
    </span>
    <span style={{ fontFamily: '"Rubik", sans-serif', fontSize: 10, color: '#586e75' }}>{hex}</span>
  </div>
);

const gradientSwatch = (name: string, gradient: string) => (
  <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 200 }}>
    <div
      style={{
        width: '100%',
        height: 56,
        borderRadius: 8,
        background: gradient,
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.10)',
      }}
    />
    <span
      style={{ fontFamily: '"Rubik", sans-serif', fontSize: 11, fontWeight: 500, color: '#002b36' }}
    >
      {name}
    </span>
    <span
      style={{
        fontFamily: '"Rubik", sans-serif',
        fontSize: 9,
        color: '#586e75',
        wordBreak: 'break-all',
        maxWidth: 200,
      }}
    >
      {gradient}
    </span>
  </div>
);

const section = (title: string, children: React.ReactNode) => (
  <section style={{ marginBottom: 40 }}>
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
      {title}
    </h2>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>{children}</div>
  </section>
);

// ─── components ───────────────────────────────────────────────────────────────

function LightPalette() {
  const c = tokens.color;
  return (
    <div
      style={{
        padding: 32,
        fontFamily: '"Rubik", sans-serif',
        background: c.surface,
        minHeight: '100vh',
      }}
    >
      <h1
        style={{
          fontFamily: '"Almarai", sans-serif',
          fontSize: 24,
          fontWeight: 700,
          color: c.onSurface,
          marginBottom: 8,
        }}
      >
        Solarized Light Palette
      </h1>
      <p style={{ color: c.onSurfaceVariant, marginBottom: 32, fontSize: 13 }}>
        Solarized (Ethan Schoonover) mapped to Material Design 3 semantic roles.
      </p>

      {section('Brand', [
        swatch('primary', c.primary),
        swatch('onPrimary', c.onPrimary, c.primary),
        swatch('primaryContainer', c.primaryContainer),
        swatch('onPrimaryContainer', c.onPrimaryContainer, c.primaryContainer),
      ])}

      {section('Secondary & Tertiary', [
        swatch('secondary', c.secondary),
        swatch('onSecondary', c.onSecondary, c.secondary),
        swatch('secondaryContainer', c.secondaryContainer),
        swatch('tertiary', c.tertiary),
        swatch('onTertiary', c.onTertiary, c.tertiary),
        swatch('tertiaryContainer', c.tertiaryContainer),
      ])}

      {section('Surface', [
        swatch('surface', c.surface),
        swatch('surfaceVariant', c.surfaceVariant),
        swatch('surfaceDim', c.surfaceDim),
        swatch('surfaceBright', c.surfaceBright),
        swatch('surfaceContainerLow', c.surfaceContainerLow),
        swatch('surfaceContainer', c.surfaceContainer),
        swatch('surfaceContainerHigh', c.surfaceContainerHigh),
      ])}

      {section('Content on Surface', [
        swatch('onSurface', c.onSurface),
        swatch('onSurfaceVariant', c.onSurfaceVariant),
        swatch('outline', c.outline),
        swatch('outlineVariant', c.outlineVariant),
      ])}

      {section('Inverse', [
        swatch('inverseSurface', c.inverseSurface, c.inverseOnSurface),
        swatch('inverseOnSurface', c.inverseOnSurface, c.inverseSurface),
        swatch('inversePrimary', c.inversePrimary),
      ])}

      {section('Semantic', [
        swatch('error', c.error),
        swatch('onError', c.onError, c.error),
        swatch('errorContainer', c.errorContainer),
        swatch('warning', c.warning),
        swatch('success', c.success),
        swatch('info', c.info),
      ])}
    </div>
  );
}

function DarkPalette() {
  const c = tokens.colorDark;
  return (
    <div
      style={{
        padding: 32,
        fontFamily: '"Rubik", sans-serif',
        background: c.surface,
        minHeight: '100vh',
      }}
    >
      <h1
        style={{
          fontFamily: '"Almarai", sans-serif',
          fontSize: 24,
          fontWeight: 700,
          color: c.onSurface,
          marginBottom: 8,
        }}
      >
        Solarized Dark Palette
      </h1>
      <p style={{ color: c.onSurfaceVariant, marginBottom: 32, fontSize: 13 }}>
        Solarized dark inversion — same hue as light, shifted luma.
      </p>

      {section('Brand', [
        swatch('primary', c.primary),
        swatch('onPrimary', c.onPrimary, c.primary),
        swatch('primaryContainer', c.primaryContainer, c.onPrimaryContainer),
        swatch('onPrimaryContainer', c.onPrimaryContainer, c.primaryContainer),
      ])}

      {section('Secondary & Tertiary', [
        swatch('secondary', c.secondary),
        swatch('onSecondary', c.onSecondary, c.secondary),
        swatch('secondaryContainer', c.secondaryContainer, c.onSecondaryContainer),
        swatch('tertiary', c.tertiary),
        swatch('onTertiary', c.onTertiary, c.tertiary),
      ])}

      {section('Surface', [
        swatch('surface', c.surface, c.onSurface),
        swatch('surfaceVariant', c.surfaceVariant, c.onSurfaceVariant),
        swatch('surfaceDim', c.surfaceDim, c.onSurface),
        swatch('surfaceBright', c.surfaceBright, c.onSurface),
        swatch('surfaceContainerLow', c.surfaceContainerLow, c.onSurface),
        swatch('surfaceContainer', c.surfaceContainer, c.onSurface),
        swatch('surfaceContainerHigh', c.surfaceContainerHigh, c.onSurface),
      ])}

      {section('Semantic', [
        swatch('error', c.error),
        swatch('warning', c.warning),
        swatch('success', c.success),
      ])}
    </div>
  );
}

function GradientPalette() {
  const g = tokens.gradient;
  return (
    <div
      style={{
        padding: 32,
        fontFamily: '"Rubik", sans-serif',
        background: tokens.color.surface,
        minHeight: '100vh',
      }}
    >
      <h1
        style={{
          fontFamily: '"Almarai", sans-serif',
          fontSize: 24,
          fontWeight: 700,
          color: tokens.color.onSurface,
          marginBottom: 8,
        }}
      >
        Gradient Tokens
      </h1>
      <p style={{ color: tokens.color.onSurfaceVariant, marginBottom: 32, fontSize: 13 }}>
        Gemini Visual Design Language — directional energy, radial thinking, and expressive
        surfaces.
      </p>

      {section('Brand Gradients', [
        gradientSwatch('brand.directional', g.brand.directional),
        gradientSwatch('brand.spectrum', g.brand.spectrum),
        gradientSwatch('brand.radial', g.brand.radial),
        gradientSwatch('brand.voiceWave', g.brand.voiceWave),
      ])}

      {section('Surface Gradients', [
        gradientSwatch('surface.meshLight', g.surface.meshLight),
        gradientSwatch('surface.meshDark', g.surface.meshDark),
      ])}

      {section('Expressive', [
        gradientSwatch('expressive.hero', g.expressive.hero),
        gradientSwatch('expressive.container', g.expressive.container),
        gradientSwatch('expressive.fab', g.expressive.fab),
      ])}

      {section('Semantic', [
        gradientSwatch('semantic.error', g.semantic.error),
        gradientSwatch('semantic.success', g.semantic.success),
      ])}
    </div>
  );
}

// ─── meta ─────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Design System/Color Palette',
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj;

export const Light: Story = { render: () => <LightPalette /> };
export const Dark: Story = { render: () => <DarkPalette /> };
export const Gradients: Story = { render: () => <GradientPalette /> };
