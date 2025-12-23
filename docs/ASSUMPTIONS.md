# Assumptions

- The AutoCerto provider API endpoints and credentials are not available in this environment; the application defaults to `AUTOCERTO_MODE=mock` and uses a deterministic mock provider for end-to-end flows.
- Supabase project URLs and keys are supplied at deploy time through environment variables; local development uses a local Supabase instance or the provided `SUPABASE_*` env templates.
- Inventory sync runs from a scheduled job or manual admin trigger; in this repository, the sync runner is invoked via a Next.js route handler.
- Vehicle images are stored in the `vehicle-images` Supabase Storage bucket with public read access for published vehicles.
- The lead quiz includes essential qualification steps (budget, preferred model, condition, contact), and the scoring logic is documented in `docs/API.md`.
- Admin users are provisioned via Supabase Auth (Magic Links) and assigned the `admin` role through a `user_metadata.role` attribute.
