<template>
  <div class="flex items-center h-12 mb-4 border-b-2 border-black md:h-16">
    <SfButton square variant="tertiary" class="text-white bg-warning" @click="closeCart" @keyup.enter="closeCart">
      <CloseIcon class="w-6" aria-hidden />
    </SfButton>
    <p class="class=typography-headline-4 font-bold md:typography-headline-3 ml-4">
      Order Summary
    </p>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from "~/stores/cart";
import {SfButton} from "@storefront-ui/vue"
import CloseIcon from "@heroicons/vue/solid/esm/XIcon.js";

const cartStore = useCartStore();

const closeCart = () => cartStore.toggleCart(false);
</script>
