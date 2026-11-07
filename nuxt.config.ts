import { defineNuxtConfig } from "nuxt/config";

const colorContainer = '#F4EEE2'
const colorPrimary = '#8B5E3C'

export default defineNuxtConfig({
  compatibilityVersion: 4,
  compatibilityDate: '2025-07-04',
  ssr: false,
  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },
  runtimeConfig: {
    public: {
      SHOPIFY_STOREFRONT_ENDPOINT: process.env.SHOPIFY_STOREFRONT_ENDPOINT,
      SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      // DEMO_MODE defaults to true → serves the spoofed yak-fur catalog without Shopify.
      // Set DEMO_MODE=false in .env to connect to a live storefront instead.
      DEMO_MODE: process.env.DEMO_MODE !== 'false',
    }
  },
  app: {
    head: {
      title: 'Yack-Shack — Yak Fur Goods',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'robots', content: 'index, follow' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#8B5E3C' },
        { name: 'description', content: process.env.APP_DESCRIPTION || 'Luxurious yak fur goods — blankets, apparel & home decor spun from Himalayan yak.' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/icons/72.webp' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'crossorigin',
        },
        {
          rel: 'preload',
          href: 'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700&display=swap',
          as: 'style',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700&display=swap',
          media: 'print',
          onload: "this.media='all'",
        },
      ],
    },
  },
  vite: {
    vue: {
      vueJsx: {
        mergeProps: true
      }
    }
  },
  modules: [
    "@nuxt/image",
    "@nuxtjs/robots",
    "@vite-pwa/nuxt",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "nuxt-lazy-hydrate",
    "nuxt-security",
  ],
  css: ["~/assets/css/fonts.css", "~/assets/css/global.css"],
  security: {
    csrf: true,
    ssg: {
      hashScripts: true,
    },
    headers: {
      crossOriginResourcePolicy: 'cross-origin',
      crossOriginOpenerPolicy: 'same-origin',
      crossOriginEmbedderPolicy: 'unsafe-none',
      contentSecurityPolicy: {
        'default-src': ["'none'"],
        'script-src': [
          "'self'",
          process.env.APP_WHITE_LIST || '',
          process.env.WHITE_LIST_WORKBOX || '',
          "'unsafe-inline'",
          "'unsafe-eval'",
          'https:',
        ].filter(Boolean),
        'script-src-attr': ["'self'", "'unsafe-inline'"].filter(Boolean),
        'script-src-elem': [
          "'self'",
          process.env.APP_WHITE_LIST || '',
          process.env.WHITE_LIST_WORKBOX || '',
          "'unsafe-inline'",
          'https:',
        ].filter(Boolean),
        'style-src': ["'self'", "'unsafe-inline'", 'https:'],
        'style-src-elem': ["'self'", "'unsafe-inline'", 'https:'],
        'img-src': ["'self'", 'https:', 'data:'],
        'font-src': ["'self'", 'https:', 'data:'],
        'connect-src': ["'self'", 'https:', 'wss:'],
        'media-src': ["'self'"],
        'frame-src': ["'self'"],
        'worker-src': ["'self'", 'blob:'],
        'form-action': ["'self'"],
        'base-uri': ["'self'"],
        'object-src': ["'none'"],
      },
      xXSSProtection: '1; mode=block',
      xContentTypeOptions: 'nosniff',
      xFrameOptions: 'DENY',
      referrerPolicy: 'strict-origin-when-cross-origin',
      permissionsPolicy: 'camera=(), microphone=(), geolocation=()',
    },
  },
  pwa: {
    registerType: 'autoUpdate',
    devOptions: { enabled: true },
    manifest: {
      id: process.env.APP_SHORT_NAME || 'YackShack',
      name: process.env.APP_NAME || 'Yack-Shack',
      lang: process.env.APP_LANG || 'en',
      short_name: process.env.APP_SHORT_NAME || 'YackShack',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      background_color: colorContainer,
      theme_color: colorPrimary,
      description: process.env.APP_DESCRIPTION || 'Luxurious yak fur goods — blankets, apparel & home decor spun from Himalayan yak.',
      protocol_handlers: [
        {
          protocol: `web+${process.env.APP_CATEGORY || 'yak'}`,
          url: `/${process.env.APP_CATEGORY || 'yak'}?type=%s`,
        },
      ],
      icons: [
        { src: '/icons/48.webp', sizes: '48x48', type: 'image/webp', purpose: 'maskable' },
        { src: '/icons/72.webp', sizes: '72x72', type: 'image/webp', purpose: 'maskable' },
        { src: '/icons/96.webp', sizes: '96x96', type: 'image/webp', purpose: 'maskable' },
        { src: '/icons/144.webp', sizes: '144x144', type: 'image/webp', purpose: 'maskable' },
        { src: '/icons/168.webp', sizes: '168x168', type: 'image/webp', purpose: 'maskable' },
        { src: '/icons/192.webp', sizes: '192x192', type: 'image/webp', purpose: 'any' },
        { src: '/icons/192.webp', sizes: '192x192', type: 'image/webp', purpose: 'maskable' },
        { src: '/icons/512.webp', sizes: '512x512', type: 'image/webp', purpose: 'any' },
        { src: '/icons/512.webp', sizes: '512x512', type: 'image/webp', purpose: 'maskable' },
      ],
    },
    meta: {
      name: process.env.APP_NAME || 'Yack-Shack',
      author: process.env.APP_AUTHOR || 'Yack-Shack',
      description: process.env.APP_DESCRIPTION || 'Luxurious yak fur goods — blankets, apparel & home decor.',
      theme_color: colorPrimary,
      ogHost: process.env.APP_BASE_URL || 'localhost:3000',
      twitterCard: 'summary_large_image',
      twitterSite: process.env.TWITTER_HANDLE || undefined,
      twitterCreator: process.env.TWITTER_USERNAME || undefined
    },
    icon: {
      source: '~/public/icons/512.webp'
    },
    workbox: {
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
      globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}'],
      // Offline-first: pre-cache navigation + runtime caching for API/Shopify
      navigateFallback: '/',
      navigateFallbackDenylist: [/^\/api\//, /^\/__/],
      runtimeCaching: [
        {
          // Cache page navigations — network first, fall back to cache (offline-ready)
          urlPattern: ({ request }) => request.mode === 'navigate',
          handler: 'NetworkFirst',
          options: {
            cacheName: 'pages-cache',
            expiration: { maxEntries: 50, maxAgeSeconds: 7 * 24 * 60 * 60 },
            networkTimeoutSeconds: 5,
          },
        },
        {
          // Cache static assets — cache first (fastest, offline-ready)
          urlPattern: /\.(?:js|css|woff2?|png|webp|jpg|svg|ico)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'assets-cache',
            expiration: { maxEntries: 200, maxAgeSeconds: 30 * 24 * 60 * 60 },
          },
        },
        {
          // Shopify Storefront API — network first with cache fallback
          urlPattern: /^https:\/\/.*\.myshopify\.com\/api\//,
          handler: 'NetworkFirst',
          options: {
            cacheName: 'shopify-api-cache',
            expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 },
            networkTimeoutSeconds: 3,
          },
        },
        {
          // Google Fonts
          urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\//,
          handler: 'CacheFirst',
          options: {
            cacheName: 'fonts-cache',
            expiration: { maxEntries: 20, maxAgeSeconds: 365 * 24 * 60 * 60 },
          },
        },
      ],
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["~/assets/css/fonts.css", "~/assets/css/global.css"],
});
