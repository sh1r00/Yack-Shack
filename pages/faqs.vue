<template>
  <div class="container mx-auto px-4 py-12 max-w-4xl">
    <h1 class="text-3xl font-bold mb-8">Frequently Asked Questions</h1>

    <div class="space-y-4">
      <details class="border rounded-lg p-4" v-for="faq in faqs" :key="faq.q">
        <summary class="font-medium cursor-pointer text-lg">{{ faq.q }}</summary>
        <p class="mt-3 text-neutral-600 leading-relaxed">{{ faq.a }}</p>
      </details>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'FAQs',
  meta: [{ name: 'description', content: 'Frequently asked questions about shopping, shipping, returns, and more.' }],
})

const faqs = [
  {
    q: 'How do I track my order?',
    a: 'Once your order ships, you\'ll receive a tracking number via email. You can also visit our Services page to check your order status anytime.'
  },
  {
    q: 'What is your return policy?',
    a: 'We offer a 30-day return policy on most items. Products must be unused and in original packaging. Visit our Returns page for full details.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit and debit cards, PayPal, Apple Pay, and Google Pay. All payments are processed securely with SSL encryption.'
  },
  {
    q: 'How long does shipping take?',
    a: 'Standard shipping takes 5-7 business days. Express shipping delivers in 1-2 business days. Free standard shipping on orders over $50.'
  },
  {
    q: 'Do you ship internationally?',
    a: 'Currently, we ship within the United States. We\'re working on expanding to international destinations — stay tuned!'
  },
  {
    q: 'Can I change or cancel my order?',
    a: 'Orders can be modified or canceled within 1 hour of placing them. After that, contact our support team and we\'ll do our best to help.'
  },
  {
    q: 'How do I contact customer support?',
    a: 'You can reach us via email at support@shoptulu.com, by phone at 1-234-567-8901, or through our Contact page. We\'re available Mon–Fri 5am–10pm PT and Sat–Sun 6am–9pm PT.'
  },
  {
    q: 'Is my personal information secure?',
    a: 'Yes. We use industry-standard SSL encryption and never sell your personal data. Read our Privacy Policy for complete details.'
  },
]
</script>
