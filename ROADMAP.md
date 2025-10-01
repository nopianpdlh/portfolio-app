# 🗺️ PROJECT ROADMAP - Portfolio & CMS

## Overview
Portfolio website dengan Admin Panel (CMS) lengkap berdasarkan blueprint.md

**Tech Stack:**
- Frontend: Next.js 15, TypeScript, Tailwind CSS, Shadcn/ui
- Animation: Framer Motion
- Database: PostgreSQL (Supabase)
- ORM: Prisma
- Auth: NextAuth.js
- Deployment: Vercel

---

## ✅ STEP 1: Setup Kerangka Project (SELESAI)

- ✅ Install Next.js dengan App Router
- ✅ Install Tailwind CSS v4
- ✅ Install Shadcn/ui (11 components)
- ✅ Install Framer Motion
- ✅ Install Prisma & Supabase
- ✅ Install NextAuth.js
- ✅ Install React Hook Form & Zod
- ✅ Setup folder structure
- ✅ Create utility files (animations, utils)
- ✅ Create type definitions

---

## 🔄 STEP 2: Setup Database & Supabase (CURRENT)

**File yang sudah dibuat:**
- ✅ `prisma/schema.prisma` - Updated schema dengan relasi lengkap
- ✅ `src/types/index.ts` - Updated TypeScript types
- ✅ `STEP-2-DATABASE.md` - Panduan lengkap setup

**Yang perlu dilakukan:**
1. [ ] Buat account Supabase
2. [ ] Buat project baru
3. [ ] Copy DATABASE_URL ke .env
4. [ ] Copy Supabase API keys ke .env
5. [ ] Generate NEXTAUTH_SECRET
6. [ ] Set ADMIN_EMAIL & ADMIN_PASSWORD
7. [ ] Run `npx prisma generate`
8. [ ] Run `npx prisma db push`
9. [ ] Setup RLS policies di Supabase
10. [ ] Setup Storage bucket

**Output:**
- Database siap dengan 7 tabel (User, Project, Skill, Experience, BlogPost, Contact, Settings)
- RLS policies aktif untuk keamanan
- Storage bucket untuk upload images

---

## 📋 STEP 3: Build Authentication System

**Tujuan:** Setup NextAuth untuk login/logout admin

**File yang akan dibuat:**
```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts      # NextAuth configuration
│   ├── login/
│   │   └── page.tsx              # Login page
│   └── admin/
│       └── layout.tsx            # Protected layout
├── lib/
│   └── auth.ts                   # Auth helper functions
└── middleware.ts                 # Route protection
```

**Fitur:**
- Login form dengan email & password
- Session management
- Protected routes untuk /admin/*
- Logout functionality
- Remember me option

**Tasks:**
1. Setup NextAuth API route
2. Create login page dengan Shadcn form
3. Setup middleware untuk protect admin routes
4. Create auth helper functions
5. Test login/logout flow

---

## 🎨 STEP 4: Build Admin Panel (CMS)

### 4.1 Admin Dashboard
**File:** `src/app/admin/page.tsx`

**Fitur:**
- Overview cards (total projects, contacts, views)
- Recent activity feed
- Quick actions (New Project, View Contacts)
- User profile section

### 4.2 Project Management
**Files:**
```
src/app/admin/projects/
├── page.tsx              # List all projects (table view)
├── new/
│   └── page.tsx         # Create new project form
├── [id]/
│   ├── page.tsx         # View project detail
│   └── edit/
│       └── page.tsx     # Edit project form
```

**Fitur:**
- CRUD operations (Create, Read, Update, Delete)
- Form dengan fields:
  - Title, description
  - Tech stack (multi-select)
  - Programming languages (multi-select)
  - Category dropdown
  - Multiple image upload
  - Live URL & Repo URL
  - Challenges, Solutions, Metrics (textarea)
  - Date completed
  - Featured toggle
  - Published toggle
- Image upload ke Supabase Storage
- Preview before publish
- Bulk actions (delete, archive)
- Search & filter
- Drag-and-drop untuk reorder

### 4.3 Skills Management
**File:** `src/app/admin/skills/page.tsx`

**Fitur:**
- Add/Edit/Delete skills
- Categorize by Frontend, Backend, Languages, Tools
- Set skill level (Beginner, Intermediate, Advanced)
- Reorder skills

### 4.4 Experience Management
**File:** `src/app/admin/experiences/page.tsx`

**Fitur:**
- Add/Edit/Delete work experiences
- Timeline view
- Current position toggle
- Reorder timeline

### 4.5 Blog Management (Optional)
**Files:**
```
src/app/admin/blog/
├── page.tsx              # List all posts
├── new/
│   └── page.tsx         # Create new post
└── [id]/
    └── edit/
        └── page.tsx     # Edit post
```

**Fitur:**
- Rich text editor (Markdown or WYSIWYG)
- Tags management
- Cover image upload
- SEO meta fields
- Publish/Draft status

### 4.6 Contact Inbox
**File:** `src/app/admin/contacts/page.tsx`

**Fitur:**
- View all contact submissions
- Mark as read/replied
- Delete messages
- Filter by date

### 4.7 Settings
**File:** `src/app/admin/settings/page.tsx`

**Fitur:**
- Edit personal info (name, bio, photo)
- Edit site settings (site name, tagline)
- Social media links
- Resume upload
- Contact info

---

## 🌐 STEP 5: Build Portfolio Frontend

### 5.1 Homepage
**File:** `src/app/page.tsx`

**Sections:**
1. **Hero Section**
   - Large heading dengan nama & title
   - Animated text dengan Framer Motion
   - CTA button "View Projects"
   - Background dengan subtle animations

2. **Featured Projects**
   - Grid/carousel 3-4 projects
   - Hover effects dengan Framer Motion
   - Quick info: title, tech stack, links

3. **Skills Overview**
   - Icon grid dengan tooltips
   - Animated on scroll

4. **Stats/Testimonials**
   - Numbers counter animation
   - Quick stats

5. **Contact CTA**
   - Button to contact page

### 5.2 Projects Page
**File:** `src/app/projects/page.tsx`

**Fitur:**
- Grid layout (masonry style)
- Filter by category & tech stack
- Search by title
- Sort by date/featured
- Infinite scroll or pagination
- Smooth animations on load

**Project Card:**
- Thumbnail image
- Title & description
- Tech stack icons
- Programming languages badges
- Links (demo, repo)
- Hover effect zoom

### 5.3 Project Detail Page
**File:** `src/app/projects/[slug]/page.tsx`

**Sections:**
- Hero image/gallery (carousel)
- Title & description
- Tech stack breakdown
- Programming languages
- Challenges & Solutions
- Metrics/Results
- Image gallery
- Related projects
- Back button

### 5.4 About Page
**File:** `src/app/about/page.tsx`

**Sections:**
- Hero with photo
- Bio (dari User table)
- Skills Matrix (categorized dari Skill table)
- Experience Timeline (dari Experience table)
- Download Resume button
- Scroll animations

### 5.5 Blog Page (Optional)
**Files:**
```
src/app/blog/
├── page.tsx              # List all posts
└── [slug]/
    └── page.tsx         # Post detail
```

**Fitur:**
- Card grid layout
- Tags filter
- Search
- Reading time estimate

### 5.6 Contact Page
**File:** `src/app/contact/page.tsx`

**Fitur:**
- Contact form (Name, Email, Subject, Message)
- Form validation dengan Zod
- Submit ke database via API
- Success/error messages
- Social links
- Email/phone display

### 5.7 Global Components
**Files:**
```
src/components/portfolio/
├── Header.tsx            # Navigation bar
├── Footer.tsx            # Footer dengan links
├── ThemeToggle.tsx       # Dark mode toggle
├── ProjectCard.tsx       # Reusable project card
├── SkillIcon.tsx         # Skill icons
├── Timeline.tsx          # Experience timeline
└── ContactForm.tsx       # Contact form
```

---

## 🎭 STEP 6: Animations & Polish

**Menggunakan Framer Motion untuk:**
- Page transitions
- Scroll-triggered animations (fade in, slide up)
- Hover effects (scale, glow)
- Loading states
- Cursor trails (optional)
- Parallax scrolling

**Files:**
```
src/components/animations/
├── PageTransition.tsx
├── FadeIn.tsx
├── SlideUp.tsx
└── ScrollReveal.tsx
```

---

## 🔧 STEP 7: API Routes

**Files:**
```
src/app/api/
├── projects/
│   ├── route.ts          # GET all projects
│   └── [id]/
│       └── route.ts      # GET/PUT/DELETE project
├── skills/
│   └── route.ts          # CRUD skills
├── experiences/
│   └── route.ts          # CRUD experiences
├── blog/
│   └── route.ts          # CRUD blog posts
├── contact/
│   └── route.ts          # POST contact form
└── upload/
    └── route.ts          # Upload images to Supabase
```

---

## 📱 STEP 8: Responsive Design

**Breakpoints Tailwind:**
- Mobile: default (< 640px)
- Tablet: sm (640px)
- Laptop: md (768px), lg (1024px)
- Desktop: xl (1280px), 2xl (1536px)

**Tasks:**
- Test semua pages di mobile
- Hamburger menu untuk nav
- Stack grids on mobile
- Adjust font sizes
- Touch-friendly buttons

---

## 🚀 STEP 9: SEO Optimization

**Next.js Metadata API:**
```typescript
// Setiap page
export const metadata = {
  title: 'Page Title',
  description: 'Description',
  openGraph: {
    title: 'OG Title',
    description: 'OG Description',
    images: ['image-url'],
  }
}
```

**Tasks:**
- Add metadata per page
- Generate sitemap.xml
- Create robots.txt
- Add structured data (JSON-LD)
- Optimize images (Next.js Image)
- Add alt text semua images

---

## 🧪 STEP 10: Testing & Bug Fixes

**Manual Testing:**
- [ ] Test semua CRUD operations
- [ ] Test authentication flow
- [ ] Test form validations
- [ ] Test responsive design
- [ ] Test animations
- [ ] Test image uploads
- [ ] Test contact form
- [ ] Cross-browser testing

---

## 📦 STEP 11: Deployment ke Vercel

**Tasks:**
1. Push code ke GitHub
2. Connect GitHub ke Vercel
3. Import project
4. Add environment variables:
   - DATABASE_URL
   - DIRECT_URL
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - NEXTAUTH_URL (production URL)
   - NEXTAUTH_SECRET
   - ADMIN_EMAIL
   - ADMIN_PASSWORD
5. Deploy!
6. Setup custom domain (optional)
7. Setup analytics (Vercel Analytics)

---

## 📊 Progress Tracking

### Overall Progress: 15%

- ✅ Step 1: Setup (100%)
- 🔄 Step 2: Database (In Progress)
- ⏳ Step 3: Authentication (0%)
- ⏳ Step 4: Admin Panel (0%)
- ⏳ Step 5: Frontend (0%)
- ⏳ Step 6: Animations (0%)
- ⏳ Step 7: API Routes (0%)
- ⏳ Step 8: Responsive (0%)
- ⏳ Step 9: SEO (0%)
- ⏳ Step 10: Testing (0%)
- ⏳ Step 11: Deployment (0%)

---

## 🎯 Next Actions

**Anda sekarang di STEP 2:**
1. Buka file `STEP-2-DATABASE.md`
2. Ikuti semua langkah setup Supabase
3. Setelah selesai, laporkan ke saya
4. Kita akan lanjut ke Step 3 (Authentication)

**Estimasi waktu per step:**
- Step 2: 30-45 menit (setup Supabase)
- Step 3: 1-2 jam (authentication)
- Step 4: 4-6 jam (admin panel)
- Step 5: 4-6 jam (frontend)
- Step 6-11: 2-3 jam (polish & deployment)

**Total estimated time:** 12-18 jam (bisa dikerjakan bertahap)

---

Semangat! 🚀 Kerjakan Step 2 dulu, lalu kita lanjut build features satu per satu.
