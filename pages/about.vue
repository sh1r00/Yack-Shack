<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <h1 class="text-3xl font-bold mb-6">About Us</h1>

    <section class="mb-8">
      <p class="text-lg text-neutral-700 leading-relaxed mb-4">
        Welcome to <strong>Sh1r00 Storefront</strong> — your destination for quality products at great prices.
      </p>
      <p class="text-neutral-600 leading-relaxed mb-4">
        We're passionate about bringing you the best shopping experience. From the latest tech gadgets 
        to everyday essentials, we carefully curate our collection to ensure you get products that 
        meet the highest standards of quality and value.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-3">Our Mission</h2>
      <p class="text-neutral-600 leading-relaxed">
        To make shopping simple, fast, and enjoyable. We believe in transparent pricing, 
        exceptional customer service, and a seamless online experience.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-3">Why Shop With Us</h2>
      <div class="grid gap-4 md:grid-cols-3 mt-4">
        <div class="p-4 border rounded-lg text-center">
          <div class="text-3xl mb-2">🚚</div>
          <h3 class="font-medium">Free Shipping</h3>
          <p class="text-sm text-neutral-500">On orders over $50</p>
        </div>
        <div class="p-4 border rounded-lg text-center">
          <div class="text-3xl mb-2">🔄</div>
          <h3 class="font-medium">Easy Returns</h3>
          <p class="text-sm text-neutral-500">30-day return policy</p>
        </div>
        <div class="p-4 border rounded-lg text-center">
          <div class="text-3xl mb-2">🔒</div>
          <h3 class="font-medium">Secure Checkout</h3>
          <p class="text-sm text-neutral-500">SSL encrypted payments</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'About Us',
  meta: [{ name: 'description', content: 'Learn about Sh1r00 Storefront — our mission, values, and commitment to quality.' }],
})
</script>
