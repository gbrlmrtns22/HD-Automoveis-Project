import { createBrowserClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

export const supabaseBrowserClient = () =>
  createBrowserClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
