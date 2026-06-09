import type { AppShellComponent } from '@wsl-ad/ui-contracts';

export type UIVariant = 'mui' | 'mantine' | 'radix' | 'lit';
export type ThemeMode = 'light' | 'dark' | 'expressive';

const VALID_VARIANTS: ReadonlySet<string> = new Set(['mui', 'mantine', 'radix', 'lit']);
const VALID_THEMES: ReadonlySet<string> = new Set(['light', 'dark', 'expressive']);

const importMap: Record<UIVariant, () => Promise<{ AppShell: AppShellComponent }>> = {
  mui: () => import('@wsl-ad/ui-mui/appShell'),
  mantine: () => import('@wsl-ad/ui-mantine/appShell'),
  radix: () => import('@wsl-ad/ui-radix/appShell'),
  lit: () => import('@wsl-ad/ui-lit/appShell'),
};

export function getActiveVariant(): UIVariant {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get('ui');
  if (fromUrl && VALID_VARIANTS.has(fromUrl)) {
    return fromUrl as UIVariant;
  }

  const fromEnv = import.meta.env.VITE_UI_VARIANT;
  if (fromEnv && VALID_VARIANTS.has(fromEnv)) {
    return fromEnv as UIVariant;
  }

  return 'mui';
}

/**
 * Reads the `?theme=` URL parameter and returns the active theme mode.
 * Falls back to `'light'` for missing or invalid values.
 * Expressive mode is URL-param activated only — no toggle button.
 */
export function getActiveTheme(): ThemeMode {
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get('theme');
  if (fromUrl && VALID_THEMES.has(fromUrl)) {
    return fromUrl as ThemeMode;
  }
  return 'light';
}

export function loadVariant(): Promise<{ AppShell: AppShellComponent }> {
  const variant = getActiveVariant();
  return importMap[variant]();
}
