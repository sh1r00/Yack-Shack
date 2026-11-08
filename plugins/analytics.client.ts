// Client-side analytics (Umami).
//
// Loads the tracking script when NUXT_PUBLIC_UMAMI_WEBSITE_ID is set and exposes
// `$analytics.track()` for custom ecommerce events (add_to_cart, begin_checkout,
// view_product). When no website id is configured the plugin still registers the
// provider, but `track()` is a no-op — so the store can call it unconditionally.
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const websiteId = (config.public.umamiWebsiteId as string) || ''
  const src = (config.public.umamiSrc as string) || 'https://cloud.umami.is/script.js'

  if (import.meta.client && websiteId) {
    useHead({
      script: [
        {
          src,
          'data-website-id': websiteId,
          defer: true,
        },
      ],
    })
  }

  function track(eventName: string, props?: Record<string, unknown>): void {
    if (!import.meta.client) return
    const w = window as unknown as {
      umami?: { track?: (e: string, p?: Record<string, unknown>) => void }
    }
    w.umami?.track?.(eventName, props)
  }

  return {
    provide: {
      analytics: { track },
    },
  }
})
