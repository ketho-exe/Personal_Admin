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
      anonKey: "anon-key",
      serviceRoleKey: "service-role-key"
    });
  });
});
