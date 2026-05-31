import type { EnvironmentConfig, EnvironmentId } from './environment-schema.js';

const VALID_ENVIRONMENTS: readonly EnvironmentId[] = [
  'local',
  'dev-integration',
  'staging',
  'production',
];

export function resolveEnvironmentId(): EnvironmentId {
  const env =
    (typeof globalThis !== 'undefined' &&
      ((globalThis as Record<string, unknown>).__WSL_AD_ENV__ as string)) ||
    'local';
  if (VALID_ENVIRONMENTS.includes(env as EnvironmentId)) return env as EnvironmentId;
  return 'local';
}

/**
 * Registry for environment configurations.
 * Apps register their configs at startup; the resolver looks them up by ID.
 */
const registry = new Map<EnvironmentId, EnvironmentConfig>();

export function registerEnvironment(config: EnvironmentConfig): void {
  registry.set(config.id, config);
}

export function resolveEnvironment(): EnvironmentConfig {
  const id = resolveEnvironmentId();
  const config = registry.get(id);
  if (!config) {
    throw new Error(
      `Environment "${id}" is not registered. Call registerEnvironment() at app startup.`,
    );
  }
  return config;
}
