# Security

## Encryption
- Sensitive lead fields are encrypted with AES-256-GCM in `src/lib/crypto.ts`.
- Supply a base64 32-byte key via `LEAD_ENCRYPTION_KEY`.

## RLS
- All tables have RLS enabled.
- Public can read published vehicles.
- Admin role has full access.
- Leads insert handled via service role (server only).

## Rate limiting
- Lead submission and sync triggers use Upstash rate limiting when configured.

## CSP
- CSP headers are configured in `middleware.ts`.

## Data retention
- Leads are purged after 24 months via scheduled job (Supabase cron) documented in migration comments.
