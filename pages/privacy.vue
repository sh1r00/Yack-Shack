<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <h1 class="text-3xl font-bold mb-8">Privacy Policy</h1>

    <p class="text-neutral-600 mb-6">Last updated: July 4, 2025</p>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-3">1. Information We Collect</h2>
      <p class="text-neutral-700 mb-3">We collect information you provide directly:</p>
      <ul class="list-disc pl-6 space-y-1 text-neutral-600">
        <li>Name, email address, and shipping address</li>
        <li>Payment information (processed securely by our payment partners)</li>
        <li>Order history and preferences</li>
        <li>Communications with our support team</li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
      <ul class="list-disc pl-6 space-y-1 text-neutral-600">
        <li>Process and fulfill your orders</li>
        <li>Send order confirmations and shipping updates</li>
        <li>Provide customer support</li>
        <li>Improve our products and website experience</li>
        <li>Send promotional emails (you can unsubscribe anytime)</li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-3">3. Information Sharing</h2>
      <p class="text-neutral-700">
        We do not sell or rent your personal information. We may share data with:
      </p>
      <ul class="list-disc pl-6 space-y-1 text-neutral-600">
        <li>Shipping carriers to deliver your orders</li>
        <li>Payment processors to complete transactions</li>
        <li>Service providers who assist with our operations</li>
        <li>Law enforcement when required by law</li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-3">4. Data Security</h2>
      <p class="text-neutral-700">
        We implement industry-standard security measures including SSL encryption, 
        secure servers, and regular security audits to protect your data.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-3">5. Cookies</h2>
      <p class="text-neutral-700">
        We use cookies to improve your browsing experience, remember your preferences, 
        and analyze site traffic. You can disable cookies in your browser settings.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-3">6. Your Rights</h2>
      <ul class="list-disc pl-6 space-y-1 text-neutral-600">
        <li>Access and download your personal data</li>
        <li>Request correction of inaccurate data</li>
        <li>Request deletion of your account and data</li>
        <li>Opt out of marketing communications</li>
      </ul>
    </section>

    <section>
      <h2 class="text-xl font-semibold mb-3">7. Contact Us</h2>
      <p class="text-neutral-700">
        For privacy-related inquiries: <NuxtLink to="/contact" class="text-primary-700 underline">Contact us here</NuxtLink>.
      </p>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Privacy Policy',
  meta: [{ name: 'description', content: 'Privacy policy — how we collect, use, and protect your personal information.' }],
})
</script>
