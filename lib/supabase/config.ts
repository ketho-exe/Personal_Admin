import { readEnv } from "@/lib/env";

type EnvSource = Record<string, string | undefined>;

type SupabaseDemoConfig = {
  isConfigured: false;
  mode: "demo";
};

type SupabaseLiveConfig = {
  isConfigured: true;
  mode: "live";
  url: string;
  anonKey: string;
  serviceRoleKey?: string;
};

export type SupabaseConfig = SupabaseDemoConfig | SupabaseLiveConfig;

export function getSupabaseConfig(source: EnvSource = process.env): SupabaseConfig {
  const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY } =
    readEnv(source);

  if (!NEXT_PUBLIC_SUPABASE_URL || !NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return {
      isConfigured: false,
      mode: "demo"
    };
  }

  return {
    isConfigured: true,
    mode: "live",
    url: NEXT_PUBLIC_SUPABASE_URL,
    anonKey: NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceRoleKey: SUPABASE_SERVICE_ROLE_KEY
  };
}
