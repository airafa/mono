import type { EnvironmentConfig } from '@mono/app-shell';

const config: EnvironmentConfig = {
  id: 'staging',
  name: 'Staging',
  apiBaseUrl: '', // Blocked: requires platform onboarding and compliance approval
  graphqlEndpoint: '', // Blocked: requires platform onboarding and compliance approval
  realtimeEndpoint: '', // Blocked: requires platform onboarding and compliance approval
  features: {},
};

export default config;
