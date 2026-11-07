# Yack-Shack — Documentation

## Functionality
Shopify-integrated e-commerce PWA selling **yak fur goods exclusively**. Product browsing, cart
management, and checkout via the Shopify Storefront API (Apollo GraphQL).

In **demo mode** (default), a mock Apollo link serves a spoofed yak-fur catalog (`utils/mockCatalog.js`),
so the store is fully browsable with no Shopify credentials.

## Stack
Nuxt 4 · Vue 3 · Shopify Storefront API (Apollo GraphQL) · @storefront-ui/vue · @vue/apollo-composable ·
Pinia (+persistedstate) · PWA · Tailwind (warm yak-fur palette)

## Steps Taken
- Cloned Shop-Tulu and re-skinned to **Yack-Shack** (name, palette, PWA manifest, copy).
- Added `utils/mockCatalog.js` — 10 yak-fur products + 6 collections in Shopify GraphQL shape (with `__typename`).
- Added a mock `ApolloLink` in `plugins/apollo.ts`, toggled by `runtimeConfig.public.DEMO_MODE`.
- Generated themed SVG fur-swatch imagery via `scripts/gen-fur-images.mjs`.
- Added `ProductColorSwatches` colour picker + image-tint interaction on the product page.
- Added a fur-shimmer hover/loop effect on product cards (input-aware).
- Re-themed the hero (warm aurora, kinetic headline), marquee, categories, testimonials, header/footer.

## Demo mode
- `DEMO_MODE=true` (default) → mock catalog, no Shopify call.
- `DEMO_MODE=false` → real `createHttpLink` to `SHOPIFY_STOREFRONT_ENDPOINT`.

## Pitfalls & Fixes
- **`getShopifyImageUrl` returned `null` for non-Shopify images** (local SVG paths) → broke `srcset`.
  Patched to pass the URL through unchanged.
- **Search results path bug** — `pages/searchProducts.vue` read `searchResult.products.edges` but the
  query returns `{ collection: { products } }`; fixed to `searchResult.collection.products.edges`.
- **Shopify keys via env** — never commit; `.env.example` is key-name-only.
- **`nuxt-security@2.6.0`** needs Node ≥24 → `NODE_VERSION = "24"`.
- **esbuild peer conflict** → `npm install --legacy-peer-deps`.

## Deployment
SSG (`nuxi generate` → `.output/public`), Netlify.

## TODO / Roadmap
See [TODO.md](TODO.md) — spoofed-data flags + improvement backlog.
