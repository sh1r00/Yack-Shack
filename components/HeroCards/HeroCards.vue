<template>
  <section
    v-spotlight
    class="hero-section relative isolate w-full overflow-hidden bg-gradient-to-br from-primary-900 via-primary-700 to-secondary-700"
  >
    <!-- Aurora background glows -->
    <div class="hero-glow hero-glow-primary absolute -z-10" aria-hidden="true" />
    <div class="hero-glow hero-glow-secondary absolute -z-10" aria-hidden="true" />
    <!-- Cursor spotlight -->
    <div class="hero-spotlight" aria-hidden="true" />

    <div class="relative max-w-[1536px] mx-auto px-4 md:px-6 py-20 md:py-32">
      <div class="hero-layout">
        <div class="hero-copy">
          <!-- Tagline -->
          <p class="inline-block text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-secondary-100 bg-white/10 px-4 py-1.5 rounded-full mb-6">
            Ethically Sourced · Himalayan Yak
          </p>

          <!-- Kinetic headline -->
          <h1 class="hero-title text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6"><span v-for="(word, i) in headlineWords" :key="i" class="hero-word" :class="{ 'hero-word-accent': word.accent }" :style="{ animationDelay: `${i * 70}ms` }">{{ word.text }}</span></h1>

          <!-- Description (draw-in accent) -->
          <p class="hero-subtitle text-lg md:text-xl text-secondary-100/80 leading-relaxed mb-10 max-w-xl">
            Yak fur goods, spun from high-altitude herds. Lighter than cashmere,
            warmer than wool — and so soft you'll never go back.
          </p>

          <!-- Buttons (magnetic) -->
          <div class="flex flex-col sm:flex-row gap-4">
            <button
              v-magnetic
              class="inline-flex items-center justify-center px-8 py-3.5 bg-white text-primary-800 font-semibold rounded-xl hover:bg-secondary-50 active:bg-secondary-100 transition-colors shadow-lg shadow-black/10"
              @click="navigateTo('/collections/all')"
            >
              Shop the Herd
              <span class="ml-2">→</span>
            </button>
            <button
              v-magnetic
              class="inline-flex items-center justify-center px-8 py-3.5 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 active:bg-white/20 transition-colors"
              @click="navigateTo('/searchProducts')"
            >
              Explore All Products
            </button>
          </div>
        </div>

        <!-- Hero art (parallax + tilt) -->
        <div v-parallax="0.12" class="hero-art" aria-label="Featured product: Himalayan Yak Throw">
          <div v-tilt="5" class="hero-art-frame">
            <img
              src="/images/yak/products/himalayan-yak-throw.svg"
              alt="Himalayan Yak Throw in a warm gold yak-fur weave"
              fetchpriority="high"
            />
            <span class="hero-orbit hero-orbit-one" aria-hidden="true" />
            <span class="hero-orbit hero-orbit-two" aria-hidden="true" />
          </div>
        </div>
      </div>

      <!-- Stats row -->
      <div class="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 pt-8 border-t border-white/10">
        <div class="text-center">
          <p class="text-2xl md:text-3xl font-bold text-white">10</p>
          <p class="text-sm text-secondary-200/80">Yak Fur Styles</p>
        </div>
        <div class="text-center">
          <p class="text-2xl md:text-3xl font-bold text-white">8</p>
          <p class="text-sm text-secondary-200/80">Colourways</p>
        </div>
        <div class="text-center">
          <p class="text-2xl md:text-3xl font-bold text-white">100%</p>
          <p class="text-sm text-secondary-200/80">Ethically Sourced</p>
        </div>
      </div>
    </div>

    <!-- Scroll cue -->
    <a href="#featured-categories" class="hero-scroll-cue" aria-label="Scroll to shop by category">
      <span>Scroll</span>
      <span class="hero-scroll-cue-chevron" aria-hidden="true">↓</span>
    </a>
  </section>
</template>

<script lang="ts" setup>
const headlineWords = [
  { text: 'Wrap', accent: false },
  { text: ' Yourself', accent: false },
  { text: ' In', accent: false },
  { text: ' Yak', accent: true },
]
</script>

<style scoped>
/* --- Aurora background --- */
.hero-glow {
  width: min(46vw, 34rem);
  aspect-ratio: 1;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.28;
  pointer-events: none;
}
.hero-glow-primary {
  top: 6%;
  left: -10%;
  background: radial-gradient(circle, rgba(139, 94, 60, 0.85), rgba(139, 94, 60, 0) 70%);
  animation: aurora-drift 16s ease-in-out infinite;
}
.hero-glow-secondary {
  right: -12%;
  bottom: -14%;
  background: radial-gradient(circle, rgba(200, 155, 90, 0.7), rgba(200, 155, 90, 0) 70%);
  animation: aurora-drift 22s ease-in-out -7s infinite;
}
@keyframes aurora-drift {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(5%, 4%) scale(1.12);
  }
  66% {
    transform: translate(-4%, -3%) scale(0.94);
  }
}

/* --- Cursor spotlight --- */
.hero-spotlight {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(
    560px circle at var(--spot-x, 50%) var(--spot-y, 40%),
    rgba(245, 238, 230, 0.14),
    transparent 62%
  );
  animation: spotlight-breathe 7s ease-in-out infinite;
}
@keyframes spotlight-breathe {
  0%,
  100% {
    opacity: 0.55;
  }
  50% {
    opacity: 1;
  }
}

/* --- Layout --- */
.hero-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.88fr);
  align-items: center;
  gap: clamp(2.5rem, 6vw, 5rem);
}

/* --- Kinetic headline --- */
.hero-title {
  text-wrap: balance;
}
.hero-word {
  display: inline-block;
  animation: word-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards;
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1), filter 220ms ease;
}
.hero-word:hover {
  transform: translateY(-5px);
  filter: brightness(1.15);
}
.hero-word-accent {
  background-image: linear-gradient(90deg, #efd093, #f4eee2);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}
@keyframes word-in {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

/* --- Draw-in accent under subtitle --- */
.hero-subtitle {
  position: relative;
}
.hero-subtitle::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -0.7rem;
  width: 100%;
  max-width: 15rem;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, #c89b5a, #f4eee2);
  transform-origin: left;
  animation: draw-in 1.1s 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes draw-in {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

/* --- Hero art --- */
.hero-art {
  position: relative;
  min-width: 0;
  padding: 1rem;
}
.hero-art-frame {
  position: relative;
  z-index: 1;
  padding: clamp(1rem, 2.5vw, 1.5rem);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 1.75rem;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2rem 5rem -2.5rem rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(14px);
}
.hero-art-frame img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 1rem;
  object-fit: cover;
}
.hero-orbit {
  position: absolute;
  z-index: 0;
  width: 5rem;
  aspect-ratio: 1;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 50%;
}
.hero-orbit-one {
  top: -1rem;
  right: -0.5rem;
}
.hero-orbit-two {
  bottom: -0.5rem;
  left: -0.5rem;
  width: 2.75rem;
  background: rgba(200, 155, 90, 0.35);
  opacity: 0.7;
}

/* --- Scroll cue --- */
.hero-scroll-cue {
  position: absolute;
  bottom: 1.4rem;
  left: 50%;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
}
.hero-scroll-cue-chevron {
  color: #c89b5a;
  font-size: 1.1rem;
  animation: scroll-bounce 1.7s ease-in-out infinite;
}
@keyframes scroll-bounce {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.7;
  }
  50% {
    transform: translateY(6px);
    opacity: 1;
  }
}

/* --- Mobile: cut GPU-expensive blur, stack layout, hide scroll cue --- */
@media (max-width: 767px) {
  .hero-layout {
    grid-template-columns: minmax(0, 1fr);
    gap: 1.5rem;
  }
  .hero-glow {
    filter: blur(40px);
  }
  .hero-art-frame {
    backdrop-filter: none;
  }
  .hero-art {
    width: min(100%, 26rem);
    margin: 0 auto;
  }
  .hero-scroll-cue {
    display: none;
  }
}

/* --- Reduced motion: stop all new animations --- */
@media (prefers-reduced-motion: reduce) {
  .hero-glow,
  .hero-spotlight,
  .hero-word,
  .hero-subtitle::after,
  .hero-scroll-cue-chevron {
    animation: none;
  }
}
</style>
