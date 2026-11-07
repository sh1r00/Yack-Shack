<template>
  <div class="flex items-center pt-1">
    <SfRating size="xs" :value="rating.value" :max="5" />
    <NuxtLink :to="rating.linkToRatings" variant="secondary" class="pl-1 no-underline">
      <SfCounter size="xs">{{ rating.totalRatings }}</SfCounter>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
import { SfRating, SfCounter } from '@storefront-ui/vue'
const rating = {
  value: 4,
  totalRatings: 122,
  linkToRatings: '#'
}
</script>