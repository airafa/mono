import { describe, it, expect, beforeEach } from 'vitest';
import {
  resolveEnvironmentId,
  registerEnvironment,
  resolveEnvironment,
} from '../config/resolve-environment.js';
import type { EnvironmentConfig } from '../config/environment-schema.js';

describe('resolveEnvironmentId', () => {
  beforeEach(() => {
    delete (globalThis as Record<string, unknown>).__WSL_AD_ENV__;
  });

  it('defaults to local when no env is set', () => {
    expect(resolveEnvironmentId()).toBe('local');
  });

  it('returns the env from globalThis when valid', () => {
    (globalThis as Record<string, unknown>).__WSL_AD_ENV__ = 'staging';
    expect(resolveEnvironmentId()).toBe('staging');
  });

  it('falls back to local for an invalid env value', () => {
    (globalThis as Record<string, unknown>).__WSL_AD_ENV__ = 'invalid';
    expect(resolveEnvironmentId()).toBe('local');
  });
});

describe('registerEnvironment / resolveEnvironment', () => {
  const mockConfig: EnvironmentConfig = {
    id: 'local',
    name: 'Local Development',
    apiBaseUrl: 'http://localhost:3000/api',
    graphqlEndpoint: 'http://localhost:3000/graphql',
    realtimeEndpoint: 'http://localhost:3000/hubs',
    features: {},
  };

  beforeEach(() => {
    delete (globalThis as Record<string, unknown>).__WSL_AD_ENV__;
  });

  it('resolves a registered environment config', () => {
    registerEnvironment(mockConfig);
    expect(resolveEnvironment()).toEqual(mockConfig);
  });

  it('throws when environment is not registered', () => {
    (globalThis as Record<string, unknown>).__WSL_AD_ENV__ = 'staging';
    expect(() => resolveEnvironment()).toThrow('Environment "staging" is not registered');
  });
});
