<template>
  <div class="relative min-h-[600px]">
    <picture>
      <source :srcset="heroCard.background.source" media="(min-width: 768px)" />
      <NuxtImg
        format="webp" 
        :src="heroCard.background.img.src"
        :alt="heroCard.background.img.alt"
        :width="heroCard.background.img.width"
        :height="heroCard.background.img.height"
        class="absolute z-[-1] md:object-cover"
      />
    </picture>
    <div class="md:flex md:flex-row-reverse md:justify-center max-w[1536px] mx-auto md:min-h-[600px]">
      <div class="flex flex-col md:basis-2/4 md:items-stretch md:overflow-hidden">
        <NuxtImg
          format="webp" 
          :src=heroCard.hero.img.src
          :alt="heroCard.hero.img.alt"
          :width="heroCard.hero.img.width"
          :height="heroCard.hero.img.height"
          class="object-cover object-left"
        />
      </div>
      <div class="p-4 md:p-10 md:max-w-[768px] md:flex md:flex-col md:justify-center md:items-start md:basis-2/4">
        <p class="typography-text-xs md:typography-text-sm font-bold tracking-widest text-neutral-500 uppercase">
          {{ heroCard.hero.text.background }}
        </p>
        <h1 class="typography-display-2 md:typography-display-1 md:leading-[67.5px] font-bold mt-2 mb-4">
          {{ heroCard.hero.text.main }}
        </h1>
        <p class="typography-text-base md:typography-text-lg">
          {{ heroCard.hero.text.description }}
        </p>
        <div class="flex flex-col md:flex-row gap-4 mt-6">
          <SfButton size="lg" @click.prevent="$emit('primaryTrigger')"> {{heroCard.button.primary}} </SfButton>
          <SfButton size="lg" variant="secondary" class="bg-white" @click.prevent="$emit('secondaryTrigger')"> {{ heroCard.button.secondary }} </SfButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import { SfButton } from '@storefront-ui/vue';

defineProps<{heroCard:any}>()
defineEmits<{
  (event: primaryTrigger): void;
  (event: secondaryTrigger): void;
}>()
</script>
