# Deployment

## Environments
- `.env.development`, `.env.staging`, `.env.production` are supported via `NODE_ENV`.

## Vercel
- Uses `vercel.json` defaults.
- Configure Supabase credentials and secrets in Vercel Environment Variables.

## Hostinger / Docker
- Build the container with `docker compose build`.
- Run `docker compose up -d` to start.

## Blue/Green
- Deploy staging first, verify, then promote to production (Vercel project promotion or Docker tag switch).

## Migrations
- Apply Supabase migrations via `supabase db push`.
- Rollback notes: each migration includes reverse SQL in comments where required.
