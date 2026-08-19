/*
# Create resumes table (single-tenant, no auth)

1. New Tables
- `resumes`
  - `id` (uuid, primary key)
  - `title` (text, not null) — user-given name for the resume, e.g. "Software Engineer Resume"
  - `template` (text, not null, default 'modern') — which template to render with
  - `accent_color` (text, default '#4F46E5') — hex color for template accent
  - `data` (jsonb, not null) — full resume payload: personal info, summary, experience, education, skills, projects, certifications
  - `created_at` (timestamptz, default now)
  - `updated_at` (timestamptz, default now)

2. Security
- Enable RLS on `resumes`.
- Allow anon + authenticated full CRUD because the app is intentionally public/shared (no sign-in screen).
*/

CREATE TABLE IF NOT EXISTS resumes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT 'Untitled Resume',
  template text NOT NULL DEFAULT 'modern',
  accent_color text NOT NULL DEFAULT '#4F46E5',
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_resumes" ON resumes;
CREATE POLICY "anon_select_resumes" ON resumes FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_resumes" ON resumes;
CREATE POLICY "anon_insert_resumes" ON resumes FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_resumes" ON resumes;
CREATE POLICY "anon_update_resumes" ON resumes FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_resumes" ON resumes;
CREATE POLICY "anon_delete_resumes" ON resumes FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_resumes_created_at ON resumes (created_at DESC);
