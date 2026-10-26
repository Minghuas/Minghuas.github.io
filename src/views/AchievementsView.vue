<script setup>
/**
 * AchievementsView —— 科研成果
 *
 * 页面结构（大块展示与紧凑列表交替，避免通篇同一节奏）：
 *   1. 代表性论文   大尺寸特征块
 *   2. 科研项目     紧凑列表 + 级别筛选
 *   3. 荣誉与获奖   时间线 + 类别 / 年份筛选
 *   4. 专利与软著   紧凑列表
 *   5. 学术服务     分组网格
 *
 * 数据约束：全部条目来自 src/data 下的结构化文件，当前为占位内容。
 *   界面只负责呈现，不在组件里硬编码任何事实性描述。
 */
import { computed, ref } from 'vue'
import { ArrowRight, ArrowUpRight, BadgeCheck, ExternalLink, Sparkles } from 'lucide-vue-next'

import PageHero from '@/components/PageHero.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import FilterPills from '@/components/FilterPills.vue'
import AwardTimeline from '@/components/AwardTimeline.vue'
import StatBand from '@/components/StatBand.vue'
import EmptyState from '@/components/EmptyState.vue'
import TbdText from '@/components/TbdText.vue'
import IconByName from '@/components/IconByName.vue'

import { PUBLICATION_SEED } from '@/data/publications.js'
import { AWARDS, AWARD_CATEGORIES } from '@/data/awards.js'
import { PROJECTS, PROJECT_LEVELS } from '@/data/projects.js'
import { PATENTS, PATENT_KINDS, PATENT_STATUS } from '@/data/patents.js'
import { SERVICE_GROUPS } from '@/data/services.js'
import { SERVICE_HIGHLIGHTS } from '@/data/stats.js'

/* ============ 1. 代表性论文 ============ */

/** 取带荣誉标记或显式 featured 的条目作为代表性成果 */
const featured = computed(() => {
  const marked = PUBLICATION_SEED.filter((p) => p.featured || p.award)
  const rest = PUBLICATION_SEED.filter((p) => !p.featured && !p.award)
  return [...marked, ...rest].slice(0, 3)
})

/* ============ 2. 科研项目 ============ */

const projectLevel = ref('all')

const projectLevelOptions = computed(() =>
  PROJECT_LEVELS.map((l) => ({
    ...l,
    count: PROJECTS.filter((p) => p.level === l.key).length,
  })),
)

const filteredProjects = computed(() =>
  [...PROJECTS]
    .filter((p) => projectLevel.value === 'all' || p.level === projectLevel.value)
    .sort((a, b) => b.startYear - a.startYear),
)

/* ============ 3. 荣誉与获奖 ============ */

const awardCategory = ref('all')
const awardYear = ref('all')

const awardCategoryOptions = computed(() =>
  AWARD_CATEGORIES.map((c) => ({
    ...c,
    count: AWARDS.filter((a) => a.category === c.key).length,
  })),
)

/** 年份选项由数据实时推导，避免写死年份列表 */
const awardYearOptions = computed(() => {
  const years = [...new Set(AWARDS.map((a) => a.year))].sort((a, b) => b - a)
  return years.map((y) => ({
    key: y,
    label: String(y),
    count: AWARDS.filter((a) => a.year === y).length,
  }))
})

const filteredAwards = computed(() =>
  [...AWARDS]
    .filter((a) => awardCategory.value === 'all' || a.category === awardCategory.value)
    .filter((a) => awardYear.value === 'all' || a.year === awardYear.value)
    .sort((a, b) => b.year - a.year),
)

const hasAwardFilter = computed(
  () => awardCategory.value !== 'all' || awardYear.value !== 'all',
)

function clearAwardFilters() {
  awardCategory.value = 'all'
  awardYear.value = 'all'
}

/* ============ 4. 专利 ============ */

const filteredPatents = computed(() => [...PATENTS].sort((a, b) => b.year - a.year))

const kindLabel = (key) => PATENT_KINDS.find((k) => k.key === key)?.label ?? ''

/* ============ 页面概览数字 ============ */
const overview = computed(() => [
  { key: 'projects', label: '科研项目', value: PROJECTS.length },
  { key: 'awards', label: '荣誉与获奖', value: AWARDS.length },
  { key: 'patents', label: '专利与软著', value: PATENTS.length },
  { key: 'services', label: '学术服务类别', value: SERVICE_GROUPS.length },
])
</script>

<template>
  <div>
    <PageHero
      eyebrow="Achievements"
      title="科研成果"
      title-label="成果页标题"
      lead="代表性论文、科研项目、荣誉与获奖、专利与软件著作权，以及学术服务工作。"
    >
      <dl class="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
        <div v-for="item in overview" :key="item.key">
          <dt class="text-xs uppercase tracking-[0.1em] text-ink-400">{{ item.label }}</dt>
          <dd class="mt-1 font-display text-2xl tabular text-ink-900">{{ item.value }}</dd>
        </div>
      </dl>
      <p class="mt-4 text-xs leading-relaxed text-ink-500">
        上方数字为本站目录中已录入的条目数，不是学术影响力指标；条目内容均为待补充状态。
      </p>
    </PageHero>

    <!-- ===================== 1. 代表性论文 ===================== -->
    <section class="border-b border-line bg-paper py-16 sm:py-20">
      <div class="container-page">
        <SectionHeader
          eyebrow="Selected Publications"
          title="代表性论文"
          description="从论文全集中选出的代表性工作；完整列表与检索功能见论文发表页。"
        >
          <template #action>
            <RouterLink
              to="/publications"
              class="group inline-flex items-center gap-1.5 text-sm font-medium text-accent-700 transition-colors hover:text-accent-600"
            >
              查看全部论文
              <ArrowRight
                :size="15"
                class="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </RouterLink>
          </template>
        </SectionHeader>

        <ol class="mt-10 space-y-5">
          <li
            v-for="(pub, i) in featured"
            :key="pub.id"
            v-reveal="{ delay: i * 60 }"
            class="grid gap-5 rounded-card border border-line bg-paper p-6 transition-all duration-300 hover:border-accent-200 hover:shadow-card sm:p-7 lg:grid-cols-12 lg:gap-8"
          >
            <div class="lg:col-span-3">
              <p class="font-display text-3xl leading-none text-ink-300 tabular">
                {{ pub.year ?? '——' }}
              </p>
              <p class="mt-3 text-sm font-medium text-accent-700">
                <TbdText :text="pub.acronym" label="会议或期刊缩写" />
              </p>
              <p class="mt-1 text-sm italic leading-relaxed text-ink-500">
                <TbdText :text="pub.venue" label="会议或期刊全称" />
              </p>
            </div>

            <div class="lg:col-span-9">
              <h3 class="text-[1.05rem] font-semibold leading-relaxed text-ink-900">
                <a
                  v-if="pub.link"
                  :href="pub.link"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="pub-title-link inline-flex items-start gap-1.5"
                >
                  <span><TbdText :text="pub.title" label="论文标题" /></span>
                  <ArrowUpRight :size="14" class="mt-1.5 shrink-0 text-ink-300" aria-hidden="true" />
                </a>
                <TbdText v-else :text="pub.title" label="论文标题" />
              </h3>

              <p class="mt-2 text-sm leading-relaxed text-ink-600">
                <TbdText :text="pub.authors" label="作者列表" />
              </p>

              <p
                v-if="pub.award"
                class="mt-3 inline-flex items-center gap-1.5 rounded-hair border border-gold-600/30 bg-gold-100 px-2 py-1 text-xs font-medium text-gold-700"
              >
                <Sparkles :size="12" aria-hidden="true" />
                <TbdText :text="pub.award" label="论文荣誉" />
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- ===================== 2. 科研项目 ===================== -->
    <section class="border-b border-line bg-mist py-16 sm:py-20">
      <div class="container-page">
        <SectionHeader
          eyebrow="Projects"
          title="科研项目"
          description="按项目级别筛选，列表以起始年份倒序排列。"
        />

        <div class="mt-6 max-w-2xl">
          <FilterPills
            v-model="projectLevel"
            label="项目级别"
            :options="projectLevelOptions"
          />
        </div>

        <ul class="mt-8 overflow-hidden rounded-card border border-line bg-paper">
          <li
            v-for="proj in filteredProjects"
            :key="proj.id"
            class="grid gap-3 border-b border-line-soft px-5 py-5 last:border-b-0 sm:grid-cols-12 sm:gap-6"
          >
            <div class="sm:col-span-2">
              <span class="font-mono text-sm tabular text-ink-400">{{ proj.startYear }}</span>
              <p class="mt-1.5 text-[11px] text-ink-400">
                {{ PROJECT_LEVELS.find((l) => l.key === proj.level)?.label }}
              </p>
            </div>

            <div class="sm:col-span-10">
              <h3 class="text-[0.98rem] font-semibold leading-relaxed text-ink-900">
                <a
                  v-if="proj.url"
                  :href="proj.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="pub-title-link inline-flex items-start gap-1.5"
                >
                  <span><TbdText :text="proj.title" label="项目名称" /></span>
                  <ExternalLink :size="13" class="mt-1.5 shrink-0 text-ink-300" aria-hidden="true" />
                </a>
                <TbdText v-else :text="proj.title" label="项目名称" />
              </h3>

              <dl class="mt-2.5 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-ink-500">
                <div class="flex items-center gap-1.5">
                  <dt class="text-ink-400">资助机构</dt>
                  <dd><TbdText :text="proj.sponsor" label="资助机构" /></dd>
                </div>
                <div class="flex items-center gap-1.5">
                  <dt class="text-ink-400">承担角色</dt>
                  <dd><TbdText :text="proj.role" label="承担角色" /></dd>
                </div>
                <div class="flex items-center gap-1.5">
                  <dt class="text-ink-400">执行期</dt>
                  <dd><TbdText :text="proj.period" label="执行期" /></dd>
                </div>
                <!-- 项目编号未公开时不渲染，避免展示可能错误的编号 -->
                <div v-if="proj.code" class="flex items-center gap-1.5">
                  <dt class="text-ink-400">编号</dt>
                  <dd class="font-mono text-xs">{{ proj.code }}</dd>
                </div>
              </dl>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- ===================== 3. 荣誉与获奖 ===================== -->
    <section class="border-b border-line bg-paper py-16 sm:py-20">
      <div class="container-page">
        <SectionHeader
          eyebrow="Honors & Awards"
          title="荣誉与获奖"
          description="按类别与年份筛选；列表为时间线，最新在前。"
        />

        <div class="mt-6 grid gap-6 lg:grid-cols-12 lg:gap-10">
          <div class="max-w-md lg:col-span-5">
            <FilterPills
              v-model="awardCategory"
              label="荣誉类别"
              :options="awardCategoryOptions"
            />
          </div>
          <div class="lg:col-span-7">
            <FilterPills v-model="awardYear" label="获奖年份" :options="awardYearOptions" />
          </div>
        </div>

        <div class="mt-9">
          <AwardTimeline v-if="filteredAwards.length" :items="filteredAwards" />
          <EmptyState
            v-else
            title="当前筛选条件下没有荣誉记录"
            hint="该年份与类别的组合下没有条目，可清除筛选查看全部。"
            @clear="clearAwardFilters"
          />
        </div>

        <!-- 统计带：数字需人工核实，未核实显示占位 -->
        <div class="mt-12">
          <h3 class="text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">
            学术服务概览
          </h3>
          <div class="mt-4">
            <StatBand :stats="SERVICE_HIGHLIGHTS" />
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== 4. 专利与软件著作权 ===================== -->
    <section class="border-b border-line bg-mist py-16 sm:py-20">
      <div class="container-page">
        <SectionHeader
          eyebrow="Patents"
          title="专利与软件著作权"
          description="发明人与登记信息以公开著录信息为准；尚未公开的字段不予展示。"
        />

        <ul class="mt-9 divide-y divide-line">
          <li
            v-for="patent in filteredPatents"
            :key="patent.id"
            v-reveal
            class="grid gap-3 py-5 sm:grid-cols-12 sm:gap-6"
          >
            <div class="sm:col-span-2">
              <span class="font-mono text-sm tabular text-ink-400">{{ patent.year }}</span>
              <p class="mt-1.5 text-[11px] text-ink-400">{{ kindLabel(patent.kind) }}</p>
            </div>

            <div class="sm:col-span-10">
              <h3 class="text-[0.98rem] font-semibold leading-relaxed text-ink-900">
                <a
                  v-if="patent.url"
                  :href="patent.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="pub-title-link inline-flex items-start gap-1.5"
                >
                  <span><TbdText :text="patent.title" label="专利名称" /></span>
                  <ExternalLink :size="13" class="mt-1.5 shrink-0 text-ink-300" aria-hidden="true" />
                </a>
                <TbdText v-else :text="patent.title" label="专利名称" />
              </h3>

              <p class="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-ink-500">
                <span><TbdText :text="patent.inventors" label="发明人列表" /></span>
                <!-- 状态标记：只反映数据文件中的法律状态，不做推断 -->
                <span
                  class="inline-flex items-center gap-1 rounded-hair border px-1.5 py-0.5 text-xs"
                  :class="
                    patent.status === 'granted'
                      ? 'border-accent-200 bg-accent-50 text-accent-700'
                      : 'border-line bg-mist-deep text-ink-500'
                  "
                >
                  <BadgeCheck v-if="patent.status === 'granted'" :size="12" aria-hidden="true" />
                  {{ PATENT_STATUS[patent.status] }}
                </span>
                <span v-if="patent.number" class="font-mono text-xs text-ink-500">
                  {{ patent.number }}
                </span>
                <span v-else class="tbd text-[11px]">专利号待补充</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- ===================== 5. 学术服务 ===================== -->
    <section class="bg-paper py-16 sm:py-20">
      <div class="container-page">
        <SectionHeader
          eyebrow="Academic Service"
          title="学术服务"
          description="专业团体、编委、会议主席与组织、技术程序委员会、审稿等学术服务工作。"
        />

        <div class="mt-10 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="group in SERVICE_GROUPS" :key="group.key" v-reveal>
            <h3 class="flex items-center gap-2.5 border-b border-line pb-3">
              <span
                class="inline-flex h-8 w-8 items-center justify-center rounded-hair border border-line bg-mist text-accent-600"
              >
                <IconByName :name="group.icon" :size="15" />
              </span>
              <span class="text-[0.95rem] font-semibold text-ink-900">{{ group.label }}</span>
              <span class="ml-auto font-mono text-xs tabular text-ink-300">
                {{ group.items.length }}
              </span>
            </h3>

            <ul class="mt-3.5 space-y-3">
              <li v-for="(item, i) in group.items" :key="i" class="text-sm leading-relaxed">
                <p class="text-ink-700">
                  <a
                    v-if="item.url"
                    :href="item.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-start gap-1 text-accent-700 hover:text-accent-600"
                  >
                    <TbdText :text="item.text" label="学术服务条目" />
                    <ExternalLink :size="11" class="mt-1 shrink-0" aria-hidden="true" />
                  </a>
                  <TbdText v-else :text="item.text" label="学术服务条目" />
                </p>
                <p v-if="item.meta" class="mt-0.5 text-xs text-ink-400">
                  <TbdText :text="item.meta" label="任期或年份" />
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
