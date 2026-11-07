<template>
  <section class="container mx-auto">
    <div v-if="searchResult">
      <Html>
        <Head>
          <Title>{{ searchStore?.search?.searchTerm ?? "" }}</Title>
          <Meta name="description" :content="searchStore?.search?.searchTerm ?? ''" />
        </Head>
      </Html>
      <CollectionHeader
        :title="searchStore?.search?.searchTerm ?? ''"
        :description="searchStore?.search?.searchTerm?.descriptionHtml ?? ''"
      />
      <div v-if="searchResult?.collection?.products?.edges">
        <ProductGrid>
          <ProductCard
            v-for="(product, index) in searchResult.collection.products.edges"
            :index="index"
            :key="product.node.id"
            :product="product.node"
          />
        </ProductGrid>
      </div>
      <div v-else></div>
    </div>
    <div v-else>
      <h1 class="m-auto">
        No results found for {{ searchResult.searchTerm }}
      </h1>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useSearchStore } from '~/stores/search';


const searchStore = useSearchStore()

let searchResult = computed({
  get() {return searchStore.search.searchResult},
  set(val) {searchStore.search.searchResult = val}
})
</script>