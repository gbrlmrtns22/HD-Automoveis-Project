# Sync Specification

## Source of Truth

- Vehicle pricing and availability: AutoCerto (provider) when in `real` mode.
- Vehicle metadata and custom fields (marketing copy, tags): Supabase.

## Conflict Resolution

- If provider data conflicts with local edits:
  - Availability and pricing always follow provider.
  - Descriptions, tags, and featured flags always follow Supabase.
- Conflicts are recorded in `sync_logs` with `resolution=provider|local`.

## Tracking

- `sync_runs` captures start/end timestamps, status, counts, and duration.
- `sync_logs` captures per-entity logs including hashes and conflict outcomes.
- Each vehicle stores `provider_hash` and `last_synced_at`.

## Batch Processing

- Sync uses batched fetches with exponential backoff on transient errors.
- Idempotency keys are derived from `run_id + provider_vehicle_id`.
- Partial failures do not abort the run; failures are logged and surfaced in UI.
