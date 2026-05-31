# Realtime Benchmarks

## Purpose

Measure and track realtime transport performance for SignalR and GraphQL subscription surfaces.

## Metrics

| Metric                   | Target        | Measurement Method |
| ------------------------ | ------------- | ------------------ |
| Message delivery latency | < 200ms p95   | Custom harness     |
| Reconnection time        | < 2s          | Custom harness     |
| Stale event detection    | 100% accuracy | Integration test   |
| Message throughput       | > 100 msg/s   | Load harness       |

## Baseline

No baseline measurements recorded yet. Record baseline after realtime transport contracts are delivered by backend owners.

## Running Benchmarks

```bash
# When benchmark suite is implemented:
# pnpm --filter @wsl-ad/benchmarks-realtime test
```

## Evidence Requirements

Per the constitution, realtime transport decisions must be backed by benchmark data. Payload ordering, reconnect behavior, and stale event handling must be documented before implementation.
