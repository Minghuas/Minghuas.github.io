<script setup>
/**
 * EmptyState —— 筛选 / 搜索无结果时的空状态
 *
 * 与 TbdBlock 的区别：这里数据是完整的，只是当前条件没有命中。
 * 因此必须提供「清除筛选」这一明确出口，而不是让用户卡在空列表。
 */
import { SearchX } from 'lucide-vue-next'

defineProps({
  title: { type: String, default: '没有匹配的结果' },
  hint: { type: String, default: '试试更换关键词，或放宽筛选条件。' },
  /** 是否显示「清除全部筛选」按钮 */
  clearable: { type: Boolean, default: true },
})

defineEmits(['clear'])
</script>

<template>
  <div class="border-t border-line py-14 text-center">
    <SearchX :size="26" class="mx-auto text-ink-300" aria-hidden="true" />
    <p class="mt-3 text-base font-medium text-ink-700">{{ title }}</p>
    <p class="mt-1.5 text-sm text-ink-500">{{ hint }}</p>
    <button
      v-if="clearable"
      type="button"
      class="mt-5 inline-flex items-center rounded-hair border border-line bg-paper px-3.5 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-accent-300 hover:bg-accent-50 hover:text-accent-700"
      @click="$emit('clear')"
    >
      清除全部筛选
    </button>
  </div>
</template>
