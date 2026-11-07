<template>
  <ClientOnly>
    <Transition name="slide-up">
      <div
        v-if="showBanner && !isStandalone && !isInstalled"
        class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 shadow-2xl px-4 py-4 md:py-5"
      >
        <div class="max-w-2xl mx-auto flex items-center gap-4">
          <div class="shrink-0">
            <img
              src="/icons/192.webp"
              alt="App icon"
              class="w-12 h-12 rounded-xl shadow-sm"
            />
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-neutral-900 truncate">Install Sh1r00 Storefront</p>
            <p class="text-sm text-neutral-500 truncate">Add to your home screen for quick access and offline use</p>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button
              class="text-sm text-neutral-500 hover:text-neutral-700 px-3 py-2 rounded-lg transition-colors"
              @click="dismiss"
            >
              Later
            </button>
            <button
              class="text-sm font-semibold text-white bg-primary-700 hover:bg-primary-800 px-4 py-2 rounded-lg transition-colors shadow-sm"
              @click="install"
            >
              Install
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </ClientOnly>
</template>

<script setup lang="ts">
const { showBanner, isStandalone, isInstalled, install, dismiss } = usePwaInstall()
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
