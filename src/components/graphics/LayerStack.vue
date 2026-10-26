<script setup>
/**
 * LayerStack —— 跨层次优化示意图
 *
 * 说明：图中各层名称（应用与算法、编译与运行时、系统软件、微体系结构、
 * 电路与器件）是计算机体系结构领域通用的抽象层次划分，属于说明性图示，
 * 不涉及任何未经确认的研究结论。
 *
 * 用途：研究方向页「软硬件协同设计与跨层次优化」方向配图。
 */
import { computed } from 'vue'

const props = defineProps({
  /** 高亮的层索引，用于强调跨层协同的作用范围 */
  highlight: { type: Array, default: () => [1, 2, 3] },
})

// 自顶向下：越靠上越接近应用，越靠下越接近物理实现
const LAYERS = [
  { key: 'app', label: '应用与算法', en: 'Application & Algorithm' },
  { key: 'compiler', label: '编译与运行时', en: 'Compiler & Runtime' },
  { key: 'system', label: '系统软件与调度', en: 'System Software' },
  { key: 'uarch', label: '微体系结构', en: 'Microarchitecture' },
  { key: 'circuit', label: '电路与器件', en: 'Circuit & Device' },
]

const rows = computed(() =>
  LAYERS.map((l, i) => ({ ...l, active: props.highlight.includes(i), index: i })),
)
</script>

<template>
  <figure class="not-prose">
    <div class="rounded-card border border-line bg-mist p-5 sm:p-7">
      <div class="flex gap-5">
        <!-- 层次堆叠 -->
        <div class="min-w-0 flex-1 space-y-1.5">
          <div
            v-for="row in rows"
            :key="row.key"
            class="relative rounded-hair border px-3.5 py-2.5 transition-colors"
            :class="
              row.active
                ? 'border-accent-200 bg-accent-50'
                : 'border-line bg-paper'
            "
          >
            <div class="flex items-baseline justify-between gap-3">
              <span
                class="text-sm font-medium"
                :class="row.active ? 'text-accent-700' : 'text-ink-600'"
                >{{ row.label }}</span
              >
              <span class="hidden font-mono text-[10px] uppercase tracking-wider text-ink-400 sm:block">
                {{ row.en }}
              </span>
            </div>

            <!-- 相邻层之间的协同接口 -->
            <span
              v-if="row.index < rows.length - 1"
              class="absolute -bottom-[7px] left-6 z-10 h-3 w-px"
              :class="row.active ? 'bg-accent-400' : 'bg-line'"
              aria-hidden="true"
            />
          </div>
        </div>

        <!-- 右侧：跨层次协同标识 -->
        <div class="hidden w-24 shrink-0 flex-col justify-center gap-2 sm:flex">
          <div class="relative flex-1">
            <span
              class="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-line"
              aria-hidden="true"
            />
            <span
              class="absolute left-[calc(50%-11px)] top-[18%] h-[54%] w-[22px] rounded-full border border-accent-300 bg-accent-50"
              aria-hidden="true"
            />
            <span
              class="absolute left-[calc(50%-5px)] top-[18%] h-[54%] w-[10px] rounded-full border-y border-accent-400 bg-accent-100"
              aria-hidden="true"
            />
          </div>
          <p class="text-center text-[11px] leading-tight text-accent-700">
            跨层次<br />协同优化
          </p>
        </div>
      </div>
    </div>

    <figcaption class="mt-3 text-xs text-ink-500">
      图：计算系统的抽象层次与跨层次协同优化范围（示意）
    </figcaption>
  </figure>
</template>
