# Assumptions

- AutoCerto integration runs in mock mode by default unless `AUTOCERTO_MODE=live`.
- Supabase project already has storage bucket `vehicle-images`.
- Admin users are managed via Supabase Auth and have `role=admin` in user metadata.
- Lead encryption key is provided via `LEAD_ENCRYPTION_KEY` and rotated manually.
