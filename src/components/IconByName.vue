<script setup>
/**
 * IconByName —— 按名称渲染图标
 *
 * 数据文件里以字符串保存图标名，便于内容维护；
 * 这里显式列出用到的图标，保证打包时只包含实际使用的图标，
 * 而不是把整个图标库打进产物。
 */
import { computed } from 'vue'
import {
  Activity,
  Award,
  BookOpen,
  Building2,
  Calendar,
  Cpu,
  FileText,
  Globe,
  Layers,
  Leaf,
  Network,
  ScrollText,
  Server,
  Target,
  Users,
  Wrench,
  CircleDot,
} from 'lucide-vue-next'

const ICONS = {
  Activity,
  Award,
  BookOpen,
  Building2,
  Calendar,
  Cpu,
  FileText,
  Globe,
  Layers,
  Leaf,
  Network,
  ScrollText,
  Server,
  Target,
  Users,
  Wrench,
}

const props = defineProps({
  name: { type: String, default: '' },
  size: { type: [Number, String], default: 20 },
  strokeWidth: { type: [Number, String], default: 1.6 },
})

/** 未登记的图标名回退到中性圆点，避免渲染中断。用 computed 保证 name 变化时同步更新 */
const component = computed(() => ICONS[props.name] || CircleDot)
</script>

<template>
  <component :is="component" :size="size" :stroke-width="strokeWidth" aria-hidden="true" />
</template>
