<script setup>
/**
 * JoinUsView —— 招生招聘
 *
 * 页面结构：
 *   1. 培养理念      团队对研究训练的理解
 *   2. 训练路径      从入门到独立开展研究的完整链条
 *   3. 招募类别      博士 / 硕士 / 本科 / 博士后 / 访问学者
 *   4. 申请流程      申请步骤
 *   5. 合作与交流
 *   6. 学科简介与推荐阅读
 *   7. 联系方式      邮箱为空时不渲染 mailto，改为占位标记
 *
 * 合规约束：
 *   招生名额、待遇、申请条件必须以官方页面与实际政策为准，
 *   本站不自行许诺任何条件；联系方式只使用官方已公开的信息。
 */
import { computed, ref } from 'vue'
import { ArrowUpRight, BadgeCheck, ExternalLink, Mail, MapPin, Send } from 'lucide-vue-next'

import PageHero from '@/components/PageHero.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import InfoCard from '@/components/InfoCard.vue'
import TbdText from '@/components/TbdText.vue'
import TbdBlock from '@/components/TbdBlock.vue'

import { POSITIONS, TRAINING_PIPELINE, COLLABORATION, APPLICATION_STEPS, CONTACT } from '@/data/join.js'
import { TRAINING_PHILOSOPHY, DISCIPLINE_INTRO, READING_LIST } from '@/data/philosophy.js'
import { SITE } from '@/data/site.js'

const openCount = computed(() => POSITIONS.filter((p) => p.open).length)

/** 招募类别：默认展开第一项，避免页面上同时铺开所有条件 */
const openKey = ref(POSITIONS.find((p) => p.open)?.key ?? POSITIONS[0]?.key ?? '')

function toggle(key) {
  openKey.value = openKey.value === key ? '' : key
}
</script>

<template>
  <div>
    <PageHero
      eyebrow="Join Us"
      title="招生招聘"
      title-label="招生页标题"
      lead="我们长期招募博士研究生、硕士研究生、优秀本科生、博士后与访问学者，也欢迎校内外与工业界的科研合作。"
    >
      <div class="flex flex-wrap items-center gap-3">
        <a
          v-if="CONTACT.email"
          :href="`mailto:${CONTACT.email}`"
          class="inline-flex items-center gap-2 rounded-hair bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
        >
          <Mail :size="15" aria-hidden="true" />
          发送邮件
        </a>
        <span v-else class="tbd inline-flex items-center gap-2 rounded-hair px-4 py-2.5 text-sm">
          <Mail :size="15" aria-hidden="true" />
          联系邮箱待补充
        </span>

        <RouterLink
          to="/research"
          class="inline-flex items-center gap-2 rounded-hair border border-line bg-paper px-5 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:border-accent-300 hover:bg-accent-50 hover:text-accent-700"
        >
          先看研究方向
        </RouterLink>

        <span class="text-xs text-ink-500">当前 {{ openCount }} 个类别开放招募</span>
      </div>
    </PageHero>

    <!-- ===================== 1. 培养理念 ===================== -->
    <section class="border-b border-line bg-paper py-16 sm:py-20">
      <div class="container-page">
        <SectionHeader
          eyebrow="Training Philosophy"
          :title="TRAINING_PHILOSOPHY.title"
          title-label="培养模式标题"
          :description="TRAINING_PHILOSOPHY.lead"
        />

        <ol class="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          <li
            v-for="(dim, i) in TRAINING_PHILOSOPHY.dimensions"
            :key="dim.key"
            v-reveal="{ delay: i * 50 }"
            class="border-t border-line pt-5"
          >
            <span class="font-mono text-sm tabular text-accent-600" aria-hidden="true">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
            <h3 class="mt-2.5 text-[1.02rem] font-semibold leading-snug text-ink-900">
              <TbdText :text="dim.title" label="培养维度名称" />
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-ink-600">
              <TbdText :text="dim.text" label="培养维度说明" />
            </p>
          </li>
        </ol>
      </div>
    </section>

    <!-- ===================== 2. 训练路径 ===================== -->
    <section class="border-b border-line bg-mist py-16 sm:py-20">
      <div class="container-page">
        <SectionHeader
          eyebrow="Pipeline"
          title="训练路径"
          description="从进入团队到独立开展研究，训练环节依次推进，每一步都有明确的产出要求。"
        />

        <ol class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <li
            v-for="(stage, i) in TRAINING_PIPELINE"
            :key="stage.step"
            v-reveal="{ delay: i * 60 }"
            class="relative rounded-card border border-line bg-paper p-5"
          >
            <span class="font-display text-2xl leading-none text-ink-200 tabular">
              {{ stage.step }}
            </span>
            <h3 class="mt-3 text-[0.95rem] font-semibold leading-snug text-ink-900">
              <TbdText :text="stage.title" label="训练环节名称" />
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-ink-600">
              <TbdText :text="stage.text" label="训练环节说明" />
            </p>

            <!-- 环节之间的推进箭头（纯装饰） -->
            <span
              v-if="i < TRAINING_PIPELINE.length - 1"
              class="absolute -right-2.5 top-1/2 hidden -translate-y-1/2 text-ink-300 lg:block"
              aria-hidden="true"
            >
              →
            </span>
          </li>
        </ol>
      </div>
    </section>

    <!-- ===================== 3. 招募类别 ===================== -->
    <section class="border-b border-line bg-paper py-16 sm:py-20">
      <div class="container-page">
        <SectionHeader
          eyebrow="Openings"
          title="招募类别"
          description="展开查看每个类别的说明与要求。名额与待遇以官方招生政策为准。"
        />

        <div class="mt-10 overflow-hidden rounded-card border border-line">
          <div v-for="pos in POSITIONS" :key="pos.key" class="border-b border-line last:border-b-0">
            <h3>
              <button
                type="button"
                class="flex w-full items-center gap-4 px-5 py-5 text-left transition-colors hover:bg-mist sm:px-6"
                :aria-expanded="openKey === pos.key"
                :aria-controls="`position-${pos.key}`"
                @click="toggle(pos.key)"
              >
                <span
                  class="shrink-0 font-mono text-xs text-ink-300 transition-transform duration-200"
                  :class="openKey === pos.key ? 'rotate-90' : ''"
                  aria-hidden="true"
                >
                  ▶
                </span>

                <span class="min-w-0 flex-1">
                  <span class="block text-[1.02rem] font-semibold text-ink-900">{{ pos.label }}</span>
                  <span class="mt-1 block text-sm leading-relaxed text-ink-500">
                    <TbdText :text="pos.summary" label="招募说明" />
                  </span>
                </span>

                <span
                  class="shrink-0 rounded-hair border px-2 py-0.5 text-[11px]"
                  :class="
                    pos.open
                      ? 'border-accent-200 bg-accent-50 text-accent-700'
                      : 'border-line bg-mist-deep text-ink-500'
                  "
                >
                  <BadgeCheck v-if="pos.open" :size="11" class="mr-1 inline align-[-1px]" aria-hidden="true" />{{ pos.open ? '开放中' : '暂不开放' }}
                </span>
              </button>
            </h3>

            <div
              v-show="openKey === pos.key"
              :id="`position-${pos.key}`"
              class="border-t border-line-soft bg-mist/60 px-5 py-5 sm:px-6 sm:pl-16"
            >
              <h4 class="text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">
                说明与要求
              </h4>
              <ul v-if="pos.points?.length" class="mt-3 space-y-2.5">
                <li
                  v-for="(point, i) in pos.points"
                  :key="i"
                  class="flex gap-3 text-sm leading-relaxed text-ink-600"
                >
                  <span class="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-400" aria-hidden="true" />
                  <span><TbdText :text="point" :label="`要求 ${i + 1}`" /></span>
                </li>
              </ul>
              <div v-else class="mt-3">
                <TbdBlock
                  title="该类别的具体要求"
                  hint="要求尚未确认时保留空缺，不要凭印象填写招生条件。"
                  file="src/data/join.js → points"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== 4. 申请流程 ===================== -->
    <section class="border-b border-line bg-mist py-16 sm:py-20">
      <div class="container-page">
        <SectionHeader
          eyebrow="How to Apply"
          title="申请流程"
          description="按顺序准备材料并与我们联系；具体截止时间以官方招生通知为准。"
        />

        <ol class="mt-10 grid gap-5 sm:grid-cols-3">
          <li
            v-for="(step, i) in APPLICATION_STEPS"
            :key="step.step"
            v-reveal="{ delay: i * 70 }"
            class="rounded-card border border-line bg-paper p-6"
          >
            <span
              class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent-200 bg-accent-50 font-mono text-sm text-accent-700"
            >
              {{ step.step }}
            </span>
            <h3 class="mt-4 text-[1rem] font-semibold leading-snug text-ink-900">
              <TbdText :text="step.title" label="申请步骤名称" />
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-ink-600">
              <TbdText :text="step.text" label="申请步骤说明" />
            </p>
          </li>
        </ol>

        <div class="mt-8 flex flex-wrap items-center gap-4">
          <a
            v-if="CONTACT.email"
            :href="`mailto:${CONTACT.email}`"
            class="inline-flex items-center gap-2 rounded-hair bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            <Send :size="15" aria-hidden="true" />
            发送申请邮件
          </a>
          <span v-else class="tbd inline-flex items-center gap-2 rounded-hair px-4 py-2.5 text-sm">
            <Send :size="15" aria-hidden="true" />
            联系邮箱待补充
          </span>
          <span class="text-sm text-ink-500">
            <TbdText :text="CONTACT.emailNote" label="邮件说明" />
          </span>
        </div>
      </div>
    </section>

    <!-- ===================== 5. 合作与交流 ===================== -->
    <section class="border-b border-line bg-paper py-16 sm:py-20">
      <div class="container-page">
        <SectionHeader
          eyebrow="Collaboration"
          :title="COLLABORATION.title"
          title-label="合作与交流标题"
          :description="COLLABORATION.lead"
        />

        <div class="mt-10 grid gap-4 sm:grid-cols-3">
          <InfoCard
            v-for="(item, i) in COLLABORATION.items"
            :key="i"
            v-reveal="{ delay: i * 60 }"
            :icon="item.icon"
            :title="item.title"
            title-label="合作方向小标题"
            :text="item.text"
            text-label="合作方向说明"
            variant="outline"
          />
        </div>
      </div>
    </section>

    <!-- ===================== 6. 学科简介与推荐阅读 ===================== -->
    <section class="border-b border-line bg-mist py-16 sm:py-20">
      <div class="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-7">
          <SectionHeader
            eyebrow="The Discipline"
            :title="DISCIPLINE_INTRO.title"
            title-label="学科简介标题"
            :ruled="false"
          />
          <div class="mt-6 space-y-4 text-[0.95rem] leading-[1.85] text-ink-600">
            <p v-for="(para, i) in DISCIPLINE_INTRO.paragraphs" :key="i">
              <TbdText :text="para" :label="`学科简介段落 ${i + 1}`" block />
            </p>
          </div>
          <p class="mt-6 border-l-2 border-accent-300 pl-4 text-[0.95rem] italic leading-relaxed text-ink-600">
            <TbdText :text="DISCIPLINE_INTRO.analogy" label="学科定位类比说明" />
          </p>
        </div>

        <div class="lg:col-span-5">
          <SectionHeader eyebrow="Reading" title="推荐阅读" :ruled="false" />
          <ul class="mt-6 space-y-4">
            <li v-for="(item, i) in READING_LIST" :key="i" class="flex gap-3 text-sm leading-relaxed">
              <span class="font-mono text-xs text-ink-300" aria-hidden="true">
                {{ String(i + 1).padStart(2, '0') }}
              </span>
              <a
                v-if="item.url"
                :href="item.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-start gap-1.5 text-accent-700 transition-colors hover:text-accent-600"
              >
                <TbdText :text="item.text" label="文献信息" />
                <ArrowUpRight :size="12" class="mt-1 shrink-0" aria-hidden="true" />
              </a>
              <TbdText v-else :text="item.text" label="文献信息" />
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ===================== 7. 联系方式 ===================== -->
    <section class="bg-navy-900 py-16 sm:py-20">
      <div class="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div class="lg:col-span-5">
          <p class="font-display text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">Contact</p>
          <h2 class="mt-2 text-2xl leading-snug text-white sm:text-[1.75rem]">联系方式</h2>
          <p class="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-white/85">
            以下信息均取自官方公开渠道；未公开的字段暂不展示，以避免出现无法使用的联系方式。
          </p>

          <dl class="mt-8 space-y-5">
            <div class="flex items-start gap-3">
              <Mail :size="16" class="mt-1 shrink-0 text-accent-300" aria-hidden="true" />
              <div>
                <dt class="text-xs uppercase tracking-[0.1em] text-white/60">邮箱</dt>
                <dd class="mt-1 text-[0.95rem] text-white">
                  <a
                    v-if="CONTACT.email"
                    :href="`mailto:${CONTACT.email}`"
                    class="link-inline"
                    >{{ CONTACT.email }}</a
                  >
                  <span v-else class="tbd">【待补充：联系邮箱】</span>
                </dd>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <MapPin :size="16" class="mt-1 shrink-0 text-accent-300" aria-hidden="true" />
              <div>
                <dt class="text-xs uppercase tracking-[0.1em] text-white/60">地址</dt>
                <dd class="mt-1 text-[0.95rem] text-white">
                  <span v-if="SITE.contact.address">{{ SITE.contact.address }}</span>
                  <span v-else class="tbd">【待补充：办公地址】</span>
                </dd>
              </div>
            </div>
          </dl>
        </div>

        <div class="lg:col-span-7">
          <h3 class="font-display text-xs font-semibold uppercase tracking-[0.16em] text-orange-300">
            官方链接
          </h3>
          <ul class="mt-5 grid gap-px overflow-hidden rounded-card border border-navy-700 sm:grid-cols-2">
            <li
              v-for="(link, i) in [...SITE.links, ...CONTACT.officialLinks]"
              :key="i"
              class="bg-navy-800/50 p-4"
            >
              <a
                v-if="link.url"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex items-start justify-between gap-3"
              >
                <span class="min-w-0">
                  <span class="block text-sm font-medium text-white">{{ link.label }}</span>
                  <span v-if="link.note" class="mt-1 block text-xs leading-relaxed text-white/65">
                    <TbdText :text="link.note" label="链接说明" />
                  </span>
                </span>
                <ExternalLink
                  :size="14"
                  class="mt-0.5 shrink-0 text-white/60 transition-colors group-hover:text-orange-300"
                  aria-hidden="true"
                />
              </a>

              <!-- 链接未确认时保留占位，不做成死链 -->
              <span v-else class="flex items-start justify-between gap-3">
                <span class="min-w-0">
                  <span class="block text-sm font-medium text-white/80">{{ link.label }}</span>
                  <span class="mt-1 block text-xs leading-relaxed text-white/55">
                    <TbdText :text="link.note" label="链接说明" />
                  </span>
                </span>
                <span class="mt-0.5 shrink-0 text-[11px] text-white/55">链接待补充</span>
              </span>
            </li>
          </ul>

          <p class="mt-5 text-xs leading-relaxed text-white/60">
            外部链接均以新标签页打开。请勿在本页填写学生个人联系方式。
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
