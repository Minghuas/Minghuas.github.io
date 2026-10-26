<script setup>
/**
 * MemberCard —— 成员卡片
 *
 * 头像策略：只有拿到已授权 / 官方公开的照片才显示图片。
 *   照片缺失时使用统一的字母中性占位，绝不使用他人照片顶替。
 */
import { computed } from 'vue'
import { ExternalLink, GraduationCap, UserRound } from 'lucide-vue-next'
import TbdText from './TbdText.vue'

const props = defineProps({
  member: { type: Object, required: true },
})

/** 从姓名中取可用于首字母占位的字符；占位姓名则返回空 */
const monogram = computed(() => {
  const name = props.member.name || ''
  if (!name || name.includes('待补充')) return ''
  // 中文取姓，英文取首字母
  if (/[一-龥]/.test(name)) return name.slice(0, 1)
  return name.trim().slice(0, 1).toUpperCase()
})

/**
 * 依据姓名生成稳定的浅色底，避免同一批卡片颜色杂乱。
 * 取自参考站点的蓝 / 紫 / 橙 / 暖黄体系，全部为低饱和浅色。
 */
const TINTS = [
  'bg-accent-50 text-accent-700',
  'bg-mist-deep text-ink-700',
  'bg-plum-100 text-plum-700',
  'bg-gold-100 text-gold-700',
  'bg-orange-50 text-orange-700',
]

const tint = computed(() => {
  const key = props.member.name || props.member.id || ''
  let hash = 0
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0
  return TINTS[hash % TINTS.length]
})
</script>

<template>
  <article
    class="flex h-full flex-col rounded-card border border-line bg-paper p-5 transition-all duration-300 hover:border-accent-200 hover:shadow-card"
  >
    <div class="flex items-start gap-4">
      <!-- 头像 / 中性占位 -->
      <div class="shrink-0">
        <img
          v-if="member.photo"
          :src="member.photo"
          :alt="`${member.name} 的照片`"
          width="56"
          height="56"
          loading="lazy"
          decoding="async"
          class="h-14 w-14 rounded-full object-cover object-center"
        />
        <div
          v-else
          class="flex h-14 w-14 items-center justify-center rounded-full border border-line"
          :class="tint"
          aria-hidden="true"
        >
          <span v-if="monogram" class="font-display text-lg leading-none">{{ monogram }}</span>
          <UserRound v-else :size="19" />
        </div>
      </div>

      <div class="min-w-0 flex-1">
        <h3 class="text-[1.02rem] font-semibold leading-snug text-ink-900">
          <TbdText :text="member.name" label="成员姓名" />
        </h3>
        <p v-if="member.cohort" class="mt-0.5 text-sm text-ink-500">
          <TbdText :text="member.cohort" label="年级或身份" />
        </p>

        <p
          v-if="member.coAdvise"
          class="mt-1.5 inline-flex items-center gap-1 rounded-hair bg-mist-deep px-1.5 py-0.5 text-[11px] text-ink-500"
        >
          <TbdText :text="member.coAdvise" label="联合指导说明" />
        </p>
      </div>
    </div>

    <!-- 简介 -->
    <p v-if="member.bio" class="mt-4 text-sm leading-relaxed text-ink-600">
      <TbdText :text="member.bio" label="个人简介" />
    </p>

    <!-- 研究兴趣 -->
    <ul v-if="member.interests?.length" class="mt-3.5 flex flex-wrap gap-1.5">
      <li
        v-for="(tag, i) in member.interests"
        :key="i"
        class="rounded-hair border border-line px-2 py-0.5 text-[11px] text-ink-500"
      >
        <TbdText :text="tag" label="研究兴趣" />
      </li>
    </ul>

    <!-- 已毕业成员的毕业去向 -->
    <p
      v-if="member.destination"
      class="mt-4 flex items-start gap-1.5 border-t border-line-soft pt-3.5 text-sm text-ink-600"
    >
      <GraduationCap :size="14" class="mt-0.5 shrink-0 text-ink-400" aria-hidden="true" />
      <span>毕业去向：<TbdText :text="member.destination" label="毕业去向" /></span>
    </p>

    <!-- 个人主页 -->
    <div v-if="member.homepage" class="mt-auto pt-4">
      <a
        :href="member.homepage"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 text-sm font-medium text-accent-700 transition-colors hover:text-accent-600"
      >
        个人主页
        <ExternalLink :size="12" aria-hidden="true" />
      </a>
    </div>
    <p v-else class="mt-auto pt-4 text-xs text-ink-400">
      <span class="tbd text-[11px]">个人主页待补充</span>
    </p>
  </article>
</template>
