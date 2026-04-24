export type PublicEnv = {
  NEXT_PUBLIC_SUPABASE_URL?: string;
  NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
};

export type ServerEnv = PublicEnv & {
  SUPABASE_SERVICE_ROLE_KEY?: string;
};

type EnvSource = Record<string, string | undefined>;

function normalizeEnvValue(value: string | undefined) {
  const normalized = value?.trim();

  return normalized ? normalized : undefined;
}

export function readPublicEnv(source: EnvSource = process.env): PublicEnv {
  return {
    NEXT_PUBLIC_SUPABASE_URL: normalizeEnvValue(source.NEXT_PUBLIC_SUPABASE_URL),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: normalizeEnvValue(source.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  };
}

export function readServerEnv(source: EnvSource = process.env): ServerEnv {
  return {
    ...readPublicEnv(source),
    SUPABASE_SERVICE_ROLE_KEY: normalizeEnvValue(source.SUPABASE_SERVICE_ROLE_KEY)
  };
}

export const publicEnv = readPublicEnv();
