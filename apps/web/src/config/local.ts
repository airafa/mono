import type { EnvironmentConfig } from '@mono/app-shell';

const config: EnvironmentConfig = {
  id: 'local',
  name: 'Local Development',
  apiBaseUrl: 'http://localhost:3000/api',
  graphqlEndpoint: 'http://localhost:3000/graphql',
  realtimeEndpoint: 'http://localhost:3000/hubs',
  features: {},
};

export default config;
