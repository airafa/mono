/**
 * Promotion Flow Helpers
 *
 * Defines the environment promotion sequence and validates
 * that all required gates pass before promotion.
 */

import { allGates, type GateResult, type ReleaseGate } from './gates.js';

export type EnvironmentId = 'local' | 'dev-integration' | 'staging' | 'production';

const PROMOTION_ORDER: EnvironmentId[] = ['local', 'dev-integration', 'staging', 'production'];

export interface PromotionResult {
  environment: EnvironmentId;
  gates: Array<{ gate: string; result: GateResult }>;
  canPromote: boolean;
}

export function getApplicableGates(environment: EnvironmentId): ReleaseGate[] {
  return allGates.filter((gate) => gate.appliesTo.includes(environment));
}

export async function validatePromotion(environment: EnvironmentId): Promise<PromotionResult> {
  const gates = getApplicableGates(environment);
  const results: Array<{ gate: string; result: GateResult }> = [];

  for (const gate of gates) {
    const result = await gate.check();
    results.push({ gate: gate.name, result });
  }

  const canPromote = results.every((r) => r.result === 'pass' || r.result === 'skip');

  return { environment, gates: results, canPromote };
}

export function getNextEnvironment(current: EnvironmentId): EnvironmentId | null {
  const index = PROMOTION_ORDER.indexOf(current);
  if (index === -1 || index === PROMOTION_ORDER.length - 1) return null;
  return PROMOTION_ORDER[index + 1];
}
