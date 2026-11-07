<template>
  <div v-if="colors && colors.length" class="mb-4 w-full">
    <p class="mb-2 text-sm font-medium text-neutral-700">
      Colour <span class="text-neutral-400">— {{ selectedColor || 'pick one' }}</span>
    </p>
    <div class="flex flex-wrap gap-2.5">
      <button
        v-for="color in colors"
        :key="color"
        type="button"
        class="swatch group"
        :class="{ 'swatch--active': selectedColor === color }"
        :aria-label="`Colour: ${color}`"
        :aria-pressed="selectedColor === color"
        @click="select(color)"
        @keyup.enter="select(color)"
      >
        <img
          :src="`/images/yak/swatches/${slug(color)}.svg`"
          :alt="`${color} yak fur`"
          class="swatch__img"
          loading="lazy"
        />
        <span class="swatch__label">{{ color }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from "~/stores/product";

// Colour name → swatch slug + hex (shared with utils/mockCatalog.js).
const FUR_COLORS: Record<string, { slug: string; hex: string }> = {
  'Tibetan Cream': { slug: 'tibetan-cream', hex: '#E8DCC3' },
  'Himalayan Gold': { slug: 'himalayan-gold', hex: '#C89B5A' },
  'Highland Brown': { slug: 'highland-brown', hex: '#8B5E3C' },
  'Smoky Charcoal': { slug: 'smoky-charcoal', hex: '#4A3F3A' },
  'Glacier Grey': { slug: 'glacier-grey', hex: '#B8B2A8' },
  'Sunset Copper': { slug: 'sunset-copper', hex: '#A9652E' },
  'Midnight Yak': { slug: 'midnight-yak', hex: '#2E2A28' },
  'Snow Yak': { slug: 'snow-yak', hex: '#F4EEE2' },
};

const props = defineProps<{
  colors: string[];
  variants: any[];
}>();

const emit = defineEmits<{ color: [payload: { name: string; hex: string }] }>();

const productStore = useProductStore();
const selectedColor = ref<string | null>(null);

// The parent may pass `variants` as a plain array OR a ref/computed (its own
// `variants.value = someComputed` assignment). Normalize to a plain array.
const variantList = computed<any[]>(() => {
  const v: any = props.variants;
  if (Array.isArray(v)) return v;
  if (v && Array.isArray(v.value)) return v.value;
  return [];
});

const slug = (name: string) => FUR_COLORS[name]?.slug ?? name.toLowerCase().replace(/\s+/g, '-');

const select = (name: string) => {
  selectedColor.value = name;
  const edge = variantList.value.find(
    (e: any) => e?.node?.title === name || e?.node?.selectedOptions?.[0]?.value === name
  );
  if (edge?.node) {
    const n = edge.node;
    productStore.setSelectedVariant({
      id: n.id,
      title: n.title,
      availableForSale: n.availableForSale,
      quantity: productStore.getSelectedVariant.quantity || 1,
      quantityAvailable: n.quantityAvailable ?? 1,
    });
  }
  emit('color', { name, hex: FUR_COLORS[name]?.hex ?? '#8B5E3C' });
};
</script>

<style scoped>
.swatch {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem;
  border-radius: 0.9rem;
  border: 2px solid transparent;
  background: #fff;
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}
.swatch__img {
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 0.7rem;
  object-fit: cover;
  border: 1px solid rgba(0, 0, 0, 0.08);
}
.swatch__label {
  font-size: 0.7rem;
  color: #6b4a2e;
  max-width: 4.5rem;
  text-align: center;
  line-height: 1.1;
}
.swatch:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 18px -8px rgba(139, 94, 60, 0.5);
}
.swatch--active {
  border-color: #8b5e3c;
  box-shadow: 0 0 0 3px rgba(139, 94, 60, 0.18);
}
/* Tap feedback (mobile) */
@media (hover: none) {
  .swatch:active {
    opacity: 0.7;
    transform: scale(0.97);
  }
}
</style>
