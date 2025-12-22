# Security

- CSP headers enforced via middleware.
- Sensitive lead fields encrypted using AES-256-GCM with `LEAD_ENCRYPTION_KEY`.
- Supabase RLS enabled on all tables.
- Rate limiting for auth and lead endpoints via Upstash.
- Auto-purge leads after 24 months scheduled via Supabase cron.
