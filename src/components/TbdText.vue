<script setup>
/**
 * TbdText —— 文本占位渲染器
 *
 * 行为：
 *   - 正常文本：原样输出，不加任何包装元素，不影响排版。
 *   - 占位文本（含「待补充」）：渲染为醒目的待补充标记。
 *   - 空值：自动生成「【待补充：label】」，避免页面上出现无法察觉的空白。
 */
import { computed } from 'vue'
import { isTbd, tbd } from '@/data/placeholder.js'

const props = defineProps({
  /** 要渲染的文本 */
  text: { type: [String, Number], default: '' },
  /** 字段说明；当 text 为空时用于生成占位提示 */
  label: { type: String, default: '' },
  /** 以块级形式渲染占位标记 */
  block: { type: Boolean, default: false },
})

const value = computed(() => {
  const raw = props.text === null || props.text === undefined ? '' : String(props.text)
  if (raw.trim() === '') return tbd(props.label)
  return raw
})

const placeholder = computed(() => isTbd(value.value))
</script>

<template>
  <span v-if="placeholder" class="tbd" :class="{ 'tbd-block': block }">{{ value }}</span>
  <template v-else>{{ value }}</template>
</template>
