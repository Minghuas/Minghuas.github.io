<script setup>
/**
 * ContentAudit —— 内容占位统计浮标（框架阶段专用）
 *
 * 扫描全部数据模块，统计仍需替换的占位标记与空链接，并按文件列出，
 * 便于逐块补齐内容。补齐后把 src/data/placeholder.js 中的
 * SHOW_CONTENT_AUDIT 设为 false，或在 App.vue 中移除本组件即可。
 *
 * 该组件通过 defineAsyncComponent 异步加载，不会进入首屏包。
 */
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { ChevronDown, ClipboardList, X } from 'lucide-vue-next'
import { SHOW_CONTENT_AUDIT } from '@/data/placeholder.js'

import * as site from '@/data/site.js'
import * as research from '@/data/research.js'
import * as publications from '@/data/publications.js'
import * as awards from '@/data/awards.js'
import * as projects from '@/data/projects.js'
import * as members from '@/data/members.js'
import * as services from '@/data/services.js'
import * as news from '@/data/news.js'
import * as philosophy from '@/data/philosophy.js'
import * as join from '@/data/join.js'
import * as patents from '@/data/patents.js'
import * as stats from '@/data/stats.js'

/** 需要扫描的数据模块。只列出内容型导出，跳过枚举常量。 */
const MODULES = [
  { file: 'src/data/site.js', label: '站点信息', exports: [site.SITE] },
  { file: 'src/data/research.js', label: '研究方向', exports: [research.RESEARCH_DIRECTIONS, research.RESEARCH_FRONTS, research.INVITED_TALKS, research.PAST_WORK] },
  { file: 'src/data/publications.js', label: '论文数据', exports: [publications.PUBLICATION_SEED] },
  { file: 'src/data/awards.js', label: '奖励荣誉', exports: [awards.AWARDS] },
  { file: 'src/data/projects.js', label: '科研项目', exports: [projects.PROJECTS] },
  { file: 'src/data/members.js', label: '团队成员', exports: [members.MEMBERS] },
  { file: 'src/data/services.js', label: '学术服务', exports: [services.SERVICE_GROUPS] },
  { file: 'src/data/patents.js', label: '专利与软著', exports: [patents.PATENTS] },
  { file: 'src/data/news.js', label: '团队动态', exports: [news.NEWS] },
  { file: 'src/data/philosophy.js', label: '学科与理念', exports: [philosophy.TEAM_INTRO, philosophy.DISCIPLINE_INTRO, philosophy.TRAINING_PHILOSOPHY, philosophy.READING_LIST] },
  { file: 'src/data/join.js', label: '招生合作', exports: [join.POSITIONS, join.TRAINING_PIPELINE, join.COLLABORATION, join.APPLICATION_STEPS, join.CONTACT] },
  { file: 'src/data/stats.js', label: '统计指标', exports: [stats.STAT_HIGHLIGHTS, stats.SERVICE_HIGHLIGHTS] },
]

/** 视为「链接位」的键名，其值为空字符串时计入待确认 */
const LINK_KEYS = new Set(['url', 'link', 'homepage', 'photo', 'email'])

function walk(value, seen, onString, onLink) {
  if (typeof value === 'string') {
    onString(value)
    return
  }
  if (value === null || typeof value !== 'object') return
  if (seen.has(value)) return
  seen.add(value)

  if (Array.isArray(value)) {
    for (const item of value) walk(item, seen, onString, onLink)
    return
  }
  for (const [key, val] of Object.entries(value)) {
    if (LINK_KEYS.has(key) && val === '') onLink()
    walk(val, seen, onString, onLink)
  }
}

const report = computed(() => {
  let totalPlaceholders = 0
  let totalEmptyLinks = 0

  const rows = MODULES.map((m) => {
    let placeholders = 0
    let emptyLinks = 0
    const seen = new WeakSet()

    for (const exported of m.exports) {
      walk(
        exported,
        seen,
        (s) => {
          if (s.includes('待补充')) placeholders++
        },
        () => {
          emptyLinks++
        },
      )
    }

    totalPlaceholders += placeholders
    totalEmptyLinks += emptyLinks
    return { file: m.file, label: m.label, placeholders, emptyLinks }
  })

  return {
    totalPlaceholders,
    totalEmptyLinks,
    rows: rows.filter((r) => r.placeholders > 0 || r.emptyLinks > 0),
  }
})

const open = ref(false)
const hidden = ref(false)

function onKeydown(event) {
  if (event.key === 'Escape') open.value = false
}

onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div v-if="SHOW_CONTENT_AUDIT && !hidden" class="no-print fixed bottom-4 left-4 z-40 print:hidden">
    <!-- 展开面板 -->
    <div
      v-if="open"
      id="content-audit-panel"
      class="mb-2 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-card border border-line bg-paper shadow-lift"
    >
      <div class="flex items-start justify-between gap-3 border-b border-line bg-mist px-4 py-3">
        <div>
          <p class="text-sm font-semibold text-ink-900">内容占位统计</p>
          <p class="mt-0.5 font-mono text-xs text-ink-500">
            {{ report.totalPlaceholders }} 处占位标记 · {{ report.totalEmptyLinks }} 个链接位待确认
          </p>
        </div>
        <button
          type="button"
          class="-mr-1 -mt-1 rounded-hair p-1 text-ink-400 transition-colors hover:bg-line-soft hover:text-ink-700"
          aria-label="收起内容占位统计"
          @click="open = false"
        >
          <X :size="15" aria-hidden="true" />
        </button>
      </div>

      <ul class="max-h-64 divide-y divide-line-soft overflow-y-auto">
        <li
          v-for="row in report.rows"
          :key="row.file"
          class="flex items-baseline justify-between gap-3 px-4 py-2.5"
        >
          <div class="min-w-0">
            <p class="truncate text-sm text-ink-800">{{ row.label }}</p>
            <p class="truncate font-mono text-[11px] text-ink-400">{{ row.file }}</p>
          </div>
          <p class="shrink-0 font-mono text-xs text-ink-500">
            <span class="text-gold-700">{{ row.placeholders }}</span>
            <span class="text-ink-300"> / </span>
            <span>{{ row.emptyLinks }}</span>
          </p>
        </li>
      </ul>

      <div class="border-t border-line bg-mist px-4 py-2.5">
        <p class="text-[11px] leading-relaxed text-ink-500">
          左列为占位标记数，右列为待确认的链接位数。替换真实内容后计数自动减少。
        </p>
      </div>
    </div>

    <!-- 收起状态：一行小按钮 -->
    <div class="flex items-center gap-1.5">
      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-medium text-ink-600 shadow-card transition-colors hover:border-accent-300 hover:text-accent-700"
        :aria-expanded="open"
        aria-controls="content-audit-panel"
        @click="open = !open"
      >
        <ClipboardList :size="13" aria-hidden="true" />
        <span>框架预览 · 占位 <span class="font-mono text-gold-700">{{ report.totalPlaceholders }}</span></span>
        <ChevronDown
          :size="13"
          aria-hidden="true"
          class="transition-transform duration-200"
          :class="open ? 'rotate-180' : ''"
        />
      </button>
      <button
        type="button"
        class="rounded-full border border-transparent p-1.5 text-ink-300 transition-colors hover:border-line hover:text-ink-600"
        aria-label="隐藏内容占位统计浮标"
        @click="hidden = true"
      >
        <X :size="13" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>
