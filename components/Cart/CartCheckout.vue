<template>
    <SfLink
      v-if="checkoutUrl"
      variant="primary"
      :href="checkoutUrl"
      class="block py-4 font-bold text-center text-white"
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
import { useCartStore } from "~/stores/cart";
import {SfButton, SfLink} from '@storefront-ui/vue'

const cartStore = useCartStore();

const checkoutUrl = cartStore?.cart?.checkoutUrl;
</script>
