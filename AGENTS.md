# AGENTS.md — Yack-Shack

> Shopify-integrated e-commerce PWA that sells **yak fur goods only** — a themed,
> spoofed-catalog clone of Shop-Tulu. Read this, then `README.md` + `DOCUMENTATION.md` + `TODO.md`.

## What it is
Full Shopify-integrated storefront (Apollo GraphQL → Shopify Storefront API). Runs as a **SPA**
(`ssr: false`). Ships with **`DEMO_MODE=true`** (default) which serves a local yak-fur catalog via a
mock Apollo link — no Shopify credentials required.

## Stack
| Layer | Tech |
|-------|------|
| Frontend | Nuxt 4 (`compatibilityVersion: 4`) · Vue 3 · `ssr: false` (SPA) |
| Commerce | Shopify Storefront API — Apollo GraphQL (`@vue/apollo-composable`) |
| Demo data | `utils/mockCatalog.js` → `plugins/apollo.ts` (mock `ApolloLink`) |
| UI | `@storefront-ui/vue` · Tailwind (warm yak-fur palette in `tailwind.config.js`) |
| State | Pinia + `pinia-plugin-persistedstate-2` |
| PWA / Security | `@vite-pwa/nuxt` · `nuxt-security` |

## How the spoofed catalog works
- `utils/mockCatalog.js` defines 10 yak-fur products + collections in **Shopify GraphQL shape** (`__typename` on every node so Apollo caches cleanly), plus an in-memory demo cart.
- `plugins/apollo.ts` builds a mock `ApolloLink` that resolves each operation by name (`shop`, `collection`, `product`, `checkoutURL`, `cartCreate`, `cartLinesAdd/Update/Remove`) and returns `resolveMock(operationName, variables)`.
- Toggled by `runtimeConfig.public.DEMO_MODE` (`process.env.DEMO_MODE !== 'false'`). `false` → real `createHttpLink` to Shopify.
- Product imagery = generated SVG fur swatches (`scripts/gen-fur-images.mjs` → `public/images/yak/`). `utils/getShopifyImageUrl.ts` was patched to **pass through** non-Shopify URLs (was returning `null` → broken srcset).

## Key conventions & pitfalls
- **Demo data is fabricated** — flag anything fake (prices, reviews, stats) via `TODO.md` + the in-app DEMO banner. Do not present it as real.
- **`ssr: false` is one-way** — do not try to opt content routes back into SSR.
- **`nuxt-security@2.6.0` needs Node ≥24** → `NODE_VERSION = "24"`.
- **esbuild peer conflict** → `npm install --legacy-peer-deps`.
- Pinia: direct import only. SSR guards: `typeof window !== 'undefined'` (never `import.meta.client`).
- Atomic design: `A*` atoms → `M*` molecules → `O*` organisms.
- `components.pathPrefix` default → `MMarquee.vue` at `components/` root auto-imports as `MMarquee` (do not move into a subdir).
- Colourway map (`name → slug → hex`) is duplicated in `utils/mockCatalog.js` and `components/ProductColorSwatches/ProductColorSwatches.vue` — keep both in sync when adding colours.

## Skills to load
- `viral-m3-aesthetics` · `input-aware-interactions` · `zeitgeist-aesthetics`
- `nuxt4-development` · `nuxt4-seo` · `webapp-security-hardening` · `interaction-feedback` · `nuxt4-pwa-pitfalls`

## Definition of done
`npm run test` passes + `npm run build` succeeds + committed + pushed.
