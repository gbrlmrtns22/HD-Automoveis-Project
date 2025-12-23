# API

## POST /api/leads
Validates with `leadSchema` (`src/modules/leads/schema.ts`).

### Lead scoring
Defined in `src/modules/leads/scoring.ts`:
- Budget: `R$ 150k+` = 50, `R$ 80k - 150k` = 35, `Até R$ 80k` = 20
- Current vehicle: +10
- Consent: +5

### Deduplication
WhatsApp normalized to E.164 via `normalizeWhatsapp` and matched by `whatsapp` column.

## POST /api/inventory/sync
Triggers AutoCerto sync with rate limiting.

## POST /api/inventory/webhook
Verifies HMAC and triggers sync. Header: `x-autocerto-signature`.

## GET /api/status
Basic health endpoint for uptime checks.
