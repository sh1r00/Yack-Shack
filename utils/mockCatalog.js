// ─────────────────────────────────────────────────────────────────────────────
// Yack-Shack DEMO catalog — spoofed yak-fur products in Shopify GraphQL shape.
// Used by plugins/apollo.ts when runtimeConfig.public.DEMO_MODE is true.
// ⚠️  ALL data below is fabricated/placeholder for the demo. Product imagery is
//     generated SVG fur-swatches (see scripts/gen-fur-images.mjs), prices are
//     invented, stats/reviews are illustrative. Swap for real Shopify data by
//     setting DEMO_MODE=false and pointing at a live storefront.
// ─────────────────────────────────────────────────────────────────────────────

export const DEMO = true

// ── Colourways (shared with scripts/gen-fur-images.mjs) ──────────────────────
export const YAK_COLORS = [
  { name: 'Tibetan Cream', slug: 'tibetan-cream', hex: '#E8DCC3' },
  { name: 'Himalayan Gold', slug: 'himalayan-gold', hex: '#C89B5A' },
  { name: 'Highland Brown', slug: 'highland-brown', hex: '#8B5E3C' },
  { name: 'Smoky Charcoal', slug: 'smoky-charcoal', hex: '#4A3F3A' },
  { name: 'Glacier Grey', slug: 'glacier-grey', hex: '#B8B2A8' },
  { name: 'Sunset Copper', slug: 'sunset-copper', hex: '#A9652E' },
  { name: 'Midnight Yak', slug: 'midnight-yak', hex: '#2E2A28' },
  { name: 'Snow Yak', slug: 'snow-yak', hex: '#F4EEE2' },
]
const colorBySlug = (slug) => YAK_COLORS.find((c) => c.slug === slug)
const colorByName = (name) => YAK_COLORS.find((c) => c.name === name)

// ── tiny builders ────────────────────────────────────────────────────────────
const money = (amount) => ({ __typename: 'MoneyV2', amount: String(amount.toFixed(2)), currencyCode: 'USD' })
const priceRange = (min, max) => ({
  __typename: 'ProductPriceRange',
  minVariantPrice: money(min),
  maxVariantPrice: money(max),
})

const img = (src, alt = '') => ({
  __typename: 'Image',
  id: `gid://shopify/Image/${src.replace(/[^a-z0-9]/gi, '')}`,
  altText: alt,
  url: src,
  width: 900,
  height: 900,
})

function makeVariants(handle, colorNames, price, skuPrefix) {
  return colorNames.map((name, i) => {
    const c = colorByName(name) || YAK_COLORS[0]
    return {
      cursor: String.fromCharCode(97 + i),
      node: {
        __typename: 'ProductVariant',
        id: `gid://shopify/ProductVariant/${handle}-${c.slug}`,
        availableForSale: true,
        currentlyNotInStock: false,
        quantityAvailable: 50,
        priceV2: money(price),
        compareAtPriceV2: null,
        selectedOptions: [{ __typename: 'SelectedOption', name: 'Color', value: c.name }],
        sku: `${skuPrefix}-${c.slug.toUpperCase().replace(/-/g, '')}`,
        title: c.name,
      },
    }
  })
}

// ── product factory ──────────────────────────────────────────────────────────
// Each product: title, handle, type, colors, price, compareAt (optional), copy.
const RAW = [
  {
    handle: 'himalayan-yak-throw', title: 'Himalayan Yak Throw', type: 'Blanket', vendor: 'Yack-Shack',
    colors: ['Tibetan Cream', 'Himalayan Gold', 'Highland Brown', 'Smoky Charcoal'],
    price: 129, compareAt: 179,
    tagline: 'A cloud of warmth, spun from high-altitude yak.',
    copy: [
      'Woven from the down-soft undercoat of Himalayan yak, this throw is the warmest layer in the house — and the lightest.',
      'Each fibre is hollow, so it traps heat without weight, and it breathes so you never overheat.',
    ],
    tags: ['yak-fur', 'blanket', 'handmade', 'ethical'],
  },
  {
    handle: 'yak-fur-slippers', title: 'Yak Fur Slippers', type: 'Footwear', vendor: 'Yack-Shack',
    colors: ['Highland Brown', 'Smoky Charcoal', 'Sunset Copper'],
    price: 89, compareAt: null,
    tagline: 'Walk on a warm, woolly cloud indoors.',
    copy: [
      'Full yak-fur lining wraps your feet in a silky, springy cushion that molds to you with every wear.',
      'The natural crimp of the fibre traps a pocket of warm air that keeps toes toasty without ever getting sweaty.',
    ],
    tags: ['yak-fur', 'footwear', 'cozy', 'ethical'],
  },
  {
    handle: 'yak-fur-beanie', title: 'Yak Fur Beanie', type: 'Accessories', vendor: 'Yack-Shack',
    colors: ['Glacier Grey', 'Midnight Yak', 'Himalayan Gold'],
    price: 45, compareAt: 55,
    tagline: 'Head warmth that sheds wind, not fibres.',
    copy: [
      'Knitted from yak wool with a plush fur band, this beanie is wind-proof, itch-free and warm to −20°C.',
      'Naturally moisture-wicking — it stays dry and odor-free through a full winter of daily wear.',
    ],
    tags: ['yak-fur', 'beanie', 'winter', 'ethical'],
  },
  {
    handle: 'yak-fur-pillow-set', title: 'Yak Fur Pillow Set', type: 'Home', vendor: 'Yack-Shack',
    colors: ['Tibetan Cream', 'Highland Brown', 'Glacier Grey'],
    price: 79, compareAt: null,
    tagline: 'Sofa-soft fur covers with a sculptural sheen.',
    copy: [
      'Set of two lumbar cushions covered in brushed yak fur with a hidden zip for easy care.',
      'The fibres catch the light in a way synthetics can\u2019t, giving every room a warm, hand-finished glow.',
    ],
    tags: ['yak-fur', 'home', 'pillow', 'handmade'],
  },
  {
    handle: 'yak-fur-area-rug', title: 'Yak Fur Area Rug', type: 'Home', vendor: 'Yack-Shack',
    colors: ['Himalayan Gold', 'Highland Brown', 'Smoky Charcoal'],
    price: 349, compareAt: 429,
    tagline: 'A statement floor piece with deep, springy pile.',
    copy: [
      'Hand-tufted from long-staple yak fur into a dense, cushioned pile that feels like walking on moss.',
      'Naturally stain-resistant and easy to shake out — no shedding, no matting, just years of softness.',
    ],
    tags: ['yak-fur', 'rug', 'home', 'handmade'],
  },
  {
    handle: 'yak-fur-scarf', title: 'Yak Fur Scarf', type: 'Accessories', vendor: 'Yack-Shack',
    colors: ['Sunset Copper', 'Glacier Grey', 'Midnight Yak'],
    price: 59, compareAt: null,
    tagline: 'A silky, wind-blocking wrap that breathes.',
    copy: [
      'Woven yak down with a fur-trimmed hem — soft against the neck, warm enough for a highland wind.',
      'Lighter and warmer than cashmere, and it only gets softer with every wash.',
    ],
    tags: ['yak-fur', 'scarf', 'winter', 'ethical'],
  },
  {
    handle: 'yak-fur-clutch', title: 'Yak Fur Clutch', type: 'Bags', vendor: 'Yack-Shack',
    colors: ['Midnight Yak', 'Himalayan Gold'],
    price: 149, compareAt: null,
    tagline: 'A fur-trimmed clutch with a magnetic close.',
    copy: [
      'Structured clutch wrapped in a band of brushed yak fur, lined in soft micro-suede.',
      'Fits a phone, card case and lip colour — the one evening bag that turns heads and holds warmth.',
    ],
    tags: ['yak-fur', 'bags', 'accessories', 'handmade'],
  },
  {
    handle: 'yak-fur-ear-muffs', title: 'Yak Fur Ear Muffs', type: 'Accessories', vendor: 'Yack-Shack',
    colors: ['Highland Brown', 'Snow Yak', 'Sunset Copper'],
    price: 39, compareAt: null,
    tagline: 'Feather-light warmth that cups, never crushes.',
    copy: [
      'Plush yak-fur pads on a spring-flex band — full ear coverage without the pressure of a headband.',
      'The natural crimp seals out wind while letting sound through, so you stay aware and warm.',
    ],
    tags: ['yak-fur', 'earmuffs', 'winter', 'ethical'],
  },
  {
    handle: 'yak-fur-vest', title: 'Yak Fur Vest', type: 'Apparel', vendor: 'Yack-Shack',
    colors: ['Highland Brown', 'Smoky Charcoal', 'Tibetan Cream'],
    price: 289, compareAt: 349,
    tagline: 'Core warmth, unrestricted arms — the layering MVP.',
    copy: [
      'A quilted outer shell with a full yak-fur lining that keeps your core toasty while arms stay free.',
      'Cut for layering over a sweater or under a shell; warm to −15°C and machine-washable.',
    ],
    tags: ['yak-fur', 'apparel', 'vest', 'ethical'],
  },
  {
    handle: 'yak-fur-hot-water-bottle', title: 'Yak Fur Bottle Cover', type: 'Home', vendor: 'Yack-Shack',
    colors: ['Tibetan Cream', 'Sunset Copper'],
    price: 35, compareAt: null,
    tagline: 'Hot-water-bottle cover in impossibly soft fur.',
    copy: [
      'A slip-on yak-fur cover that turns a hot water bottle into a warm, huggable heater for cold nights.',
      'Insulates the bottle so heat lasts twice as long, and the fur stays cool enough to snuggle.',
    ],
    tags: ['yak-fur', 'home', 'cozy', 'handmade'],
  },
]

function buildProduct(p) {
  const variants = makeVariants(p.handle, p.colors, p.price, p.handle.slice(0, 8).toUpperCase())
  const min = Math.min(p.price)
  const max = p.price // single price point — all variants same price
  const primary = `/images/yak/products/${p.handle}.svg`
  const alt = `/images/yak/swatches/${colorByName(p.colors[0]).slug}.svg`
  const compareAtRange = p.compareAt ? priceRange(p.compareAt, p.compareAt) : priceRange(p.price, p.price)
  const descriptionHtml =
    `<p><strong>${p.tagline}</strong></p><ul>` +
    p.copy.map((c) => `<li>${c}</li>`).join('') +
    `</ul><p><em>Hand-finished · ethically sourced · hypoallergenic.</em></p>`
  return {
    __typename: 'Product',
    id: `gid://shopify/Product/${p.handle}`,
    availableForSale: true,
    title: p.title,
    handle: p.handle,
    description: p.copy.join(' '),
    descriptionHtml,
    vendor: p.vendor,
    productType: p.type,
    tags: p.tags,
    onlineStoreUrl: null,
    images: { edges: [ { cursor: '0', node: img(primary, p.title) }, { cursor: '1', node: img(alt, p.title) } ] },
    priceRange: priceRange(min, max),
    compareAtPriceRange: compareAtRange,
    options: [
      { __typename: 'ProductOption', id: `gid://shopify/ProductOption/${p.handle}-color`, name: 'Color', values: p.colors },
    ],
    seo: { __typename: 'SEO', title: `${p.title} | Yack-Shack`, description: p.tagline },
    variants: { edges: variants },
  }
}

export const MOCK_PRODUCTS = RAW.map(buildProduct)
export const productByHandle = (handle) =>
  MOCK_PRODUCTS.find((p) => p.handle === handle) || null

// ── collections ──────────────────────────────────────────────────────────────
const COLLECTION_DEFS = [
  { handle: 'frontpage', title: 'Featured Yaks', products: ['himalayan-yak-throw', 'yak-fur-slippers', 'yak-fur-vest', 'yak-fur-area-rug'] },
  { handle: 'blankets', title: 'Blankets & Throws', products: ['himalayan-yak-throw'] },
  { handle: 'home-decor', title: 'Home Decor', products: ['yak-fur-pillow-set', 'yak-fur-area-rug', 'yak-fur-hot-water-bottle'] },
  { handle: 'accessories', title: 'Accessories', products: ['yak-fur-beanie', 'yak-fur-scarf', 'yak-fur-ear-muffs', 'yak-fur-clutch'] },
  { handle: 'apparel', title: 'Apparel', products: ['yak-fur-vest'] },
  { handle: 'footwear', title: 'Footwear', products: ['yak-fur-slippers'] },
  { handle: 'all', title: 'All Yak Goods', products: MOCK_PRODUCTS.map((p) => p.handle) },
]

const collectionNode = (handle, title, handles) => ({
  __typename: 'Collection',
  id: `gid://shopify/Collection/${handle}`,
  handle,
  title,
  description: `Shop ${title.toLowerCase()} — yak fur goods, ethically sourced.`,
  descriptionHtml: `<p>Shop ${title.toLowerCase()} — yak fur goods, ethically sourced.</p>`,
  image: { __typename: 'Image', altText: title, height: 600, width: 600, transformedSrc: '/images/yak/swatches/highland-brown.svg' },
  products: {
    edges: handles.map((h, i) => ({ cursor: String(i), node: productByHandle(h) })).filter((e) => e.node),
    pageInfo: { __typename: 'PageInfo', hasNextPage: false, hasPreviousPage: false },
  },
})

export const MOCK_COLLECTIONS = COLLECTION_DEFS.map((c) => ({
  cursor: c.handle,
  node: { __typename: 'Collection', id: `gid://shopify/Collection/${c.handle}`, handle: c.handle, title: c.title },
}))

export const collectionByHandle = (handle, numProducts = 48) => {
  const def = COLLECTION_DEFS.find((c) => c.handle === handle) || COLLECTION_DEFS.find((c) => c.handle === 'all')
  const handles = numProducts ? def.products.slice(0, numProducts) : def.products
  return collectionNode(def.handle, def.title, handles)
}

export const searchCollection = (term = '') => {
  const t = String(term || '').toLowerCase()
  const matched = MOCK_PRODUCTS.filter((p) => {
    const hay = `${p.title} ${p.productType} ${p.tags.join(' ')} ${p.description}`.toLowerCase()
    return !t || t.split(/\s+/).every((w) => hay.includes(w))
  })
  return collectionNode('filtereable-collection', 'Search', matched.map((p) => p.handle))
}

// ── shop globals ─────────────────────────────────────────────────────────────
export const MOCK_SHOP = {
  name: 'Yack-Shack',
  description: 'Luxurious yak fur goods — blankets, apparel & home decor spun from Himalayan yak.',
  moneyFormat: '${{amount}}',
}

export const MOCK_LOCALIZATION = {
  __typename: 'Localization',
  country: {
    __typename: 'Country',
    isoCode: 'US',
    name: 'United States',
    currency: { __typename: 'Currency', isoCode: 'USD', name: 'US Dollars', symbol: '$' },
  },
}

// ── demo cart (in-memory) ────────────────────────────────────────────────────
let demoCart = null

function emptyCost() {
  return {
    __typename: 'CartEstimatedCost',
    subtotalAmount: money(0),
    totalAmount: money(0),
    totalTaxAmount: money(0),
    totalDutyAmount: money(0),
  }
}

function newCart() {
  return {
    __typename: 'Cart',
    id: 'gid://shopify/Cart/demo',
    checkoutUrl: null,
    createdAt: new Date().toISOString(),
    attributes: [],
    discountCodes: [],
    estimatedCost: emptyCost(),
    lines: { edges: [] },
  }
}

function variantFor(merchandiseId) {
  for (const p of MOCK_PRODUCTS) {
    const v = p.variants.edges.find((e) => e.node.id === merchandiseId)
    if (v) return { product: p, variant: v.node }
  }
  return null
}

function recalc(cart) {
  const lines = cart.lines.edges
  const subtotal = lines.reduce((sum, e) => sum + parseFloat(e.node.estimatedCost.totalAmount.amount || '0'), 0)
  const tax = subtotal * 0.08
  cart.estimatedCost = {
    __typename: 'CartEstimatedCost',
    subtotalAmount: money(subtotal),
    totalTaxAmount: money(tax),
    totalDutyAmount: money(0),
    totalAmount: money(subtotal + tax),
  }
  return cart
}

function lineNode(merchandiseId, quantity) {
  const found = variantFor(merchandiseId)
  if (!found) return null
  const { product, variant } = found
  const price = parseFloat(variant.priceV2.amount)
  return {
    __typename: 'CartLine',
    id: `gid://shopify/CartLine/${product.handle}-${variant.sku}`,
    quantity,
    attributes: [],
    discountAllocations: [],
    estimatedCost: {
      __typename: 'CartLineEstimatedCost',
      subtotalAmount: money(price * quantity),
      totalAmount: money(price * quantity),
    },
    merchandise: {
      __typename: 'ProductVariant',
      id: variant.id,
      availableForSale: true,
      currentlyNotInStock: false,
      compareAtPriceV2: null,
      priceV2: money(price),
      selectedOptions: variant.selectedOptions,
      product: {
        __typename: 'Product',
        id: product.id,
        handle: product.handle,
        title: product.title,
        tags: product.tags,
        featuredImage: { ...product.images.edges[0].node, thumbnail: product.images.edges[0].node.url },
      },
    },
  }
}

export const mockCart = {
  create() {
    demoCart = newCart()
    return demoCart
  },
  linesAdd(lines = [], cartId) {
    if (!demoCart) demoCart = newCart()
    demoCart.id = cartId || demoCart.id
    for (const l of lines) {
      const node = lineNode(l.merchandiseId, l.quantity)
      if (node) demoCart.lines.edges.push({ cursor: String(demoCart.lines.edges.length), node })
    }
    return recalc(demoCart)
  },
  linesUpdate(lines = [], cartId) {
    if (!demoCart) demoCart = newCart()
    demoCart.id = cartId || demoCart.id
    for (const l of lines) {
      const edge = demoCart.lines.edges.find((e) => e.node.id === l.id)
      if (!edge) continue
      edge.node.quantity = l.quantity
      const price = parseFloat(edge.node.merchandise.priceV2.amount)
      edge.node.estimatedCost.subtotalAmount = money(price * l.quantity)
      edge.node.estimatedCost.totalAmount = money(price * l.quantity)
    }
    return recalc(demoCart)
  },
  linesRemove(lineIds = [], cartId) {
    if (!demoCart) demoCart = newCart()
    demoCart.id = cartId || demoCart.id
    demoCart.lines.edges = demoCart.lines.edges.filter((e) => !lineIds.includes(e.node.id))
    return recalc(demoCart)
  },
}

// ── resolve(name, vars) → GraphQL response `data` ────────────────────────────
export function resolve(operationName, vars = {}) {
  switch (operationName) {
    case 'shop':
      return { shop: { __typename: 'Shop', ...MOCK_SHOP }, localization: MOCK_LOCALIZATION }
    case 'collection': {
      // collectionByHandle (has `handle`) vs search (has `queryFilter`/`filter`)
      if (vars.handle && vars.handle !== 'filtereable-collection') {
        return { collectionByHandle: collectionByHandle(vars.handle, vars.numProducts) }
      }
      return { collection: searchCollection(vars.queryFilter || vars.filter) }
    }
    case 'product': {
      const node = vars.handle ? productByHandle(vars.handle) : null
      return { productByHandle: node }
    }
    case 'checkoutURL':
      return { cart: { __typename: 'Cart', checkoutUrl: null } }
    case 'cartCreate':
      return { cartCreate: { cart: mockCart.create(), userErrors: [] } }
    case 'cartLinesAdd':
      return { cartLinesAdd: { cart: mockCart.linesAdd(vars.lines, vars.cartId), userErrors: [] } }
    case 'cartLinesUpdate':
      return { cartLinesUpdate: { cart: mockCart.linesUpdate(vars.lines, vars.cartId), userErrors: [] } }
    case 'cartLinesRemove':
      return { cartLinesRemove: { cart: mockCart.linesRemove(vars.lineIds, vars.cartId), userErrors: [] } }
    default:
      return {}
  }
}
