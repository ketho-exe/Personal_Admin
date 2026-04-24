import fs from "node:fs";
import path from "node:path";

describe("README local setup docs", () => {
  const repoRoot = path.resolve(__dirname, "..", "..");
  const readmePath = path.join(repoRoot, "README.md");

  it("documents local development setup and Supabase environment variables", () => {
    expect(fs.existsSync(readmePath)).toBe(true);

    const readme = fs.readFileSync(readmePath, "utf8");

    expect(readme).toContain("## Local Development");
    expect(readme).toContain(".env.example");
    expect(readme).toContain(".env.local");
    expect(readme).toContain("NEXT_PUBLIC_SUPABASE_URL");
    expect(readme).toContain("NEXT_PUBLIC_SUPABASE_ANON_KEY");
    expect(readme).toMatch(/demo mode/i);
    expect(readme).toMatch(/configured supabase mode/i);
    expect(readme).toContain("npm run dev");
  });
});
