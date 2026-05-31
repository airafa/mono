export type Criticality = 'mvp' | 'post-mvp' | 'future-scale';

export type ReadinessState = 'available' | 'needs-setup' | 'blocked';

export type CapabilityCategory =
  | 'source-control'
  | 'delivery'
  | 'artifact'
  | 'secrets'
  | 'observability'
  | 'hosting'
  | 'network'
  | 'access'
  | 'compliance'
  | 'supporting-service';

export interface PlatformCapability {
  id: string;
  name: string;
  category: CapabilityCategory;
  criticality: Criticality;
  owner: string;
  environments: Record<string, ReadinessState>;
  blockingImpact: string;
}

export const capabilities: PlatformCapability[] = [
  {
    id: 'source-control',
    name: 'Source Control Workflow',
    category: 'source-control',
    criticality: 'mvp',
    owner: 'product-team',
    environments: {
      local: 'available',
      'dev-integration': 'available',
      staging: 'available',
      production: 'available',
    },
    blockingImpact: 'Cannot collaborate on code changes',
  },
  {
    id: 'ci-cd',
    name: 'CI/CD Baseline',
    category: 'delivery',
    criticality: 'mvp',
    owner: 'platform-team',
    environments: {
      local: 'available',
      'dev-integration': 'needs-setup',
      staging: 'needs-setup',
      production: 'needs-setup',
    },
    blockingImpact: 'Cannot automate builds, tests, or deployments',
  },
  {
    id: 'artifact-management',
    name: 'Artifact Management',
    category: 'artifact',
    criticality: 'mvp',
    owner: 'platform-team',
    environments: {
      local: 'available',
      'dev-integration': 'needs-setup',
      staging: 'needs-setup',
      production: 'needs-setup',
    },
    blockingImpact: 'Cannot publish or consume build artifacts',
  },
  {
    id: 'secrets-management',
    name: 'Secrets Management',
    category: 'secrets',
    criticality: 'mvp',
    owner: 'platform-team',
    environments: {
      local: 'needs-setup',
      'dev-integration': 'needs-setup',
      staging: 'needs-setup',
      production: 'needs-setup',
    },
    blockingImpact: 'Cannot manage API keys, tokens, or credentials for non-local integrations',
  },
  {
    id: 'observability',
    name: 'Observability Baseline',
    category: 'observability',
    criticality: 'post-mvp',
    owner: 'platform-team',
    environments: {
      local: 'needs-setup',
      'dev-integration': 'needs-setup',
      staging: 'needs-setup',
      production: 'needs-setup',
    },
    blockingImpact:
      'Cannot monitor application health, performance, or errors in deployed environments',
  },
  {
    id: 'hosting',
    name: 'Hosting Baseline',
    category: 'hosting',
    criticality: 'mvp',
    owner: 'platform-team',
    environments: {
      local: 'available',
      'dev-integration': 'needs-setup',
      staging: 'needs-setup',
      production: 'needs-setup',
    },
    blockingImpact: 'Cannot deploy applications to target environments',
  },
  {
    id: 'networking',
    name: 'Networking and Access Control',
    category: 'network',
    criticality: 'mvp',
    owner: 'platform-team',
    environments: {
      local: 'available',
      'dev-integration': 'needs-setup',
      staging: 'needs-setup',
      production: 'needs-setup',
    },
    blockingImpact: 'Cannot reach backend services or manage access policies',
  },
  {
    id: 'compliance',
    name: 'Compliance Controls',
    category: 'compliance',
    criticality: 'post-mvp',
    owner: 'shared',
    environments: {
      local: 'needs-setup',
      'dev-integration': 'needs-setup',
      staging: 'blocked',
      production: 'blocked',
    },
    blockingImpact: 'Cannot promote to staging or production without compliance approval',
  },
];
