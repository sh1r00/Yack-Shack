<template>
  <UiFooterBasic :footer="footerConfig"/>
</template>

<script setup lang="ts">
import {
  SfIconContactSupport,
  SfIconFacebook,
  SfIconHelp,
  SfIconInstagram,
  SfIconCall,
  SfIconPinterest,
  SfIconTwitter,
  SfIconYoutube,
} from '@storefront-ui/vue';

const footerConfig = {
  categories: [
    {
      label: 'How to buy',
      subcategories: [
        { subcategoryLabel: 'Payment methods', link: '/help' },
        { subcategoryLabel: 'Order pickup', link: '/services' },
        { subcategoryLabel: 'Purchase status', link: '/services' },
        { subcategoryLabel: 'Track orders', link: '/services' },
        { subcategoryLabel: 'Returns', link: '/returns' },
      ],
    },
    {
      label: 'Help',
      subcategories: [
        { subcategoryLabel: 'Help centers', link: '/help' },
        { subcategoryLabel: 'Security & fraud', link: '/help' },
        { subcategoryLabel: 'Feedback', link: '/contact' },
        { subcategoryLabel: 'Contact', link: '/contact' },
      ],
    },
    {
      label: 'Services',
      subcategories: [
        { subcategoryLabel: 'Gift cards', link: '/services' },
        { subcategoryLabel: 'Order pickup', link: '/services' },
        { subcategoryLabel: 'Purchase status', link: '/services' },
        { subcategoryLabel: 'Track orders', link: '/services' },
      ],
    },
    {
      label: 'About',
      subcategories: [
        { subcategoryLabel: 'About us', link: '/about' },
        { subcategoryLabel: 'Order pickup', link: '/services' },
        { subcategoryLabel: 'Purchase status', link: '/services' },
        { subcategoryLabel: 'Track orders', link: '/services' },
        { subcategoryLabel: 'Returns', link: '/returns' },
      ],
    },
  ],
  socialMedia: [
    { label: 'Facebook', link: 'https://facebook.com/shoptulu', icon: SfIconFacebook },
    { label: 'Twitter', link: 'https://twitter.com/shoptulu', icon: SfIconTwitter },
    { label: 'Instagram', link: 'https://instagram.com/shoptulu', icon: SfIconInstagram },
    { label: 'Pinterest', link: 'https://pinterest.com/shoptulu', icon: SfIconPinterest },
    { label: 'Youtube', link: 'https://youtube.com/@shoptulu', icon: SfIconYoutube },
  ],
  contactOptions: [
    { label: 'Help center', link: '/help', details: ['Find answers online anytime'], icon: SfIconHelp },
    { label: 'Live chat', link: '/contact', details: ['Mon–Fri, 5am–10pm PT', 'Sat–Sun, 6am–9pm PT'], icon: SfIconContactSupport },
    { label: '1 234 567 8901', link: '/contact', details: ['Mon–Fri, 5am–10pm PT', 'Sat–Sun, 6am–9pm PT'], icon: SfIconCall },
  ],
  bottomLinks: [
    { label: 'Terms', link: '/terms' },
    { label: 'Privacy policy', link: '/privacy' },
  ],
  watermark: '© 2026 Yack-Shack. All rights reserved.',
}
</script>
