# Deploy NyumbaHub to Vercel

NyumbaHub runs on Vercel as a **React frontend** plus **serverless API** (Express).

## Before you deploy

1. Install [Git](https://git-scm.com/) and create a [GitHub](https://github.com) account.
2. Install [Vercel CLI](https://vercel.com/docs/cli) (optional): `npm i -g vercel`

## Step 1 — Push code to GitHub

In PowerShell, from the project folder:

```powershell
cd c:\Users\admin\Desktop\NyumbaHub
git init
git add .
git commit -m "Prepare NyumbaHub for Vercel"
```

Create a new empty repo on GitHub (e.g. `nyumbahub`), then:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/nyumbahub.git
git branch -M main
git push -u origin main
```

## Step 2 — Import on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in (use **Continue with GitHub**).
2. Click **Add New… → Project**.
3. Import your `nyumbahub` repository.
4. Vercel should detect these settings automatically (from `vercel.json`):

   | Setting | Value |
   |---------|--------|
   | Framework Preset | Other |
   | Build Command | `npm run build:vercel` |
   | Output Directory | `client/dist` |
   | Install Command | `npm run install:vercel` |

5. Click **Deploy** and wait 2–3 minutes.

Your site will be live at `https://your-project.vercel.app`.

## Step 3 — Test the live site

- Open the URL Vercel gives you.
- Browse houses (Green House, Blue House, etc.).
- Submit a test application and note the reference number.
- Use **Pay Rent** with that reference (click **Simulate Approval** first in demo mode).

## Deploy from CLI (alternative)

```powershell
cd c:\Users\admin\Desktop\NyumbaHub
npm install
npx vercel login
npx vercel
```

Follow prompts. For production:

```powershell
npx vercel --prod
```

## Important notes

### Applications on Vercel

Vercel serverless functions **cannot save files permanently**. Applications and payments are kept **in memory** while the function is warm. They work for demos, but:

- Data may reset after idle time or a new deployment.
- Always save your **application reference number** locally.

For production, add a database later (e.g. [Vercel Postgres](https://vercel.com/storage/postgres), Supabase, or MongoDB Atlas).

### Custom domain

In the Vercel project → **Settings → Domains**, add your domain (e.g. `nyumbahub.co.ke`) and follow DNS instructions.

### Redeploy after changes

Push to GitHub — Vercel redeploys automatically. Or run `npx vercel --prod` from the project folder.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| API returns 404 | Ensure `api/index.js` exists and `vercel.json` rewrites are committed. |
| Empty listings | Run `npm run seed` locally, commit `server/data/*.json`, push again. |
| Build fails | Check build logs; run `npm run build:vercel` locally to reproduce. |
