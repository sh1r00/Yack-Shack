<template>
  <!-- Backdrop -->
  <transition
    enter-active-class="transition duration-200 ease-out"
    leave-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isOpen" class="fixed inset-0 bg-neutral-700 bg-opacity-50" />
  </transition>

  <!-- Modal -->
  <transition
    enter-active-class="transition duration-200 ease-out"
    leave-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 translate-y-10"
    enter-to-class="opacity-100 translate-y-0"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-10"
  >
    <SfModal
      v-model="isOpen"
      class="max-w-[90%] md:max-w-lg"
      tag="section"
      role="alertdialog"
      aria-labelledby="promoModalTitle"
      aria-describedby="promoModalDesc"
    >
      <header>
        <SfButton square variant="tertiary" class="absolute right-2 top-2" @click="isOpen = false">
          <SfIconClose />
        </SfButton>
      </header>
      <template #modalComponent>
        <slot :isComponent="shopStore.modal.modalComponent"></slot>
      </template>
    </SfModal>
  </transition>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import { SfModal, SfButton, SfIconClose } from '@storefront-ui/vue';
import {useShopStore} from '~/stores/shop'

const shopStore = useShopStore()

let isOpen = computed({
  get() {return shopStore.modal.isOpen},
  set(val) {shopStore.modal.isOpen = val}
})

const close = () => {
  shopStore.toggleModal('close')
}

</script>
