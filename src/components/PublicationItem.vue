<script setup>
/**
 * PublicationItem —— 单条论文
 *
 * 排版规范（学术网站的信息密度）：
 *   标题 → 作者 → 发表载体与年份 → 荣誉标记 → 链接
 *
 * 链接策略：只在 link 确实存在时渲染 <a>；
 *   没有链接时显示一个不可点击的浅色提示，避免出现死链，
 *   也避免读者以为「这里应该有链接但坏了」。
 */
import { computed, ref } from 'vue'
import { Award, ChevronDown, ExternalLink, Link2Off } from 'lucide-vue-next'
import TbdText from './TbdText.vue'

const props = defineProps({
  pub: { type: Object, required: true },
  /**
   * 需要在作者列表中加粗强调的作者名（通常是团队负责人）。
   * 留空则不做任何强调。
   */
  emphasis: { type: String, default: '' },
  /** 内容尚未补齐时，显示「链接待补充」提示 */
  showMissingLinkHint: { type: Boolean, default: true },
})

/** 把作者列表按强调姓名切成片段，命中处加粗 */
const authorParts = computed(() => {
  const authors = props.pub.authors || ''
  if (!props.emphasis || !authors.includes(props.emphasis)) {
    return [{ text: authors, hit: false }]
  }
  return authors
    .split(props.emphasis)
    .flatMap((chunk, i) =>
      i === 0 ? [{ text: chunk, hit: false }] : [{ text: props.emphasis, hit: true }, { text: chunk, hit: false }],
    )
    .filter((p) => p.text !== '')
})

const venueLine = computed(() => {
  const parts = []
  if (props.pub.venue) parts.push(props.pub.venue)
  if (props.pub.acronym && props.pub.acronym !== props.pub.venue) parts.push(props.pub.acronym)
  return parts.join(' · ')
})

/**
 * 摘要默认折叠：
 *   论文数量多时展开全部摘要会让列表难以扫描，移动端尤其明显。
 *   需要看简介时再展开，兼顾信息完整与阅读密度。
 */
const abstractOpen = ref(false)
</script>

<template>
  <article class="group border-t border-line-soft py-5 first:border-t-0 first:pt-0">
    <div class="flex gap-4">
      <!-- 年份列：大屏下作为扫描锚点 -->
      <div class="hidden w-14 shrink-0 pt-0.5 lg:block">
        <span class="font-mono text-sm tabular text-ink-400">{{ pub.year ?? '——' }}</span>
      </div>

      <div class="min-w-0 flex-1">
        <!-- 标题 -->
        <h3 class="text-[0.98rem] font-semibold leading-relaxed text-ink-900">
          <a
            v-if="pub.link"
            :href="pub.link"
            target="_blank"
            rel="noopener noreferrer"
            class="pub-title-link inline-flex items-start gap-1.5"
          >
            <span><TbdText :text="pub.title" label="论文标题" /></span>
            <ExternalLink
              :size="13"
              class="mt-1.5 shrink-0 text-ink-300 transition-colors group-hover:text-accent-600"
              aria-hidden="true"
            />
          </a>
          <TbdText v-else :text="pub.title" label="论文标题" />
        </h3>

        <!-- 作者 -->
        <p class="mt-1.5 text-sm leading-relaxed text-ink-600">
          <template v-for="(part, i) in authorParts" :key="i">
            <strong v-if="part.hit" class="font-semibold text-ink-900">{{ part.text }}</strong>
            <span v-else><TbdText :text="part.text" label="作者列表" /></span>
          </template>
        </p>

        <!-- 发表载体 -->
        <p v-if="venueLine" class="mt-1 text-sm italic leading-relaxed text-ink-500">
          <TbdText :text="venueLine" label="会议或期刊" />
        </p>

        <!-- 荣誉标记 -->
        <p
          v-if="pub.award"
          class="mt-2.5 inline-flex items-center gap-1.5 rounded-hair border border-gold-600/30 bg-gold-100 px-2 py-1 text-xs font-medium text-gold-700"
        >
          <Award :size="12" aria-hidden="true" />
          <TbdText :text="pub.award" label="论文荣誉" />
        </p>

        <!-- 链接区 -->
        <div class="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
          <!-- 摘要展开/收起 -->
          <button
            type="button"
            class="inline-flex items-center gap-1 rounded-hair px-1.5 py-0.5 font-medium text-ink-500 transition-colors hover:bg-mist hover:text-ink-800"
            :aria-expanded="abstractOpen"
            @click="abstractOpen = !abstractOpen"
          >
            摘要
            <ChevronDown
              :size="12"
              class="transition-transform duration-200"
              :class="abstractOpen ? 'rotate-180' : ''"
              aria-hidden="true"
            />
          </button>

          <template v-if="pub.link">
            <a
              :href="pub.link"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1 font-medium text-accent-700 transition-colors hover:text-accent-600"
            >
              原文
              <ExternalLink :size="11" aria-hidden="true" />
            </a>
          </template>
          <span
            v-else-if="showMissingLinkHint"
            class="inline-flex items-center gap-1 text-ink-400"
            title="官方来源未提供该论文的公开链接"
          >
            <Link2Off :size="11" aria-hidden="true" />
            <span class="tbd text-[11px]">原文链接待补充</span>
          </span>
        </div>

        <!-- 摘要简介：默认折叠 -->
        <div v-if="abstractOpen" class="mt-3 rounded-card border border-line-soft bg-mist px-3.5 py-3">
          <p class="text-xs font-medium uppercase tracking-[0.1em] text-ink-400">摘要简介</p>
          <p class="mt-1.5 text-sm leading-[1.8] text-ink-600">
            <TbdText :text="pub.abstract" label="摘要简介" block />
          </p>
        </div>
      </div>
    </div>
  </article>
</template>
