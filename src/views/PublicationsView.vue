<script setup>
/**
 * PublicationsView —— 论文发表
 *
 * 交互：
 *   - 标题 / 作者关键词搜索（防抖 200ms）
 *   - 论文类型、发表载体、年份三个维度的筛选
 *   - 结果按年份倒序分组，每组可折叠，缓解长列表的阅读压力
 *   - 筛选无结果时提供明确出口（清除全部筛选）
 *
 * 密度策略：
 *   移动端不显示年份列（年份已由分组标题承载），行距收紧；
 *   摘要默认折叠，需要时再展开，避免移动端一屏放不下一条。
 *
 * 数据约束：最佳论文等荣誉标记只在 award 字段确实存在时渲染，
 *   绝不对未核实的论文添加荣誉标记。
 */
import { computed, ref } from 'vue'
import { ChevronDown, RotateCcw } from 'lucide-vue-next'

import PageHero from '@/components/PageHero.vue'
import FilterPills from '@/components/FilterPills.vue'
import SearchField from '@/components/SearchField.vue'
import PublicationItem from '@/components/PublicationItem.vue'
import EmptyState from '@/components/EmptyState.vue'

import { PUBLICATION_SEED, PUBLICATION_TYPES } from '@/data/publications.js'
import { computePublicationStats } from '@/data/derive.js'

/* ============ 目录统计（由本地数据实时算出） ============ */
const stats = computePublicationStats()

const heroStats = [
  { key: 'total', label: '收录论文', value: stats.total, unit: '篇' },
  {
    key: 'range',
    label: '年份跨度',
    value: stats.yearRange[0] && stats.yearRange[1] ? `${stats.yearRange[0]}–${stats.yearRange[1]}` : '——',
    unit: '',
  },
  { key: 'link', label: '提供原文链接', value: stats.withLink, unit: '篇' },
  { key: 'featured', label: '带荣誉标记', value: stats.featured, unit: '篇' },
]

/* ============ 筛选状态 ============ */
const query = ref('')
const type = ref('all')
const venue = ref('all')
const year = ref('all')

const venueOptions = computed(() =>
  stats.byVenue.map((v) => ({ key: v.key, label: v.key, count: v.count })),
)

const yearOptions = computed(() =>
  stats.byYear.map((y) => ({ key: y.year, label: String(y.year), count: y.count })),
)

const hasFilter = computed(
  () => query.value.trim() !== '' || type.value !== 'all' || venue.value !== 'all' || year.value !== 'all',
)

/* ============ 过滤 ============ */
const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()

  return PUBLICATION_SEED.filter((p) => {
    if (type.value !== 'all' && p.type !== type.value) return false
    if (venue.value !== 'all' && (p.acronym || p.venue) !== venue.value) return false
    if (year.value !== 'all' && p.year !== year.value) return false
    if (!q) return true

    // 关键词命中范围：标题、完整作者列表、发表载体
    const haystack = [p.title, p.authors, p.venue, p.acronym, ...(p.students || [])]
      .join(' ')
      .toLowerCase()
    return haystack.includes(q)
  })
})

/* ============ 按年份分组 ============ */
const groups = computed(() => {
  const map = new Map()
  for (const p of filtered.value) {
    if (!map.has(p.year)) map.set(p.year, [])
    map.get(p.year).push(p)
  }
  return [...map.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, items]) => ({ year, items }))
})

/**
 * 折叠状态：默认展开最近的两年，其余折叠。
 * 这样进入页面时不会立刻被十几年的列表淹没。
 */
const collapsed = ref(new Set(stats.byYear.slice(2).map((y) => y.year)))

const isCollapsed = (y) => collapsed.value.has(y)

function toggleYear(y) {
  const next = new Set(collapsed.value)
  next.has(y) ? next.delete(y) : next.add(y)
  collapsed.value = next
}

const allCollapsed = computed(
  () => groups.value.length > 0 && groups.value.every((g) => collapsed.value.has(g.year)),
)

function toggleAll() {
  collapsed.value = allCollapsed.value ? new Set() : new Set(groups.value.map((g) => g.year))
}

function clearAll() {
  query.value = ''
  type.value = 'all'
  venue.value = 'all'
  year.value = 'all'
}
</script>

<template>
  <div>
    <PageHero
      eyebrow="Publications"
      title="论文发表"
      title-label="论文页标题"
      lead="按年份分组，支持按类型、发表载体与年份筛选，以及标题与作者关键词检索。"
    >
      <dl class="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
        <div v-for="item in heroStats" :key="item.key">
          <dt class="text-xs uppercase tracking-[0.1em] text-ink-400">{{ item.label }}</dt>
          <dd class="mt-1 font-display text-2xl tabular text-ink-900">
            {{ item.value }}<span class="ml-0.5 text-sm font-normal text-ink-400">{{ item.unit }}</span>
          </dd>
        </div>
      </dl>
      <p class="mt-4 max-w-2xl text-xs leading-relaxed text-ink-500">
        以上为本站论文目录的条目统计，随数据文件更新而变化，并非对外宣传用的学术影响力指标。
        当前条目内容均为待补充状态。
      </p>
    </PageHero>

    <!-- ===================== 筛选区 ===================== -->
    <section class="no-print border-b border-line bg-paper">
      <div class="container-page py-8 sm:py-9">
        <div class="grid gap-7 lg:grid-cols-12 lg:gap-10">
          <!-- 搜索 -->
          <div class="lg:col-span-4">
            <SearchField
              v-model="query"
              label="论文检索"
              placeholder="搜索论文标题或作者…"
              :result-count="filtered.length"
            />

            <div class="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                class="inline-flex items-center gap-1.5 rounded-hair border border-line bg-paper px-3 py-1.5 text-sm text-ink-700 transition-colors hover:border-accent-300 hover:bg-accent-50 hover:text-accent-700"
                @click="toggleAll"
              >
                <ChevronDown
                  :size="14"
                  class="transition-transform duration-200"
                  :class="allCollapsed ? '' : 'rotate-180'"
                  aria-hidden="true"
                />
                {{ allCollapsed ? '展开全部年份' : '折叠全部年份' }}
              </button>

              <button
                v-if="hasFilter"
                type="button"
                class="inline-flex items-center gap-1.5 rounded-hair px-2.5 py-1.5 text-sm text-ink-500 transition-colors hover:text-accent-700"
                @click="clearAll"
              >
                <RotateCcw :size="13" aria-hidden="true" />
                清除筛选
              </button>
            </div>
          </div>

          <!-- 三个筛选维度 -->
          <div class="space-y-6 lg:col-span-8">
            <FilterPills v-model="type" label="论文类型" :options="PUBLICATION_TYPES" />

            <div class="grid gap-6 sm:grid-cols-2">
              <FilterPills v-model="venue" label="发表载体" :options="venueOptions" />
              <FilterPills v-model="year" label="发表年份" :options="yearOptions" all-label="全部年份" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== 结果列表 ===================== -->
    <section class="bg-paper pb-16 sm:pb-20">
      <div class="container-page">
        <!-- 有结果：按年份分组 -->
        <template v-if="groups.length">
          <div
            v-for="group in groups"
            :key="group.year"
            class="border-b border-line py-6 last:border-b-0 sm:py-8"
          >
            <!-- 年份标题（同时是折叠开关） -->
            <button
              type="button"
              class="group flex w-full items-baseline gap-3 text-left"
              :aria-expanded="!isCollapsed(group.year)"
              @click="toggleYear(group.year)"
            >
              <ChevronDown
                :size="16"
                class="shrink-0 translate-y-0.5 text-ink-300 transition-transform duration-200 group-hover:text-accent-600"
                :class="isCollapsed(group.year) ? '-rotate-90' : ''"
                aria-hidden="true"
              />
              <span class="font-display text-xl leading-none tabular text-ink-900 sm:text-2xl">
                {{ group.year }}
              </span>
              <span class="font-mono text-xs tabular text-ink-400">{{ group.items.length }} 篇</span>
              <span class="ml-2 hidden h-px flex-1 bg-line sm:block" aria-hidden="true" />
            </button>

            <!-- 条目：移动端紧凑、桌面端宽松 -->
            <div v-show="!isCollapsed(group.year)" class="mt-4 pl-0 sm:mt-5 sm:pl-7">
              <PublicationItem v-for="pub in group.items" :key="pub.id" :pub="pub" />
            </div>
          </div>
        </template>

        <!-- 无结果 -->
        <EmptyState
          v-else
          title="没有匹配的论文"
          hint="可以试试更短的关键词，或把类型、载体、年份放宽到「全部」。"
          @clear="clearAll"
        />
      </div>
    </section>

    <!-- ===================== 说明 ===================== -->
    <section class="border-t border-line bg-mist py-10">
      <div class="container-page">
        <p class="max-w-3xl text-xs leading-relaxed text-ink-500">
          关于论文列表：本页条目的标题、作者、发表载体与原文链接均待补充，
          请在
          <code class="font-mono text-[11px] text-ink-600">src/data/publications.js</code>
          中按字段填写。荣誉标记（如最佳论文）仅在有公开依据时填写，
          请勿在未核实的情况下添加。论文的完整来源请参见
          <RouterLink to="/achievements" class="link-inline">科研成果页</RouterLink>
          与页脚的官方来源说明。
        </p>
      </div>
    </section>
  </div>
</template>
