<script setup>
/**
 * PageHero —— 内页页头
 *
 * variant:
 *   'light' 白底 + 细网格底纹，用于研究/成果/论文/成员/招生等内页
 *   'dark'  深海军蓝底，用于需要强调的页面
 */
import TbdText from './TbdText.vue'

defineProps({
  eyebrow: { type: String, default: '' },
  title: { type: String, default: '' },
  titleLabel: { type: String, default: '' },
  lead: { type: String, default: '' },
  variant: { type: String, default: 'light' },
})
</script>

<template>
  <section
    class="relative overflow-hidden border-b"
    :class="variant === 'dark' ? 'border-navy-700 bg-navy-900' : 'border-line bg-mist'"
  >
    <!-- 细网格底纹：表达工程与网格系统，不喧宾夺主 -->
    <div
      class="pointer-events-none absolute inset-0 opacity-[0.5]"
      :class="variant === 'dark' ? 'text-white/[0.06]' : 'text-ink-900/[0.05]'"
      aria-hidden="true"
    >
      <svg class="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 320">
        <defs>
          <pattern id="page-hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0V40" fill="none" stroke="currentColor" stroke-width="1" />
          </pattern>
        </defs>
        <rect width="1200" height="320" fill="url(#page-hero-grid)" />
      </svg>
    </div>

    <div class="container-page relative py-12 sm:py-16 lg:py-20">
      <div class="max-w-3xl">
        <span
          class="mb-4 block h-[3px] w-10"
          :class="variant === 'dark' ? 'bg-orange-400' : 'bg-orange-500'"
          aria-hidden="true"
        />

        <p
          v-if="eyebrow"
          class="font-display text-xs font-semibold uppercase tracking-[0.16em]"
          :class="variant === 'dark' ? 'text-orange-300' : 'text-plum-700'"
        >
          {{ eyebrow }}
        </p>

        <h1
          class="mt-3 text-[1.75rem] leading-tight sm:text-[2.15rem] lg:text-[2.5rem]"
          :class="variant === 'dark' ? 'text-white' : 'text-plum-700'"
        >
          <TbdText :text="title" :label="titleLabel" />
        </h1>

        <p
          v-if="lead"
          class="measure mt-5 text-base leading-relaxed sm:text-[1.05rem]"
          :class="variant === 'dark' ? 'text-ink-200' : 'text-ink-600'"
        >
          <TbdText :text="lead" label="页面导语" />
        </p>

        <div v-if="$slots.default" class="mt-8">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>
