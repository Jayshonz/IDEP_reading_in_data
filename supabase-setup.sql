-- Run this in your Supabase SQL editor to set up the case_studies table

CREATE TABLE IF NOT EXISTS case_studies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  advertiser_name text NOT NULL,
  thumbnail_url text NOT NULL,
  full_image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

-- Public can read all case studies
CREATE POLICY "Public read access"
  ON case_studies
  FOR SELECT
  USING (true);

-- Only authenticated users can insert
CREATE POLICY "Authenticated insert"
  ON case_studies
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users can delete
CREATE POLICY "Authenticated delete"
  ON case_studies
  FOR DELETE
  TO authenticated
  USING (true);
