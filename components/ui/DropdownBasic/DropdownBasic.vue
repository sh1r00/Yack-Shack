<template>
  <SfDropdown v-model="isOpen">
    <template #trigger>
      <SfButton 
        class="min-h-[3rem] min-w-[5rem]"
        @click="toggle"
      >
        {{ props.title }}
      </SfButton>
    </template>
    <ul
      v-for="prop in props.dropdownItems"
        :key="prop.node.id"
        :value="prop.node"
        class="p-2 rounded bg-gray-100"
      >
      <SfButton
        class="z-50"
        @click="emit('dropdownEvent', prop.node); toggle()"
      >
        {{ prop.node.title }}
      </SfButton>
    </ul>
  </SfDropdown>
</template>

<script lang="ts" setup>
import { SfDropdown, useDisclosure, SfButton } from '@storefront-ui/vue';

const props = defineProps<{dropdownItems:any,title:any}>()
const emit = defineEmits<{dropdownEvent:any}>()
const { isOpen, toggle } = useDisclosure();
</script>