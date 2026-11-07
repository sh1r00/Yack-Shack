<template>
  <SfButton
    @click="addToCart"
    @keyup.enter="addToCart"
    class="w-full p-4 text-center text-white bg-black disabled:opacity-75"
    :disabled="!selectedVariantTitle || !labelActive"
  >
    <span>{{ currentLabel }}</span>
    <template #prefix>
      <SfIconShoppingCart size="sm" />
    </template>
  </SfButton>
</template>

<script setup lang="ts">
import { useProductStore } from "~/stores/product";
import { useCartStore } from "~/stores/cart";
import { SfButton, SfIconShoppingCart } from '@storefront-ui/vue'


const props = defineProps<{product: {product: any, quantity: number}}>()

const productStore = useProductStore();

const labelActive = "Add to Cart";
const labelDisabled = "Select Variant";
const selectedVariantId = computed(() => productStore.getSelectedVariant.id);
const selectedVariantTitle = computed(() => productStore.getSelectedVariant.title);


const currentLabel = computed(() =>
  selectedVariantTitle ? labelActive : labelDisabled
);

const cartStore = useCartStore();

const addToCart = () => {
  if (!selectedVariantId.value) {
    let productId = props.product.product.variants.edges[0].node.id
    return cartStore.cartLinesAdd(productId, props.product.quantity);
  }
  cartStore.cartLinesAdd(selectedVariantId.value, props.product.quantity);
  productStore.setSelectedVariant({id: null, title: 'Pick a Variant', availableForSale: false, quantity: 0, quantityAvailable: 0});
};
</script>
