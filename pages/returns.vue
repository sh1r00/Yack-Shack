<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <h1 class="text-3xl font-bold mb-8">Returns &amp; Refunds</h1>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-3">Return Policy</h2>
      <p class="text-neutral-700 mb-4">
        We want you to be completely satisfied with your purchase. If you're not happy, you can return most items within 30 days of delivery.
      </p>

      <div class="bg-neutral-50 p-6 rounded-lg border mb-6">
        <h3 class="font-medium mb-3">Return Eligibility</h3>
        <ul class="list-disc pl-6 space-y-2 text-neutral-600">
          <li>Items must be unused and in original packaging</li>
          <li>Return within 30 days of delivery date</li>
          <li>Include all accessories, manuals, and warranty cards</li>
          <li>Proof of purchase required (order number or receipt)</li>
        </ul>
      </div>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-3">How to Return</h2>
      <ol class="list-decimal pl-6 space-y-2 text-neutral-700">
        <li>Contact our support team at <NuxtLink to="/contact" class="text-primary-700 underline">our contact page</NuxtLink></li>
        <li>Receive a return authorization and prepaid shipping label</li>
        <li>Pack your item securely with all original packaging</li>
        <li>Drop off at any authorized shipping location</li>
        <li>Refund processed within 5-7 business days after we receive the item</li>
      </ol>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-3">Refunds</h2>
      <p class="text-neutral-700 mb-3">
        Refunds are issued to the original payment method. Processing time varies by payment provider:
      </p>
      <ul class="list-disc pl-6 space-y-1 text-neutral-600">
        <li>Credit/Debit Cards: 3-5 business days</li>
        <li>PayPal: 1-3 business days</li>
        <li>Store Credit: Instant</li>
      </ul>
    </section>

    <section>
      <h2 class="text-xl font-semibold mb-3">Non-Returnable Items</h2>
      <ul class="list-disc pl-6 space-y-1 text-neutral-600">
        <li>Gift cards and digital products</li>
        <li>Personal care items (opened)</li>
        <li>Custom or personalized products</li>
        <li>Clearance/final sale items marked "non-returnable"</li>
      </ul>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Returns & Refunds',
  meta: [{ name: 'description', content: 'Return policy, refund information, and how to return items purchased from our store.' }],
})
</script>
