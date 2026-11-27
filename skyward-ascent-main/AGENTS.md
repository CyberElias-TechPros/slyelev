# Project Architecture

- Keep Vercel's Nitro deployment in `vite.config.vercel.ts` and leave `vite.config.ts` on the existing preview adapter; the two hosts require different server adapters.
- `bun.lock` is the canonical lockfile; keep dependency versions pinned to it (`@tanstack/react-start` and `@tanstack/router-plugin` are pinned exactly in `package.json` because newer react-start majors require Vite ≥ 8).
- Every route's `head()` must be built through `src/lib/seo.ts` so canonical URLs, Open Graph and Twitter tags stay complete and consistent.
- Company data (phones, emails, WhatsApp, address, domain) lives only in `src/lib/site.ts` — update it there, never inline it in components.
- Internal navigation must use `<Link>` from TanStack Router, not raw `<a href>`, so SPA navigation and route preloading keep working.
- When adding a route, also add it to the sitemap (`src/routes/sitemap[.]xml.ts`) with an absolute URL.
- Form flows (quote/contact/newsletter) are mailto/WhatsApp handoffs via `src/lib/use-inquiry.ts`; keep validation + fallback behavior consistent with the unit tests in `src/lib/*.test.ts`.
- Verify before shipping: `bun run typecheck && bun run test && bun run build`.
