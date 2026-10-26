<script setup>
/**
 * ResearchView —— 研究方向
 *
 * 每个方向作为一个完整模块，包含：
 *   研究背景与关键挑战 → 核心科学问题 → 技术路线与研究方法
 *   → 典型应用场景 → 代表性论文与相关项目
 *
 * 内容原则：不写入未经确认的具体结论。列表留空时渲染可编辑的待补充区块。
 */
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { ArrowUpRight, BookOpen, FileText, Layers as LayersIcon, ListChecks } from 'lucide-vue-next'

import PageHero from '@/components/PageHero.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import InfoCard from '@/components/InfoCard.vue'
import TbdBlock from '@/components/TbdBlock.vue'
import TbdText from '@/components/TbdText.vue'
import IconByName from '@/components/IconByName.vue'
import LayerStack from '@/components/graphics/LayerStack.vue'
import ClusterArt from '@/components/graphics/ClusterArt.vue'

import { RESEARCH_DIRECTIONS, RESEARCH_FRONTS, INVITED_TALKS, PAST_WORK } from '@/data/research.js'

/** 方向 → 配图。图示属于版式设计，按方向主题指派。 */
const DIAGRAMS = {
  'hpc-clusters': ClusterArt,
  'hw-sw-codesign': LayerStack,
  'resource-resilience': ClusterArt,
}

const padIndex = (i) => String(i + 1).padStart(2, '0')

/* ---------- 侧边锚点导航：滚动时高亮当前方向 ---------- */
const activeId = ref(RESEARCH_DIRECTIONS[0]?.id ?? '')
let observer = null

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') return

  observer = new IntersectionObserver(
    (entries) => {
      // 取当前视口内最靠上的方向模块
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visible[0]) activeId.value = visible[0].target.id
    },
    { rootMargin: '-20% 0px -65% 0px', threshold: 0 },
  )

  for (const dir of RESEARCH_DIRECTIONS) {
    const el = document.getElementById(dir.id)
    if (el) observer.observe(el)
  }
})

onBeforeUnmount(() => observer?.disconnect())

const counts = computed(() => ({
  directions: RESEARCH_DIRECTIONS.length,
  fronts: RESEARCH_FRONTS.length,
}))
</script>

<template>
  <div>
    <PageHero
      eyebrow="Research"
      title="研究方向"
      title-label="研究方向页标题"
      lead="围绕计算机体系结构，从芯片与微体系结构、系统软件与资源管理，到算力集群与可持续计算，开展跨层次的系统研究。"
    >
      <dl class="flex flex-wrap items-center gap-x-10 gap-y-4">
        <div>
          <dt class="text-xs uppercase tracking-[0.1em] text-ink-400">研究方向</dt>
          <dd class="mt-1 font-display text-2xl tabular text-ink-900">{{ counts.directions }}</dd>
        </div>
        <div>
          <dt class="text-xs uppercase tracking-[0.1em] text-ink-400">在研前沿问题</dt>
          <dd class="mt-1 font-display text-2xl tabular text-ink-900">{{ counts.fronts }}</dd>
        </div>
      </dl>
    </PageHero>

    <!-- ===== 方向锚点导航（吸顶，紧贴顶部栏下方） ===== -->
    <nav
      class="no-print sticky top-14 z-30 border-b border-line bg-paper/95 backdrop-blur-sm sm:top-16"
      aria-label="研究方向目录"
    >
      <div class="container-page">
        <ul class="scrollbar-none flex gap-1 overflow-x-auto py-2.5">
          <li v-for="(dir, i) in RESEARCH_DIRECTIONS" :key="dir.id" class="shrink-0">
            <a
              :href="`#${dir.id}`"
              class="inline-flex items-center gap-2 rounded-hair px-3 py-1.5 text-sm whitespace-nowrap transition-colors"
              :class="
                activeId === dir.id
                  ? 'bg-accent-50 font-medium text-accent-700'
                  : 'text-ink-500 hover:bg-mist hover:text-ink-800'
              "
              :aria-current="activeId === dir.id ? 'true' : undefined"
            >
              <span class="font-mono text-[11px] tabular text-ink-400">{{ padIndex(i) }}</span>
              <TbdText :text="dir.title" label="方向名称" />
            </a>
          </li>
        </ul>
      </div>
    </nav>

    <!-- ===== 各研究方向模块 ===== -->
    <div class="container-page">
      <article
        v-for="(dir, i) in RESEARCH_DIRECTIONS"
        :id="dir.id"
        :key="dir.id"
        class="scroll-mt-12 border-b border-line py-14 last:border-b-0 sm:py-16 lg:py-20"
      >
        <!-- 方向标题 -->
        <header class="grid gap-6 lg:grid-cols-12 lg:gap-12">
          <div class="lg:col-span-4">
            <div class="flex items-center gap-3">
              <span
                class="inline-flex h-11 w-11 items-center justify-center rounded-hair border border-line bg-mist text-accent-600"
              >
                <IconByName :name="dir.icon" :size="19" />
              </span>
              <span class="font-mono text-sm tabular text-ink-300">{{ padIndex(i) }}</span>
            </div>

            <h2 class="mt-5 text-[1.5rem] leading-snug sm:text-[1.65rem]">
              <TbdText :text="dir.title" label="研究方向名称" />
            </h2>
            <p class="mt-2 text-sm uppercase tracking-[0.08em] text-ink-400">
              <TbdText :text="dir.titleEn" label="英文名称" />
            </p>

            <ul v-if="dir.keywords?.length" class="mt-5 flex flex-wrap gap-1.5">
              <li
                v-for="(kw, k) in dir.keywords"
                :key="k"
                class="rounded-hair border border-line bg-paper px-2 py-0.5 text-[11px] text-ink-500"
              >
                <TbdText :text="kw" label="关键词" />
              </li>
            </ul>
          </div>

          <!-- 研究背景 -->
          <div class="lg:col-span-8">
            <h3 class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">
              <BookOpen :size="14" aria-hidden="true" />
              研究背景与关键挑战
            </h3>
            <div class="mt-4 space-y-4 text-[0.95rem] leading-[1.85] text-ink-700">
              <p v-for="(para, p) in dir.background" :key="p">
                <TbdText :text="para" :label="`背景段落 ${p + 1}`" block />
              </p>
            </div>
          </div>
        </header>

        <!-- 关键挑战 -->
        <section v-if="dir.challenges?.length" class="mt-12">
          <h3 class="text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">
            关键挑战
          </h3>
          <div class="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <InfoCard
              v-for="(c, ci) in dir.challenges"
              :key="ci"
              :index="padIndex(ci)"
              :title="c.title"
              title-label="挑战标题"
              :text="c.text"
              text-label="挑战说明"
              variant="outline"
            />
          </div>
        </section>

        <!-- 核心科学问题 + 技术路线 -->
        <section class="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div class="lg:col-span-5">
            <h3 class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">
              <ListChecks :size="14" aria-hidden="true" />
              核心科学问题
            </h3>
            <ol class="mt-4 space-y-3.5">
              <li
                v-for="(q, qi) in dir.questions"
                :key="qi"
                class="flex gap-3.5 text-[0.95rem] leading-relaxed text-ink-700"
              >
                <span
                  class="mt-0.5 font-mono text-xs tabular text-accent-600"
                  aria-hidden="true"
                  >Q{{ qi + 1 }}</span
                >
                <span><TbdText :text="q" :label="`科学问题 ${qi + 1}`" /></span>
              </li>
            </ol>
          </div>

          <div class="lg:col-span-7">
            <h3 class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">
              <LayersIcon :size="14" aria-hidden="true" />
              技术路线与研究方法
            </h3>
            <ol class="mt-4 space-y-3">
              <li
                v-for="(step, si) in dir.approach"
                :key="si"
                class="flex gap-4 rounded-card border border-line-soft bg-mist/60 px-4 py-3 text-[0.95rem] leading-relaxed text-ink-700"
              >
                <span class="font-mono text-xs tabular text-ink-400" aria-hidden="true">{{
                  padIndex(si)
                }}</span>
                <span><TbdText :text="step" :label="`技术路线 ${si + 1}`" /></span>
              </li>
            </ol>
          </div>
        </section>

        <!-- 技术示意图 -->
        <section v-if="DIAGRAMS[dir.id]" class="mt-12">
          <component :is="DIAGRAMS[dir.id]" :tall="true" />
        </section>

        <!-- 典型应用场景 -->
        <section class="mt-12">
          <h3 class="text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">
            典型应用场景
          </h3>
          <ul v-if="dir.applications?.length" class="mt-4 grid gap-3 sm:grid-cols-3">
            <li
              v-for="(app, ai) in dir.applications"
              :key="ai"
              class="rounded-card border border-line bg-paper px-4 py-3.5 text-sm leading-relaxed text-ink-600"
            >
              <TbdText :text="app" :label="`应用场景 ${ai + 1}`" />
            </li>
          </ul>
          <!-- 未确认时保留可编辑占位区，而不是编造场景 -->
          <div v-else class="mt-4">
            <TbdBlock
              title="典型应用场景"
              hint="该方向的典型应用场景尚未确认。确认后请补充为字符串数组，界面会自动切换为三列卡片。"
              file="src/data/research.js → applications"
            />
          </div>
        </section>

        <!-- 代表性论文与相关项目 -->
        <section class="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div class="lg:col-span-7">
            <h3 class="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">
              <FileText :size="14" aria-hidden="true" />
              代表性论文
            </h3>
            <ul class="mt-4 divide-y divide-line-soft">
              <li v-for="(paper, pi) in dir.papers" :key="pi" class="py-3.5 first:pt-0">
                <p class="text-[0.95rem] font-medium leading-relaxed text-ink-900">
                  <a
                    v-if="paper.url"
                    :href="paper.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="pub-title-link inline-flex items-start gap-1.5"
                  >
                    <span><TbdText :text="paper.title" label="论文标题" /></span>
                    <ArrowUpRight :size="13" class="mt-1.5 shrink-0 text-ink-300" aria-hidden="true" />
                  </a>
                  <TbdText v-else :text="paper.title" label="论文标题" />
                </p>
                <p class="mt-1 text-sm italic text-ink-500">
                  <TbdText :text="paper.meta" label="发表载体与年份" />
                </p>
              </li>
            </ul>
          </div>

          <div class="lg:col-span-5">
            <h3 class="text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">
              相关科研项目
            </h3>
            <div class="mt-4">
              <ul v-if="dir.projects?.length" class="divide-y divide-line-soft">
                <li v-for="(proj, xi) in dir.projects" :key="xi" class="py-3.5 text-sm text-ink-700">
                  <TbdText :text="proj.title" label="项目名称" />
                </li>
              </ul>
              <!-- 项目归属需要人工确认，先保留占位 -->
              <TbdBlock
                v-else
                title="该方向的代表性项目"
                hint="项目的方向归属需由团队确认后再填写，避免把项目错挂到不相关的方向上。"
                file="src/data/research.js → projects"
              />
            </div>
          </div>
        </section>
      </article>
    </div>

    <!-- ===== 当前研究前沿 ===== -->
    <section class="border-t border-line bg-mist py-16 sm:py-20">
      <div class="container-page">
        <SectionHeader
          eyebrow="Research Frontiers"
          title="当前关注的问题"
          description="团队正在持续推进的核心问题，以及每个问题的观察视角与参考工作。"
        />

        <div class="mt-10 space-y-5">
          <article
            v-for="(front, i) in RESEARCH_FRONTS"
            :key="front.id"
            v-reveal="{ delay: i * 60 }"
            class="grid gap-6 rounded-card border border-line bg-paper p-6 sm:p-8 lg:grid-cols-12 lg:gap-10"
          >
            <div class="lg:col-span-8">
              <div class="flex items-baseline gap-3">
                <span class="font-display text-2xl leading-none text-ink-200">{{ front.index }}</span>
                <h3 class="text-[1.15rem] font-semibold leading-snug text-ink-900">
                  <TbdText :text="front.title" label="研究前沿标题" />
                </h3>
              </div>

              <p class="mt-4 text-[0.95rem] leading-[1.85] text-ink-700">
                <TbdText :text="front.text" label="问题描述" block />
              </p>
              <p class="mt-3 text-[0.95rem] leading-[1.85] text-ink-600">
                <TbdText :text="front.perspective" label="观察视角" block />
              </p>
            </div>

            <div class="lg:col-span-4">
              <h4 class="text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">参考工作</h4>
              <ul class="mt-3.5 flex flex-wrap gap-1.5">
                <li v-for="(ref, ri) in front.refs" :key="ri">
                  <a
                    v-if="ref.url"
                    :href="ref.url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center gap-1 rounded-hair border border-line px-2 py-1 font-mono text-[11px] text-ink-600 transition-colors hover:border-accent-300 hover:text-accent-700"
                  >
                    <TbdText :text="ref.label" label="论文引用" />
                    <ArrowUpRight :size="10" aria-hidden="true" />
                  </a>
                  <span
                    v-else
                    class="inline-flex items-center rounded-hair border border-dashed border-line px-2 py-1 font-mono text-[11px] text-ink-400"
                  >
                    <TbdText :text="ref.label" label="论文引用" />
                  </span>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- ===== 精选报告 & 以往工作 ===== -->
    <section class="border-t border-line bg-paper py-16 sm:py-20">
      <div class="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeader eyebrow="Invited Talks" title="精选报告" :ruled="false" />
          <ul class="mt-6 space-y-5">
            <li v-for="(talk, ti) in INVITED_TALKS" :key="ti" class="border-l-2 border-accent-200 pl-4">
              <p class="text-[1rem] font-medium text-ink-900">
                <TbdText :text="talk.title" label="报告标题" />
              </p>
              <p class="mt-2 text-sm leading-relaxed text-ink-600">
                <TbdText :text="talk.summary" label="报告概述" />
              </p>
              <p class="mt-2 text-sm text-ink-500">
                <TbdText :text="talk.occasions" label="报告场合" />
              </p>
            </li>
          </ul>
        </div>

        <div>
          <SectionHeader eyebrow="Past Work" title="以往工作" :ruled="false" />
          <ul class="mt-6 space-y-5">
            <li v-for="work in PAST_WORK" :key="work.id" class="border-l-2 border-line pl-4">
              <p class="text-[1rem] font-medium text-ink-900">
                <TbdText :text="work.title" label="工作标题" />
              </p>
              <p class="mt-2 text-sm leading-[1.85] text-ink-600">
                <TbdText :text="work.text" label="工作描述" block />
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
