<template>
  <UiAnimatedAccordion class="my-[12vh] mx-a" :accordion-items="accordionItems" />
</template>

<script lang="ts" setup>

const accordionItems = [
  {
    id: 'acc-1',
    summary: 'How long does shipping take?',
    details: 'Standard shipping takes 5-7 business days within the continental US. Express shipping delivers in 1-2 business days. Orders are processed within 24 hours. Free standard shipping on all orders over $50.'
  },
  {
    id: 'acc-2',
    summary: 'What is your return policy?',
    details: 'We offer a 30-day return policy on most items. Products must be unused, in original packaging, and include all accessories. Refunds are processed within 5-7 business days after we receive the returned item. Visit our Returns page for full details.'
  },
  {
    id: 'acc-3',
    summary: 'Do you offer international shipping?',
    details: 'Currently, we ship within the United States and to select international destinations including Canada, the UK, and Australia. International shipping rates are calculated at checkout based on destination and package weight. Delivery typically takes 7-14 business days.'
  },
  {
    id: 'acc-4',
    summary: 'How can I track my order?',
    details: 'Once your order ships, you will receive a confirmation email with a tracking number. You can track your package anytime on our Services page or directly through the carrier\'s website. Tracking information is typically available within 24 hours of shipment.'
  },
  {
    id: 'acc-5',
    summary: 'What payment methods do you accept?',
    details: 'We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. All transactions are encrypted with industry-standard SSL security for your protection.'
  },
  {
    id: 'acc-6',
    summary: 'Can I modify or cancel my order?',
    details: 'Orders can be modified or canceled within one hour of placement. After that window, contact our support team at support@shoptulu.com or call 1-234-567-8901 and we\'ll do our best to assist. Once an order ships, it cannot be canceled but can be returned under our return policy.'
  },
]
</script>
