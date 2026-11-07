<template>
  <div>
    <component v-if="title" :is="tag || 'div'" class="font-medium typography-text-base">
      {{ title }}
    </component>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  tag?: string;
  title: string | undefined;
}>();

const { tag, title } = toRefs(props);
</script>
