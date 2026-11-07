<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <h1 class="text-3xl font-bold mb-8">Our Services</h1>

    <!-- Gift Cards -->
    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4">Gift Cards</h2>
      <p class="text-neutral-700 mb-3">
        Give the perfect gift with our digital gift cards. Available in denominations from $10 to $500.
      </p>
      <ul class="list-disc pl-6 space-y-1 text-neutral-600">
        <li>Delivered instantly via email</li>
        <li>No expiration date</li>
        <li>Redeemable on all products</li>
        <li>Check your balance anytime online</li>
      </ul>
    </section>

    <!-- Order Pickup -->
    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4">Order Pickup</h2>
      <p class="text-neutral-700 mb-3">
        Choose in-store pickup at checkout and collect your order at your convenience.
      </p>
      <ul class="list-disc pl-6 space-y-1 text-neutral-600">
        <li>Select "In-Store Pickup" during checkout</li>
        <li>Most orders ready within 2 hours</li>
        <li>Bring your order confirmation and ID</li>
        <li>Free pickup on all orders</li>
      </ul>
    </section>

    <!-- Purchase Status -->
    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4">Purchase Status</h2>
      <p class="text-neutral-700 mb-3">
        Track your order from confirmation to delivery.
      </p>
      <div class="bg-neutral-50 p-4 rounded-lg border">
        <h3 class="font-medium mb-2">Order Status Meanings:</h3>
        <ul class="space-y-2 text-sm text-neutral-600">
          <li><span class="font-medium text-neutral-800">Processing</span> — Your order is being prepared</li>
          <li><span class="font-medium text-neutral-800">Shipped</span> — Your package is on the way</li>
          <li><span class="font-medium text-neutral-800">Out for Delivery</span> — Arriving today</li>
          <li><span class="font-medium text-neutral-800">Delivered</span> — Package has arrived</li>
        </ul>
      </div>
    </section>

    <!-- Track Orders -->
    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4">Track Orders</h2>
      <p class="text-neutral-700 mb-3">
        Once your order ships, you'll receive a tracking number via email.
      </p>
      <p class="text-neutral-600">
        Use the tracking link in your confirmation email to follow your package in real time. 
        Standard shipping takes 5-7 business days. Express shipping delivers in 1-2 business days.
      </p>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Services',
  meta: [{ name: 'description', content: 'Gift cards, order pickup, purchase tracking, and shipping services.' }],
})
</script>
