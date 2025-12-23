# HD Automóveis – Modern Car Dealership Platform

## Setup
```bash
pnpm install --frozen-lockfile
pnpm dev
```

## Scripts
- `pnpm dev`: local dev server
- `pnpm build`: production build
- `pnpm start`: start production
- `pnpm test`: unit tests (Vitest run)
- `pnpm test:ci`: coverage
- `pnpm db:types`: generate Supabase types

## Env
Copy `.env.example` to the environment you need and fill in Supabase, Upstash, and AutoCerto credentials.

## Supabase
- Apply migrations: `supabase db push`
- Seed: `supabase db seed`

## Docs
See `docs/` for architecture, deployment, security, and API references.
