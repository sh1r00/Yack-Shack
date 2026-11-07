<script setup lang="ts">
const items = [
  'Ethically Sourced',
  'Free Shipping',
  '30-Day Returns',
  'Himalayan Yak Wool',
  'Lighter Than Cashmere',
  'Hypoallergenic',
  'Naturally Warm',
  'Secure Checkout',
]
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee-track">
      <div v-for="n in 2" :key="n" class="marquee-group">
        <span v-for="item in items" :key="`${n}-${item}`" class="marquee-item">
          {{ item }} <span class="marquee-star">✦</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  overflow: hidden;
  padding: 1.1rem 0;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(139, 94, 60, 0.06);
  user-select: none;
}
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee-scroll 32s linear infinite;
}
.marquee:hover .marquee-track {
  animation-play-state: paused;
}
.marquee-group {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}
.marquee-item {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0 1.1rem;
  color: #6b4a2e;
  font-family: 'DM Sans', 'Raleway', system-ui, sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  white-space: nowrap;
}
.marquee-star {
  color: #8b5e3c;
  font-family: sans-serif;
  font-size: 0.9rem;
}
@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
}

@media (hover: none) {
  .marquee-track { animation-duration: 48s; }
}
</style>
