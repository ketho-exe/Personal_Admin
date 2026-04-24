import { readPublicEnv } from "@/lib/env";

type EnvSource = Record<string, string | undefined>;

type SupabasePublicDemoConfig = {
  isConfigured: false;
  mode: "demo";
};

type SupabasePublicLiveConfig = {
  isConfigured: true;
  mode: "live";
  url: string;
  anonKey: string;
};

export type SupabasePublicConfig = SupabasePublicDemoConfig | SupabasePublicLiveConfig;

export function getSupabaseConfig(source: EnvSource = process.env): SupabasePublicConfig {
  const { NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } = readPublicEnv(source);

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
    anonKey: NEXT_PUBLIC_SUPABASE_ANON_KEY
  };
}
