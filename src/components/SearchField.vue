<script setup>
/**
 * SearchField —— 关键词搜索框
 *
 * 无障碍：
 *   - 使用真实 <label>（视觉隐藏）而不是 placeholder 代替标签
 *   - type="search" 支持浏览器原生清除
 *   - 提供显式的清除按钮，并有 aria-label
 * 性能：输入通过 200ms 防抖后向上抛出，避免长列表每次按键都重算。
 */
import { onBeforeUnmount, ref, watch } from 'vue'
import { Search, X } from 'lucide-vue-next'

const props = defineProps({
  modelValue: { type: String, default: '' },
  label: { type: String, default: '搜索' },
  placeholder: { type: String, default: '输入关键词…' },
  /** 结果条数提示，为空则不显示 */
  resultCount: { type: [Number, null], default: null },
  debounce: { type: Number, default: 200 },
})

const emit = defineEmits(['update:modelValue'])

const local = ref(props.modelValue)
let timer = null

watch(
  () => props.modelValue,
  (v) => {
    if (v !== local.value) local.value = v
  },
)

watch(local, (v) => {
  clearTimeout(timer)
  timer = setTimeout(() => emit('update:modelValue', v), props.debounce)
})

function clear() {
  local.value = ''
  clearTimeout(timer)
  emit('update:modelValue', '')
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div>
    <label :for="`search-${label}`" class="sr-only">{{ label }}</label>

    <div class="relative">
      <Search
        :size="16"
        class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400"
        aria-hidden="true"
      />

      <input
        :id="`search-${label}`"
        v-model="local"
        type="search"
        :placeholder="placeholder"
        autocomplete="off"
        class="w-full rounded-hair border border-line bg-paper py-2.5 pl-9 pr-9 text-sm text-ink-900 transition-colors placeholder:text-ink-400 focus:border-accent-500 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/30 [&::-webkit-search-cancel-button]:appearance-none"
      />

      <button
        v-if="local"
        type="button"
        class="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-hair p-1 text-ink-400 transition-colors hover:bg-mist hover:text-ink-700"
        :aria-label="`清除${label}关键词`"
        @click="clear"
      >
        <X :size="14" aria-hidden="true" />
      </button>
    </div>

    <p v-if="resultCount !== null" class="mt-2 font-mono text-xs text-ink-500" aria-live="polite">
      {{ resultCount }} 条结果
    </p>
  </div>
</template>
