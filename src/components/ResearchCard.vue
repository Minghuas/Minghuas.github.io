<script setup>
/**
 * ResearchCard —— 研究方向卡片
 * 用于首页「研究方向概览」。整卡可点击，跳转到研究方向页对应锚点。
 */
import { ArrowRight } from 'lucide-vue-next'
import IconByName from './IconByName.vue'
import TbdText from './TbdText.vue'

defineProps({
  direction: { type: Object, required: true },
  /** 序号，如 '01' */
  index: { type: String, default: '' },
})
</script>

<template>
  <RouterLink
    :to="{ path: '/research', hash: `#${direction.id}` }"
    class="group flex h-full flex-col rounded-card border border-line bg-paper p-5 transition-all duration-300 hover:border-accent-200 hover:shadow-card sm:p-6"
  >
    <div class="flex items-start justify-between gap-4">
      <span
        class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-hair border border-line bg-mist text-accent-600 transition-colors duration-300 group-hover:border-accent-200 group-hover:bg-accent-50"
      >
        <IconByName :name="direction.icon" :size="18" />
      </span>
      <span v-if="index" class="font-mono text-xs tabular text-ink-300">{{ index }}</span>
    </div>

    <h3
      class="mt-4 text-[1.05rem] font-semibold leading-snug text-ink-900 transition-colors group-hover:text-accent-700"
    >
      <TbdText :text="direction.title" label="研究方向名称" />
    </h3>

    <p class="mt-2.5 flex-1 text-sm leading-relaxed text-ink-600">
      <TbdText :text="direction.summary" label="方向概述" />
    </p>

    <!-- 技术关键词 -->
    <ul v-if="direction.keywords?.length" class="mt-4 flex flex-wrap gap-1.5">
      <li
        v-for="(kw, i) in direction.keywords.slice(0, 4)"
        :key="i"
        class="rounded-hair bg-mist-deep px-2 py-0.5 text-[11px] text-ink-500"
      >
        <TbdText :text="kw" label="关键词" />
      </li>
    </ul>

    <span
      class="mt-5 inline-flex items-center gap-1.5 border-t border-line-soft pt-4 text-sm font-medium text-accent-700"
    >
      查看研究详情
      <ArrowRight
        :size="15"
        class="transition-transform duration-300 group-hover:translate-x-1"
        aria-hidden="true"
      />
    </span>
  </RouterLink>
</template>
