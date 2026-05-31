export type GapSeverity = 'low' | 'medium' | 'high' | 'critical';
export type GapState = 'open' | 'in-progress' | 'resolved' | 'accepted-risk';

export interface ReadinessGap {
  id: string;
  capabilityId: string;
  environmentId: string;
  description: string;
  severity: GapSeverity;
  impact: string;
  mitigation: string;
  state: GapState;
}

export const readinessGaps: ReadinessGap[] = [
  {
    id: 'G-001',
    capabilityId: 'ci-cd',
    environmentId: 'dev-integration',
    description: 'CI/CD pipeline not onboarded for this repository',
    severity: 'high',
    impact: 'Cannot automate builds or tests beyond local development',
    mitigation: 'Confirm platform ownership and onboarding path',
    state: 'open',
  },
  {
    id: 'G-002',
    capabilityId: 'secrets-management',
    environmentId: 'dev-integration',
    description: 'Secrets management system and onboarding flow not confirmed',
    severity: 'high',
    impact: 'Cannot configure API keys or credentials for integration testing',
    mitigation: 'Confirm secrets platform and project onboarding',
    state: 'open',
  },
  {
    id: 'G-003',
    capabilityId: 'compliance',
    environmentId: 'staging',
    description: 'No compliance owner or formal regime identified',
    severity: 'critical',
    impact: 'Staging and production promotion blocked',
    mitigation: 'Name compliance owner and confirm applicable controls',
    state: 'open',
  },
  {
    id: 'G-004',
    capabilityId: 'observability',
    environmentId: 'dev-integration',
    description: 'Observability baseline unconfirmed for this project',
    severity: 'medium',
    impact: 'Cannot monitor application health in deployed environments',
    mitigation: 'Confirm logging, metrics, tracing, and alert routing with platform team',
    state: 'open',
  },
];
