<template>
  <div class="flex w-full pb-4 mb-4 border-b-2 border-black">
    <NuxtImg
      loading="lazy"
      format="webp"
      :src="image"
      :alt="item.merchandise.product.title"
      :width="imageWidth"
      :height="imageHeight"
      crossorigin="anonymous"
      class="self-start block object-contain mr-4"
    />
    <div class="flex items-start justify-between w-full text-sm">
      <div>
        <div class="text-base">{{ item.merchandise.product.title }}</div>
        <div v-for="option in variantOptions" :key="option.value" class="flex">
          <template v-if="option.value !== 'Default Title'">
            <div class="mr-2">{{ option.name }}:</div>
            <div>{{ option.value }}</div>
          </template>
        </div>
        <div>QTY: {{ item.quantity }}</div>
        <UiQuantitySelector
          :quantity="quantity"
          @quantity-selector-event="updateLineItem" 
        />
        <div>{{ formattedPrice }}</div>
      </div>
      <button
        type="button" 
        tabindex="0"
        aria-label="Trash Icon"
        class="ml-4"
      >
        <TrashIcon
          class="inline w-4"
          @click="removeItem"
          @keyup.enter="removeItem"
        />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import TrashIcon from "@heroicons/vue/solid/TrashIcon.js";
import { formatLocalePrice } from "~/utils/money";
import { useCartStore } from "~/stores/cart";

// TO-DO: Add item type def
const props = defineProps<{
  item: any;
}>();

const quantity = {
  default: props.item.quantity,
  total: props.item.merchandise.product.availableForSale
}
const cartStore = useCartStore();

const image = props.item?.merchandise?.product?.featuredImage?.thumbnail ?? "";
const imageWidth = props.item?.merchandise?.product?.featuredImage?.width ?? "";
const imageHeight =
  props.item?.merchandise?.product?.featuredImage?.height ?? "";

const id = props.item?.id;
const variantOptions = props.item?.merchandise?.selectedOptions ?? null;

const removeItem = () => cartStore.cartLinesRemove(id);

const currencyCode = props.item?.estimatedCost?.totalAmount?.currencyCode ?? "";
const formattedPrice = computed(() =>
  formatLocalePrice(props.item?.estimatedCost?.totalAmount?.amount ?? "", "en-US", currencyCode)
);

const updateLineItem = (quantity:number) => {
  cartStore.cartLinesUpdate(props.item.id, props.item.merchandise.id, quantity);

}
</script>
