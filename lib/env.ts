export type AppEnv = {
  NEXT_PUBLIC_SUPABASE_URL?: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
  SUPABASE_SERVICE_ROLE_KEY?: string;
};

type EnvSource = Record<string, string | undefined>;

function normalizeEnvValue(value: string | undefined) {
  const normalized = value?.trim();

  return normalized ? normalized : undefined;
}

export function readEnv(source: EnvSource = process.env): AppEnv {
  return {
    NEXT_PUBLIC_SUPABASE_URL: normalizeEnvValue(source.NEXT_PUBLIC_SUPABASE_URL),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: normalizeEnvValue(
      source.NEXT_PUBLIC_SUPABASE_ANON_KEY
    ),
    SUPABASE_SERVICE_ROLE_KEY: normalizeEnvValue(source.SUPABASE_SERVICE_ROLE_KEY)
  };
}

export const env = readEnv();
