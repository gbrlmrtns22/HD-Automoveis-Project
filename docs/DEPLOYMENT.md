# Deployment

- Vercel deploy via `pnpm build`.
- Docker build compatible with Hostinger.
- Blue/green: deploy staging alias, run smoke tests, then promote to production.
- Run Supabase migrations via `supabase db push` before promotion.
