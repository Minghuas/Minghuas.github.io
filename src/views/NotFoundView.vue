<script setup>
/**
 * NotFoundView —— 404
 *
 * 设计原则：不把用户丢在一个只有「返回首页」的空白页上，
 * 而是直接给出站点的完整目录，让访问者能立刻找到目标页面。
 */
import { ArrowLeft, Home } from 'lucide-vue-next'
import { NAV_ITEMS } from '@/data/site.js'
</script>

<template>
  <div class="container-page">
    <div class="flex min-h-[62vh] flex-col justify-center py-20">
      <p class="font-display text-6xl leading-none text-ink-200 tabular sm:text-7xl">404</p>

      <h1 class="mt-6 text-2xl leading-snug text-plum-700 sm:text-[1.75rem]">
        没有找到这个页面
      </h1>

      <p class="measure mt-4 text-[0.95rem] leading-relaxed text-ink-600">
        你访问的地址可能已经变更或被移除。可以从下面的入口继续浏览，
        或者返回首页重新开始。
      </p>

      <div class="mt-8 flex flex-wrap items-center gap-3">
        <RouterLink
          to="/"
          class="inline-flex items-center gap-2 rounded-hair bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
        >
          <Home :size="15" aria-hidden="true" />
          返回首页
        </RouterLink>

        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-hair border border-line bg-paper px-5 py-2.5 text-sm font-semibold text-ink-700 transition-colors hover:border-accent-300 hover:bg-accent-50 hover:text-accent-700"
          @click="$router.back()"
        >
          <ArrowLeft :size="15" aria-hidden="true" />
          返回上一页
        </button>
      </div>

      <!-- 站点目录：把 404 变成导航入口 -->
      <nav class="mt-14 border-t border-line pt-8" aria-label="站点目录">
        <h2 class="eyebrow">站点导航</h2>
        <ul class="mt-5 grid gap-px overflow-hidden rounded-card border border-line sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="item in NAV_ITEMS" :key="item.to" class="bg-paper">
            <RouterLink
              :to="item.to"
              class="group flex items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-mist"
            >
              <span class="text-[0.95rem] font-medium text-ink-800">{{ item.label }}</span>
              <span
                class="font-mono text-xs text-ink-300 transition-colors group-hover:text-accent-600"
                aria-hidden="true"
                >→</span
              >
            </RouterLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
