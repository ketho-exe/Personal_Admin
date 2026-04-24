import fs from "node:fs";
import path from "node:path";

describe("database setup docs", () => {
  const repoRoot = path.resolve(__dirname, "..", "..");
  const schemaPath = path.join(repoRoot, "supabase", "schema.sql");
  const readmePath = path.join(repoRoot, "README.md");

  it("commits the Supabase schema file", () => {
    expect(fs.existsSync(schemaPath)).toBe(true);

    const schema = fs.readFileSync(schemaPath, "utf8");

    expect(schema).toContain("-- Personal Admin Dashboard Supabase Schema");
    expect(schema).toContain("create table if not exists public.admin_items");
  });

  it("tells users to run the committed schema in Supabase", () => {
    expect(fs.existsSync(readmePath)).toBe(true);

    const readme = fs.readFileSync(readmePath, "utf8");

    expect(readme).toContain("supabase/schema.sql");
    expect(readme).toMatch(/run it in (your )?supabase/i);
    expect(readme).toMatch(/sql editor/i);
  });
});
