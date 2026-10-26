<script setup>
/**
 * InfoCard —— 通用信息卡片
 * 用于「关键挑战」「研究理念」「合作方向」等 图标 + 标题 + 说明 的结构。
 */
import IconByName from './IconByName.vue'
import TbdText from './TbdText.vue'

defineProps({
  icon: { type: String, default: '' },
  title: { type: String, default: '' },
  titleLabel: { type: String, default: '标题' },
  text: { type: String, default: '' },
  textLabel: { type: String, default: '说明' },
  /** 序号：如 01、02，用于替代图标，形成更克制的编号式排版 */
  index: { type: String, default: '' },
  variant: { type: String, default: 'plain' }, // plain | outline | tinted
})
</script>

<template>
  <div
    class="flex h-full flex-col rounded-card p-5 transition-colors sm:p-6"
    :class="{
      'border border-line bg-paper': variant === 'outline',
      'bg-mist': variant === 'tinted',
      'bg-transparent': variant === 'plain',
    }"
  >
    <div class="mb-3.5 flex items-center gap-2.5">
      <span
        v-if="index"
        class="font-mono text-sm font-medium tabular text-accent-600"
        aria-hidden="true"
        >{{ index }}</span
      >
      <span
        v-else-if="icon"
        class="inline-flex h-9 w-9 items-center justify-center rounded-hair border border-line bg-paper text-accent-600"
      >
        <IconByName :name="icon" :size="17" />
      </span>
    </div>

    <h3 class="text-[1.02rem] leading-snug font-semibold text-ink-900">
      <TbdText :text="title" :label="titleLabel" />
    </h3>

    <p class="mt-2 text-sm leading-relaxed text-ink-600">
      <TbdText :text="text" :label="textLabel" />
    </p>

    <div v-if="$slots.default" class="mt-3.5">
      <slot />
    </div>
  </div>
</template>
