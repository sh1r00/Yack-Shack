<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <h1 class="text-3xl font-bold mb-8">Terms of Use</h1>

    <p class="text-neutral-600 mb-6">Last updated: July 4, 2025</p>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
      <p class="text-neutral-700">
        By accessing and using this website, you accept and agree to be bound by these Terms of Use. If you do not agree, please do not use this site.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-3">2. Use of the Site</h2>
      <p class="text-neutral-700 mb-3">You agree to use this site only for lawful purposes. You may not:</p>
      <ul class="list-disc pl-6 space-y-1 text-neutral-600">
        <li>Use the site in any way that violates applicable laws</li>
        <li>Attempt to interfere with the site's security features</li>
        <li>Use automated means to access or scrape content</li>
        <li>Impersonate any person or entity</li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-3">3. Orders &amp; Pricing</h2>
      <p class="text-neutral-700">
        All prices are listed in USD. We reserve the right to modify prices without notice. 
        In the event of a pricing error, we may cancel your order and issue a full refund.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-3">4. Intellectual Property</h2>
      <p class="text-neutral-700">
        All content on this site — including text, images, logos, and product descriptions — 
        is protected by copyright and trademark laws. You may not reproduce or distribute any 
        content without written permission.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-3">5. Limitation of Liability</h2>
      <p class="text-neutral-700">
        We are not liable for any indirect, incidental, or consequential damages arising from 
        your use of this site or any products purchased through it.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-3">6. Changes to Terms</h2>
      <p class="text-neutral-700">
        We may update these Terms at any time. Continued use of the site after changes constitutes 
        acceptance of the revised Terms.
      </p>
    </section>

    <section>
      <h2 class="text-xl font-semibold mb-3">7. Contact</h2>
      <p class="text-neutral-700">
        Questions about these Terms? <NuxtLink to="/contact" class="text-primary-700 underline">Contact us here</NuxtLink>.
      </p>
    </section>
  </div>
</template>

<script setup>
useHead({
  title: 'Terms of Use',
  meta: [{ name: 'description', content: 'Terms of use and conditions for shopping on our store.' }],
})
</script>
