<template>
  <article v-if="review" class="w-full max-w-lg mx-auto p-6 bg-white rounded-xl border border-neutral-100 shadow-sm">
    <header class="flex items-center gap-3 mb-4">
      <NuxtImg
        loading="lazy"
        format="webp"
        :src="review.img.src"
        :alt="review.img.alt"
        :width="review.img.width"
        :height="review.img.height"
        class="w-10 h-10 rounded-full object-cover ring-2 ring-neutral-100"
      />
      <div class="flex-1">
        <p class="text-sm font-semibold text-neutral-900">{{ review.name }}</p>
        <div class="flex items-center gap-2">
          <SfRating :value="5" :max="5" size="xs" />
          <span class="text-xs text-neutral-400">{{ review.date }}</span>
        </div>
      </div>
      <span class="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-1 rounded-full font-medium">
        <SfIconCheck size="xs" /> {{ review.badge }}
      </span>
    </header>
    <blockquote class="text-neutral-600 leading-relaxed italic border-l-3 border-primary-200 pl-4">
      "{{ review.review }}"
    </blockquote>
  </article>
  <article v-else class="w-full max-w-lg mx-auto p-6 bg-white rounded-xl border border-neutral-100 text-center">
    <p class="text-neutral-400">Could not load review</p>
  </article>
</template>

<script lang="ts" setup>
import { SfRating, SfIconCheck } from '@storefront-ui/vue';

defineProps<{ review: any }>()
</script>
