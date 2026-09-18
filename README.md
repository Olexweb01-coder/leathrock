# Leathrock

The Leathrock website — Next.js 14 (App Router, TypeScript), static export, no database required.

## Requirements

**Node 20.9 or newer.** Check with `node -v`; if it is lower, install the current LTS from nodejs.org.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in ./out
```

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel, **Add New → Project** and import the repo.
3. Framework preset is detected automatically. No environment variables are required.
4. Deploy.

`next.config.mjs` sets `output: 'export'`, so the build produces a fully static site in `out/`.
Remove that line if you later add API routes or server actions.

## Pages

| Route | What it is |
|---|---|
| `/` | Home — hero, short about, branches preview, courses preview, voices, contact |
| `/about` | The Chief — full introduction |
| `/branches` | All three branches listed side by side |
| `/branches/leathcity` | LeathCity — mission, the three Cores, rate lock, FAQ, how to join |
| `/branches/leathroom` | Leathroom — what it is, how it runs, how to join |
| `/branches/events` | Events — El-Preneur and past gatherings, with reviews |
| `/courses` | All courses |
| `/courses/tlnac` | TLNAC — full curriculum and how to buy |
| `/courses/women-leadership` | Women Leadership Training |
| `/voices` | Every testimonial |
| `/contact` | WhatsApp presets, phone, email |
| `/admin` | Add events, courses and event reviews |

## Editing content

Almost everything lives in **`content/site.json`**. Change the text there, redeploy, done.
No component edits needed for copy changes, prices, FAQs, mission points or testimonials.

Images are in `public/img/`. Replace a file with the same name to swap it everywhere.

## The admin page

`/admin` is gated by a passphrase. The default is `leathrock` — change it by setting
`NEXT_PUBLIC_ADMIN_PASS` in Vercel's environment variables.

Anything added there is saved in **that browser only** (localStorage) and appears immediately on
the site for that person. To publish it for everyone:

1. Add the items in `/admin`.
2. Click **Export JSON**.
3. Merge the exported entries into `content/site.json` and push.

> This is a soft gate, not real security. Before the admin page holds anything sensitive, put it
> behind Vercel Password Protection or swap `lib/store.ts` for a real database — that file is the
> only thing that has to change.

### Connecting a real database later

`lib/store.ts` exposes `read()` and `write()`. Point those at Vercel Postgres, Supabase, Sanity or
any API and every page keeps working unchanged.

## Contact links

Phone, email and WhatsApp live in `content/site.json` under `site`. Every WhatsApp button builds a
pre-written message through `wa()` in `lib/content.ts`, so Leathrock always sees which page the
person came from.

## Notes on accuracy

Content is drawn from the supplied brand material. Two things were deliberately left open because
the source didn't confirm them:

- **The LeathCity access fee.** Only the ₦5,000 minimum rate-lock is stated. The full fee is
  described as "confirmed directly before you pay".
- **Event dates.** El-Preneur's most recent date is not published. Add it in `/admin` or in
  `content/site.json` when you have it.
