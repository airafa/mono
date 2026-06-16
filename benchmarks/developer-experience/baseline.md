# Developer Experience Benchmark Baseline

**Recorded**: Initial scaffolding baseline
**Date**: 2026-05-31

## Measurements

These are the initial measurements taken after workspace scaffolding is complete. All measurements are from a clean state on the development machine.

| Metric                   | Target | Actual                                               | Status |
| ------------------------ | ------ | ---------------------------------------------------- | ------ |
| Cold install time        | < 60s  | TBD (run `time pnpm install`)                        | ⏳     |
| Incremental build time   | < 5s   | N/A (no build targets yet)                           | ⏳     |
| Full workspace typecheck | < 30s  | TBD (run `time pnpm typecheck`)                      | ⏳     |
| Lint full workspace      | < 15s  | TBD (run `time pnpm lint`)                           | ⏳     |
| Single package test      | < 10s  | N/A (no tests yet)                                   | ⏳     |
| Docs build               | < 30s  | TBD (run `time pnpm --filter @mono/docs build`)      | ⏳     |
| Storybook build          | < 60s  | TBD (run `time pnpm --filter @mono/storybook build`) | ⏳     |

## Notes

- Baseline measurements will be filled in during the polish phase (T032).
- All measurements should be repeated after major dependency changes.
- Results are evidence for the Benchmark Gate in the release-readiness contract.

## Next Steps

- Run each measurement command and record actual values
- Set up automated benchmark tracking if needed
- Compare against targets and adjust if necessary
