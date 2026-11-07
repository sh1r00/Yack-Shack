// Generates self-contained yak-fur SVG swatch/product images into public/images/yak/.
// No external deps — run with: node scripts/gen-fur-images.mjs
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT = join(__dirname, '..', 'public', 'images', 'yak')

// ── Yak fur colourway palette (shared with utils/mockCatalog.js) ─────────────
const COLORS = [
  { name: 'Tibetan Cream', slug: 'tibetan-cream', hex: '#E8DCC3' },
  { name: 'Himalayan Gold', slug: 'himalayan-gold', hex: '#C89B5A' },
  { name: 'Highland Brown', slug: 'highland-brown', hex: '#8B5E3C' },
  { name: 'Smoky Charcoal', slug: 'smoky-charcoal', hex: '#4A3F3A' },
  { name: 'Glacier Grey', slug: 'glacier-grey', hex: '#B8B2A8' },
  { name: 'Sunset Copper', slug: 'sunset-copper', hex: '#A9652E' },
  { name: 'Midnight Yak', slug: 'midnight-yak', hex: '#2E2A28' },
  { name: 'Snow Yak', slug: 'snow-yak', hex: '#F4EEE2' },
]

// Products → { slug, title, color } (primary swatch colour used for hero image)
const PRODUCTS = [
  ['himalayan-yak-throw', 'Himalayan Yak Throw', 'himalayan-gold'],
  ['yak-fur-slippers', 'Yak Fur Slippers', 'highland-brown'],
  ['yak-fur-beanie', 'Yak Fur Beanie', 'glacier-grey'],
  ['yak-fur-pillow-set', 'Yak Fur Pillow Set', 'tibetan-cream'],
  ['yak-fur-area-rug', 'Yak Fur Area Rug', 'himalayan-gold'],
  ['yak-fur-scarf', 'Yak Fur Scarf', 'sunset-copper'],
  ['yak-fur-clutch', 'Yak Fur Clutch', 'midnight-yak'],
  ['yak-fur-ear-muffs', 'Yak Fur Ear Muffs', 'highland-brown'],
  ['yak-fur-vest', 'Yak Fur Vest', 'smoky-charcoal'],
  ['yak-fur-hot-water-bottle', 'Yak Fur Bottle Cover', 'tibetan-cream'],
]

// ── tiny color utils ─────────────────────────────────────────────────────────
function hexToRgb(hex) {
  const h = hex.replace('#', '')
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}
function rgbToHex(r, g, b) {
  const c = (n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0')
  return `#${c(r)}${c(g)}${c(b)}`
}
function shade(hex, amt) {
  const [r, g, b] = hexToRgb(hex)
  return rgbToHex(r + amt, g + amt, b + amt)
}
// mulberry32 seeded PRNG for deterministic strands
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// ── fur texture strand field ────────────────────────────────────────────────
function furStrands(hex, seed = 7) {
  const rand = mulberry32(seed)
  const strands = []
  const count = 150
  for (let i = 0; i < count; i++) {
    const x = rand() * 600
    const len = 40 + rand() * 160
    const y = -10 + rand() * 60
    const sway = 4 + rand() * 14
    const w = 1.2 + rand() * 2.6
    const a = 0.18 + rand() * 0.5
    const tone = shade(hex, Math.round(-40 + rand() * 90))
    const mid = x + sway / 2
    strands.push(
      `<path d="M ${x.toFixed(1)} ${y.toFixed(1)} C ${mid.toFixed(1)} ${(y + len * 0.4).toFixed(1)}, ${(x - sway * 0.4).toFixed(1)} ${(y + len * 0.7).toFixed(1)}, ${x.toFixed(1)} ${(y + len).toFixed(1)}" stroke="${tone}" stroke-width="${w.toFixed(2)}" fill="none" stroke-linecap="round" opacity="${a.toFixed(2)}"/>`
    )
  }
  return strands.join('')
}

// ── full swatch SVG (base + strands + vignette) ─────────────────────────────
function swatchSvg(hex, seed = 7) {
  const top = shade(hex, 28)
  const bottom = shade(hex, -46)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
  <defs>
    <linearGradient id="base" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${top}"/>
      <stop offset="1" stop-color="${bottom}"/>
    </linearGradient>
    <radialGradient id="vig" cx="0.5" cy="0.42" r="0.75">
      <stop offset="0.55" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.28"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#base)"/>
  ${furStrands(hex, seed)}
  <rect width="600" height="600" fill="url(#vig)"/>
</svg>`
}

// ── product hero SVG (swatch + name label) ──────────────────────────────────
function productSvg(title, hex, seed = 7) {
  const label = title.length > 22 ? title.slice(0, 21) + '…' : title
  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="900" viewBox="0 0 900 900">
  <defs>
    <linearGradient id="base" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${shade(hex, 28)}"/>
      <stop offset="1" stop-color="${shade(hex, -46)}"/>
    </linearGradient>
    <radialGradient id="vig" cx="0.5" cy="0.42" r="0.75">
      <stop offset="0.55" stop-color="#000" stop-opacity="0"/>
      <stop offset="1" stop-color="#000" stop-opacity="0.28"/>
    </radialGradient>
  </defs>
  <rect width="900" height="900" fill="url(#base)"/>
  <g transform="translate(150 0)">${furStrands(hex, seed)}</g>
  <rect width="900" height="900" fill="url(#vig)"/>
  <g transform="translate(0 700)">
    <rect width="900" height="120" fill="#000000" fill-opacity="0.42"/>
    <text x="450" y="72" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="44" fill="#FFFFFF" letter-spacing="1">${label}</text>
  </g>
</svg>`
}

// ── write everything ─────────────────────────────────────────────────────────
mkdirSync(join(OUT, 'swatches'), { recursive: true })
mkdirSync(join(OUT, 'products'), { recursive: true })

for (const c of COLORS) {
  writeFileSync(join(OUT, 'swatches', `${c.slug}.svg`), swatchSvg(c.hex, c.slug.length * 13))
}

for (const [slug, title, color] of PRODUCTS) {
  const c = COLORS.find((x) => x.slug === color) || COLORS[0]
  writeFileSync(join(OUT, 'products', `${slug}.svg`), productSvg(title, c.hex, slug.length * 11))
}

console.log(`Generated ${COLORS.length} swatches + ${PRODUCTS.length} product images in ${OUT}`)
