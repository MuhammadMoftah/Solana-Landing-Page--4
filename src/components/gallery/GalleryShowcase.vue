<script setup lang="ts">
import { computed, ref, watch } from 'vue';

interface Item {
  id: string;
  alt: string;
  caption: string;
  position?: string;
  featuredSrc: string;
  featuredSrcset: string;
  thumbSrc: string;
  thumbSrcset: string;
  fullSrc: string;
  width: number;
  height: number;
}

const props = defineProps<{ items: Item[] }>();

const PAGE_SIZE = 6;
const FEATURED_SIZES = '(min-width: 64rem) 52rem, 100vw';
const index = ref(0);
const direction = ref<1 | -1>(1);
const total = props.items.length;

const current = computed(() => props.items[index.value]);
const page = computed(() => Math.floor(index.value / PAGE_SIZE));
const pageCount = Math.ceil(total / PAGE_SIZE);
const pad = (n: number) => String(n).padStart(2, '0');

function go(next: number) {
  const target = (next + total) % total;
  if (target === index.value) return;
  direction.value = target > index.value || (index.value === total - 1 && target === 0) ? 1 : -1;
  index.value = target;
}

const prev = () => go(index.value - 1);
const next = () => go(index.value + 1);

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    next();
  } else if (event.key === 'ArrowLeft') {
    event.preventDefault();
    prev();
  }
}

let startX: number | null = null;
function onPointerDown(event: PointerEvent) {
  if (event.pointerType !== 'mouse') startX = event.clientX;
}
function onPointerUp(event: PointerEvent) {
  if (startX === null) return;
  const dx = event.clientX - startX;
  startX = null;
  if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
}

// Warm the cache for the neighbouring images so transitions don't wait on the network.
watch(index, (i) => {
  for (const n of [i + 1, i - 1]) {
    const item = props.items[(n + total) % total];
    const img = new Image();
    img.sizes = FEATURED_SIZES;
    img.srcset = item.featuredSrcset;
  }
});
</script>

<template>
  <div
    class="gallery grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:items-start lg:gap-8"
    role="region"
    aria-roledescription="carousel"
    aria-label="Solana East image gallery"
    @keydown="onKeydown"
  >
    <figure class="min-w-0">
      <div
        class="corner-frame relative aspect-[4/3] touch-pan-y overflow-hidden border border-white/12 bg-ink-850 sm:aspect-[16/10]"
        @pointerdown="onPointerDown"
        @pointerup="onPointerUp"
      >
        <Transition :name="direction === 1 ? 'slide-next' : 'slide-prev'">
          <img
            :key="current.id"
            :src="current.featuredSrc"
            :srcset="current.featuredSrcset"
            :sizes="FEATURED_SIZES"
            :alt="current.alt"
            :width="current.width"
            :height="current.height"
            :style="current.position ? { objectPosition: current.position } : undefined"
            loading="lazy"
            decoding="async"
            class="absolute inset-0 size-full object-cover"
          />
        </Transition>
        <span class="pointer-events-none absolute right-0 bottom-0 h-16 w-16 border-r-2 border-b-2 border-ember-500" aria-hidden="true"></span>
      </div>
      <figcaption class="mt-5 flex flex-wrap items-center gap-x-6 gap-y-4">
        <span class="numeral text-[2rem] tabular-nums" aria-live="polite">
          {{ pad(index + 1) }}<span class="text-ash-500"> / {{ pad(total) }}</span>
        </span>
        <span class="min-w-0 flex-1 text-[0.6875rem] font-semibold tracking-[0.2em] text-bone-100 uppercase">{{ current.caption }}</span>
        <div class="flex items-center gap-2" data-requires-js>
          <button type="button" class="btn-sq" aria-label="Previous image" @click="prev">
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M20 12H5M11 6l-6 6 6 6" />
            </svg>
          </button>
          <button type="button" class="btn-sq btn-sq-ember" aria-label="Next image" @click="next">
            <svg class="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M4 12h15M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </figcaption>
    </figure>

    <div class="min-w-0">
      <ul class="thumbs -mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-2 lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-3 lg:overflow-visible lg:px-0 lg:pb-0">
        <li
          v-for="(item, i) in items"
          :key="item.id"
          class="w-[38%] shrink-0 snap-start sm:w-[24%] lg:w-auto"
          :class="Math.floor(i / PAGE_SIZE) === page ? '' : 'lg:hidden'"
        >
          <a
            :href="item.fullSrc"
            class="thumb group relative block aspect-[4/3] overflow-hidden border transition-[border-color,opacity] duration-500"
            :class="i === index ? 'border-ember-500 opacity-100' : 'border-white/10 opacity-60 hover:opacity-100'"
            :aria-current="i === index ? 'true' : undefined"
            :aria-label="`Show image ${i + 1}: ${item.caption}`"
            @click.prevent="go(i)"
          >
            <img
              :src="item.thumbSrc"
              :srcset="item.thumbSrcset"
              sizes="(min-width: 64rem) 11rem, (min-width: 40rem) 24vw, 38vw"
              alt=""
              loading="lazy"
              decoding="async"
              width="480"
              height="360"
              class="size-full object-cover transition-transform duration-1000 group-hover:scale-105"
              :style="item.position ? { objectPosition: item.position } : undefined"
            />
          </a>
        </li>
      </ul>
      <p v-if="pageCount > 1" class="label mt-4 hidden lg:block">Set {{ page + 1 }} of {{ pageCount }}</p>
    </div>
  </div>
</template>

<style scoped>
.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition:
    opacity 0.9s var(--ease-out-soft),
    transform 1.1s var(--ease-out-soft);
}

.slide-next-enter-from {
  opacity: 0;
  transform: translateX(4%) scale(1.04);
}

.slide-prev-enter-from {
  opacity: 0;
  transform: translateX(-4%) scale(1.04);
}

.slide-next-leave-to {
  opacity: 0;
  transform: translateX(-3%);
}

.slide-prev-leave-to {
  opacity: 0;
  transform: translateX(3%);
}

.thumbs {
  scrollbar-width: thin;
  scrollbar-color: rgb(255 77 0 / 0.5) transparent;
}
</style>
