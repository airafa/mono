export type EnvironmentId = 'local' | 'dev-integration' | 'staging' | 'production';

export interface EnvironmentConfig {
  id: EnvironmentId;
  name: string;
  apiBaseUrl: string;
  graphqlEndpoint: string;
  realtimeEndpoint: string;
  features: Record<string, boolean>;
}

export const environmentSchema = {
  id: { type: 'string', required: true },
  name: { type: 'string', required: true },
  apiBaseUrl: { type: 'string', required: true },
  graphqlEndpoint: { type: 'string', required: true },
  realtimeEndpoint: { type: 'string', required: true },
  features: { type: 'object', required: false },
} as const;
