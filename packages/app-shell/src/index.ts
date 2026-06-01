/**
 * @wsl-ad/app-shell
 *
 * Application framing, shared navigation, environment configuration,
 * and platform capability management.
 */

export type { AppShellNavItem, AppShellProps, AppShellComponent } from './contracts/app-shell.js';

export type { EnvironmentConfig, EnvironmentId } from './config/environment-schema.js';
export { environmentSchema } from './config/environment-schema.js';

export {
  resolveEnvironmentId,
  registerEnvironment,
  resolveEnvironment,
} from './config/resolve-environment.js';

export type {
  Criticality,
  ReadinessState,
  CapabilityCategory,
  PlatformCapability,
} from './platform/capabilities.js';
export { capabilities } from './platform/capabilities.js';

export type { GapSeverity, GapState, ReadinessGap } from './platform/readiness-gaps.js';
export { readinessGaps } from './platform/readiness-gaps.js';

export { Logo } from './components/Logo.js';
export { FlightInfrastructuresIcon, MissionsIcon } from './components/NavIcons.js';
