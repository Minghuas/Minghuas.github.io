<script setup>
/**
 * HomeView —— 首页
 *
 * 纵向结构（保证足够的页面深度，不做成一屏产品介绍）：
 *   1. 首屏主视觉
 *   2. 研究方向概览
 *   3. 代表性科研成果
 *   4. 学术影响力
 *   5. 团队介绍
 *   6. 团队动态
 *   7. 招生与合作
 */
import { computed } from 'vue'
import { ArrowRight, ArrowUpRight, Mail, Sparkles } from 'lucide-vue-next'

import HeroArt from '@/components/graphics/HeroArt.vue'
import ResearchCard from '@/components/ResearchCard.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import StatBand from '@/components/StatBand.vue'
import InfoCard from '@/components/InfoCard.vue'
import TbdText from '@/components/TbdText.vue'

import { SITE } from '@/data/site.js'
import { RESEARCH_DIRECTIONS } from '@/data/research.js'
import { PUBLICATION_SEED } from '@/data/publications.js'
import { STAT_HIGHLIGHTS } from '@/data/stats.js'
import { TEAM_INTRO } from '@/data/philosophy.js'
import { NEWS } from '@/data/news.js'
import { POSITIONS } from '@/data/join.js'

/** 精选代表性成果：优先取带荣誉标记的条目，不足则按年份补齐 */
const featuredPublications = computed(() => {
  const awarded = PUBLICATION_SEED.filter((p) => p.featured || p.award)
  const rest = PUBLICATION_SEED.filter((p) => !p.featured && !p.award)
  return [...awarded, ...rest].slice(0, 4)
})

const topNews = computed(() => [...NEWS].sort((a, b) => b.year - a.year).slice(0, 4))
const padIndex = (i) => String(i + 1).padStart(2, '0')
</script>

<template>
  <div>
    <!-- ===================== 1. 首屏 ===================== -->
    <section class="relative overflow-hidden border-b-[6px] border-orange-500 bg-navy-900">
      <!-- 网格底纹 -->
      <div class="pointer-events-none absolute inset-0 text-white/[0.06]" aria-hidden="true">
        <svg class="h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 700">
          <defs>
            <pattern id="home-hero-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M48 0H0V48" fill="none" stroke="currentColor" stroke-width="1" />
            </pattern>
          </defs>
          <rect width="1200" height="700" fill="url(#home-hero-grid)" />
        </svg>
      </div>

      <!-- 校徽水印：以极低透明度作为首屏的机构印记 -->
      <img
        src="/sysu-logo.png"
        alt=""
        width="320"
        height="320"
        aria-hidden="true"
        class="pointer-events-none absolute -right-10 top-6 hidden w-64 opacity-[0.08] [filter:brightness(0)_invert(1)] lg:block xl:w-80"
      />

      <div class="container-page relative">
        <div class="grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
          <!-- 左：文案与入口 -->
          <div class="lg:col-span-6 xl:col-span-5">
            <p class="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-display text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">
              <span><TbdText :text="SITE.owner.affiliation" label="所属学院" /></span>
              <span class="h-3 w-px bg-white/25" aria-hidden="true" />
              <span><TbdText :text="SITE.owner.institute" label="所属研究所" /></span>
            </p>

            <h1 class="mt-5 text-[1.85rem] leading-[1.2] text-white sm:text-[2.4rem] lg:text-[2.9rem]">
              <TbdText :text="''" label="首屏主标题" />
            </h1>

            <p class="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-[1.05rem]">
              <TbdText :text="''" label="首屏学术定位介绍" />
            </p>

            <!-- 行动入口 -->
            <div class="mt-8 flex flex-wrap items-center gap-3">
              <RouterLink
                to="/research"
                class="group inline-flex items-center gap-2 rounded-hair bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
              >
                查看研究方向
                <ArrowRight
                  :size="15"
                  class="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </RouterLink>

              <RouterLink
                to="/achievements"
                class="inline-flex items-center gap-2 rounded-hair border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10"
              >
                浏览科研成果
              </RouterLink>

              <RouterLink
                to="/join"
                class="inline-flex items-center gap-2 rounded-hair px-3 py-2.5 text-sm font-semibold text-orange-200 underline decoration-orange-300/60 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
              >
                加入团队
                <ArrowUpRight :size="14" aria-hidden="true" />
              </RouterLink>
            </div>

            <!-- 团队格言 -->
            <p class="mt-10 border-l-2 border-orange-400 pl-4 text-sm italic text-white/80">
              <TbdText :text="SITE.motto" label="团队格言" />
            </p>
          </div>

          <!-- 右：体系结构视觉 -->
          <div class="lg:col-span-6 xl:col-span-7">
            <HeroArt class="mx-auto max-w-xl lg:max-w-none" />
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== 2. 研究方向概览 ===================== -->
    <section class="border-b border-line bg-paper py-16 sm:py-20">
      <div class="container-page">
        <SectionHeader
          eyebrow="Research Directions"
          title="研究方向"
          description="面向新一代人工智能应用的关键需求，从芯片、处理器架构到计算系统与算力集群展开跨层次研究。"
        >
          <template #action>
            <RouterLink
              to="/research"
              class="group inline-flex items-center gap-1.5 text-sm font-medium text-accent-700 transition-colors hover:text-accent-600"
            >
              全部研究方向
              <ArrowRight
                :size="15"
                class="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </RouterLink>
          </template>
        </SectionHeader>

        <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(dir, i) in RESEARCH_DIRECTIONS"
            :key="dir.id"
            v-reveal="{ delay: i * 60 }"
          >
            <ResearchCard :direction="dir" :index="padIndex(i)" />
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== 3. 代表性科研成果 ===================== -->
    <section class="border-b border-line bg-mist py-16 sm:py-20">
      <div class="container-page">
        <SectionHeader
          eyebrow="Selected Publications"
          title="代表性科研成果"
          description="精选代表性论文与获奖成果，完整列表请见论文发表页。"
        >
          <template #action>
            <RouterLink
              to="/publications"
              class="group inline-flex items-center gap-1.5 text-sm font-medium text-accent-700 transition-colors hover:text-accent-600"
            >
              全部论文
              <ArrowRight
                :size="15"
                class="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </RouterLink>
          </template>
        </SectionHeader>

        <!-- 大尺寸展示模块：与论文页的紧凑列表形成对比 -->
        <ol class="mt-10 space-y-5">
          <li
            v-for="(pub, i) in featuredPublications"
            :key="pub.id"
            v-reveal="{ delay: i * 60 }"
            class="group relative grid gap-5 rounded-card border border-line bg-paper p-6 transition-all duration-300 hover:border-accent-200 hover:shadow-card sm:p-7 lg:grid-cols-12 lg:gap-8"
          >
            <!-- 年份与载体 -->
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

            <!-- 标题、作者、荣誉 -->
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

              <p
                v-else
                class="mt-3 text-xs text-ink-400"
              >
                <TbdText :text="''" label="成果简介" />
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- ===================== 4. 学术影响力 ===================== -->
    <section class="border-b border-line bg-paper py-16 sm:py-20">
      <div class="container-page">
        <SectionHeader
          eyebrow="Research Impact"
          title="学术影响力"
          description="以下数字均以官方页面或经确认的数据为准，未核实前以占位标记显示，不以 0 代替。"
        />

        <div class="mt-10">
          <StatBand :stats="STAT_HIGHLIGHTS" />
        </div>

        <p class="mt-5 max-w-3xl text-xs leading-relaxed text-ink-500">
          统计口径说明：不同来源对「论文数量」「主持项目」的界定方式不同，
          因此每项指标均标注了待确认的口径，避免出现无法核对的数字。
        </p>
      </div>
    </section>

    <!-- ===================== 5. 团队介绍 ===================== -->
    <section class="border-b border-line bg-mist py-16 sm:py-20">
      <div class="container-page">
        <div class="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div class="lg:col-span-5">
            <SectionHeader
              eyebrow="Team"
              :title="TEAM_INTRO.title"
              title-label="团队介绍标题"
              :ruled="false"
              :description="TEAM_INTRO.lead"
            />

            <div class="mt-6 space-y-4 text-[0.95rem] leading-relaxed text-ink-600">
              <p v-for="(para, i) in TEAM_INTRO.paragraphs" :key="i">
                <TbdText :text="para" :label="`团队介绍段落 ${i + 1}`" block />
              </p>
            </div>

            <RouterLink
              to="/team"
              class="group mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-accent-700 transition-colors hover:text-accent-600"
            >
              了解团队成员
              <ArrowRight
                :size="15"
                class="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </RouterLink>
          </div>

          <div class="lg:col-span-7">
            <div class="grid gap-4 sm:grid-cols-2">
              <InfoCard
                v-for="(value, i) in TEAM_INTRO.values"
                :key="i"
                v-reveal="{ delay: i * 60 }"
                :icon="value.icon"
                :title="value.title"
                title-label="研究理念小标题"
                :text="value.text"
                text-label="研究理念说明"
                variant="outline"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== 6. 团队动态 ===================== -->
    <section class="border-b border-line bg-paper py-16 sm:py-20">
      <div class="container-page">
        <SectionHeader
          eyebrow="News"
          title="团队动态"
          description="近期的论文、荣誉、团队与学术服务动态。"
        />

        <ul class="mt-10 divide-y divide-line">
          <li
            v-for="(item, i) in topNews"
            :key="item.id"
            v-reveal="{ delay: i * 50 }"
            class="group grid gap-2 py-5 sm:grid-cols-12 sm:gap-6"
          >
            <div class="sm:col-span-2">
              <span class="font-mono text-xs tabular text-ink-400">
                <TbdText :text="item.date" label="动态日期" />
              </span>
            </div>

            <div class="sm:col-span-8">
              <h3 class="text-[0.98rem] font-medium leading-relaxed text-ink-900">
                <a
                  v-if="item.url"
                  :href="item.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="pub-title-link"
                  ><TbdText :text="item.title" label="动态标题" /></a
                >
                <TbdText v-else :text="item.title" label="动态标题" />
              </h3>
              <p class="mt-1.5 text-sm leading-relaxed text-ink-500">
                <TbdText :text="item.text" label="动态说明" />
              </p>
            </div>

            <div class="sm:col-span-2 sm:text-right">
              <span class="inline-flex rounded-hair border border-line px-2 py-0.5 text-[11px] text-ink-500">
                {{ item.tag }}
              </span>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- ===================== 7. 招生与合作 ===================== -->
    <section class="border-t-[6px] border-orange-500 bg-navy-900 py-16 sm:py-20">
      <div class="container-page">
        <div class="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div class="lg:col-span-5">
            <p class="font-display text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">Join Us</p>
            <h2 class="mt-2 text-2xl leading-snug text-white sm:text-[1.75rem]">
              招生与合作
            </h2>
            <p class="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-white/85">
              长期招募博士研究生、硕士研究生、优秀本科生、博士后与访问学者。
              研究方向覆盖计算机体系结构、系统软件与高性能计算。
            </p>

            <div class="mt-7 flex flex-wrap items-center gap-3">
              <RouterLink
                to="/join"
                class="group inline-flex items-center gap-2 rounded-hair bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
              >
                查看招生信息
                <ArrowRight
                  :size="15"
                  class="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </RouterLink>

              <a
                v-if="SITE.contact.email"
                :href="`mailto:${SITE.contact.email}`"
                class="inline-flex items-center gap-2 rounded-hair border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10"
              >
                <Mail :size="15" aria-hidden="true" />
                邮件联系
              </a>
              <span
                v-else
                class="tbd inline-flex items-center gap-2 rounded-hair px-4 py-2.5 text-sm"
              >
                <Mail :size="15" aria-hidden="true" />
                联系邮箱待补充
              </span>
            </div>
          </div>

          <!-- 招募类别清单 -->
          <div class="lg:col-span-7">
            <ul class="overflow-hidden rounded-card border border-navy-700">
              <li
                v-for="pos in POSITIONS"
                :key="pos.key"
                class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1.5 border-b border-navy-700 bg-navy-800/40 px-5 py-4 last:border-b-0"
              >
                <div class="min-w-0">
                  <p class="text-sm font-medium text-white">{{ pos.label }}</p>
                  <p class="mt-1 text-sm leading-relaxed text-white/75">
                    <TbdText :text="pos.summary" label="招募说明" />
                  </p>
                </div>
                <span
                  class="shrink-0 rounded-hair border px-2 py-0.5 text-[11px]"
                  :class="
                    pos.open
                      ? 'border-orange-300/50 bg-orange-500/20 text-orange-200'
                      : 'border-white/20 text-white/60'
                  "
                >
                  {{ pos.open ? '开放中' : '暂不开放' }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
