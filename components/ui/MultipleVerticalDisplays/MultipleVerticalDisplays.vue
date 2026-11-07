<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div
      v-for="{ height, width, title, subtitle, description, callToAction, image, backgroundColor, reverse, link } in displayDetails"
      :key="title"
      :class="[
        `relative flex flex-col justify-between rounded-xl overflow-hidden ${backgroundColor}`,
        { 'flex-col-reverse': reverse },
      ]"
    >
      <a
        class="absolute inset-0 z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:rounded-xl"
        :aria-label="title"
        :href="link"
      />
      <div class="flex flex-col p-6 text-center relative z-20">
        <p class="mb-1 text-xs font-bold tracking-widest uppercase text-neutral-700">{{ subtitle }}</p>
        <p class="mb-2 text-xl font-bold text-neutral-900">{{ title }}</p>
        <p class="mb-4 text-sm text-neutral-600">{{ description }}</p>
        <SfButton class="font-semibold !bg-neutral-900 !text-white hover:!bg-neutral-800 self-center">
          {{ callToAction }}
        </SfButton>
      </div>
      <div class="flex items-center justify-center w-full p-4 relative z-10">
        <NuxtImg
          loading="lazy"
          format="webp"
          :src="image"
          :alt="title"
          :width="width"
          :height="height"
          class="object-contain max-h-48"
          crossorigin="anonymous"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { SfButton } from '@storefront-ui/vue';

defineProps<{ displayDetails: any[] }>()
</script>
