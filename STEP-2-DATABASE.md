# STEP 2: Setup Database & Supabase

## ✅ Yang Sudah Dikerjakan

1. ✅ Database schema sudah diupdate sesuai blueprint
2. ✅ TypeScript types sudah diupdate
3. ✅ Relasi antar tabel sudah dibuat

## 📝 Yang Perlu Anda Lakukan

### 1. Setup Supabase Account & Project

#### a. Buat Account Supabase
1. Kunjungi https://supabase.com
2. Klik "Start your project"
3. Sign up dengan GitHub atau email
4. Verify email Anda

#### b. Buat Project Baru
1. Setelah login, klik "New Project"
2. Isi form:
   - **Name**: `portfolio-cms` (atau nama lain)
   - **Database Password**: Buat password yang KUAT (simpan ini!)
   - **Region**: Pilih **Southeast Asia (Singapore)** (terdekat dengan Indonesia)
   - **Pricing Plan**: Pilih **Free** (cukup untuk start)
3. Klik "Create new project"
4. **TUNGGU 2-3 MENIT** hingga project selesai setup

---

### 2. Dapatkan Database Credentials

Setelah project ready, Anda akan dapatkan credentials:

#### a. Database Connection String
1. Di Supabase Dashboard, klik **Settings** (icon gear) di sidebar kiri
2. Klik **Database** di menu
3. Scroll ke bawah ke section "**Connection string**"
4. Pilih tab "**URI**"
5. Copy connection string (akan terlihat seperti ini):
   ```
   postgresql://postgres.xxxxx:[YOUR-PASSWORD]@xxx.supabase.co:5432/postgres
   ```
6. **GANTI `[YOUR-PASSWORD]`** dengan password database yang Anda buat tadi
7. Paste ke file `.env` sebagai `DATABASE_URL` dan `DIRECT_URL`

**Contoh di file `.env`:**
```env
DATABASE_URL="postgresql://postgres.abcdefgh:MyP@ssw0rd!@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
DIRECT_URL="postgresql://postgres.abcdefgh:MyP@ssw0rd!@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres"
```

#### b. Supabase API Keys
1. Masih di Settings, klik **API** di menu
2. Di section "**Project API keys**", Anda akan lihat:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: Key yang panjang (JWT token)
3. Copy **Project URL** → paste ke `.env` sebagai `NEXT_PUBLIC_SUPABASE_URL`
4. Copy **anon public** key → paste ke `.env` sebagai `NEXT_PUBLIC_SUPABASE_ANON_KEY`

**Contoh di file `.env`:**
```env
NEXT_PUBLIC_SUPABASE_URL="https://abcdefgh.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY..."
```

---

### 3. Generate NextAuth Secret

Di terminal (PowerShell), jalankan:

```powershell
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy hasilnya (string panjang seperti `Xk7Jf9+nQ2...`) dan paste ke `.env`:

```env
NEXTAUTH_SECRET="Xk7Jf9+nQ2mP5vL8wR3..."
```

---

### 4. Set Admin Credentials

Edit file `.env` dan isi email & password untuk login admin Anda:

```env
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="YourSecurePassword123!"
```

**Gunakan email & password yang Anda ingat** - ini untuk login ke CMS nanti.

---

### 5. Verifikasi File `.env`

Setelah selesai, file `.env` Anda harus terlihat seperti ini (dengan values Anda):

```env
# Database (Supabase)
DATABASE_URL="postgresql://postgres.xxxxx:YourPassword@xxx.supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres.xxxxx:YourPassword@xxx.supabase.co:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="Xk7Jf9+nQ2mP5vL8wR3..."

# Admin Credentials
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="YourSecurePassword123!"
```

---

### 6. Push Database Schema ke Supabase

Setelah file `.env` terisi lengkap, jalankan command ini di terminal:

```powershell
# Generate Prisma Client
npx prisma generate

# Push schema ke Supabase (buat semua tabel)
npx prisma db push
```

**Output yang diharapkan:**
```
✔ Generated Prisma Client
✔ Database synchronized with Prisma schema
```

Jika ada error, cek:
- Apakah DATABASE_URL sudah benar?
- Apakah password database sudah diganti di connection string?
- Apakah Supabase project sudah ready (tidak sedang spinning up)?

---

### 7. Verifikasi Database di Supabase

1. Kembali ke Supabase Dashboard
2. Klik **Table Editor** di sidebar kiri
3. Anda sekarang akan melihat semua tabel yang sudah dibuat:
   - ✅ User
   - ✅ Project
   - ✅ Skill
   - ✅ Experience
   - ✅ BlogPost
   - ✅ Contact
   - ✅ Settings

Jika tabel-tabel ini muncul, **database setup BERHASIL!** 🎉

---

### 8. (Opsional) Buka Prisma Studio

Untuk melihat database secara visual, jalankan:

```powershell
npx prisma studio
```

Browser akan otomatis terbuka di http://localhost:5555 dengan GUI untuk melihat/edit data.

---

## 🔒 Setup Row Level Security (RLS) di Supabase

Ini PENTING untuk keamanan! RLS memastikan:
- Public hanya bisa READ data yang published
- Admin bisa CRUD semua data mereka
- Contact form bisa INSERT tapi tidak bisa dibaca public

### Cara Setup RLS:

1. Di Supabase Dashboard, klik **Authentication** > **Policies**
2. Atau klik **SQL Editor** di sidebar
3. Copy dan paste SQL ini:

```sql
-- Enable RLS on all tables
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Project" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Skill" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Experience" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "BlogPost" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Contact" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Settings" ENABLE ROW LEVEL SECURITY;

-- User: Only owner can read/update their profile
CREATE POLICY "User read own profile" ON "User" FOR SELECT USING (auth.uid()::text = id);
CREATE POLICY "User update own profile" ON "User" FOR UPDATE USING (auth.uid()::text = id);

-- Project: Public can read published, owner can CRUD
CREATE POLICY "Project public read published" ON "Project" FOR SELECT USING ("isPublished" = true AND "archived" = false);
CREATE POLICY "Project owner full access" ON "Project" FOR ALL USING (auth.uid()::text = "userId");

-- Skill: Public can read, owner can CRUD
CREATE POLICY "Skill public read" ON "Skill" FOR SELECT USING (true);
CREATE POLICY "Skill owner full access" ON "Skill" FOR ALL USING (auth.uid()::text = "userId");

-- Experience: Public can read, owner can CRUD
CREATE POLICY "Experience public read" ON "Experience" FOR SELECT USING (true);
CREATE POLICY "Experience owner full access" ON "Experience" FOR ALL USING (auth.uid()::text = "userId");

-- BlogPost: Public can read published, owner can CRUD
CREATE POLICY "BlogPost public read published" ON "BlogPost" FOR SELECT USING ("isPublished" = true);
CREATE POLICY "BlogPost owner full access" ON "BlogPost" FOR ALL USING (auth.uid()::text = "userId");

-- Contact: Public can insert, only owner can read
CREATE POLICY "Contact public insert" ON "Contact" FOR INSERT WITH CHECK (true);
CREATE POLICY "Contact owner read" ON "Contact" FOR SELECT USING (auth.uid()::text = "userId");
CREATE POLICY "Contact owner update" ON "Contact" FOR UPDATE USING (auth.uid()::text = "userId");

-- Settings: Public can read, owner can update
CREATE POLICY "Settings public read" ON "Settings" FOR SELECT USING (true);
CREATE POLICY "Settings owner update" ON "Settings" FOR UPDATE USING (true);
```

4. Klik "Run" atau tekan Ctrl+Enter
5. Jika sukses, Anda akan lihat message "Success. No rows returned"

---

## 🔐 Setup Supabase Storage (untuk upload images)

1. Di Supabase Dashboard, klik **Storage** di sidebar
2. Klik "Create a new bucket"
3. Isi form:
   - **Name**: `portfolio-images`
   - **Public bucket**: ✅ Check ini (agar gambar bisa diakses public)
4. Klik "Create bucket"

5. Klik bucket yang baru dibuat, lalu klik **Policies** tab
6. Klik "New policy" dan pilih template:
   - **For SELECT**: "Allow public access" (agar frontend bisa baca)
   - **For INSERT**: "Allow authenticated users to upload" (agar admin bisa upload)
   - **For DELETE**: "Allow authenticated users to delete" (agar admin bisa hapus)

---

## ✅ Checklist Step 2

Ceklis semua yang sudah selesai:

- [ ] Account Supabase sudah dibuat
- [ ] Project Supabase sudah dibuat & ready
- [ ] DATABASE_URL sudah di-copy ke `.env`
- [ ] DIRECT_URL sudah di-copy ke `.env`
- [ ] NEXT_PUBLIC_SUPABASE_URL sudah di-copy ke `.env`
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY sudah di-copy ke `.env`
- [ ] NEXTAUTH_SECRET sudah digenerate & ditambahkan ke `.env`
- [ ] ADMIN_EMAIL & ADMIN_PASSWORD sudah diset di `.env`
- [ ] `npx prisma generate` sudah dijalankan (sukses)
- [ ] `npx prisma db push` sudah dijalankan (sukses)
- [ ] Semua tabel muncul di Supabase Table Editor
- [ ] RLS policies sudah disetup (SQL sudah dijalankan)
- [ ] Storage bucket `portfolio-images` sudah dibuat
- [ ] Storage policies sudah disetup

---

## 🎯 Setelah Step 2 Selesai

Jika semua checklist sudah ✅, beritahu saya dan kita akan lanjut ke:

**STEP 3: Build Authentication System**
- NextAuth setup
- Login page
- Protected routes
- Admin middleware

**STEP 4: Build Admin Panel (CMS)**
- Dashboard
- Project management (CRUD)
- Skills & Experience management
- Settings page

**STEP 5: Build Portfolio Frontend**
- Homepage dengan hero section
- Projects showcase
- About page
- Contact form
- Blog (optional)

---

## 🆘 Troubleshooting

### Error: "Can't reach database server"
- Cek koneksi internet
- Cek DATABASE_URL sudah benar (pastikan password sudah diganti)
- Tunggu beberapa menit, Supabase project mungkin masih setup

### Error: "Prisma schema validation failed"
- Run `npx prisma format` untuk format schema
- Cek syntax di `schema.prisma`

### RLS Policies gagal
- Pastikan syntax SQL benar (case-sensitive)
- Pastikan nama tabel di dalam quotes: "User", "Project", dll
- Run satu policy per satu jika ada error

---

Silakan cek setiap langkah di atas, dan beri tahu saya jika ada yang stuck atau perlu bantuan! 🚀
