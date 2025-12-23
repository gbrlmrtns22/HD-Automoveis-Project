# Assumptions

- AutoCerto production endpoints are not yet available, therefore a mock provider is used by default with `AUTOCERTO_MODE=mock`.
- Lead encryption uses AES-256-GCM with a base64 32-byte key supplied in `LEAD_ENCRYPTION_KEY`.
- Admin authentication uses Supabase Magic Links; admin RBAC is enforced by RLS policies and role claims.
- n8n consumes lead events from the `lead_events` table (mocked in memory when Supabase is not configured).
