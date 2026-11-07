<template>
  <div class="border border-neutral-200 rounded-md divide-y text-neutral-900">
    <SfAccordionItem
      v-for="({ id, summary, details }, index) in accordionItems"
      :key="id"
      :model-value="isTransitioning || opened[index]"
      @update:model-value="
        (isOpen) => {
          isTransitioning = true;
          opened[index] = isOpen;
        }
      "
    >
      <template #summary>
        <p class="p-4 font-medium hover:bg-neutral-100 active:neutral-100">{{ summary }}</p>
      </template>
      <Transition
        enter-from-class="grid grid-rows-[0fr]"
        enter-to-class="grid grid-rows-[1fr]"
        leave-from-class="grid grid-rows-[1fr]"
        leave-to-class="grid grid-rows-[0fr]"
        @after-leave="isTransitioning = false"
        @after-enter="isTransitioning = false"
      >
        <div v-if="opened[index]" class="grid duration-300 ease-in-out transition-[grid-template-rows]">
          <div class="overflow-hidden">
            <p class="p-4">{{ details }}</p>
          </div>
        </div>
      </Transition>
    </SfAccordionItem>
  </div>
</template>

<script lang="ts" setup>
import { SfAccordionItem } from '@storefront-ui/vue';
import { ref } from 'vue';

defineProps<{accordionItems: any}>()

const opened = ref<boolean[]>([]);
const isTransitioning = ref(false);

</script>
