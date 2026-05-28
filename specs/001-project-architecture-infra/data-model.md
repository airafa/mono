# Data Model: Project Architecture And Infrastructure Baseline

## Entities

### Architecture Domain

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Stable identifier for the domain |
| `name` | string | Human-readable domain name |
| `domainType` | enum | `app`, `package`, `integration`, `documentation`, or `platform-boundary` |
| `purpose` | string | Why this domain exists |
| `responsibilities` | string[] | Behaviors or concerns owned by the domain |
| `boundaries` | string[] | What the domain must not own |
| `ownerId` | string | Reference to the operational owner |
| `dependsOn` | string[] | Referenced dependencies or other domains |

### Infrastructure Capability

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Stable identifier for the capability |
| `name` | string | Capability name |
| `category` | enum | `source-control`, `delivery`, `artifact`, `secrets`, `observability`, `hosting`, `network`, `access`, `compliance`, or `supporting-service` |
| `purpose` | string | Why the capability is needed |
| `criticality` | enum | `mvp`, `post-mvp`, or `future-scale` |
| `ownerId` | string | Product team, platform team, or shared owner |
| `environments` | string[] | Environment identifiers where the capability applies |
| `readinessState` | enum | `available`, `needs-setup`, or `blocked` |
| `blockingImpact` | string | Delivery impact when not ready |
| `dependencies` | string[] | Other capabilities or external dependencies |
| `evidence` | string[] | Links or references proving readiness |

### Environment

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Stable identifier such as `local` or `staging` |
| `name` | string | Human-readable environment name |
| `purpose` | string | Delivery, validation, or operations goal |
| `promotionFrom` | string | Upstream environment, if any |
| `ownerId` | string | Operational owner |
| `requiredCapabilities` | string[] | Capability identifiers required in this environment |
| `releaseGateIds` | string[] | Release gates that apply here |

### Dependency

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Stable identifier |
| `sourceId` | string | Originating domain or capability |
| `targetId` | string | Target domain, capability, or external service |
| `dependencyType` | enum | `build`, `runtime`, `platform`, `documentation`, `compliance`, or `external-service` |
| `ownerId` | string | Accountable owner |
| `impact` | string | What breaks or stalls if missing |
| `status` | enum | `known`, `at-risk`, or `blocked` |

### Readiness Gap

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Stable identifier |
| `capabilityId` | string | Related infrastructure capability |
| `environmentId` | string | Environment where the gap appears |
| `description` | string | What is missing or unclear |
| `severity` | enum | `low`, `medium`, `high`, or `critical` |
| `impact` | string | Delivery, release, or compliance effect |
| `mitigation` | string | Planned mitigation or owner action |
| `state` | enum | `open`, `in-progress`, `resolved`, or `accepted-risk` |

### Operational Owner

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Stable owner identifier |
| `name` | string | Team or role name |
| `ownerType` | enum | `product-team`, `platform-team`, `backend-team`, or `shared` |
| `scope` | string[] | Capabilities or domains owned |
| `escalationPath` | string | Default escalation route |

### Release Gate

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Stable gate identifier |
| `name` | string | Gate name |
| `environmentId` | string | Environment where the gate applies |
| `criteria` | string[] | Conditions that must pass |
| `evidence` | string[] | Artifacts or checks used as proof |
| `approverId` | string | Approving owner |
| `blocking` | boolean | Whether failure blocks promotion |

### Compliance Constraint

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Stable identifier |
| `name` | string | Constraint name |
| `description` | string | Required rule or obligation |
| `appliesTo` | string[] | Related domains, environments, or capabilities |
| `ownerId` | string | Accountable owner |
| `evidenceRequired` | string[] | Audit or release evidence |
| `status` | enum | `defined`, `pending-input`, or `approved` |

## Relationships

- An `Architecture Domain` is owned by one `Operational Owner` and may depend on many `Dependencies`.
- An `Infrastructure Capability` is owned by one `Operational Owner`, spans one or more `Environments`, and may create one or more `Readiness Gaps`.
- An `Environment` requires multiple `Infrastructure Capabilities` and enforces multiple `Release Gates`.
- A `Dependency` can connect domains to capabilities, domains to external services, or capabilities to platform-owned services.
- A `Compliance Constraint` can apply to domains, capabilities, environments, or release gates.

## Validation Rules

- Every infrastructure capability must have exactly one readiness state.
- Every capability marked `blocked` must have at least one readiness gap with `high` or `critical` severity.
- Every environment must reference at least one release gate.
- Every release gate must name an approver and at least one evidence artifact.
- Every compliance constraint affecting release must be in `defined` or `approved` state before implementation tasks are created.
- Every domain and capability must have an explicit owner.

## State Transitions

### Infrastructure Capability Readiness

`needs-setup` -> `available`

`needs-setup` -> `blocked`

`blocked` -> `needs-setup`

`blocked` -> `available`

### Readiness Gap Lifecycle

`open` -> `in-progress` -> `resolved`

`open` -> `accepted-risk`

`in-progress` -> `accepted-risk`

## Derived Views

- Capability readiness matrix by environment
- Owner-to-capability responsibility map
- Dependency graph from apps to shared packages to external services
- Release gate checklist by environment
- Open blocker list for MVP kickoff