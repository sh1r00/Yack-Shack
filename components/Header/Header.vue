<template>
  <header
    class="sticky top-0 z-40 w-full transition-all duration-300"
    :class="isScrolled ? 'shadow-lg' : ''"
  >
    <div
      class="transition-all duration-300"
      :class="isScrolled ? '[&>nav]:!py-1 [&>nav]:!lg:py-2' : ''"
    >
      <UiNavigationSimple
        :nav="navConfig"
        :cart-counter="cartCounter"
        @navEvent="navEvent"
        @searchEvent="search"
      />
    </div>
  </header>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useShopStore } from "~/stores/shop";
import { useCartStore } from "~/stores/cart"
import { useSearchStore } from "~/stores/search"
import { SfIconShoppingCart } from '@storefront-ui/vue';

const isScrolled = ref(false)

if (import.meta.client) {
  onMounted(() => {
    const onScroll = () => { isScrolled.value = window.scrollY > 50 }
    window.addEventListener('scroll', onScroll, { passive: true })
    onUnmounted(() => window.removeEventListener('scroll', onScroll))
  })
}

const shopStore = useShopStore()
const cartStore = useCartStore()
const searchStore = useSearchStore()

const { collections } = storeToRefs(shopStore)
const { totalItems } = storeToRefs(cartStore)
const cartCounter = computed(() => totalItems)

const cleanQueryEdge = (collections) => {
  const edge = collections?.value?.edges
  if (!edge) {
    return [{ id: 'error', title: 'no edges found' }]
  }
  return edge.map((e) => ({
    id: e?.node?.id,
    handle: e?.node?.handle,
    title: e?.node?.title,
  }))
}

const cleanedCollections = cleanQueryEdge(collections)

const navConfig = {
  title: 'Yack-Shack',
  logo: {
    ariaLabel: "Yack-Shack homepage",
    src: "/icons/yak-logo.svg",
    alt: "Yack-Shack logo",
    link: '/'
  },
  actionItems: [
    {
      icon: SfIconShoppingCart,
      ariaLabel: 'Cart',
      role: 'cart',
      label: 'Cart',
      link: '/cart'
    }
  ],
  navDropdown: {
    title: 'Browse Products',
    linkBase: 'collections',
    actionItems: cleanedCollections
  }
}

const navEvent = (role) => {
  if (role === 'Cart') {
    return cartStore.toggleCart()
  }
  if (role === 'HamburgerMenu') {
    shopStore.toggleBurger()
    return
  }
  shopStore.toggleModal(role)
}

const search = (event) => {
  searchStore.searchProductsByFilter(event)
}
</script>
