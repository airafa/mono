#!/usr/bin/env node

/**
 * Lighthouse Benchmark Runner
 *
 * Runs Lighthouse audits for each UI variant and outputs a summary table.
 *
 * Usage:
 *   pnpm lighthouse                           # Runs against http://localhost:4173
 *   pnpm lighthouse --url http://localhost:5173
 *   pnpm lighthouse --variant mui             # Run for a single variant
 *
 * Prerequisites: The web dev server must be running.
 */

import { execFileSync, execSync } from 'node:child_process';
import { mkdirSync, existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

// Use Playwright's Chromium if available, otherwise fall back to system Chrome
function findChromePath() {
  try {
    const pw = execSync(
      'node -e "const {chromium}=require(\'playwright\');console.log(chromium.executablePath())"',
      {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe'],
      },
    ).trim();
    if (pw && existsSync(pw)) return pw;
  } catch {
    /* ignore */
  }
  return undefined;
}

const chromePath = process.env.CHROME_PATH || findChromePath();
if (chromePath) process.env.CHROME_PATH = chromePath;

const VALID_VARIANTS = ['mui', 'mantine', 'radix', 'lit'];

const args = process.argv.slice(2);
const urlIndex = args.indexOf('--url');
const rawUrl = urlIndex !== -1 ? args[urlIndex + 1] : 'http://localhost:4173';
const variantIndex = args.indexOf('--variant');
const rawVariant = variantIndex !== -1 ? args[variantIndex + 1] : null;

// Validate URL to prevent injection
let baseUrl;
try {
  const parsed = new URL(rawUrl);
  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw new Error(`Unsupported protocol: ${parsed.protocol}`);
  }
  baseUrl = parsed.href.replace(/\/$/, '');
} catch (err) {
  console.error(`❌ Invalid URL: ${rawUrl} (${err.message})`);
  process.exit(1);
}

// Validate variant against whitelist
if (rawVariant && !VALID_VARIANTS.includes(rawVariant)) {
  console.error(`❌ Invalid variant: ${rawVariant}. Valid: ${VALID_VARIANTS.join(', ')}`);
  process.exit(1);
}

const variants = rawVariant ? [rawVariant] : VALID_VARIANTS;
const outDir = path.resolve('benchmarks/rendering/lighthouse');

if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true });
}

console.log(`🔦 Running Lighthouse benchmarks against ${baseUrl}`);
console.log(`   Variants: ${variants.join(', ')}`);
console.log(`   Output: ${outDir}/`);
if (chromePath) console.log(`   Chrome: ${chromePath}`);
console.log();

const results = [];

for (const variant of variants) {
  const url = `${baseUrl}/?ui=${variant}`;
  const outputPath = path.join(outDir, variant);

  console.log(`   ▶ ${variant}...`);

  try {
    const chromeFlags = '--headless=new --no-sandbox --disable-gpu';
    execFileSync(
      'pnpm',
      [
        'exec',
        'lighthouse',
        url,
        `--chrome-flags=${chromeFlags}`,
        '--output=json',
        '--output=html',
        `--output-path=${outputPath}`,
        '--quiet',
      ],
      { stdio: 'pipe', timeout: 120_000 },
    );

    // Parse JSON output for scores
    const reportPath = `${outputPath}.report.json`;
    const json = JSON.parse(readFileSync(reportPath, 'utf-8'));
    const scores = {
      variant,
      performance: Math.round((json.categories?.performance?.score ?? 0) * 100),
      accessibility: Math.round((json.categories?.accessibility?.score ?? 0) * 100),
      bestPractices: Math.round((json.categories?.['best-practices']?.score ?? 0) * 100),
      seo: Math.round((json.categories?.seo?.score ?? 0) * 100),
      fcp: json.audits?.['first-contentful-paint']?.displayValue ?? '—',
      lcp: json.audits?.['largest-contentful-paint']?.displayValue ?? '—',
    };
    results.push(scores);
    console.log(
      `     Performance: ${scores.performance} | FCP: ${scores.fcp} | LCP: ${scores.lcp}`,
    );
  } catch (err) {
    console.error(`     ❌ Failed for ${variant}: ${err.message?.split('\n')[0]}`);
    results.push({
      variant,
      performance: 'ERR',
      accessibility: 'ERR',
      bestPractices: 'ERR',
      seo: 'ERR',
      fcp: 'ERR',
      lcp: 'ERR',
    });
  }
}

console.log();
console.log('## Lighthouse Results Summary');
console.log();
console.log('| Variant | Performance | Accessibility | Best Practices | SEO | FCP | LCP |');
console.log('|---------|-------------|---------------|----------------|-----|-----|-----|');
for (const r of results) {
  console.log(
    `| ${r.variant} | ${r.performance} | ${r.accessibility} | ${r.bestPractices} | ${r.seo} | ${r.fcp} | ${r.lcp} |`,
  );
}
console.log();
console.log(`HTML reports saved to ${outDir}/`);
