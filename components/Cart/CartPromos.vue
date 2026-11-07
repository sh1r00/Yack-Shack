<template>
  <div>
    <div v-if="promoCode" class="flex items-center mb-5 py-5 border-y border-neutral-200">
      <p>PromoCode</p>
        <SfButton size="sm" variant="tertiary" class="ml-auto mr-2" @click="removePromoCode">Remove</SfButton>
      <p>{{ formatPrice(promoCode) }}</p>
    </div>
    <form v-else class="flex gap-x-2 py-4 border-y border-neutral-200 mb-4" @submit.prevent="checkPromoCode">
      <SfInput v-model="inputValue" placeholder="Enter Promo Code" wrapper-class="grow" />
      <SfButton type="submit" variant="secondary">Apply</SfButton>
    </form>
    <p class="px-3 py-1.5 bg-secondary-100 text-secondary-700 typography-text-sm rounded-md text-center mb-4">
      You are saving ${{ Math.abs(orderDetails.savings).toFixed(2) }} on your order today!
    </p>
    <div
      class="flex justify-between typography-headline-4 md:typography-headline-3 font-bold pb-4 mb-4 border-b border-neutral-200"
    >
      <p>Total</p>
      <p>{{ orderDetails.totalAmount }}</p>
    </div>

    <div class="absolute top-0 right-0 mx-2 mt-2 sm:mr-6">
      <div
        v-if="showAddedCodeAlert"
        role="alert"
        class="flex items-start md:items-center shadow-md max-w-[600px] bg-positive-100 pr-2 pl-4 mb-2 ring-1 ring-positive-200 typography-text-sm md:typography-text-base py-1 rounded-md"
      >
        <SfIconCheckCircle class="mr-2 my-2 text-positive-700" />
        <p class="py-2 mr-2">Your promo code has been added.</p>
        <button
          type="button"
          class="p-1.5 md:p-2 ml-auto rounded-md text-positive-700 hover:bg-positive-200 active:bg-positive-300 hover:text-positive-800 active:text-positive-900"
          tabindex="0"
          aria-label="Close positive alert"
          @click="showAddedCodeAlert = false"
        >
          <SfIconClose class="hidden md:block" />
          <SfIconClose size="sm" class="md:hidden block" />
        </button>
      </div>
      <div
        v-if="showRemovedCodeAlert"
        role="alert"
        class="flex items-start md:items-center shadow-md max-w-[600px] bg-positive-100 pr-2 pl-4 mb-2 ring-1 ring-positive-200 typography-text-sm md:typography-text-base py-1 rounded-md"
      >
        <SfIconCheckCircle class="mr-2 my-2 text-positive-700" />
        <p class="py-2 mr-2">Your promo code has been removed.</p>
        <button
          id="close-possitive-alert"
          type="button"
          class="p-1.5 md:p-2 ml-auto rounded-md text-positive-700 hover:bg-positive-200 active:bg-positive-300 hover:text-positive-800 active:text-positive-900"
          tabindex="1"
          aria-label="Close positive alert"
          @click="showRemovedCodeAlert = false"
        >
          <SfIconClose class="hidden md:block" />
          <SfIconClose size="sm" class="md:hidden block" />
        </button>
      </div>
      <div
        v-if="showErrorAlert"
        role="alert"
        class="flex items-start md:items-center max-w-[600px] shadow-md bg-negative-100 pr-2 pl-4 ring-1 ring-negative-300 typography-text-sm md:typography-text-base py-1 rounded-md"
      >
        <p class="py-2 mr-2">This promo code is not valid.</p>
        <button
          type="button"
          class="p-1.5 md:p-2 ml-auto rounded-md text-negative-700 hover:bg-negative-200 active:bg-negative-300 hover:text-negative-800 active:text-negative-900"
          tabindex="2"
          aria-label="Close error alert"
          @click="showErrorAlert = false"
        >
          <SfIconClose class="hidden md:block" />
          <SfIconClose size="sm" class="md:hidden block" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { SfButton, SfInput, SfIconClose, SfIconCheckCircle } from '@storefront-ui/vue';

const props = defineProps<{orderDetails: {
  items: string,
  originalPrice: string
  savings: number,
  delivery: number,
  totalAmount: string,
  tax: string
}}>()

const inputValue = ref('');
const showRemovedCodeAlert = ref(false);
const showAddedCodeAlert = ref(false);
const showErrorAlert = ref(false);


const promoCode = ref(0);

const itemsSubtotal = computed(
  () => props.orderDetails.originalPrice + props.orderDetails.savings + props.orderDetails.delivery + props.orderDetails.tax,
);

const totalPrice = computed(() => itemsSubtotal.value + promoCode.value);

const checkPromoCode = () => {
  if ((promoCode.value === -100 && inputValue.value.toUpperCase() === 'VSF2020') || !inputValue.value) return;
  if (inputValue.value.toUpperCase() === 'VSF2020') {
    promoCode.value = -100;
    showAddedCodeAlert.value = true;
    setTimeout(() => (showAddedCodeAlert.value = false), 5000);
  } else {
    showErrorAlert.value = true;
    setTimeout(() => (showErrorAlert.value = false), 5000);
  }
};

const removePromoCode = () => {
  promoCode.value = 0;
  showRemovedCodeAlert.value = true;
  setTimeout(() => (showRemovedCodeAlert.value = false), 5000);
};

const removeString = (string: string) => {
  return string.replaceAll('"', '')
}
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
};
</script>