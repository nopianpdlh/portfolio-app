# 🚀 Novian Fadhilah - Portfolio Website# Portfolio & CMS ProjectThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black)](https://nextjs.org/)

[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)

[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)](https://tailwindcss.com/)Portfolio website dengan Admin Panel (CMS) menggunakan Next.js, TypeScript, Tailwind CSS, dan Prisma.## Getting Started

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)



Modern portfolio website with powerful CMS capabilities. Built with Next.js 15, TypeScript, Prisma, and Supabase.

## Tech StackFirst, run the development server:

🌐 **Live Demo**: [Coming Soon]



## ✨ Features

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Shadcn/ui```bash

### 🎨 Public Portfolio

- **Dynamic Homepage** - Hero section with animated introduction- **Animation**: Framer Motionnpm run dev

- **Projects Showcase** - Filterable project gallery with detailed views

- **About Page** - Professional bio with dynamic status & quick stats- **Database**: PostgreSQL (Supabase)# or

- **Skills Matrix** - Categorized skill display

- **Experience Timeline** - Career journey visualization- **ORM**: Prismayarn dev

- **Certificates & Education** - Achievement showcase

- **Blog System** - Article publishing with markdown support- **Authentication**: NextAuth.js# or

- **Contact Form** - Direct message system

- **Deployment**: Vercelpnpm dev

### 🛠️ Admin CMS

- **Dashboard** - Overview statistics and quick actions# or

- **Project Management** - Full CRUD with image upload

- **Content Editor** - Rich text editing for all sections## Setup Instructionsbun dev

- **Image Upload** - Automatic optimization (WebP, 16:9, 1280x720)

- **Settings Panel** - Site configuration and status management```

- **Contact Inbox** - Message management system

### 1. Install Dependencies

### 🎯 Special Features

- **Status & Quick Stats** - Real-time availability and auto-calculated statisticsOpen [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- **Dark Mode** - System-based theme switching

- **Responsive Design** - Mobile-first approach```bash

- **SEO Optimized** - Meta tags, OG images, sitemap

- **Smooth Animations** - Framer Motion transitionsnpm installYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

- **Performance** - Server-side rendering, image optimization

- **Security** - NextAuth.js authentication, RLS policies```



## 🛠️ Tech StackThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.



### Frontend### 2. Setup Environment Variables

- **Framework**: Next.js 15.5.4 (App Router)

- **Language**: TypeScript 5## Learn More

- **Styling**: Tailwind CSS 3.4

- **UI Components**: Shadcn/uiCopy `.env.example` to `.env` dan isi dengan credentials Anda:

- **Animations**: Framer Motion

- **Forms**: React Hook Form + ZodTo learn more about Next.js, take a look at the following resources:

- **Icons**: Lucide React

```bash

### Backend

- **Database**: PostgreSQL (Supabase)# Windows PowerShell- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- **ORM**: Prisma 6.16.3

- **Authentication**: NextAuth.jscopy .env.example .env- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

- **Storage**: Supabase Storage

- **Image Processing**: Sharp```



### DeploymentYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

- **Platform**: Vercel

- **CDN**: Vercel Edge Network### 3. Setup Supabase

- **Domain**: [Your Domain]

## Deploy on Vercel

## 📦 Installation

1. Buat project baru di [Supabase](https://supabase.com)

### Prerequisites

- Node.js 18+ 2. Copy connection string dari Settings > DatabaseThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

- npm/yarn/pnpm

- Supabase account3. Update `DATABASE_URL` dan `DIRECT_URL` di `.env`

- Git

4. Copy API keys dari Settings > APICheck out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### 1. Clone Repository

```bash5. Update `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`

git clone https://github.com/nopianpdlh/portfolio-app.git

cd portfolio### 4. Generate NextAuth Secret

```

```bash

### 2. Install Dependencies# Gunakan Node.js

```bashnode -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

npm install```

```

Copy hasilnya ke `NEXTAUTH_SECRET` di `.env`

### 3. Environment Setup

### 5. Setup Database

Create `.env` file in root directory:

```bash

```bash# Generate Prisma Client

# Copy from .env.examplenpx prisma generate

cp .env.example .env

```# Push schema ke database

npx prisma db push

Fill in your environment variables:```



```env### 6. Run Development Server

# Database (Supabase)

DATABASE_URL="postgresql://..."```bash

DIRECT_URL="postgresql://..."npm run dev

```

# Supabase

NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbG..."

## Project Structure

# NextAuth

NEXTAUTH_URL="http://localhost:3000"```

NEXTAUTH_SECRET="generate-with-openssl"portfolio/

├── prisma/

# Admin Credentials│   └── schema.prisma          # Database schema

ADMIN_EMAIL="your@email.com"├── src/

ADMIN_PASSWORD="your-secure-password"│   ├── app/                   # Next.js App Router

│   │   ├── admin/            # Admin panel pages

# Optional: Email (for contact form)│   │   ├── api/              # API routes

EMAIL_SERVER="smtp://..."│   │   └── page.tsx          # Homepage

EMAIL_FROM="noreply@yourdomain.com"│   ├── components/

```│   │   ├── ui/               # Shadcn components

│   │   ├── admin/            # Admin components

### 4. Generate NextAuth Secret│   │   ├── portfolio/        # Portfolio components

```bash│   │   └── animations/       # Animation components

# Using OpenSSL (Mac/Linux)│   ├── lib/                  # Utility functions

openssl rand -base64 32│   └── types/                # TypeScript types

└── public/                   # Static assets

# Using Node.js (Windows/All)```

node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

```## Features



### 5. Database Setup### Portfolio (Public)

```bash- Homepage dengan hero section

# Generate Prisma Client- Project showcase dengan filtering

npx prisma generate- About page

- Experience timeline

# Push schema to database- Contact form

npx prisma db push

### Admin Panel (Protected)

# Seed initial data (admin user + settings)- Dashboard overview

npx tsx prisma/seed.ts- Project management (CRUD)

```- About section editor

- Experience management

### 6. Supabase Storage Setup- Contact messages inbox

- Site settings

1. Go to Supabase Dashboard > Storage

2. Create bucket: `portfolio-images`## Database Schema

3. Set bucket to **Public**

4. Add RLS policies (see `docs/IMAGE-UPLOAD-SETUP.md`)- **User**: Admin authentication

- **Project**: Portfolio projects

### 7. Run Development Server- **About**: About page content

```bash- **Experience**: Work experience

npm run dev- **Contact**: Contact form submissions

```- **Settings**: Site-wide settings



Visit [http://localhost:3000](http://localhost:3000)## Scripts



## 📂 Project Structure```bash

npm run dev          # Start development server

```npm run build        # Build for production

portfolio/npm run start        # Start production server

├── prisma/npm run lint         # Run ESLint

│   ├── schema.prisma          # Database schemanpx prisma studio    # Open Prisma Studio (database GUI)

│   ├── seed.ts                # Seed data```

│   └── migrations/            # Migration history

├── public/                    # Static assets## Deployment ke Vercel

├── src/

│   ├── app/                   # Next.js App Router1. Push code ke GitHub

│   │   ├── (public)/         # Public routes2. Import project di [Vercel](https://vercel.com)

│   │   │   ├── page.tsx      # Homepage3. Add environment variables di Vercel dashboard

│   │   │   ├── about/        # About page4. Deploy!

│   │   │   ├── projects/     # Projects

│   │   │   ├── blog/         # Blog### Environment Variables untuk Production

│   │   │   └── contact/      # Contact

│   │   ├── admin/            # Admin panel (protected)- `DATABASE_URL`

│   │   │   ├── dashboard/- `DIRECT_URL`

│   │   │   ├── projects/- `NEXT_PUBLIC_SUPABASE_URL`

│   │   │   ├── settings/- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

│   │   │   └── ...- `NEXTAUTH_URL` (URL production Anda)

│   │   ├── api/              # API routes- `NEXTAUTH_SECRET`

│   │   │   ├── auth/         # NextAuth- `ADMIN_EMAIL`

│   │   │   └── upload/       # Image upload- `ADMIN_PASSWORD`

│   │   └── layout.tsx        # Root layout

│   ├── components/## License

│   │   ├── ui/               # Shadcn components

│   │   ├── admin/            # Admin componentsMIT

│   │   ├── layout/           # Layout components
│   │   ├── home/             # Homepage sections
│   │   ├── about/            # About page sections
│   │   └── projects/         # Project components
│   ├── lib/
│   │   ├── actions/          # Server actions
│   │   ├── validations/      # Zod schemas
│   │   ├── auth.ts           # Auth utilities
│   │   ├── prisma.ts         # Prisma client
│   │   └── seo.ts            # SEO utilities
│   └── types/                # TypeScript types
├── docs/                      # Documentation
├── .env.example              # Environment template
├── next.config.js            # Next.js config
├── tailwind.config.ts        # Tailwind config
└── package.json              # Dependencies
```

## 🗄️ Database Schema

```prisma
- User (Admin authentication)
- Project (Portfolio projects)
- Skill (Technologies & skills)
- Experience (Work history)
- Certificate (Certifications)
- Education (Academic background)
- BlogPost (Blog articles)
- Contact (Contact messages)
- Settings (Site configuration & status)
```

## 🎨 Key Components

### Status & Quick Stats
Auto-calculated statistics displayed on About page:
- **Projects Completed** - Count from database
- **Years Experience** - Auto-calculated or manual override
- **Technologies** - Skill count
- **Custom Stats** - Up to 3 admin-defined metrics

### Image Upload System
- Automatic optimization (1280x720, WebP, 85% quality)
- 16:9 aspect ratio maintenance
- Client-side compression before upload
- Supabase Storage integration
- CDN delivery with 1-year cache

## 🚀 Deployment to Vercel

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nopianpdlh/portfolio-app)

### Manual Deployment

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   
   Add all variables from `.env` to Vercel:
   - Go to Project Settings > Environment Variables
   - Add each variable (see `.env.example`)
   - **Important**: Update `NEXTAUTH_URL` to your production domain

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Visit your live site!

### Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify images display properly
- [ ] Test admin login
- [ ] Check contact form submission
- [ ] Verify database connection
- [ ] Test image upload in admin
- [ ] Check SEO meta tags
- [ ] Test responsive design
- [ ] Verify analytics (if configured)
- [ ] Test dark mode

## 📜 Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server

# Database
npx prisma studio        # Open Prisma Studio GUI
npx prisma generate      # Generate Prisma Client
npx prisma db push       # Push schema to database
npx prisma migrate dev   # Create migration
npx tsx prisma/seed.ts   # Seed database

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript check
```

## 🔒 Security

- **Authentication**: NextAuth.js with secure session handling
- **Database**: Row Level Security (RLS) policies on Supabase
- **API Routes**: Protected with `requireAdmin()` middleware
- **Environment Variables**: Sensitive data in `.env` (not committed)
- **CSRF Protection**: Built-in Next.js CSRF tokens
- **Input Validation**: Zod schemas for all forms

## 🌐 Environment Variables

See `.env.example` for complete list and descriptions.

### Required for Production
```env
DATABASE_URL               # Supabase PostgreSQL connection
DIRECT_URL                 # Direct database connection
NEXT_PUBLIC_SUPABASE_URL   # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY  # Supabase anon key
NEXTAUTH_URL               # Your production domain
NEXTAUTH_SECRET            # Random secret (32+ chars)
ADMIN_EMAIL                # Admin login email
ADMIN_PASSWORD             # Admin login password
```

### Optional
```env
NEXT_PUBLIC_SITE_URL       # Full site URL for SEO
NEXT_PUBLIC_GA_ID          # Google Analytics ID
EMAIL_SERVER               # SMTP server for emails
EMAIL_FROM                 # Sender email address
```

## 📖 Documentation

- [Image Upload Setup](./docs/IMAGE-UPLOAD-SETUP.md)
- [Status & Quick Stats](./docs/STATUS-QUICK-STATS-IMPLEMENTATION.md)
- [Quick Start Guide](./docs/QUICK-START-STATUS-STATS.md)
- [Troubleshooting](./docs/IMAGE-UPLOAD-TROUBLESHOOTING.md)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Novian Fadhilah**
- GitHub: [@nopianpdlh](https://github.com/nopianpdlh)
- Email: novianfadhilah03@gmail.com
- Portfolio: [Your Domain]

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Shadcn/ui](https://ui.shadcn.com/) - UI components
- [Supabase](https://supabase.com/) - Backend platform
- [Vercel](https://vercel.com/) - Deployment platform
- [Framer Motion](https://www.framer.com/motion/) - Animation library

## 📞 Support

For support, email novianfadhilah03@gmail.com or open an issue on GitHub.

---

⭐ **Star this repo if you find it helpful!**

Made with ❤️ by Novian Fadhilah
