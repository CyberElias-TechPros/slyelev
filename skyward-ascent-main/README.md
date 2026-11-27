# SLY Elevators — Website

Marketing site for SLY Elevators: premium elevator systems, architectural glass
partitions, and solar energy across Nigeria.

**Stack:** React 19 · TanStack Start (SSR) · TanStack Router · Tailwind CSS v4 ·
Vite 7 · deployable to Cloudflare Workers (`vite.config.ts`) or Vercel/Nitro
(`vite.config.vercel.ts`).

## Getting started

```bash
bun install          # install dependencies (bun.lock is canonical)
bun run dev          # dev server with HMR on :8080
```

Other scripts:

| Script                 | What it does                                  |
| ---------------------- | --------------------------------------------- |
| `bun run build`        | Production build → Cloudflare `.output/`      |
| `bun run build:vercel` | Production build → Vercel/Nitro               |
| `bun run typecheck`    | `tsc --noEmit`                                |
| `bun run test`         | Unit tests (vitest, single run)               |
| `bun run test:watch`   | Unit tests in watch mode                      |
| `bun run lint`         | ESLint (formatting issues → `bun run format`) |
| `bun run format`       | Prettier write                                |

## Architecture

- `src/routes/` — file-based routes (TanStack Router). Each route exports
  `head()` built through `src/lib/seo.ts` so every page ships full SEO meta
  (title, description, canonical, Open Graph, Twitter card).
- `src/lib/site.ts` — **single source of truth** for company data (address,
  phones, emails, WhatsApp number, domain). Navbar, Footer, contact, quote,
  WhatsApp FAB, JSON-LD and the sitemap all read from here.
- `src/lib/inquiry.ts` + `src/lib/use-inquiry.ts` — the quote/contact flow.
  The site has no backend: submissions validate client-side, open the
  visitor's mail client with a fully-encoded message, and always offer
  WhatsApp deep-link and copy-to-clipboard fallbacks. Encoding and validation
  are unit-tested.
- `src/routes/sitemap[.]xml.ts` — server-generated sitemap with absolute
  canonical URLs (kept in sync when pages are added).
- `src/server.ts` / `src/start.ts` — SSR entry + middleware that applies
  security headers to every response and renders a branded error page on
  catastrophic failures.
- `public/` — favicons/PWA icons (generated from `src/assets/sly-logo.png`),
  `og-image.png`, `site.webmanifest`, `robots.txt`, `security.txt`.

## Deployment

- **Cloudflare Workers:** `bun run build`, deploy `.output/` (wrangler config
  in `wrangler.jsonc`).
- **Vercel:** `bun run build:vercel` (config in `vercel.json` + the Nitro
  adapter in `vite.config.vercel.ts`).

Per `AGENTS.md`: keep the Cloudflare preview adapter in `vite.config.ts` and
the Vercel adapter in `vite.config.vercel.ts` — the hosts need different
server adapters.

## Adding a page (checklist)

1. Create `src/routes/<page>.tsx` with `createFileRoute` and a `head()` built
   from `seo({ ... })` (title, description, path, image).
2. Add the route to `src/routes/sitemap[.]xml.ts`.
3. If it should appear in navigation, add it to `src/components/Navbar.tsx`
   and/or the Footer link lists.
4. Link to it with `<Link to="...">` (never raw `<a href>` for internal
   pages) so client-side navigation keeps working.
