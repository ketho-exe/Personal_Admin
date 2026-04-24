import { readServerEnv } from "@/lib/env";
import { getSupabaseConfig } from "@/lib/supabase/config";

describe("getSupabaseConfig", () => {
  it("returns demo mode when env vars are missing", () => {
    const result = getSupabaseConfig({});

    expect(result.isConfigured).toBe(false);
    expect(result.mode).toBe("demo");
  });

  it("returns live mode when public credentials are present", () => {
    const result = getSupabaseConfig({
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon-key",
      SUPABASE_SERVICE_ROLE_KEY: "service-role-key"
    });

    expect(result).toEqual({
      isConfigured: true,
      mode: "live",
      url: "https://example.supabase.co",
      anonKey: "anon-key"
    });
  });

  it("does not expose the service role key in public config", () => {
    const result = getSupabaseConfig({
      NEXT_PUBLIC_SUPABASE_URL: "https://example.supabase.co",
      NEXT_PUBLIC_SUPABASE_ANON_KEY: "anon-key",
      SUPABASE_SERVICE_ROLE_KEY: "service-role-key"
    });

    expect(result).not.toHaveProperty("serviceRoleKey");
  });
});

describe("readServerEnv", () => {
  it("keeps the service role key on the server-only env helper", () => {
    expect(
      readServerEnv({
        SUPABASE_SERVICE_ROLE_KEY: "service-role-key"
      })
    ).toEqual({
      NEXT_PUBLIC_SUPABASE_URL: undefined,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: undefined,
      SUPABASE_SERVICE_ROLE_KEY: "service-role-key"
    });
  });
});
