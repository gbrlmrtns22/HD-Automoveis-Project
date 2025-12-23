# Deployment

## Environments

- Development: `NODE_ENV=development`
- Staging: `NODE_ENV=staging`
- Production: `NODE_ENV=production`

Each environment uses `.env.${NODE_ENV}` files (see templates).

## Vercel

- Uses `vercel.json` build/dev/install commands.
- Configure Supabase and Upstash env vars per environment.
- Enable Vercel Analytics and Sentry release tracking.

## Docker / Hostinger

- Use `Dockerfile` and `docker-compose.yml` for container builds.
- Mount environment variables at runtime.

## Database Migrations

- Apply Supabase migrations via `supabase db push`.
- Rollbacks: each migration includes a down section with safe reversals; use `supabase db reset` in dev.

## Blue/Green

- Maintain staging and production Supabase projects.
- Use Vercel preview deployments for validation before switching traffic.
- Ensure migrations are applied to staging first, then production.
