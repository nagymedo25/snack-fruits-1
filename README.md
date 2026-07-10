# Snack Fruits Website

Premium IQF Fruits B2B export website — Egypt → GCC markets.
Built with Next.js 16, Prisma, and Neon PostgreSQL.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack, standalone output)
- **Database:** PostgreSQL on [Neon](https://neon.tech)
- **ORM:** Prisma 6
- **UI:** Tailwind CSS v4 + shadcn/ui + Radix
- **Language:** English / Arabic (RTL)
- **Forms:** react-hook-form + zod
- **Auth:** Custom cookie session (bcryptjs)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill in your Neon database URL:

```bash
cp .env.example .env
```

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DBNAME?sslmode=require"
```

### 3. Set up the database

```bash
npm run db:push      # Create/sync tables on Neon
npm run db:generate  # Generate Prisma Client
npm run db:seed      # Seed admin user, products, downloads, settings
npm run db:seed-content  # Seed translatable site strings
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Admin Panel

- **URL:** `/admin`
- **Default login:** `admin@snackfruits.com` / `admin12345`
- **⚠️ Change the default password after first login.**

## Production Build

```bash
npm run build   # Build + copy static assets into standalone output
npm run start   # Run the standalone production server
```

The standalone build is output to `.next/standalone/` and is fully self-contained.

## Database Management

| Command | Description |
|---|---|
| `npm run db:push` | Sync schema to Neon (no migration history) |
| `npm run db:generate` | Regenerate Prisma Client |
| `npm run db:migrate` | Create a migration (dev) |
| `npm run db:reset` | Reset database (⚠️ destructive) |
| `npm run db:seed` | Seed core data |
| `npm run db:seed-content` | Seed translation strings |

## Project Structure

```
prisma/          # Prisma schema
public/          # Static assets (logos, favicons, flags)
scripts/         # Seed scripts
src/
  app/           # Next.js App Router (pages + API routes)
    admin/       # Admin panel
    api/         # REST API endpoints
    blog/        # Blog
  components/     # React components
    ui/          # shadcn/ui components
    pages/       # Page sections
  hooks/         # Custom React hooks
  lib/           # Utilities (db, auth, roles)
```
