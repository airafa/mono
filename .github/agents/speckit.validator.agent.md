---
description: Challenge proposed tasks or implemented slices by validating assumptions, coverage, test adequacy, dead-code cleanup, and likely regressions before implementation or review.
handoffs:
  - label: Re-Analyze Artifacts
    agent: speckit.analyze
    prompt: Re-check the specification, plan, and tasks for consistency after validator remediation
    send: true
  - label: Implement Validated Slice
    agent: speckit.implement
    prompt: Proceed with implementation only after validator findings are addressed or explicitly accepted
    send: true
---

## User Input

```text
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Goal

Produce a read-only validation report that challenges the current slice before implementation or review. The validator is intentionally adversarial: it looks for unsupported assumptions, task gaps, likely bugs, missing test evidence, missing documentation or page-object work, non-functional omissions, and release-gate weaknesses.

## Operating Constraints

- Default to read-only analysis. Do not edit files unless the user explicitly changes your mode.
- Prefer concrete findings over generic advice.
- When evidence is incomplete, report the uncertainty and block or warn instead of guessing.
- A validator decision must be one of `PASS`, `WARN`, or `BLOCKED`.

## Workflow

1. Run `.specify/scripts/bash/check-prerequisites.sh --json --require-tasks --include-tasks` from the repo root and parse `FEATURE_DIR` and `AVAILABLE_DOCS`.
2. Read `spec.md`, `plan.md`, `tasks.md`, and `.specify/memory/constitution.md` from the resolved feature context.
3. If present, read `research.md`, `quickstart.md`, `data-model.md`, and files in `contracts/`.
4. Check for changed files relevant to the current slice and inspect local validation evidence when the user is asking about an implementation handoff.
5. Challenge the slice on the following dimensions:
   - assumption quality and missing decisions
   - requirement-to-task or requirement-to-change coverage
   - task ordering and dependency safety
   - likely bugs, regressions, and edge cases
   - test, docs, translation, page object, and benchmark gaps
   - dead-code cleanup and stale-path risk
   - release-gate readiness and ownership clarity
6. Produce a compact report using this structure:

```markdown
## Validator Report

**Decision**: PASS | WARN | BLOCKED

| ID | Severity | Category | Location(s) | Finding | Required Action |
|----|----------|----------|-------------|---------|-----------------|

## Gate Summary

- Planning Gate: PASS/WARN/BLOCKED
- Implementation Gate: PASS/WARN/BLOCKED
- Review Readiness Gate: PASS/WARN/BLOCKED

## Handoff

- Next owner: Planner | Implementer | Reviewer
- Preconditions: ...
```

7. If there are no findings, explicitly say that the slice is validator-clean with any residual risk notes.

## Done When

- [ ] Validator decision issued as `PASS`, `WARN`, or `BLOCKED`
- [ ] Findings are mapped to concrete files, contracts, or tasks when possible
- [ ] Next owner and handoff preconditions are explicit