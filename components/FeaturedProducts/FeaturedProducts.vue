<template>
  <div class="items-center my-3">
    <ClientOnly>
      <template v-if="loading">
        <h3>Loading...</h3>
      </template>
      <template v-else-if="error">
        Error: {{ error.message }}
      </template>
      <template v-else-if="collection">
        <ProductGrid class="items-center flex flex-col">
          <div v-if="title" class="items-center col-span-2 font-bold border-b-2 md:col-span-4">
            {{ title }}
          </div>
          <ProductCard
            v-for="(product, index) in collection.products.edges"
            :index="index"
            :key="product.node.id"
            :product="product.node"
          />
        </ProductGrid>
      </template>
      <template v-else>
        <div>Error loading featured products</div>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from "@vue/apollo-composable";
import { collectionByHandle } from "~/apollo/queries/collectionByHandle";

const props = defineProps<{
  collectionHandle: string;
  numberProducts?: number;
  title?: string;
}>();

const handle = props.collectionHandle;
const numProducts = props.numberProducts || 4;
const { result, loading, error } = useQuery(collectionByHandle, {
  handle,
  numProducts,
});

if (!result) {
  throw error
}

const collection = computed(() => result.value?.collectionByHandle ?? [])
</script>
