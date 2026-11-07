<template>
  <div class="min-h-screen flex flex-col">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary-700 focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
    >
      Skip to main content
    </a>
    <div
      v-if="demoMode"
      class="demo-banner px-4 py-2 text-center text-xs md:text-sm"
      role="note"
    >
      ⚠️ DEMO — this catalog is spoofed (placeholder products, prices, imagery &amp; reviews). Not a live store.
    </div>
    <Header />
    <main id="main-content" class="flex-1" tabindex="-1">
      <slot />
    </main>
    <Footer />
    <Cart />
    <PwaInstallBanner />
  </div>
</template>

<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const demoMode = computed(
  () => runtimeConfig.public.DEMO_MODE === true || runtimeConfig.public.DEMO_MODE === 'true'
);
</script>
