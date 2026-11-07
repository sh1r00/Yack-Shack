# Yack-Shack
*where warmth meets herd — yak fur, elevated*

**Category: E-Commerce Demo (spoofed catalog)**  
**Stack:** Nuxt 4 · Vue 3 · Shopify Storefront API (Apollo GraphQL) · Pinia · Tailwind · PWA

> ⚠️ **This is a DEMO clone of Shop-Tulu.** The catalog is **spoofed** — placeholder
> products, prices, images (generated SVG fur swatches) and reviews. It ships with
> `DEMO_MODE=true`, which serves a local yak-fur catalog *without* hitting Shopify.
> Set `DEMO_MODE=false` and provide real Shopify keys to use it as a live storefront.

## What this is

A Shopify-integrated e-commerce storefront that deals **exclusively in yak fur goods** —
throws, slippers, beanies, pillows, rugs, scarves, clutches, ear muffs, vests and more.
It keeps the full Shopify plumbing (Apollo GraphQL → Storefront API) but, in demo mode,
swaps in a rich local catalog.

## The yak-fur treatment

- **10 products** across 6 collections (blankets, home decor, accessories, apparel, footwear)
- **8 colourways** — Tibetan Cream, Himalayan Gold, Highland Brown, Smoky Charcoal, Glacier Grey, Sunset Copper, Midnight Yak, Snow Yak
- **Colour swatch picker** on the product page that tints the hero image to the chosen fur colour
- **Fur-shimmer** — a light sheen sweeps across product cards on hover (loops on touch)
- **Warm aurora hero** — kinetic headline, cursor spotlight, 3D tilt, parallax, magnetic CTAs
- **Film grain + scroll-reveal** overlays (input-aware: hover on desktop, scroll/tap on mobile)

## Quick Start

```bash
npm install --legacy-peer-deps   # esbuild peer conflict
npm run dev                      # DEMO_MODE defaults to true → spoofed catalog
```

### Connect to a real Shopify store

1. `cp .env.example .env`
2. Set `DEMO_MODE=false` + your `SHOPIFY_STOREFRONT_ENDPOINT` / `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
3. `npm run dev`

## Build & test

```bash
npm run test      # Vitest
npm run generate  # SSG → .output/public (Netlify)
```

## Docs

- [DOCUMENTATION.md](DOCUMENTATION.md) — functionality, demo mode, pitfalls
- [TODO.md](TODO.md) — spoofed-data flags + improvement backlog

---

*Cloned from [Shop-Tulu](https://github.com/sh1r00/Shop-Tulu) — made with ❤️ by shiro — rasisg@gmail.com — github.com/sh1r00*
