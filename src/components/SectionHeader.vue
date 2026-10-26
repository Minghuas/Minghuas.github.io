<script setup>
/**
 * SectionHeader —— 章节标题组
 * 统一 eyebrow / 主标题 / 说明 / 右侧操作 的层级与间距。
 */
import TbdText from './TbdText.vue'

defineProps({
  /** 眉题：小号大写标签，用于标识章节归属 */
  eyebrow: { type: String, default: '' },
  /** 主标题 */
  title: { type: String, default: '' },
  /** 标题为占位内容时，通过 label 生成占位提示 */
  titleLabel: { type: String, default: '' },
  /** 说明文字 */
  description: { type: String, default: '' },
  /** 顶部分隔线 */
  ruled: { type: Boolean, default: true },
  /** 标题与说明的最大宽度限制 */
  narrow: { type: Boolean, default: false },
})
</script>

<template>
  <div
    class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    :class="ruled ? 'border-t border-line pt-6' : ''"
  >
    <div class="min-w-0" :class="narrow ? 'max-w-2xl' : 'max-w-3xl'">
      <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
      <h2 v-if="title || titleLabel" class="mt-2 text-2xl leading-snug sm:text-[1.75rem]">
        <TbdText :text="title" :label="titleLabel" />
      </h2>
      <p v-if="description" class="mt-3 text-[0.95rem] leading-relaxed text-ink-500">
        <TbdText :text="description" label="章节说明" />
      </p>
    </div>

    <!-- 右侧操作区 -->
    <div v-if="$slots.action" class="shrink-0 sm:pb-1">
      <slot name="action" />
    </div>
  </div>
</template>
