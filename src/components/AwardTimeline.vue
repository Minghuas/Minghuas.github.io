<script setup>
/**
 * AwardTimeline —— 荣誉时间线
 *
 * 布局：左侧年份、中间轴点、右侧内容。
 * 移动端年份移到内容上方，保证长标题有完整宽度可用。
 */
import { ExternalLink } from 'lucide-vue-next'
import TbdText from './TbdText.vue'

defineProps({
  /** [{ id, year, title, org, level, url }] */
  items: { type: Array, default: () => [] },
})
</script>

<template>
  <ol class="relative">
    <li
      v-for="(item, i) in items"
      :key="item.id || i"
      class="group relative grid grid-cols-[auto_1fr] gap-x-5 gap-y-0 sm:gap-x-8"
    >
      <!-- 年份 -->
      <div class="col-start-1 row-start-1 pt-0.5 text-left sm:w-16 sm:pt-0 sm:text-right">
        <span class="font-mono text-sm tabular text-ink-400">{{ item.year ?? '——' }}</span>
      </div>

      <!-- 轴线与轴点 -->
      <div
        class="col-start-2 row-start-1 row-span-2 relative flex flex-col items-center sm:col-start-2"
        aria-hidden="true"
      >
        <span
          class="absolute left-0 top-0 z-10 mt-1.5 h-2 w-2 -translate-x-1/2 rounded-full border-2 border-paper bg-ink-300 transition-colors group-hover:bg-accent-600"
          :class="i === 0 ? 'bg-accent-600' : ''"
        />
        <span
          v-if="i < items.length - 1"
          class="absolute left-0 top-3 bottom-0 w-px -translate-x-1/2 bg-line"
        />
      </div>

      <!-- 内容 -->
      <div class="col-start-2 row-start-2 pb-8 pl-0 pr-0 sm:pb-10">
        <div class="-ml-5 pl-5 sm:-ml-8 sm:pl-8">
          <h3 class="text-[0.98rem] font-semibold leading-snug text-ink-900">
            <a
              v-if="item.url"
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="pub-title-link inline-flex items-start gap-1.5"
            >
              <span><TbdText :text="item.title" label="奖励名称" /></span>
              <ExternalLink :size="12" class="mt-1.5 shrink-0 text-ink-300" aria-hidden="true" />
            </a>
            <TbdText v-else :text="item.title" label="奖励名称" />
          </h3>

          <p class="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-500">
            <span v-if="item.org"><TbdText :text="item.org" label="授予机构" /></span>
            <span
              v-if="item.level"
              class="rounded-hair border border-line bg-mist px-1.5 py-0.5 text-xs text-ink-500"
            >
              <TbdText :text="item.level" label="奖励等级" />
            </span>
          </p>
        </div>
      </div>
    </li>
  </ol>
</template>
