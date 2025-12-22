import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  AUTOCERTO_MODE: z.enum(['mock', 'live']).default('mock'),
  AUTOCERTO_HMAC_SECRET: z.string().min(1),
  LEAD_ENCRYPTION_KEY: z.string().min(32),
  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  SENTRY_DSN: z.string().url().optional()
});

export const env = envSchema.parse(process.env);
