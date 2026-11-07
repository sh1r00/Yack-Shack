<template>
  <section class="w-full py-12 md:py-16">
    <div class="max-w-3xl mx-auto px-4">
      <h2 class="text-2xl md:text-3xl font-bold text-center mb-8">What the Herd Says</h2>
      <UiCarouselBullets :carousel-items="reviews">
        <template #slide="{ item }">
          <UiReviewWithAvatar :review="item" />
        </template>
      </UiCarouselBullets>
    </div>
  </section>
</template>

<script lang="ts" setup>
// ⚠️ Demo-only: illustrative reviews (spoofed catalog). See TODO.md.
const reviews = [
  {
    name: 'Sarah M.',
    review: 'The yak throw is unbelievably light and warm. It\u2019s the first blanket my whole family fights over. No shedding either!',
    img: { src: '/images/avatar1.webp', alt: 'Sarah M. review', width: '80', height: '80' },
    date: '2 days ago',
    badge: 'Verified purchase',
  },
  {
    name: 'James K.',
    review: 'Bought the slippers as a gift and ended up ordering a second pair for myself. The fur is softer than anything I\u2019ve owned.',
    img: { src: '/images/avatar2.webp', alt: 'James K. review', width: '80', height: '80' },
    date: '1 week ago',
    badge: 'Verified purchase',
  },
  {
    name: 'Emily R.',
    review: 'The beanie kept me warm on a −15°C hike and never itched once. I\u2019m sold on yak wool for life.',
    img: { src: '/images/avatar3.webp', alt: 'Emily R. review', width: '80', height: '80' },
    date: '3 days ago',
    badge: 'Verified purchase',
  },
  {
    name: 'Michael T.',
    review: 'Fast shipping and the rug is exactly as described — dense, springy pile that the kids roll around on daily.',
    img: { src: '/images/avatar4.webp', alt: 'Michael T. review', width: '80', height: '80' },
    date: '5 days ago',
    badge: 'Verified purchase',
  },
  {
    name: 'Lisa N.',
    review: 'Beautifully made and clearly ethical. Knowing the wool is responsibly sourced made it an easy reorder.',
    img: { src: '/images/avatar5.webp', alt: 'Lisa N. review', width: '80', height: '80' },
    date: '1 day ago',
    badge: 'Verified purchase',
  },
]
</script>
