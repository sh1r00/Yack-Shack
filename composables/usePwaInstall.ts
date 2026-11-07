// Composable to manage PWA install prompt
export function usePwaInstall() {
  const installPrompt = ref<any>(null)
  const showBanner = ref(false)
  const isInstalled = ref(false)
  const isStandalone = ref(false)

  if (import.meta.client) {
    // Check immediately if already in standalone mode
    isStandalone.value =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true

    onMounted(() => {
      // Listen for install prompt — must be in onMounted to catch the event
      const onBeforeInstall = (e: Event) => {
        e.preventDefault()
        installPrompt.value = e
        if (!isStandalone.value) {
          showBanner.value = true
        }
      }
      window.addEventListener('beforeinstallprompt', onBeforeInstall)

      // Detect when app is installed
      const onAppInstalled = () => {
        isInstalled.value = true
        showBanner.value = false
        installPrompt.value = null
      }
      window.addEventListener('appinstalled', onAppInstalled)

      // Cleanup
      onUnmounted(() => {
        window.removeEventListener('beforeinstallprompt', onBeforeInstall)
        window.removeEventListener('appinstalled', onAppInstalled)
      })
    })
  }

  async function install() {
    if (!installPrompt.value) return
    await installPrompt.value.prompt()
    const result = await installPrompt.value.userChoice
    if (result.outcome === 'accepted') {
      isInstalled.value = true
    }
    showBanner.value = false
    installPrompt.value = null
  }

  function dismiss() {
    showBanner.value = false
  }

  return {
    showBanner,
    isInstalled,
    isStandalone,
    install,
    dismiss,
  }
}
