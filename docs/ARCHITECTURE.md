# Architecture

HD Automóveis is organized around domain modules and shared infrastructure.

## Layers

- **UI**: Next.js App Router pages and shared components in `src/app` and `src/components`.
- **Domain Modules**: `src/modules/*` for inventory, leads, and admin features.
- **Data Access**: Supabase clients and server utilities in `src/lib`.
- **Integrations**: External providers (AutoCerto) under `src/modules/inventory/providers`.

## Module Boundaries

- `inventory`: vehicle catalog, sync engine, realtime updates.
- `leads`: quiz flows, dedupe, consent logging, n8n integration.
- `admin`: dashboards, bulk actions, audit logging.

## Runtime

- Server actions and route handlers validate input via Zod.
- RSC is preferred; client components are isolated and dynamically imported where heavy.
- Supabase Realtime subscriptions are used for admin and inventory updates.

## Security

- RLS enforced in Supabase migrations.
- CSP headers are configured via middleware.
- Rate limiting and webhook signature validation on sensitive routes.
