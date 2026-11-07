<template :key="handle">
  <section class="container m-auto">
    <div
      v-if="product"
      class="grid grid-cols-1 mx-auto my-4 md:grid-cols-[auto_minmax(300px,_1fr)] md:gap-8 md:my-8"
    >
      <Html>
        <Head v-if="product?.title && product?.description">
          <Title>{{ product.title }}</Title>
          <Meta name="description" :content="product.description" />
        </Head>
      </Html>
      <div class="relative">
        <ProductImage
          :alt="product.handle"
          :sizes="sizes"
          :srcset="srcset"
          :width="product.images?.edges[0]?.node?.width ?? ''"
          :height="product.images?.edges[0]?.node?.height ?? ''"
          class=""
        />
        <div
          v-if="activeColorHex"
          class="absolute inset-0 mix-blend-multiply pointer-events-none rounded-t-md"
          :style="{ backgroundColor: activeColorHex, opacity: 0.22 }"
          aria-hidden="true"
        />
      </div>
      <div class="flex flex-col items-center min-w-[325px] max-w-[375px] lg:w-[496px] relative my-5 py-5 border border-neutral-200 rounded-md">
        <ProductTitle
          tag="h1"
          :title="product.title"
          variant="product"
          class="text-xl"
        />
        <ProductPrice
          :priceRange="product.priceRange"
          :compareAtPriceRange="product.compareAtPriceRange"
          class="mb-4 md:mb-8"
        />
        <ProductColorSwatches
          :colors="colorOptions"
          :variants="variants"
          @color="onColorSelect"
        />
        <ProductVariants
          label="Select option"
          :variants="variants"
        />
        <UiQuantitySelector
          :quantity="quantity"
          @quantity-selector-event="changeQuantity($event)"
        />
        <ProductAddToCart :product="{product: product, quantity: currentVariantQuantity}"/>
        <ProductDescription :description="product.descriptionHtml" />
      </div>
    </div>
    <div v-else>
      <h1>
        There are no products under this collection
      </h1>
    </div>
    <div v-if="error">Error</div>
  </section>
</template>

<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { breakpointsTailwind } from "@vueuse/core";
import { getSrcset } from "~/utils/images";
import { productByHandle } from "~/apollo/queries/productByHandle";
import { productVariantsByHandle } from "~/apollo/queries/productVariantsByHandle";

import { useProductStore } from "~/stores/product";
const productStore = useProductStore();

const defaultQuantity = 1
const selectedVariantTotalQuantity = computed(() => productStore.getSelectedVariant.quantityAvailable);

const quantity = {
  default: defaultQuantity,
  total: selectedVariantTotalQuantity
}


let newQuantity = ref(1)
let currentVariantQuantity = computed({
  get() {
    return newQuantity.value
  },
  set(val) {
    if (val === 1 || val === null || val === undefined) {
      return newQuantity.value = 1
    }
    newQuantity.value = val
  }
})

const changeQuantity = (quantity:number) => {
  currentVariantQuantity.value = quantity
}


const route = useRoute();
const handle = route.params.product;

// Get product data
let variants = ref(null);
const { result, error } = useQuery(productByHandle, { handle });
const product: any = computed(() => result.value?.productByHandle ?? [])
const initialVariants = computed(() => result.value?.productByHandle.variants.edges)
variants.value = initialVariants;

// Colourway swatches + image tint
const colorOptions = computed(() =>
  product.value?.options?.find((o: any) => o.name === 'Color')?.values ?? []
);
const activeColorHex = ref<string | null>(null);
const onColorSelect = (payload: { name: string; hex: string }) => {
  activeColorHex.value = payload.hex;
};

// Product Image
const src = computed(() => product.value.images?.edges[0]?.node?.url ?? "");
const sizes = `(max-width: ${breakpointsTailwind.md}px) 95vw, 40vw`;
const srcset = computed(() => getSrcset(src.value || ""));

// Fetch fresh inventory on client
onMounted(() => {
  const { result: clientResult, onResult } = useQuery(
    productVariantsByHandle,
    { handle },
    { fetchPolicy: "network-only" }
  );
  const clientVariants = computed(() => result.value?.productByHandle.variants.edges)
  variants.value = clientVariants;
});

// remove current variant from state management on component destroy
onUnmounted(() => {
  return productStore.setSelectedVariant({id: null, title: 'Pick a Variant', availableForSale: false, quantity: 0, quantityAvailable: 0});

})
</script>
