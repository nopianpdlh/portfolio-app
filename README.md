# Portfolio & CMS ProjectThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



Portfolio website dengan Admin Panel (CMS) menggunakan Next.js, TypeScript, Tailwind CSS, dan Prisma.## Getting Started



## Tech StackFirst, run the development server:



- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Shadcn/ui```bash

- **Animation**: Framer Motionnpm run dev

- **Database**: PostgreSQL (Supabase)# or

- **ORM**: Prismayarn dev

- **Authentication**: NextAuth.js# or

- **Deployment**: Vercelpnpm dev

# or

## Setup Instructionsbun dev

```

### 1. Install Dependencies

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

```bash

npm installYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

```

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### 2. Setup Environment Variables

## Learn More

Copy `.env.example` to `.env` dan isi dengan credentials Anda:

To learn more about Next.js, take a look at the following resources:

```bash

# Windows PowerShell- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

copy .env.example .env- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

```

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

### 3. Setup Supabase

## Deploy on Vercel

1. Buat project baru di [Supabase](https://supabase.com)

2. Copy connection string dari Settings > DatabaseThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

3. Update `DATABASE_URL` dan `DIRECT_URL` di `.env`

4. Copy API keys dari Settings > APICheck out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

5. Update `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Generate NextAuth Secret

```bash
# Gunakan Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy hasilnya ke `NEXTAUTH_SECRET` di `.env`

### 5. Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Push schema ke database
npx prisma db push
```

### 6. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Project Structure

```
portfolio/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── admin/            # Admin panel pages
│   │   ├── api/              # API routes
│   │   └── page.tsx          # Homepage
│   ├── components/
│   │   ├── ui/               # Shadcn components
│   │   ├── admin/            # Admin components
│   │   ├── portfolio/        # Portfolio components
│   │   └── animations/       # Animation components
│   ├── lib/                  # Utility functions
│   └── types/                # TypeScript types
└── public/                   # Static assets
```

## Features

### Portfolio (Public)
- Homepage dengan hero section
- Project showcase dengan filtering
- About page
- Experience timeline
- Contact form

### Admin Panel (Protected)
- Dashboard overview
- Project management (CRUD)
- About section editor
- Experience management
- Contact messages inbox
- Site settings

## Database Schema

- **User**: Admin authentication
- **Project**: Portfolio projects
- **About**: About page content
- **Experience**: Work experience
- **Contact**: Contact form submissions
- **Settings**: Site-wide settings

## Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open Prisma Studio (database GUI)
```

## Deployment ke Vercel

1. Push code ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Add environment variables di Vercel dashboard
4. Deploy!

### Environment Variables untuk Production

- `DATABASE_URL`
- `DIRECT_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXTAUTH_URL` (URL production Anda)
- `NEXTAUTH_SECRET`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

## License

MIT
