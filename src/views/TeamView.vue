<script setup>
/**
 * TeamView —— 团队成员
 *
 * 页面结构：
 *   1. 团队介绍（定位、理念）
 *   2. 导师单独展示（信息量最大，不与学生卡片混排）
 *   3. 按类别分组的成员网格（博士后 / 博士生 / 硕士生 / 本科生 / 已毕业）
 *   4. 团队理念收尾
 *
 * 隐私约束：
 *   - 姓名、身份、研究方向必须来自官方公开页面，不得凭推测填写。
 *   - 学生个人联系方式不在此页展示。
 *   - 照片必须已获授权或来自官方公开渠道；photo 为空时使用统一的中性占位。
 */
import { computed, ref } from 'vue'
import { ExternalLink, RotateCcw, Users } from 'lucide-vue-next'

import PageHero from '@/components/PageHero.vue'
import SectionHeader from '@/components/SectionHeader.vue'
import FilterPills from '@/components/FilterPills.vue'
import MemberCard from '@/components/MemberCard.vue'
import InfoCard from '@/components/InfoCard.vue'
import EmptyState from '@/components/EmptyState.vue'
import TbdText from '@/components/TbdText.vue'

import { MEMBERS, MEMBER_ROLES, MEMBER_COUNTS } from '@/data/members.js'
import { TEAM_INTRO } from '@/data/philosophy.js'

/* ============ 筛选 ============ */
const role = ref('all')
const interest = ref('all')

const roleOptions = computed(() =>
  MEMBER_ROLES.map((r) => ({ ...r, count: MEMBER_COUNTS[r.key] || 0 })),
)

/** 研究兴趣维度的选项由成员数据实时汇总，避免在视图里写死关键词 */
const interestOptions = computed(() => {
  const counts = new Map()
  for (const m of MEMBERS) {
    for (const tag of m.interests || []) counts.set(tag, (counts.get(tag) || 0) + 1)
  }
  return [...counts.entries()]
    .map(([key, count]) => ({ key, label: key, count }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key))
})

const hasFilter = computed(() => role.value !== 'all' || interest.value !== 'all')

const filtered = computed(() =>
  MEMBERS.filter((m) => role.value === 'all' || m.role === role.value).filter(
    (m) => interest.value === 'all' || (m.interests || []).includes(interest.value),
  ),
)

/* ============ 分组 ============ */

/** 导师单独成块：信息量最大，需要独立版式 */
const advisors = computed(() => filtered.value.filter((m) => m.role === 'faculty'))

/** 其余成员按角色分组，空组不渲染 */
const groups = computed(() =>
  MEMBER_ROLES.filter((r) => r.key !== 'faculty')
    .map((r) => ({ ...r, items: filtered.value.filter((m) => m.role === r.key) }))
    .filter((g) => g.items.length > 0),
)

function clearAll() {
  role.value = 'all'
  interest.value = 'all'
}

const totalCount = computed(() => MEMBERS.length)
</script>

<template>
  <div>
    <PageHero
      eyebrow="Team"
      title="团队成员"
      title-label="成员页标题"
      lead="导师、博士后、研究生与本科生组成的科研团队。"
    >
      <dl class="flex flex-wrap items-center gap-x-10 gap-y-5">
        <div>
          <dt class="text-xs uppercase tracking-[0.1em] text-ink-400">成员总数</dt>
          <dd class="mt-1 font-display text-2xl tabular text-ink-900">{{ totalCount }}</dd>
        </div>
        <div v-for="r in MEMBER_ROLES" :key="r.key">
          <dt class="text-xs uppercase tracking-[0.1em] text-ink-400">{{ r.label }}</dt>
          <dd class="mt-1 font-display text-2xl tabular text-ink-900">{{ MEMBER_COUNTS[r.key] || 0 }}</dd>
        </div>
      </dl>
    </PageHero>

    <!-- ===================== 1. 团队介绍 ===================== -->
    <section class="border-b border-line bg-paper py-16 sm:py-20">
      <div class="container-page">
        <div class="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div class="lg:col-span-5">
            <SectionHeader
              eyebrow="About the Group"
              :title="TEAM_INTRO.title"
              title-label="团队介绍标题"
              :ruled="false"
              :description="TEAM_INTRO.lead"
            />
            <div class="mt-6 space-y-4 text-[0.95rem] leading-[1.85] text-ink-600">
              <p v-for="(para, i) in TEAM_INTRO.paragraphs" :key="i">
                <TbdText :text="para" :label="`团队介绍段落 ${i + 1}`" block />
              </p>
            </div>
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

    <!-- ===================== 2. 筛选 ===================== -->
    <section class="no-print border-b border-line bg-mist">
      <div class="container-page py-8">
        <div class="grid gap-7 lg:grid-cols-12 lg:gap-10">
          <div class="lg:col-span-5">
            <FilterPills v-model="role" label="成员类别" :options="roleOptions" all-label="全部成员" />
          </div>

          <div v-if="interestOptions.length > 1" class="lg:col-span-7">
            <FilterPills
              v-model="interest"
              label="研究兴趣"
              :options="interestOptions"
              all-label="全部兴趣"
            />
          </div>
        </div>

        <div class="mt-5 flex flex-wrap items-center gap-4">
          <p class="font-mono text-xs text-ink-500" aria-live="polite">
            当前显示 {{ filtered.length }} 位成员
          </p>
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
    </section>

    <!-- ===================== 3. 导师 ===================== -->
    <section v-if="advisors.length" class="border-b border-line bg-paper py-14 sm:py-16">
      <div class="container-page">
        <h2 class="eyebrow">Advisor</h2>

        <div
          v-for="person in advisors"
          :key="person.id"
          class="mt-6 grid gap-8 rounded-card border border-line bg-mist p-6 sm:p-8 lg:grid-cols-12 lg:gap-12"
        >
          <!-- 肖像区：无授权照片时统一使用中性占位 -->
          <div class="lg:col-span-3">
            <div
              class="flex aspect-[4/5] w-full max-w-[15rem] items-center justify-center rounded-card border border-dashed border-line bg-paper"
            >
              <div class="px-4 text-center">
                <Users :size="26" class="mx-auto text-ink-300" aria-hidden="true" />
                <p class="mt-2.5 text-xs leading-relaxed text-ink-400">
                  照片待补充<br />
                  需为已授权或官方公开的照片
                </p>
              </div>
            </div>
          </div>

          <div class="lg:col-span-9">
            <h3 class="text-xl font-semibold leading-snug text-ink-900 sm:text-2xl">
              <TbdText :text="person.name" label="导师姓名" />
            </h3>
            <p class="mt-1.5 text-sm uppercase tracking-[0.08em] text-ink-400">
              <TbdText :text="person.nameEn" label="姓名拼音" />
            </p>
            <p class="mt-3 text-[0.95rem] text-ink-700">
              <TbdText :text="person.cohort" label="职称与导师身份" />
            </p>

            <p class="mt-5 max-w-2xl text-[0.95rem] leading-[1.85] text-ink-600">
              <TbdText :text="person.bio" label="导师个人简介" block />
            </p>

            <div v-if="person.interests?.length" class="mt-6">
              <h4 class="text-xs font-semibold uppercase tracking-[0.12em] text-ink-400">
                研究兴趣
              </h4>
              <ul class="mt-3 flex flex-wrap gap-1.5">
                <li
                  v-for="(tag, i) in person.interests"
                  :key="i"
                  class="rounded-hair border border-line bg-paper px-2.5 py-1 text-xs text-ink-600"
                >
                  <TbdText :text="tag" label="研究兴趣" />
                </li>
              </ul>
            </div>

            <div class="mt-6 flex flex-wrap items-center gap-3">
              <a
                v-if="person.homepage"
                :href="person.homepage"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1.5 rounded-hair border border-line bg-paper px-3.5 py-2 text-sm font-medium text-accent-700 transition-colors hover:border-accent-300 hover:bg-accent-50"
              >
                个人主页
                <ExternalLink :size="12" aria-hidden="true" />
              </a>
              <span v-else class="tbd rounded-hair px-3 py-2 text-sm">个人主页待补充</span>

              <RouterLink
                to="/join"
                class="inline-flex items-center gap-1.5 rounded-hair px-2 py-2 text-sm font-medium text-accent-700 transition-colors hover:text-accent-600"
              >
                招生与联系方式
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===================== 4. 成员分组 ===================== -->
    <section class="bg-paper py-14 sm:py-16">
      <div class="container-page">
        <template v-if="groups.length">
          <div
            v-for="group in groups"
            :key="group.key"
            class="border-b border-line py-10 first:pt-0 last:border-b-0"
          >
            <h2 class="flex items-baseline gap-3">
              <span class="text-xl font-semibold text-ink-900 sm:text-[1.35rem]">
                {{ group.label }}
              </span>
              <span class="font-mono text-xs tabular text-ink-400">{{ group.items.length }} 位</span>
            </h2>

            <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <MemberCard
                v-for="(member, i) in group.items"
                :key="member.id"
                v-reveal="{ delay: Math.min(i, 5) * 50 }"
                :member="member"
              />
            </div>
          </div>
        </template>

        <EmptyState
          v-else
          title="没有符合条件的成员"
          hint="该类别与研究兴趣的组合下没有成员，可以放宽筛选条件。"
          @clear="clearAll"
        />
      </div>
    </section>

    <!-- ===================== 5. 说明 ===================== -->
    <section class="border-t border-line bg-mist py-10">
      <div class="container-page">
        <p class="max-w-3xl text-xs leading-relaxed text-ink-500">
          关于成员信息：姓名、身份、研究方向与个人主页均待补充，请在
          <code class="font-mono text-[11px] text-ink-600">src/data/members.js</code>
          中按字段填写。照片仅在已获授权或已在官方页面公开时使用，
          其余情况一律保留统一的中性占位；学生个人联系方式不在本站收录。
        </p>
      </div>
    </section>
  </div>
</template>
