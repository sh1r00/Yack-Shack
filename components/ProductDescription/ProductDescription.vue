<template>
  <div class="block py-2 font-normal leading-5 typography-text-sm text-neutral-700">
    <template v-html="description" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  description: string | undefined;
}>();

const { description } = toRefs(props);
</script>
