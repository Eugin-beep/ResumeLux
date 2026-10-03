-- ==============================================================================
-- ResumeLux: Luxury Digital Resume Studio Database Schema
-- Supabase PostgreSQL Migration
-- ==============================================================================

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Templates Table (Scalable 100+ Template Registry)
CREATE TABLE IF NOT EXISTS public.templates (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'General',
  preview_image TEXT,
  is_free BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 3. Resumes Table
CREATE TABLE IF NOT EXISTS public.resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL DEFAULT 'Untitled Resume',
  template_id TEXT NOT NULL REFERENCES public.templates(id) ON UPDATE CASCADE DEFAULT 'minimal-ats',
  resume_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Indices for performance
CREATE INDEX IF NOT EXISTS idx_resumes_user_id ON public.resumes(user_id);
CREATE INDEX IF NOT EXISTS idx_resumes_updated_at ON public.resumes(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_templates_category ON public.templates(category);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Templates Policies (Public read-only)
DROP POLICY IF EXISTS "Templates are viewable by all authenticated users" ON public.templates;
CREATE POLICY "Templates are viewable by all authenticated users"
  ON public.templates FOR SELECT
  USING (true);

-- Resumes Policies (Strict Isolation: Users can ONLY access their own resumes)
DROP POLICY IF EXISTS "Users can view their own resumes" ON public.resumes;
CREATE POLICY "Users can view their own resumes"
  ON public.resumes FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own resumes" ON public.resumes;
CREATE POLICY "Users can create their own resumes"
  ON public.resumes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own resumes" ON public.resumes;
CREATE POLICY "Users can update their own resumes"
  ON public.resumes FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own resumes" ON public.resumes;
CREATE POLICY "Users can delete their own resumes"
  ON public.resumes FOR DELETE
  USING (auth.uid() = user_id);

-- ==============================================================================
-- AUTOMATIC PROFILE CREATION TRIGGER
-- ==============================================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO UPDATE
  SET
    full_name = EXCLUDED.full_name,
    email = EXCLUDED.email,
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Automatic updated_at timestamp trigger for resumes
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_resumes_updated_at ON public.resumes;
CREATE TRIGGER update_resumes_updated_at
  BEFORE UPDATE ON public.resumes
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ==============================================================================
-- SEED INITIAL 10 PRODUCTION TEMPLATES
-- ==============================================================================

INSERT INTO public.templates (id, name, description, category, preview_image, is_free)
VALUES
  ('minimal-ats', 'Minimal ATS', 'Clean single-column ATS-friendly resume optimized for applicant tracking algorithms.', 'ATS', '/templates/minimal-ats.png', true),
  ('executive-black', 'Executive Black', 'Authoritative executive design featuring deep charcoal accents and refined divider rules.', 'Executive', '/templates/executive-black.png', true),
  ('modern-developer', 'Modern Developer', 'Technical layout tailored for software engineers, systems architects, and DevOps leads.', 'Technology', '/templates/modern-developer.png', true),
  ('luxury-gold', 'Luxury Gold', 'Sophisticated luxury aesthetic with subtle gold borders and editorial serif typography.', 'Creative', '/templates/luxury-gold.png', true),
  ('corporate', 'Corporate', 'Traditional professional business layout with balanced two-column header and structured timeline.', 'Business', '/templates/corporate.png', true),
  ('creative', 'Creative', 'Modern asymmetric two-column design with distinct sidebar highlights for portfolio-driven careers.', 'Creative', '/templates/creative.png', true),
  ('academic', 'Academic', 'Education and research-focused layout for scholars, PhD candidates, professors, and researchers.', 'Academic', '/templates/academic.png', true),
  ('tech', 'Tech Modern', 'High-density tech layout featuring skill badges, project architecture tags, and impact metrics.', 'Technology', '/templates/tech.png', true),
  ('professional-blue', 'Professional Blue', 'Corporate consulting style with modern navy/sapphire accents and sharp hierarchy.', 'Business', '/templates/professional-blue.png', true),
  ('elegant-serif', 'Elegant Serif', 'Editorial luxury styling featuring Playfair Display typography and timeless magazine appeal.', 'Executive', '/templates/elegant-serif.png', true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  preview_image = EXCLUDED.preview_image,
  is_free = EXCLUDED.is_free;
