import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerEnvironment, resolveEnvironmentId } from '@wsl-ad/app-shell';
import type { EnvironmentConfig } from '@wsl-ad/app-shell';
import { App } from './App.js';

import localConfig from './config/local.js';
import devConfig from './config/dev-integration.js';
import stagingConfig from './config/staging.js';
import productionConfig from './config/production.js';

const configs: Record<string, EnvironmentConfig> = {
  local: localConfig,
  'dev-integration': devConfig,
  staging: stagingConfig,
  production: productionConfig,
};

const envId = resolveEnvironmentId();
registerEnvironment(configs[envId]);

const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
