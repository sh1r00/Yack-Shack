# TODO / Spoofed-data flags

> This clone ships a **spoofed** catalog (`DEMO_MODE=true`). Everything below is fabricated
> or placeholder and MUST be replaced before this is used as a real storefront.

## 🔑 Required keys (owner to supply — all in `.env`, see `.env.example`)
- **Shopify Storefront API** — set `DEMO_MODE=false` and paste real values:
  - `SHOPIFY_STOREFRONT_ENDPOINT` (e.g. `https://<store>.myshopify.com/api/2023-10/graphql`)
  - `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- **Analytics (Umami)** — set `NUXT_PUBLIC_UMAMI_WEBSITE_ID` to enable tracking.
  - `NUXT_PUBLIC_UMAMI_SRC` (default `https://cloud.umami.is/script.js`)

> **Checkout / payment / inventory need no extra keys** — they all flow through the Shopify
> Storefront API once the two keys above are set:
> - **Checkout + payment** — `cartCreate` / `getCheckoutUrl()` → Shopify checkout URL (Shopify Payments).
> - **Inventory** — `availableForSale` + `quantityAvailable` on variants (out-of-stock handled in the UI).
> - **Logging** — winston (`plugins/00.logging.server.ts`, `LOG_LEVEL`) writes rotating server logs.
> - **Tracking** — `plugins/analytics.client.ts` (Umami) fires `view_product` / `add_to_cart` / `begin_checkout`.

## Spoofed / placeholder (flag ⚠️)
- [ ] **Products** — 10 yak-fur items in `utils/mockCatalog.js` are invented (titles, prices, copy, tags).
- [ ] **Prices** — invented price points; no real inventory or cost basis.
- [ ] **Product imagery** — generated SVG fur swatches (`public/images/yak/`), not real product photography.
- [ ] **Reviews/testimonials** — `components/TestimonialsCarousel` is illustrative copy.
- [ ] **Hero stats** — "10 styles / 8 colourways" reflect the demo catalog only.
- [ ] **Checkout** — demo mode has no `checkoutUrl`; the real payment flow needs the Shopify keys above.
- [ ] **Cart "savings"** — `components/Cart/CartSummary.vue` hardcodes `savings: 77.50`; replace with a computed value.
- [ ] **Social links** (footer) — inherited placeholder handles from Shop-Tulu.
- [ ] **App icons/favicon** — still the Shop-Tulu icon set (`public/icons/`); needs a yak-branded icon.

## Improvement backlog
- [ ] Real yak-fur photography (or commissioned product shots) to replace SVG swatches.
- [ ] Point the Shopify storefront to a live yak-goods store (set `DEMO_MODE=false` + keys).
- [ ] Brand icon/favicon + PWA maskable icons in yak motif.
- [ ] Wire real reviews (Shopify Product Reviews) instead of static carousel.
- [ ] Per-variant pricing (currently all colourways share one price) and true multi-image galleries.
- [ ] Size variants (many products are one-size) + inventory sync.
- [ ] SEO pass on product/collection pages (SPA limits apply — see `nuxt4-seo`).
- [ ] Accessibility: colour swatch buttons already have `aria-label`/`aria-pressed`; audit contrast of the warm palette.
- [ ] Search: header search now returns demo results; add a dedicated results header/sort UI.
