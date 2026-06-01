#!/usr/bin/env node

/**
 * Release Gate Validator
 *
 * Runs all applicable release gates for a target environment
 * and reports pass/fail/skip status.
 *
 * Usage: node tools/release/validate-release-gates.mjs [--env local|dev-integration|staging|production]
 */

import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const args = process.argv.slice(2);
const envIndex = args.indexOf('--env');
const targetEnv = envIndex !== -1 ? args[envIndex + 1] : 'local';

const validEnvs = ['local', 'dev-integration', 'staging', 'production'];
if (!validEnvs.includes(targetEnv)) {
  console.error(`❌ Invalid environment: ${targetEnv}`);
  console.error(`   Valid environments: ${validEnvs.join(', ')}`);
  process.exit(1);
}

console.log(`🔍 Validating release gates for: ${targetEnv}`);
console.log();

function runCommand(cmd) {
  try {
    execSync(cmd, { stdio: 'pipe', timeout: 120_000 });
    return true;
  } catch {
    return false;
  }
}

const gates = [
  {
    name: 'Quality Gate',
    appliesTo: ['dev-integration', 'staging', 'production'],
    check: () => {
      const lint = runCommand(
        'pnpm --filter "@wsl-ad/ui-*" --filter @wsl-ad/app-shell --filter @wsl-ad/web lint',
      );
      const typecheck = runCommand(
        'pnpm --filter "@wsl-ad/ui-*" --filter @wsl-ad/app-shell --filter @wsl-ad/web typecheck',
      );
      const test = runCommand('pnpm --filter "@wsl-ad/ui-*" --filter @wsl-ad/web test');
      return lint && typecheck && test ? 'pass' : 'fail';
    },
  },
  {
    name: 'Documentation Gate',
    appliesTo: ['dev-integration', 'staging', 'production'],
    check: () => {
      return existsSync('apps/docs/docs/design-system/app-shell.md') ? 'pass' : 'fail';
    },
  },
  {
    name: 'Dead Code Gate',
    appliesTo: ['dev-integration', 'staging', 'production'],
    check: () => {
      return runCommand('node tools/quality/unused-exports.mjs') ? 'pass' : 'fail';
    },
  },
  {
    name: 'Platform Readiness Gate',
    appliesTo: ['dev-integration', 'staging', 'production'],
    status: 'skip',
  },
  {
    name: 'Contract Readiness Gate',
    appliesTo: ['dev-integration', 'staging', 'production'],
    status: 'skip',
  },
  {
    name: 'Compliance Gate',
    appliesTo: ['staging', 'production'],
    status: 'skip',
  },
  {
    name: 'Secrets Gate',
    appliesTo: ['dev-integration', 'staging', 'production'],
    status: 'skip',
  },
  {
    name: 'Benchmark Gate',
    appliesTo: ['dev-integration', 'staging', 'production'],
    check: () => {
      return existsSync('benchmarks/rendering/appshell-benchmark.md') ? 'pass' : 'fail';
    },
  },
];

const applicable = gates.filter((g) => g.appliesTo.includes(targetEnv));

if (applicable.length === 0) {
  console.log(`   No gates apply to ${targetEnv}.`);
  console.log('✅ Release validation passed.');
  process.exit(0);
}

let passed = 0;
let skipped = 0;
let failed = 0;

for (const gate of applicable) {
  const status = gate.check ? gate.check() : gate.status || 'skip';
  const icon = status === 'pass' ? '✅' : status === 'skip' ? '⏭️' : '❌';
  console.log(`   ${icon} ${gate.name}: ${status}`);

  if (status === 'pass') passed++;
  else if (status === 'skip') skipped++;
  else failed++;
}

console.log();
console.log(`   Passed: ${passed} | Skipped: ${skipped} | Failed: ${failed}`);
console.log();

if (failed > 0) {
  console.log(`❌ Release validation failed for ${targetEnv}.`);
  process.exit(1);
} else {
  console.log(`✅ Release validation passed for ${targetEnv} (${skipped} gate(s) skipped).`);
}
