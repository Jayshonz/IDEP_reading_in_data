# beehiiv Ad Network — Case Study Showcase

A public-facing gallery for beehiiv advertiser case studies. Team members can add new entries via a protected admin dashboard.

## Stack

- **Next.js 14** (App Router)
- **Supabase** — Postgres + auth
- **Tailwind CSS**
- **Vercel** — hosting

## Setup

### 1. Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Run `supabase-setup.sql` in the Supabase SQL editor
3. Go to **Authentication → Users** and manually create accounts for team members

### 2. Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Find these in your Supabase project under **Settings → API**.

### 3. Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Deploy to Vercel

1. Push this repo to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. Add the two environment variables in Vercel's project settings
4. Deploy

## Usage

- **Public gallery**: `/` — anyone can browse case studies
- **Admin**: `/admin` — requires login; add or delete case studies
- **Login**: `/admin/login` — email/password (accounts created in Supabase dashboard)
