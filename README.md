# Interquill Prototype
Real-time real estate negotiation portal (Texas TREC forms focus).

## Quick Start
1. Install Supabase: Sign up at supabase.com, create a project, copy your URL + anon key into `.env.local`.
2. Run locally: `npm install && npm run dev`.
3. Deploy: Connect to Vercel → auto-deploys on push.

Demo logins:
- buyer@demo.com / password123
- seller@demo.com / password123

## Structure
- `src/App.tsx`: Dashboard + routes.
- `src/components/FormRenderer.tsx`: Live TREC 1-4 Family form.
- `src/lib/realtime.ts`: Supabase live collab.
- `supabase/schema.sql`: Import to your DB.

Tech: React 18 + TS + Vite + Supabase + Tailwind.
