<template>
  <div class="px-4 pb-4 mt-3 md:px-6 md:pb-6 md:mt-0">
    <div class="flex justify-between typography-text-base pb-4">
      <div class="flex flex-col grow pr-2">
        <p>Items Subtotal</p>
        <p class="typography-text-xs text-neutral-500">Original Price</p>
        <p class="typography-text-xs text-secondary-700">Savings</p>
        <p class="my-2">Delivery</p>
        <p>Estimated Sales Tax</p>
      </div>
      <div class="flex flex-col text-right">
        <p>{{ subtotalAmount }}</p>
        <p class="typography-text-xs text-neutral-500">{{ orderDetails.originalPrice }}</p>
        <p class="typography-text-xs text-secondary-700">{{ orderDetails.savings }}</p>
        <p class="my-2">{{ orderDetails.delivery }}</p>
        <p>{{ totalTaxAmount }}</p>
      </div>
    </div>
  </div>
  <CartPromos :order-details="orderDetails" />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useCartStore } from "~/stores/cart";

const cartStore = useCartStore();
const { subtotalAmount, totalTaxAmount, totalDutyAmount, totalAmount, totalItems } =
  storeToRefs(cartStore);

const orderDetails = {
  items: totalItems,
  originalPrice: subtotalAmount,
  savings: 77.50,
  delivery: 0.0,
  duty: totalDutyAmount,
  tax: totalTaxAmount,
  totalAmount: totalAmount
};

</script>
