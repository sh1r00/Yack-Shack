<template>
  <Head>
    <Title>{{ name }}</Title>
    <Meta name="description" :content="description" />
  </Head>

  <div class="flex flex-col">
    <HeroCards />
    <MMarquee />
    <FeaturedCategories v-reveal />
    <section v-reveal class="w-full py-8 md:py-12 bg-neutral-50">
      <div class="container mx-auto px-4">
        <FeaturedProducts
          collectionHandle="frontpage"
          :numberProducts="4"
          title="Featured Yak Goods"
        />
      </div>
    </section>
    <TestimonialsCarousel v-reveal />
    <section v-reveal class="w-full py-8 md:py-12 bg-neutral-50">
      <div class="container mx-auto px-4">
        <FaqsView />
      </div>
    </section>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useShopStore } from "~/stores/shop";

const shopStore = useShopStore();
const { name, description } = storeToRefs(shopStore);
</script>
