<template>
  <div>
    <div>
      <NuxtLink v-if="product" :to="productPath" class="product-card flex flex-col min-w-[325px] max-w-[375px] lg:w-[496px] relative border border-neutral-200 rounded-md">
        <div class="product-card-media">
          <ProductImage
            :alt="product.handle"
            :height="height"
            :lazy="index > lazyLoadingThreshold"
            :sizes="sizes"
            :srcset="srcset"
            :width="width"
            class="block object-cover h-auto rounded-md aspect-square"
          />
          <span class="fur-shimmer" aria-hidden="true" />
        </div>
      </NuxtLink>
    </div>
    <div class="p-4 border-t border-neutral-200">
      <NuxtLink v-if="product" :to="productPath" variant="secondary" class="no-underline">
        <ProductTitle
          tag="div"
          :title="product.title"
          class="text-sm font-medium"
        />
      </NuxtLink>
      <ProductRatings />
      <ProductDescription :description="product.description" />
      <ProductPrice
        :priceRange="product.priceRange"
        :compareAtPriceRange="product.compareAtPriceRange"
        class="text-sm"
      />
      <ProductAddToCart :product="{product: product, quantity: 1}" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { breakpointsTailwind } from "@vueuse/core";
import { getSrcset } from "~/utils/images";

const props = defineProps<{
  product: ProductCard;
  index?: number;
}>();

const productPath = `/products/${props.product.handle}`;

const lazyLoadingThreshold = 7;
const src = props.product?.images?.edges[0]?.node?.url ?? "";
const width = props.product?.images?.edges[0]?.node?.width ?? "";
const height = props.product?.images?.edges[0]?.node?.height ?? "";
const sizes = `(max-width: ${breakpointsTailwind.md}px) 45vw, 20vw`;
const srcset = getSrcset(src);
</script>
