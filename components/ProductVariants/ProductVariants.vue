<template>
  <div v-if="variants && variants.length" class="mb-1">
    <UiDropdownBasic
      :dropdown-items="variants"
      :title="setTitle"
      @dropdown-event="handleChange($event)"
    />
  </div>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { useProductStore } from "~/stores/product";

const props = defineProps<{
  label: string | undefined;
  variants: Ref;
}>();

const { label, variants } = toRefs(props);


const productStore = useProductStore();

const selectedVariantId = computed(() => productStore.getSelectedVariant.id)
const selectedVariantTitle = computed(() => productStore.getSelectedVariant.title)
const selectedVariantQuantity = computed(() => productStore.getSelectedVariant.quantity)

let quantity = 1

const handleChange = (e: Event) => {
  if (selectedVariantQuantity.value) {
    quantity = selectedVariantQuantity.value
  }
  productStore.setSelectedVariant(
    {
      id: e.id,
      title: e.title,
      availableForSale: e.availableForSale,
      quantity,
      quantityAvailable: e.quantityAvailable
    }
  );
};

const setTitle = computed(() => {
  if (!selectedVariantId) {
    let title = "Please select a variant"
    return title
  }
  let title = selectedVariantTitle
  return title
})
</script>
