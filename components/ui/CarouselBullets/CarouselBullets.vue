<template>
  <div v-if="carouselItems" class="relative flex flex-col w-full gap-4">
    <SfScrollable
      class="w-full h-full snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      :active-index="activeIndex"
      wrapper-class="h-full group/scrollable"
      is-active-index-centered
      :previous-disabled="activeIndex === 0"
      :next-disabled="activeIndex === carouselItems.length - 1"
      buttons-placement="block"
      @on-prev="activeIndex -= 1"
      @on-next="activeIndex += 1"
    >
      <template #previousButton="defaultProps">
        <SfButton
          v-bind="defaultProps"
          :disabled="activeIndex === 0"
          class="absolute hidden group-hover/scrollable:block disabled:!hidden !rounded-full !p-2 z-10 top-1/2 -translate-y-1/2 left-2 bg-white shadow-md hover:shadow-lg transition-shadow"
          variant="secondary"
          size="lg"
          square
        >
          <SfIconChevronLeft />
        </SfButton>
      </template>
      <div
        v-for="(item, index) in carouselItems"
        :key="index"
        class="relative flex justify-center basis-full snap-center snap-always shrink-0 grow px-4"
      >
        <slot name="slide" :item="item" :index="index" />
      </div>
      <template #nextButton="defaultProps">
        <SfButton
          v-bind="defaultProps"
          :disabled="activeIndex === carouselItems.length - 1"
          class="absolute hidden group-hover/scrollable:block disabled:!hidden !rounded-full !p-2 z-10 top-1/2 -translate-y-1/2 right-2 bg-white shadow-md hover:shadow-lg transition-shadow"
          variant="secondary"
          size="lg"
          square
        >
          <SfIconChevronRight />
        </SfButton>
      </template>
    </SfScrollable>
    <!-- Dots indicator -->
    <div v-if="carouselItems.length > 1" class="flex justify-center gap-2 py-2">
      <button
        v-for="(item, index) in carouselItems"
        :key="`dot-${index}`"
        type="button"
        :aria-label="`Go to slide ${index + 1}`"
        :class="[
          'w-2.5 h-2.5 rounded-full transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-700',
          activeIndex === index
            ? 'bg-primary-700 w-6'
            : 'bg-gray-300 hover:bg-gray-400',
        ]"
        @click="activeIndex = index"
      />
    </div>
  </div>
  <div v-else class="relative flex flex-col w-full items-center justify-center py-12">
    <p class="text-neutral-400">No items to display</p>
  </div>
</template>

<script lang="ts" setup>
import { SfScrollable, SfButton, SfIconChevronLeft, SfIconChevronRight } from '@storefront-ui/vue';
import { ref } from 'vue';

defineProps<{ carouselItems: any[] }>()
const activeIndex = ref(0);
</script>
