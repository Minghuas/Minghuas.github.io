<script setup>
/**
 * TbdBlock —— 整块内容缺失时的占位区
 *
 * 用于数据中留空数组 [] 的列表（如某方向的代表性项目）。
 * 与「筛选无结果」的空状态区分开：这里是内容尚未填写，不是查询为空。
 */
import { FileText } from 'lucide-vue-next'

defineProps({
  /** 缺失内容的名称，如「代表性项目」 */
  title: { type: String, required: true },
  /** 补充说明，可选 */
  hint: { type: String, default: '' },
  /** 对应的数据文件路径，便于直接定位修改 */
  file: { type: String, default: '' },
})
</script>

<template>
  <div class="tbd-panel">
    <p class="text-sm font-medium text-gold-700">【待补充：{{ title }}】</p>
    <p v-if="hint" class="mt-1.5 text-sm leading-relaxed text-ink-500">{{ hint }}</p>
    <p v-if="file" class="mt-2.5 flex items-center gap-1.5 font-mono text-xs text-ink-400">
      <FileText :size="13" aria-hidden="true" />
      <span>{{ file }}</span>
    </p>
  </div>
</template>
