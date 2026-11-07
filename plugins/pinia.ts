import { createPinia } from 'pinia'
import { createPersistedStatePlugin } from 'pinia-plugin-persistedstate-2'

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia()

  if (import.meta.client) {
    pinia.use(createPersistedStatePlugin())
  }

  nuxtApp.vueApp.use(pinia)
})
