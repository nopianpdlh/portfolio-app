# SETUP GUIDE - Portfolio & CMS Project

## ✅ Step 1: Setup Kerangka Project (SELESAI)

Kerangka project telah berhasil dibuat dengan tech stack berikut:

### Tech Stack yang Terinstall:
- ✅ Next.js 15 (App Router)
- ✅ TypeScript
- ✅ Tailwind CSS v4
- ✅ Shadcn/ui (10+ komponen UI)
- ✅ Framer Motion (untuk animasi)
- ✅ Prisma ORM
- ✅ PostgreSQL (ready untuk Supabase)
- ✅ NextAuth.js (autentikasi)
- ✅ React Hook Form + Zod (form validation)
- ✅ Bcryptjs (password hashing)

### Database Schema yang Sudah Dibuat:
1. **User** - untuk admin authentication
2. **Project** - untuk portfolio projects
3. **About** - untuk halaman about
4. **Experience** - untuk work experience
5. **Contact** - untuk contact form submissions
6. **Settings** - untuk site-wide settings

### Struktur Folder:
```
portfolio/
├── prisma/
│   └── schema.prisma          # ✅ Database schema lengkap
├── src/
│   ├── app/
│   │   ├── admin/            # ✅ Folder untuk admin panel
│   │   ├── api/
│   │   │   └── auth/         # ✅ Folder untuk auth API
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/               # ✅ 11 Shadcn components
│   │   ├── admin/            # ✅ Folder untuk admin components
│   │   ├── portfolio/        # ✅ Folder untuk portfolio components
│   │   └── animations/       # ✅ Folder untuk animation components
│   ├── lib/
│   │   ├── utils.ts          # ✅ Utility functions
│   │   ├── prisma.ts         # ✅ Prisma client singleton
│   │   ├── supabase.ts       # ✅ Supabase client
│   │   └── animations.ts     # ✅ Framer Motion variants
│   └── types/
│       └── index.ts          # ✅ TypeScript types
├── .env                      # ✅ Environment variables
├── .env.example              # ✅ Template env variables
└── README.md                 # ✅ Documentation
```

### File Konfigurasi:
- ✅ `.env` - Environment variables (perlu diisi)
- ✅ `.env.example` - Template untuk environment variables
- ✅ `prisma/schema.prisma` - Database schema lengkap
- ✅ `src/lib/prisma.ts` - Prisma client setup
- ✅ `src/lib/supabase.ts` - Supabase client setup
- ✅ `src/lib/animations.ts` - Animation presets
- ✅ `src/types/index.ts` - TypeScript type definitions

---

## 🎯 Step 2: Setup Database & Authentication

Langkah selanjutnya yang perlu dilakukan:

### 2.1. Setup Supabase Database

1. **Buat Project Supabase:**
   - Kunjungi https://supabase.com
   - Buat akun baru (jika belum punya)
   - Klik "New Project"
   - Isi:
     - Name: portfolio-cms (atau nama lain)
     - Database Password: (buat password yang kuat)
     - Region: Southeast Asia (Singapore) - pilih yang terdekat
   - Klik "Create new project"
   - Tunggu ~2 menit hingga project selesai dibuat

2. **Dapatkan Database Connection String:**
   - Buka project Supabase Anda
   - Klik Settings (gear icon) > Database
   - Scroll ke "Connection string" section
   - Copy "Connection string" dengan mode "Session"
   - Paste ke `.env` file sebagai `DATABASE_URL` dan `DIRECT_URL`
   - Ganti `[YOUR-PASSWORD]` dengan database password Anda

3. **Dapatkan API Keys:**
   - Klik Settings > API
   - Copy "Project URL" → paste ke `NEXT_PUBLIC_SUPABASE_URL`
   - Copy "anon public" key → paste ke `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 2.2. Generate NextAuth Secret

Jalankan command ini di terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```
Copy hasilnya dan paste ke `NEXTAUTH_SECRET` di file `.env`

### 2.3. Setup Admin Credentials

Edit `.env` file dan isi:
```
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="your-secure-password"
```
(Gunakan email dan password yang Anda inginkan untuk login admin)

### 2.4. Push Database Schema ke Supabase

Setelah semua environment variables terisi, jalankan:
```bash
npx prisma generate
npx prisma db push
```

### 2.5. Verifikasi Database

Buka Prisma Studio untuk melihat database:
```bash
npx prisma studio
```

---

## 📝 Checklist Step 2:

- [ ] Buat project di Supabase
- [ ] Copy DATABASE_URL ke .env
- [ ] Copy DIRECT_URL ke .env
- [ ] Copy NEXT_PUBLIC_SUPABASE_URL ke .env
- [ ] Copy NEXT_PUBLIC_SUPABASE_ANON_KEY ke .env
- [ ] Generate NEXTAUTH_SECRET
- [ ] Set ADMIN_EMAIL dan ADMIN_PASSWORD
- [ ] Run `npx prisma generate`
- [ ] Run `npx prisma db push`
- [ ] Verifikasi dengan `npx prisma studio`

---

## ⏭️ Step 3 Preview: Building Pages & Components

Setelah Step 2 selesai, kita akan mulai membuat:

1. **Authentication System:**
   - Login page
   - NextAuth API routes
   - Auth middleware

2. **Portfolio Pages:**
   - Homepage dengan hero section
   - Projects page dengan filtering
   - Project detail page
   - About page
   - Contact page

3. **Admin Panel:**
   - Admin dashboard
   - Project management (CRUD)
   - Settings page
   - Contact inbox

4. **Components & Animations:**
   - Reusable components
   - Framer Motion animations
   - Loading states
   - Error boundaries

---

## 🆘 Troubleshooting

### Jika ada error saat install:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules dan reinstall
Remove-Item -Recurse -Force node_modules
npm install
```

### Jika Prisma error:
```bash
# Regenerate Prisma Client
npx prisma generate

# Reset database (WARNING: hapus semua data)
npx prisma migrate reset
```

---

## 📞 Bantuan

Jika ada pertanyaan atau error di Step 2, beri tahu saya:
1. Screenshot error yang muncul
2. Bagian mana yang bermasalah
3. Isi file `.env` Anda (TANPA credentials/password)

Mari lanjut ke Step 2! 🚀
