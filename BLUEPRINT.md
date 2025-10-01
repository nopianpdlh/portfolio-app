### Required Features

I'll break down the features into two main sections: the Frontend/Portfolio (public-facing site) and the CMS (admin panel). All frontend content will be in English, as specified. The features are designed to be comprehensive, with the project showcase including details like tech stack, programming languages, etc. The CMS will support full CRUD (Create, Read, Update, Delete) operations for projects and related content.

#### Frontend/Portfolio Features
This is the public portfolio site, focusing on showcasing your work in a clean, professional manner. It uses NextJS for routing and rendering, TailwindCSS and Shadcn for styling, Framer-Motion for subtle animations (e.g., fade-ins on scroll, hover effects), and fetches data from Supabase via Prisma.

- **Home Page**:
  - Hero section: Large heading with your name/title (e.g., "John Doe - Full-Stack Developer"), a short bio, and a call-to-action button (e.g., "View Projects" with Framer-Motion animation on hover).
  - Featured projects: Carousel or grid of 3-4 highlighted projects, each showing thumbnail image, title, brief description, tech stack (e.g., icons for React, Node.js), programming languages (e.g., JavaScript, TypeScript), and links to live demo/repo.
  - Skills section: List or icons of skills (e.g., "Frontend: NextJS, TailwindCSS" with tooltips on hover).
  - Testimonials or quick stats (e.g., "5+ years experience").

- **Projects Page**:
  - Grid or masonry layout of all projects, filterable by category (e.g., web apps, mobile).
  - Each project card: Thumbnail/screenshot, title, description, tech stack (array of strings/icons), programming languages (array), challenges faced, solutions implemented, date completed, links (live URL, GitHub repo), and metrics (e.g., "Improved load time by 40%").
  - Project detail page: Dedicated route (e.g., /projects/[slug]) with full gallery of images, in-depth case study, tech stack breakdown, and related projects suggestions.
  - Infinite scrolling or pagination for large lists.

- **About Page**:
  - Detailed bio, professional photo, timeline of experience/education.
  - Skills matrix: Categorized list (e.g., Languages: JavaScript, Python; Frameworks: NextJS, Express).
  - Downloadable resume link (stored in Supabase storage).

- **Contact Page**:
  - Form with fields: Name, Email, Message (integrated with Supabase for submissions, or email service).
  - Social links (LinkedIn, GitHub, etc.) with icons.
  - Map or location if relevant.

- **Global Features**:
  - Navigation: Sticky header with links (Home, Projects, About, Contact) and dark mode toggle (using grey/white/black palette variations).
  - Footer: Copyright, social icons, quick links.
  - Search functionality: Simple search bar to filter projects by title/tech stack.
  - Blog section (optional but recommended): List of articles with titles, excerpts, tags (e.g., "NextJS Tips"), and full post views.
  - 404 Page: Custom error page with back-to-home link.

#### CMS Features (Admin Panel)
This is a protected area (e.g., /admin) accessible only after authentication via Supabase Auth. It uses the same tech stack but focuses on management. Authentication requires login (email/password or OAuth), and all operations are secured with Row Level Security (RLS) in Supabase.

- **Dashboard**:
  - Overview: Stats like total projects, recent activity, quick links to CRUD sections.
  - User profile: Edit personal info (name, bio, photo) that reflects on frontend.

- **Projects Management**:
  - CRUD for projects: 
    - Create: Form to add title, description, tech stack (multi-select dropdown), programming languages (multi-select), category, images (upload to Supabase storage), links (live/demo/repo), date, metrics/challenges.
    - Read: Table or list view of all projects with search/filter/sort (e.g., by date).
    - Update: Edit form pre-filled with existing data.
    - Delete: Confirmation dialog, with soft delete option (mark as archived).
  - Bulk actions: Select multiple projects for delete/archive.
  - Preview: Button to view how the project will appear on frontend.

- **Content Management**:
  - CRUD for about section: Edit bio, skills, experience timeline, resume upload.
  - CRUD for blog posts (if included): Title, content (rich text editor), tags, publish date, SEO meta.
  - CRUD for contact submissions: View, reply, delete inquiries.

- **Settings**:
  - Site settings: Edit global content like footer text, social links.
  - User management: If multi-user, add/edit admins (but for monolith, assume single user initially).
  - Analytics integration: Basic view of site visits (if Supabase analytics enabled).

- **Global CMS Features**:
  - Authentication: Login/logout, password reset via Supabase.
  - Role-based access: Ensure only admins can access (via RLS).
  - Notifications: Success/error messages for CRUD operations (using Shadcn toasts).
  - Export data: Download projects as JSON/CSV.

### Database Schema
Since you're using Prisma for querying the database and defining tables, here's a relevant Prisma schema (prisma/schema.prisma). It covers all features and workflows, including projects with detailed fields, about content, blog (optional), contacts, and users (tied to Supabase Auth). Supabase uses PostgreSQL, so this schema is compatible. Arrays are used for tech stacks/languages/images for flexibility.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL") // Supabase connection string
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  bio       String?
  photoUrl  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  projects  Project[]
  skills    Skill[]
  experiences Experience[]
  blogPosts BlogPost[]
  contacts  Contact[]
}

model Project {
  id               String   @id @default(uuid())
  title            String
  description      String
  techStack        String[] // e.g., ["NextJS", "TailwindCSS"]
  programmingLanguages String[] // e.g., ["JavaScript", "TypeScript"]
  category         String?  // e.g., "Web App"
  images           String[] // URLs from Supabase storage
  liveUrl          String?
  repoUrl          String?
  challenges       String?
  solutions        String?
  metrics          String?  // e.g., "40% faster load"
  dateCompleted    DateTime?
  isFeatured       Boolean  @default(false)
  slug             String   @unique // For detail page routing
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
  archived         Boolean  @default(false) // For soft delete

  user             User     @relation(fields: [userId], references: [id])
  userId           String
}

model Skill {
  id        String   @id @default(uuid())
  name      String   // e.g., "NextJS"
  category  String?  // e.g., "Frontend"
  level     String?  // e.g., "Advanced"
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user      User     @relation(fields: [userId], references: [id])
  userId    String
}

model Experience {
  id        String   @id @default(uuid())
  title     String   // e.g., "Software Engineer"
  company   String?
  description String?
  startDate DateTime?
  endDate   DateTime?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user      User     @relation(fields: [userId], references: [id])
  userId    String
}

model BlogPost {
  id        String   @id @default(uuid())
  title     String
  content   String   // Markdown or HTML
  tags      String[]
  publishDate DateTime?
  slug      String   @unique
  metaTitle String?
  metaDescription String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user      User     @relation(fields: [userId], references: [id])
  userId    String
}

model Contact {
  id        String   @id @default(uuid())
  name      String
  email     String
  message   String
  replied   Boolean  @default(false)
  createdAt DateTime @default(now())

  user      User?    @relation(fields: [userId], references: [id])
  userId    String?
}
```

This schema supports workflows like fetching projects for showcase (with filters), updating user bio for about page, storing contact forms, and soft-deleting projects. Use Prisma Client in NextJS for queries (e.g., `prisma.project.findMany()`).

### Modern Portfolio Design (Latest Trends)
Based on 2025 web design trends, your portfolio should embrace minimalism with high-contrast elements (fitting the grey/white/black palette), micro-animations, scroll-triggered interactions, and experimental navigation for engagement. Trends include bold typography, non-traditional scrolling (e.g., parallax on projects), and authenticity through subtle retro vibes like grainy textures on black backgrounds.

- **Palette**: Primary: Black (#000000) for backgrounds, White (#FFFFFF) for text/accents, Grey (#4B5563 to #9CA3AF) for subtle elements like borders/hovers. Use dark mode by default for a sleek look.
- **Typography**: Sans-serif fonts (e.g., Inter or Poppins) with large headings (e.g., 4rem+ for hero), variable weights for contrast.
- **Layout**: Block-based grids, asymmetric elements for modernity. Hero with wavy text animations via Framer-Motion. Projects in a staggered grid with hover zoom.
- **Animations**: Fade-ins on load, cursor trails, scroll parallax for images.
- **Examples**: Here's visual inspiration for minimalist designs in your palette:



A clean hero section with scattered elements, emphasizing contrast.



Simple portfolio header with circular photo and bold text.



Wavy text and minimal navigation for a multidisciplinary feel.



Framed title for a graphic designer vibe, adaptable to dev portfolios.



Asymmetric work showcase with black/white photos.

### Mobile-Friendly (Responsive) and SEO-Friendly
- **Responsive Design**: Use TailwindCSS classes (e.g., sm:, md:, lg:) for breakpoints. Ensure grids stack on mobile, navigation becomes hamburger menu, and images scale (via `object-fit`). Test with NextJS device emulation.
- **SEO-Friendly**: 
  - Meta tags: Use NextJS Metadata API (e.g., export metadata = { title: 'Portfolio', description: '...' } per page).
  - Open Graph: Add og:title, og:image, etc., in <Head> or metadata.
  - Structure: Proper headings (H1 for main titles, H2 for sections), semantic HTML (article, section), alt text for images, fast loading (NextJS image optimization).
  - Sitemap and robots.txt: Generate via NextJS plugins.
  - Performance: Leverage Vercel for edge caching, Supabase for efficient queries.

### Supabase Setup
Supabase provides auth, database, and storage. Set it up to cover all features/workflows with RLS for security (e.g., only authenticated owner can CRUD).

1. **Project Creation**: Sign up at supabase.com, create a new project. Note your DATABASE_URL for Prisma (in .env).

2. **Enable Features**:
   - Auth: Enable email provider. Use Supabase JS client in NextJS for signIn/signUp.
   - Database: Run Prisma migrations (`npx prisma migrate dev`) to create tables from the schema above.
   - Storage: Create a bucket (e.g., 'images') for project photos/resumes. Set public access for frontend reads, but RLS for uploads.

3. **Row Level Security (RLS) Policies**:
   Go to Supabase Dashboard > Authentication > Policies (or SQL Editor). Enable RLS on all tables. Create policies to secure workflows:

   - **For User table** (personal info):
     - SELECT: `auth.uid() = id` (only owner reads their profile).
     - UPDATE: `auth.uid() = id`.

   - **For Project, Skill, Experience, BlogPost tables**:
     - SELECT: Public (true) for frontend reads; or `auth.uid() = user_id` for admin.
     - INSERT/UPDATE/DELETE: `auth.uid() = user_id` (only owner can modify their content).

   - **For Contact table**:
     - INSERT: Public (true) for frontend submissions.
     - SELECT/UPDATE/DELETE: `auth.uid() = user_id` (admin views/replies).

   Example SQL for Project table (run in Supabase SQL Editor):
   ```
   ALTER TABLE "Project" ENABLE ROW LEVEL SECURITY;

   CREATE POLICY "Public read for projects" ON "Project" FOR SELECT USING (true);

   CREATE POLICY "Owner CRUD for projects" ON "Project" FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
   ```

4. **Integration**:
   - In NextJS: Install @supabase/supabase-js. Use in API routes or server components for auth-protected actions (e.g., CRUD in CMS).
   - Storage: Use signed URLs for uploads/downloads.
   - Deploy: Push to Vercel, set env vars (SUPABASE_URL, SUPABASE_ANON_KEY).

This setup ensures secure workflows: Frontend reads public data, CMS requires auth for mutations, all aligned with features.