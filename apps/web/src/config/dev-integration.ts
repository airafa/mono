import type { EnvironmentConfig } from '@wsl-ad/app-shell';

const config: EnvironmentConfig = {
  id: 'dev-integration',
  name: 'Dev / Integration',
  apiBaseUrl: '', // Blocked: requires platform onboarding
  graphqlEndpoint: '', // Blocked: requires platform onboarding
  realtimeEndpoint: '', // Blocked: requires platform onboarding
  features: {},
};

export default config;
