<script setup>
/**
 * FilterPills —— 单选筛选器
 *
 * 无障碍：
 *   - 外层使用 role="group" + aria-label 说明筛选维度
 *   - 每个按钮使用 aria-pressed 表达选中状态
 *   - 提供可选的「全部」项用于清除筛选
 *   - 支持方向键在选项间移动焦点
 */
import { ref } from 'vue'

const props = defineProps({
  /** 筛选维度名称，用于无障碍标签 */
  label: { type: String, required: true },
  /** 选项：[{ key, label, count }] */
  options: { type: Array, default: () => [] },
  /** 当前选中项 */
  modelValue: { type: [String, Number], default: 'all' },
  /** 「全部」项的文案；设为空字符串则不显示该项 */
  allLabel: { type: String, default: '全部' },
  /** 是否显示数量徽标 */
  showCount: { type: Boolean, default: true },
})

const emit = defineEmits(['update:modelValue'])

const groupRef = ref(null)

/** 含「全部」项的完整选项列表 */
const items = () => {
  const base = props.allLabel ? [{ key: 'all', label: props.allLabel }] : []
  return [...base, ...props.options]
}

function moveFocus(event, currentIndex) {
  const list = items()
  const last = list.length - 1
  let next = null

  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = currentIndex >= last ? 0 : currentIndex + 1
  else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = currentIndex <= 0 ? last : currentIndex - 1
  else if (event.key === 'Home') next = 0
  else if (event.key === 'End') next = last
  else return

  event.preventDefault()
  const buttons = groupRef.value?.querySelectorAll('button')
  buttons?.[next]?.focus()
}
</script>

<template>
  <div>
    <p class="mb-2 text-xs font-medium uppercase tracking-[0.1em] text-ink-400">{{ label }}</p>

    <div ref="groupRef" class="flex flex-wrap gap-1.5" role="group" :aria-label="label">
      <button
        v-for="(opt, i) in items()"
        :key="opt.key"
        type="button"
        class="inline-flex items-center gap-1.5 rounded-hair border px-2.5 py-1.5 text-sm transition-colors"
        :class="
          modelValue === opt.key
            ? 'border-navy-900 bg-navy-900 text-white'
            : 'border-line bg-paper text-ink-600 hover:border-accent-300 hover:bg-accent-50 hover:text-accent-500'
        "
        :aria-pressed="modelValue === opt.key"
        @click="emit('update:modelValue', opt.key)"
        @keydown="moveFocus($event, i)"
      >
        <span>{{ opt.label }}</span>
        <span
          v-if="showCount && typeof opt.count === 'number'"
          class="font-mono text-[11px] tabular"
          :class="modelValue === opt.key ? 'text-white/70' : 'text-ink-400'"
          >{{ opt.count }}</span
        >
      </button>
    </div>
  </div>
</template>
