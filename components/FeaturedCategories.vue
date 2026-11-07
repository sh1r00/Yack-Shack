<template>
  <section id="featured-categories" class="w-full py-8 md:py-12">
    <div class="max-w-[1536px] mx-auto px-4 md:px-6">
      <h2 class="text-2xl font-bold text-center mb-8">Shop the Herd</h2>
      <UiMultipleVerticalDisplays :display-details="categories" />
    </div>
  </section>
</template>

<script lang="ts" setup>
const categories = [
  {
    title: 'Blankets & Throws',
    subtitle: 'Get cozy',
    description: 'Himalayan yak throws that trap heat without the weight',
    callToAction: 'Discover now',
    image: '/images/yak/products/himalayan-yak-throw.svg',
    backgroundColor: 'bg-secondary-200',
    reverse: false,
    link: '/collections/blankets',
    width: '360px',
    height: '412px',
  },
  {
    title: 'Home Decor',
    subtitle: 'Be warm',
    description: 'Fur pillows, rugs & huggable heaters for every room',
    callToAction: 'Discover now',
    image: '/images/yak/products/yak-fur-pillow-set.svg',
    backgroundColor: 'bg-primary-100',
    reverse: true,
    link: '/collections/home-decor',
    width: '360px',
    height: '412px',
  },
  {
    title: 'Accessories',
    subtitle: 'Be wrapped',
    description: 'Beanies, scarves & ear muffs for the highland wind',
    callToAction: 'Discover now',
    image: '/images/yak/products/yak-fur-beanie.svg',
    backgroundColor: 'bg-secondary-200',
    reverse: true,
    link: '/collections/accessories',
    width: '360px',
    height: '412px',
  },
]
</script>
