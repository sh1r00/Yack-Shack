<template>
  <button
    class="relative flex items-center px-3 py-2 rounded-lg transition-colors hover:bg-primary-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    type="button"
    aria-label="Open cart"
    @click="handleClick"
    @keyup.enter="handleClick"
  >
    <span class="relative inline-flex">
      <ShoppingCartIcon class="w-5 h-5" aria-hidden="true" />
      <SfCounter
        v-if="cartCounter > 0"
        size="xs"
        pill
        class="absolute -top-5 -right-3 bg-red-500 text-white ring-2 ring-primary-700 font-bold"
      >
        {{ cartCounter }}
      </SfCounter>
    </span>
  </button>
</template>

<script setup lang="ts">
import { SfCounter } from "@storefront-ui/vue"
import ShoppingCartIcon from "@heroicons/vue/solid/esm/ShoppingCartIcon.js";
import { useCartStore } from "~/stores/cart";
import { storeToRefs } from "pinia"

const cartStore = useCartStore();

const { totalItems } = storeToRefs(cartStore)
const cartCounter = computed(() => totalItems.value ?? 0)

function handleClick() {
  cartStore.toggleCart();
}
</script>
