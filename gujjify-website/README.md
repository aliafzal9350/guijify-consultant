# Gujjify Consultant — website starter kit for Google AI Studio

A ready-to-import React + Vite + Tailwind project for building the new **gujjify.com** with **Google AI Studio
Build**. It contains the cleaned research data, brand assets, deployment files and the master prompt.
The visible app is a placeholder ("Starter kit loaded") until you run the master prompt.

```
gujjify-website/
├─ MASTER_PROMPT.md        ← the full website spec to give AI Studio
├─ FOLLOW_UP_PROMPTS.md    ← prompts for continuing, polishing, auditing, deploying
├─ DATA_DICTIONARY.md      ← every data field explained
├─ src/data/               ← programmes (72), provinces (21), China map, site copy, tool config, meta
├─ src/types/data.ts       ← TypeScript types; `npm run typecheck` validates the JSON
├─ src/assets/brand/       ← transparent logo crest: gold / white / navy
├─ src/index.css           ← Tailwind v4 + navy & gold brand tokens (same palette as the old site)
└─ public/                 ← .htaccess (Hostinger), robots.txt, sitemap.xml (115 URLs), og-image.png, favicons
```

## ⚠️ Use a separate GitHub repository
AI Studio's **Import from GitHub** rewrites the project for its runtime and then asks you to **force-push** to the
repository. Never import the research repository (`aliafzal9350/guijify-consultant`) — a force-push would replace
its PDFs and research files. Put this folder in its **own** repository.

## Step 1 — Create the website repository
1. On GitHub create an **empty** repository, e.g. `gujjify-website` (Private is fine; no README / .gitignore).
2. In PowerShell copy this folder out of the research repo (skips `node_modules` and `dist`) and push it:

```powershell
robocopy "C:\Users\User\Documents\Gujify consultant\gujjify-website" "C:\Users\User\Documents\gujjify-website" /E /XD node_modules dist
cd "C:\Users\User\Documents\gujjify-website"
git init
git add .
git commit -m "Gujjify website starter kit"
git branch -M main
git remote add origin https://github.com/aliafzal9350/gujjify-website.git
git push -u origin main
```

## Step 2 — Import into AI Studio
1. Open <https://aistudio.google.com/build>, click **+** in the prompt box → **Import from GitHub**.
2. Connect your GitHub account, choose `gujjify-website`, click **Import repository**.
3. Wait for the build. The preview should say **"Starter kit loaded — 72 programmes in 21 provinces and 30 cities"**.
   If it does, the data, theme and logo imported correctly.
4. When the banner offers **Sync to GitHub → Force push**, accept it (safe: this repo is only for the website).

## Step 3 — Build the website
Send this message in the AI Studio chat (or paste the whole MASTER_PROMPT.md):

> Read MASTER_PROMPT.md in the project root and implement it completely, following its build order.

The prompt builds in 5 phases. If it stops early, send **"continue"** (see FOLLOW_UP_PROMPTS.md #1).
Then run the polish and audit prompts (#2–#6). Push to GitHub from AI Studio: ⚙ Settings → **GitHub** → Push.

## Step 4 — Before going live (client approvals)
These items are deliberately hidden in production until confirmed (see `site.json`):
- [ ] Marketing stats (1200+ students, 80+ universities, 500+ scholarships, 7+ years) — what do they count?
- [ ] 5 draft FAQs (marks needed, MBBS & PM&DC, Chinese required, total costs, hostels) — approve the wording;
      check the PM&DC answer against current PM&DC rules.
- [ ] Testimonial from Instagram — written permission from the student.
- [ ] Full Lahore office address (Facebook shows only "Lakshmi Station Lahore") and whether there is a China office.
- [ ] Privacy Policy / Terms / Cookie Policy templates — have them reviewed.
- [ ] Logo: ask for the SVG master (the original is in a Canva Education workspace, design `DAHNTCmo-8Q`).
- [ ] Companies House: the confirmation statement is overdue (was due 31 Aug 2026).

## Step 5 — Deploy
- **Quick preview:** AI Studio → Deploy (Cloud Run) gives a shareable URL.
- **Production on Hostinger (current host of gujjify.com):** back up the old site, then locally run
  `npm install` and `npm run build` and upload the contents of `dist/` to `public_html`.
  `public/.htaccess` forces `https://www.`, serves the app routes, and 301-redirects the old PHP URLs
  (`about.php`, `blog-post.php?slug=…` …) so existing links keep working.
- Optional env vars: `VITE_GA4_ID` (analytics, consent-gated), `VITE_FORM_ENDPOINT` (contact form POST target —
  e.g. the old `/ajax/contact.php` or a form service). Without it the form opens WhatsApp pre-filled.

## Updating the data later
The JSON files are generated from the research repository (`data-pipeline/` scripts) from the brochures and
keyword research. To update: regenerate, copy the JSON into `src/data/`, run `npm run typecheck`, push to GitHub,
then in AI Studio ⚙ → GitHub → **Pull** (AI Studio does not pull automatically).

## Local development
```powershell
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build
```

## Sources & licences
- Programme data: Gujjify's partner brochures (university names removed on purpose).
- Map: Alibaba DataV GeoAtlas China provinces (simplified). Exchange rates: fawazahmed0/currency-api (free, CORS).
- Fonts: Fraunces and Poppins (Google Fonts, SIL Open Font License).
