-- ========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Portfolio & CMS Project
-- ========================================
-- 
-- CARA PAKAI:
-- 1. Buka Supabase Dashboard
-- 2. Klik "SQL Editor" di sidebar
-- 3. Copy paste semua SQL ini
-- 4. Klik "Run" atau tekan Ctrl+Enter
-- 5. Tunggu hingga selesai (Success!)
--
-- ========================================

-- Enable RLS on all tables
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Project" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Skill" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Experience" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BlogPost" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Contact" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Settings" ENABLE ROW LEVEL SECURITY;

-- ========================================
-- USER TABLE POLICIES
-- ========================================

-- User can read their own profile
CREATE POLICY "User read own profile" 
ON "User" 
FOR SELECT 
USING (auth.uid()::text = id);

-- User can update their own profile
CREATE POLICY "User update own profile" 
ON "User" 
FOR UPDATE 
USING (auth.uid()::text = id);

-- ========================================
-- PROJECT TABLE POLICIES
-- ========================================

-- Public can read published and non-archived projects
CREATE POLICY "Project public read published" 
ON "Project" 
FOR SELECT 
USING ("isPublished" = true AND "archived" = false);

-- Owner has full access to their projects
CREATE POLICY "Project owner full access" 
ON "Project" 
FOR ALL 
USING (auth.uid()::text = "userId");

-- ========================================
-- SKILL TABLE POLICIES
-- ========================================

-- Public can read all skills
CREATE POLICY "Skill public read" 
ON "Skill" 
FOR SELECT 
USING (true);

-- Owner has full access to their skills
CREATE POLICY "Skill owner full access" 
ON "Skill" 
FOR ALL 
USING (auth.uid()::text = "userId");

-- ========================================
-- EXPERIENCE TABLE POLICIES
-- ========================================

-- Public can read all experiences
CREATE POLICY "Experience public read" 
ON "Experience" 
FOR SELECT 
USING (true);

-- Owner has full access to their experiences
CREATE POLICY "Experience owner full access" 
ON "Experience" 
FOR ALL 
USING (auth.uid()::text = "userId");

-- ========================================
-- BLOGPOST TABLE POLICIES
-- ========================================

-- Public can read published blog posts
CREATE POLICY "BlogPost public read published" 
ON "BlogPost" 
FOR SELECT 
USING ("isPublished" = true);

-- Owner has full access to their blog posts
CREATE POLICY "BlogPost owner full access" 
ON "BlogPost" 
FOR ALL 
USING (auth.uid()::text = "userId");

-- ========================================
-- CONTACT TABLE POLICIES
-- ========================================

-- Public can insert contact messages
CREATE POLICY "Contact public insert" 
ON "Contact" 
FOR INSERT 
WITH CHECK (true);

-- Owner can read contact messages
CREATE POLICY "Contact owner read" 
ON "Contact" 
FOR SELECT 
USING (auth.uid()::text = "userId");

-- Owner can update contact messages (mark as replied)
CREATE POLICY "Contact owner update" 
ON "Contact" 
FOR UPDATE 
USING (auth.uid()::text = "userId");

-- ========================================
-- SETTINGS TABLE POLICIES
-- ========================================

-- Public can read settings
CREATE POLICY "Settings public read" 
ON "Settings" 
FOR SELECT 
USING (true);

-- Anyone authenticated can update settings
-- Note: Untuk production, ubah jadi hanya owner tertentu
CREATE POLICY "Settings owner update" 
ON "Settings" 
FOR UPDATE 
USING (auth.role() = 'authenticated');

-- ========================================
-- DONE! 
-- ========================================
-- 
-- Jika sukses, Anda akan lihat message:
-- "Success. No rows returned"
--
-- Verifikasi: 
-- Klik "Database" > "Policies" di sidebar
-- Pastikan semua policies muncul
--
-- ========================================
