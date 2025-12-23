# API

## Lead Quiz

### Scoring

Lead scores are calculated on submit:

- Budget >= 80,000 BRL: +30
- Budget >= 40,000 BRL: +20
- Budget < 40,000 BRL: +10
- Condition: new +25, used +15
- Contact preference: WhatsApp +15, email +10
- Trade-in: yes +10
- Urgency: within 30 days +20, 31-90 days +10, later +5

Scores map to tiers:

- 80+: hot
- 50-79: warm
- <50: cool

### Endpoints

- `POST /api/leads/submit`
  - Validates input with Zod.
  - Deduplicates by WhatsApp (E.164 normalization).
  - Encrypts sensitive fields before storage.
  - Inserts consent log entry.
  - Emits follow-up event to `lead_events_queue` table.

## Inventory Sync

- `POST /api/inventory/sync`
  - Validates admin auth.
  - Triggers sync run and returns run summary.

## Webhooks

- `POST /api/inventory/webhook`
  - Validates HMAC signature.
  - Logs event and triggers selective sync.
