# Sync Spec

## Source of Truth
- AutoCerto is treated as the source of truth for inventory data.
- Local edits are allowed, but next sync overwrites fields from AutoCerto unless marked `local_override` (future extension).

## Conflict Resolution
- Conflict = same vehicle id with newer `updated_at` in AutoCerto. AutoCerto wins.
- Local-only vehicles are preserved but marked `published=false` until resolved.

## Cursors & Versions
- The sync cursor is stored per run; each vehicle update stores `updated_at`.
- `sync_runs` and `sync_logs` capture the outcome, duration, and errors.

## Batching & Idempotency
- Batch size: 50 vehicles per page.
- Idempotency key: `sync_run_id + vehicle_id` (implicit via upsert).
- Retry policy: exponential backoff (1s, 2s, 4s) for provider and DB operations.

## Partial Failures
- Failed batches are logged; the sync run is marked `partial`.
