<script setup>
/**
 * StatBand —— 数字统计带
 *
 * 设计约束：数字必须来自已核实的数据。
 *   数据项 value 为 null 时，显示「【待补充】」而不是 0，
 *   避免把「未知」伪装成「零」。
 *
 * variant: 'light' 白底 | 'dark' 深色底
 */
import TbdText from './TbdText.vue'

defineProps({
  /** [{ key, label, value, unit, note }] */
  stats: { type: Array, default: () => [] },
  variant: { type: String, default: 'light' },
  /** 是否显示口径说明 */
  showNote: { type: Boolean, default: true },
})
</script>

<template>
  <dl
    class="grid grid-cols-1 gap-px overflow-hidden rounded-card sm:grid-cols-2 lg:grid-cols-4"
    :class="variant === 'dark' ? 'bg-navy-700' : 'bg-line'"
  >
    <div
      v-for="stat in stats"
      :key="stat.key"
      class="flex flex-col p-6"
      :class="variant === 'dark' ? 'bg-navy-900' : 'bg-paper'"
    >
      <dd class="order-1">
        <!-- 已核实：显示数字 -->
        <span
          v-if="typeof stat.value === 'number'"
          class="font-display text-3xl leading-none tabular sm:text-[2.1rem]"
          :class="variant === 'dark' ? 'text-white' : 'text-ink-900'"
        >
          {{ stat.value }}<span
            class="ml-1 text-base font-normal"
            :class="variant === 'dark' ? 'text-ink-300' : 'text-ink-500'"
            >{{ stat.unit }}</span
          >
        </span>
        <!-- 未核实：显示占位，而不是 0 -->
        <span v-else class="tbd-figure">【待补充】</span>
      </dd>

      <dt
        class="order-0 mb-3 text-sm font-medium"
        :class="variant === 'dark' ? 'text-ink-200' : 'text-ink-700'"
      >
        {{ stat.label }}
      </dt>

      <p
        v-if="showNote && stat.note"
        class="order-2 mt-3 border-t pt-3 text-xs leading-relaxed"
        :class="variant === 'dark' ? 'border-navy-700 text-ink-400' : 'border-line-soft text-ink-500'"
      >
        <TbdText :text="stat.note" label="统计口径" />
      </p>
    </div>
  </dl>
</template>
