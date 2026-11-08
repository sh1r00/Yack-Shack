<template>
    <SfLink
      v-if="checkoutUrl"
      variant="primary"
      :href="checkoutUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="block py-4 font-bold text-center text-white"
      @click="onCheckout"
    >
      <SfButton
        type="button"
        size="lg"
        variant="primary"
        class="w-full"
      >
        Place Order And Pay 
      </SfButton>
    </SfLink>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCartStore } from "~/stores/cart";
import { SfButton, SfLink } from '@storefront-ui/vue'

const cartStore = useCartStore();

// Reactive — resolves the Shopify checkout URL on click if it isn't set yet
// (e.g. the cart was restored from a previous session without a checkoutUrl).
const checkoutUrl = computed(() => cartStore.cart.checkoutUrl);

async function onCheckout() {
  if (!checkoutUrl.value) {
    const url = await cartStore.getCheckoutUrl();
    if (url && typeof url === "string") {
      window.location.href = url;
    }
  }
}
</script>
