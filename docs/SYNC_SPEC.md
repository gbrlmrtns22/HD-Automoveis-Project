# Sync Specification

Source of truth rules:
- AutoCerto is the source for vehicle pricing and inventory status.
- HD Automóveis owns publication status and internal notes.

Conflict resolution:
- If AutoCerto timestamp is newer, overwrite price and availability.
- If internal update is newer, keep internal fields and log conflict.

Tracking:
- `sync_runs` stores run metadata.
- `sync_logs` stores per-entity logs with outcome and hash.
