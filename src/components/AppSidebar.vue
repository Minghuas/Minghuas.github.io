<script setup>
/**
 * AppSidebar —— 左侧主导航
 *
 * 桌面端（lg 及以上）常驻的纵向导航，承载全站一级入口。
 * 移动端不渲染本组件，导航改为 AppTopbar 中的抽屉 —— 避免窄屏下侧栏挤占正文。
 *
 * 版式考虑：
 *   - 侧栏整列铺一层比正文底色略深的淡蓝（mist-deep），即使用户停留的页面
 *     只有 6 个条目，整列也读作一块贯穿页面高度的导航面，而不是一片空白；
 *   - 条目占满整列宽度（含内边距的通栏点击区），字号与行高按主导航的规格给足，
 *     避免出现「字小、点击区窄」的次要导航观感；
 *   - 当前页用白色底 + 左侧色条区分，靠的是明度差，因此在深浅两种分区底色上
 *     都能读出层级。
 *
 * 状态表达：
 *   当前页同时使用「左侧色条 + 白色底 + 加粗」三重标记，
 *   并设置 aria-current="page"，保证不只靠颜色区分。
 */
import { useRoute } from 'vue-router'
import { ChevronRight } from 'lucide-vue-next'
import { NAV_ITEMS } from '@/data/site.js'

const route = useRoute()

const isActive = (item) => route.meta?.match === item.match
</script>

<template>
  <aside
    class="no-print hidden w-60 shrink-0 border-r border-line bg-mist-deep lg:block xl:w-72"
    aria-label="侧边导航"
  >
    <!-- 吸顶高度与顶部栏一致：h-14 / sm:h-16 -->
    <div
      class="sticky top-14 max-h-[calc(100vh-3.5rem)] overflow-y-auto py-8 pr-4 pl-5 sm:top-16 sm:max-h-[calc(100vh-4rem)] sm:pl-8 lg:pl-10 lg:pr-5"
    >
      <h2 class="font-display text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-navy-700">
        Navigation
      </h2>
      <span class="mt-2.5 block h-[3px] w-9 bg-orange-500" aria-hidden="true" />

      <nav class="mt-5">
        <ul class="space-y-1.5">
          <li v-for="item in NAV_ITEMS" :key="item.to">
            <RouterLink
              :to="item.to"
              class="group flex items-center justify-between gap-3 rounded-r-hair border-l-[3px] px-3.5 py-3 font-display text-[1.0625rem] leading-snug tracking-wide transition-colors"
              :class="
                isActive(item)
                  ? 'border-orange-500 bg-paper font-semibold text-plum-700'
                  : 'border-transparent font-medium text-ink-700 hover:border-line-cool hover:bg-paper/70 hover:text-navy-700'
              "
              :aria-current="isActive(item) ? 'page' : undefined"
            >
              <span>{{ item.label }}</span>
              <ChevronRight
                :size="16"
                class="shrink-0 transition-opacity"
                :class="
                  isActive(item)
                    ? 'text-orange-500'
                    : 'text-ink-400 opacity-0 group-hover:opacity-100'
                "
                aria-hidden="true"
              />
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </aside>
</template>
