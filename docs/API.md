# API

## Lead scoring

Scoring is computed in `src/modules/leads/lib/scoring.ts`:

- Budget: até-50k (10), 50-100k (20), 100-200k (30), 200k+ (40)
- Usage: urbano (15), familia (20), viagem (25), trabalho (10)
- Trade-in: sim (10), nao (5)
- Base bonus: +10

Score tiers:
- `alto`: >= 70
- `medio`: 40-69
- `baixo`: < 40

## Endpoints

- `POST /api/leads`: validates payload, rate limits, encrypts WhatsApp, persists.
- `POST /api/webhooks/autocerto`: verifies HMAC signature.
- `GET /api/status`: basic health check.
