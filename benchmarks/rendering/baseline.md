# Rendering Benchmark Baseline

**Recorded**: 2025-07-14
**Status**: Initial app shell benchmark complete

## Measurements

Initial bundle size measurements for the 4 app shell framework variants are recorded in [appshell-benchmark.md](./appshell-benchmark.md).

### Summary

| Variant | JS Gzip Size |
| ------- | ------------ |
| Lit     | 0.74 kB      |
| Radix   | 9.82 kB      |
| Mantine | 24.60 kB     |
| MUI     | 53.44 kB     |

## Next Steps

- Record Lighthouse FCP/LCP metrics per variant
- Measure theme toggle latency (time to repaint)
- Add component-level rendering benchmarks for ui-list, ui-forms
- Configure Vitest bench for microbenchmarks
