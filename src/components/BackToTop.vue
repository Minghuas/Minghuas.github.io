<script setup>
/**
 * BackToTop —— 回到页面顶部
 *
 * 滚动超过一屏后出现；点击平滑回到顶部。
 * 系统开启「减少动态效果」时改为瞬时跳转。
 */
import { computed } from 'vue'
import { ArrowUp } from 'lucide-vue-next'
import { useScrollY } from '@/composables/useScrollY.js'

const { y } = useScrollY()

const visible = computed(() => y.value > 600)

function toTop() {
  const reduced =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' })
}
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 translate-y-2"
    leave-active-class="transition duration-150 ease-in"
    leave-to-class="opacity-0 translate-y-2"
  >
    <button
      v-if="visible"
      type="button"
      class="no-print fixed bottom-4 right-4 z-40 inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-ink-600 shadow-card transition-colors hover:border-accent-300 hover:text-accent-700 print:hidden"
      aria-label="回到页面顶部"
      @click="toTop"
    >
      <ArrowUp :size="17" aria-hidden="true" />
    </button>
  </Transition>
</template>
