<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <h1 class="text-3xl font-bold mb-8">Help Center</h1>

    <!-- Help Centers -->
    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4">Help Centers</h2>
      <p class="text-neutral-700 mb-4">
        Find answers to common questions about shopping, ordering, payments, and more.
      </p>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="p-4 border rounded-lg">
          <h3 class="font-medium mb-2">Shopping Guide</h3>
          <p class="text-sm text-neutral-600">Learn how to browse products, use search, and find what you need.</p>
        </div>
        <div class="p-4 border rounded-lg">
          <h3 class="font-medium mb-2">Payment Methods</h3>
          <p class="text-sm text-neutral-600">We accept major credit cards, PayPal, Apple Pay, and Google Pay.</p>
        </div>
        <div class="p-4 border rounded-lg">
          <h3 class="font-medium mb-2">Order Status</h3>
          <p class="text-sm text-neutral-600">Check your order status anytime from your account dashboard.</p>
        </div>
        <div class="p-4 border rounded-lg">
          <h3 class="font-medium mb-2">Shipping Information</h3>
          <p class="text-sm text-neutral-600">Free standard shipping on orders over $50. Express delivery available.</p>
        </div>
      </div>
    </section>

    <!-- Security & Fraud -->
    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4">Security &amp; Fraud Protection</h2>
      <p class="text-neutral-700 mb-3">
        Your security is our top priority. We use industry-standard encryption to protect your personal and payment information.
      </p>
      <ul class="list-disc pl-6 space-y-2 text-neutral-600">
        <li>SSL/TLS encryption on all pages</li>
        <li>PCI DSS compliant payment processing</li>
        <li>Two-factor authentication for accounts</li>
        <li>24/7 fraud monitoring systems</li>
        <li>Never share your password or payment details via email</li>
      </ul>
    </section>

    <!-- Feedback -->
    <section class="mb-10">
      <h2 class="text-xl font-semibold mb-4">Feedback</h2>
      <p class="text-neutral-700 mb-3">
        We value your input! Help us improve by sharing your thoughts.
      </p>
      <NuxtLink to="/contact" class="text-primary-700 underline font-medium">
        Send us your feedback →
      </NuxtLink>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Help Center',
  meta: [{ name: 'description', content: 'Find answers, security information, and contact options for our store.' }],
})
</script>
