# Project Architecture

- Keep Vercel's Nitro deployment in `vite.config.vercel.ts` and leave `vite.config.ts` on the existing preview adapter; the two hosts require different server adapters.