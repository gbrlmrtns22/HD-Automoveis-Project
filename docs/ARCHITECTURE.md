# Architecture

## Layers
- **UI**: `src/app`, `src/components` (RSC with minimal client components).
- **Domain**: `src/modules/*` for inventory, leads, admin.
- **Data access**: `src/lib/supabase`, `src/lib/rate-limit`, `src/lib/crypto`.
- **Integrations**: AutoCerto provider interface in `src/modules/inventory/providers/autocerto`.

## Realtime
- Supabase Realtime subscriptions can be added in `src/modules/inventory/hooks` (client) using `createSupabaseBrowserClient`.

## Typed contracts
- Zod schemas in `src/modules/**/schema.ts` validate API payloads.
- Supabase types are generated with `pnpm db:types` into `src/types/supabase.ts`.
