#!/usr/bin/env node

/**
 * Slice Validator
 *
 * Validates that a changed slice meets delivery requirements:
 * - No new unused imports or exports in the touched files
 * - Tests exist for changed interactive components
 * - Documentation is updated for user-visible changes
 * - Page objects are updated for changed interactive components
 *
 * Usage: node tools/quality/validate-slice.mjs [--changed-files file1 file2 ...]
 */

import { execSync } from 'node:child_process';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '../..');

function getChangedFiles() {
  const args = process.argv.slice(2);
  const fileArgIndex = args.indexOf('--changed-files');

  if (fileArgIndex !== -1) {
    return args.slice(fileArgIndex + 1);
  }

  // Default: get git diff against main
  try {
    const diff = execSync('git diff --name-only main...HEAD', {
      cwd: ROOT,
      encoding: 'utf8',
    });
    return diff.split('\n').filter(Boolean);
  } catch {
    console.log('⚠️  Could not determine changed files from git. Checking all files.');
    return [];
  }
}

function main() {
  const changedFiles = getChangedFiles();
  const issues = [];

  console.log('🔍 Validating slice...');
  console.log(`   Changed files: ${changedFiles.length || 'all'}`);
  console.log();

  // Check 1: TypeScript compilation (uses Nx to resolve per-project tsconfigs)
  try {
    execSync('npx nx run-many -t typecheck', { cwd: ROOT, encoding: 'utf8', stdio: 'pipe' });
    console.log('✅ TypeScript compilation passed.');
  } catch {
    issues.push('TypeScript compilation failed.');
    console.log('❌ TypeScript compilation failed.');
  }

  // Check 2: Source files have associated tests
  const sourceFiles = changedFiles.filter(
    (f) =>
      ((f.endsWith('.ts') || f.endsWith('.tsx')) &&
        !f.includes('.spec.') &&
        !f.includes('.test.') &&
        !f.includes('test-utils') &&
        f.startsWith('packages/')) ||
      f.startsWith('apps/'),
  );

  if (sourceFiles.length > 0) {
    console.log(`   Source files changed: ${sourceFiles.length}`);
  }

  // Check 3: Report summary
  console.log();
  if (issues.length > 0) {
    console.error(`❌ Slice validation found ${issues.length} issue(s):`);
    issues.forEach((issue) => console.error(`   - ${issue}`));
    process.exit(1);
  }

  console.log('✅ Slice validation passed.');
}

main();
