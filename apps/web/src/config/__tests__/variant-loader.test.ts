// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('variant-loader', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  function setSearch(search: string) {
    Object.defineProperty(window, 'location', {
      value: { search },
      writable: true,
      configurable: true,
    });
  }

  async function loadModule() {
    return import('../variant-loader.js');
  }

  it('returns variant from ?ui= query param', async () => {
    setSearch('?ui=radix');
    vi.stubEnv('VITE_UI_VARIANT', '');
    const { getActiveVariant } = await loadModule();
    expect(getActiveVariant()).toBe('radix');
  });

  it('falls back to env when ?ui= is missing', async () => {
    setSearch('');
    vi.stubEnv('VITE_UI_VARIANT', 'mantine');
    const { getActiveVariant } = await loadModule();
    expect(getActiveVariant()).toBe('mantine');
  });

  it('falls back to mui when both are missing', async () => {
    setSearch('');
    vi.stubEnv('VITE_UI_VARIANT', '');
    const { getActiveVariant } = await loadModule();
    expect(getActiveVariant()).toBe('mui');
  });

  it('falls back to env when ?ui= has invalid value', async () => {
    setSearch('?ui=invalid');
    vi.stubEnv('VITE_UI_VARIANT', 'lit');
    const { getActiveVariant } = await loadModule();
    expect(getActiveVariant()).toBe('lit');
  });

  it('falls back to mui when both have invalid values', async () => {
    setSearch('?ui=unknown');
    vi.stubEnv('VITE_UI_VARIANT', 'unknown');
    const { getActiveVariant } = await loadModule();
    expect(getActiveVariant()).toBe('mui');
  });
});
