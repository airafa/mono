import type { EnvironmentConfig } from '@wsl-ad/app-shell';

const config: EnvironmentConfig = {
  id: 'production',
  name: 'Production',
  apiBaseUrl: '', // Blocked: requires full release-gate approval
  graphqlEndpoint: '', // Blocked: requires full release-gate approval
  realtimeEndpoint: '', // Blocked: requires full release-gate approval
  features: {},
};

export default config;
