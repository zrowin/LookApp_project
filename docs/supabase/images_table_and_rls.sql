-- SQL to create `images` table and example RLS policies for Supabase

-- Create table
CREATE TABLE IF NOT EXISTS public.images (
  id text PRIMARY KEY,
  owner_id text NOT NULL,
  original_url text,
  processed_url text,
  status text,
  tags text[],
  created_at timestamp with time zone DEFAULT now()
);

-- Example: enable RLS and allow owners to insert/select/delete their rows
ALTER TABLE public.images ENABLE ROW LEVEL SECURITY;

-- Policy: allow authenticated users to insert rows with their own owner_id
CREATE POLICY "Images insert by owner" ON public.images
  FOR INSERT USING (auth.role() = 'authenticated') WITH CHECK (auth.uid() = owner_id);

-- Policy: allow owners to select their rows
CREATE POLICY "Images select by owner" ON public.images
  FOR SELECT USING (auth.uid() = owner_id);

-- Policy: allow owners to delete their rows
CREATE POLICY "Images delete by owner" ON public.images
  FOR DELETE USING (auth.uid() = owner_id);

-- Note: Adjust policies depending on desired access for public images or admin roles.
