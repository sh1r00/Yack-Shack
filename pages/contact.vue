<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <h1 class="text-3xl font-bold mb-8">Contact Us</h1>

    <div class="grid gap-8 md:grid-cols-2 mb-12">
      <!-- Contact Info -->
      <div>
        <h2 class="text-xl font-semibold mb-4">Get in Touch</h2>

        <div class="space-y-4">
          <div class="flex items-start gap-3">
            <span class="text-2xl">📧</span>
            <div>
              <h3 class="font-medium">Email</h3>
              <p class="text-neutral-600">support@shoptulu.com</p>
              <p class="text-sm text-neutral-500">We respond within 24 hours</p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <span class="text-2xl">📞</span>
            <div>
              <h3 class="font-medium">Phone</h3>
              <p class="text-neutral-600">1-234-567-8901</p>
              <p class="text-sm text-neutral-500">Mon–Fri, 5am–10pm PT | Sat–Sun, 6am–9pm PT</p>
            </div>
          </div>

          <div class="flex items-start gap-3">
            <span class="text-2xl">💬</span>
            <div>
              <h3 class="font-medium">Live Chat</h3>
              <p class="text-neutral-600">Available during business hours</p>
              <p class="text-sm text-neutral-500">Mon–Fri, 5am–10pm PT | Sat–Sun, 6am–9pm PT</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Links -->
      <div>
        <h2 class="text-xl font-semibold mb-4">Quick Links</h2>
        <ul class="space-y-3">
          <li>
            <NuxtLink to="/help" class="text-primary-700 underline">Help Center →</NuxtLink>
            <p class="text-sm text-neutral-500">Find answers to common questions</p>
          </li>
          <li>
            <NuxtLink to="/returns" class="text-primary-700 underline">Returns &amp; Refunds →</NuxtLink>
            <p class="text-sm text-neutral-500">Start a return or check refund status</p>
          </li>
          <li>
            <NuxtLink to="/services" class="text-primary-700 underline">Track Your Order →</NuxtLink>
            <p class="text-sm text-neutral-500">Follow your package in real time</p>
          </li>
          <li>
            <NuxtLink to="/faqs" class="text-primary-700 underline">FAQs →</NuxtLink>
            <p class="text-sm text-neutral-500">Frequently asked questions</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Contact Us',
  meta: [{ name: 'description', content: 'Get in touch with our support team — email, phone, or live chat.' }],
})
</script>
