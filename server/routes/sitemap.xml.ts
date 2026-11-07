import { SitemapStream, streamToPromise } from 'sitemap'

// ── Config ──────────────────────────────────────────────────────────────────
const BASE_URL = (process.env.APP_BASE_URL || 'https://localhost:3000').replace(/\/+$/, '')
const SHOPIFY_ENDPOINT = process.env.SHOPIFY_STOREFRONT_ENDPOINT || ''
const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || ''

// ── Helpers ─────────────────────────────────────────────────────────────────
const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD

/** Escape XML special characters */
function xmlEscape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

/** Call the Shopify Storefront GraphQL API */
async function shopifyQuery<T = any>(
  query: string,
  variables: Record<string, any> = {},
): Promise<T> {
  if (!SHOPIFY_ENDPOINT || !SHOPIFY_TOKEN) {
    console.warn('[sitemap] Shopify credentials not configured — skipping dynamic content')
    return null as unknown as T
  }

  const res = await $fetch<{ data: T; errors?: any[] }>(SHOPIFY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
    },
    body: { query, variables },
  })

  if (res.errors?.length) {
    console.error('[sitemap] Shopify GraphQL errors:', JSON.stringify(res.errors))
  }

  return res.data as T
}

// ── Shopify queries (inline — self-contained server route) ──────────────────

interface ShopifyNode {
  handle: string
  title: string
  updatedAt?: string
  onlineStoreUrl?: string | null
  images?: { edges: { node: { url: string; altText: string | null } }[] }
}

interface ShopifyEdge<T> {
  node: T
}

async function fetchCollections(): Promise<ShopifyNode[]> {
  const data = await shopifyQuery<{
    collections: { edges: ShopifyEdge<{ handle: string; title: string; updatedAt: string }>[] }
  }>(`
    query {
      collections(first: 50) {
        edges {
          node {
            handle
            title
            updatedAt
          }
        }
      }
    }
  `)
  return data?.collections?.edges?.map((e) => e.node) ?? []
}

async function fetchProducts(
  after: string | null = null,
): Promise<{ products: ShopifyNode[]; hasNextPage: boolean; endCursor: string | null }> {
  const data = await shopifyQuery<{
    products: {
      edges: ShopifyEdge<ShopifyNode>[]
      pageInfo: { hasNextPage: boolean; endCursor: string | null }
    }
  }>(
    `query ($after: String) {
      products(first: 100, after: $after) {
        edges {
          node {
            handle
            title
            updatedAt
            onlineStoreUrl
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }`,
    { after },
  )

  const products = data?.products
  return {
    products: products?.edges?.map((e) => e.node) ?? [],
    hasNextPage: products?.pageInfo?.hasNextPage ?? false,
    endCursor: products?.pageInfo?.endCursor ?? null,
  }
}

// ── Predefined static routes with metadata ──────────────────────────────────
interface StaticEntry {
  url: string
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: number
}

const STATIC_ROUTES: StaticEntry[] = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.4 },
  { url: '/contact', changefreq: 'monthly', priority: 0.5 },
  { url: '/help', changefreq: 'monthly', priority: 0.4 },
  { url: '/services', changefreq: 'monthly', priority: 0.4 },
  { url: '/returns', changefreq: 'monthly', priority: 0.5 },
  { url: '/terms', changefreq: 'yearly', priority: 0.2 },
  { url: '/privacy', changefreq: 'yearly', priority: 0.2 },
  { url: '/faqs', changefreq: 'monthly', priority: 0.4 },
  { url: '/searchProducts', changefreq: 'weekly', priority: 0.5 },
]

// ── Main handler ────────────────────────────────────────────────────────────
export default defineEventHandler(async (event) => {
  // Set cache headers — CDNs and browsers should cache the sitemap for a few hours
  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=14400, s-maxage=21600, stale-while-revalidate=86400')

  const smStream = new SitemapStream({
    hostname: BASE_URL,
    xslUrl: undefined, // no XSL — keep it simple
  })

  // ── Static routes ──
  for (const route of STATIC_ROUTES) {
    smStream.write({
      url: route.url,
      changefreq: route.changefreq,
      priority: route.priority,
      lastmod: today,
    })
  }

  // ── Dynamic: collections ──
  try {
    const collections = await fetchCollections()
    for (const col of collections) {
      const lastmod = col.updatedAt ? col.updatedAt.split('T')[0] : today
      smStream.write({
        url: `/collections/${encodeURIComponent(col.handle)}`,
        changefreq: 'weekly',
        priority: 0.6,
        lastmod,
      })
    }
  } catch (err) {
    console.error('[sitemap] Failed to fetch collections:', err)
  }

  // ── Dynamic: products (paginated) ──
  try {
    let cursor: string | null = null
    let hasMore = true
    let pageCount = 0
    const MAX_PAGES = 50 // safety cap — 50 × 100 = 5 000 products

    while (hasMore && pageCount < MAX_PAGES) {
      const { products, hasNextPage, endCursor } = await fetchProducts(cursor)
      hasMore = hasNextPage
      cursor = endCursor
      pageCount++

      for (const product of products) {
        const lastmod = product.updatedAt ? product.updatedAt.split('T')[0] : today
        const productUrl = product.onlineStoreUrl
          || `/products/${encodeURIComponent(product.handle)}`

        const imageNode = product.images?.edges?.[0]?.node
        const entry: any = {
          url: productUrl,
          changefreq: 'daily',
          priority: 0.8,
          lastmod,
        }

        // Add image metadata if available (Google Images sitemap extension)
        if (imageNode?.url) {
          entry.img = [
            {
              url: imageNode.url,
              caption: product.title,
              title: imageNode.altText || product.title,
            },
          ]
        }

        smStream.write(entry)
      }
    }
  } catch (err) {
    console.error('[sitemap] Failed to fetch products:', err)
  }

  smStream.end()

  try {
    return await streamToPromise(smStream)
  } catch (err) {
    console.error('[sitemap] Stream error:', err)
    throw createError({ statusCode: 500, statusMessage: 'Failed to generate sitemap' })
  }
})
