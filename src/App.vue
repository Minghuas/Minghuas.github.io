<script setup>
import { computed, defineAsyncComponent, nextTick, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppTopbar from '@/components/AppTopbar.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppFooter from '@/components/AppFooter.vue'
import BackToTop from '@/components/BackToTop.vue'
import { SITE } from '@/data/site.js'

/** 内容占位统计浮标按需加载，避免其数据扫描进入首屏包 */
const ContentAudit = defineAsyncComponent(() => import('@/components/ContentAudit.vue'))

const route = useRoute()
const mainRef = ref(null)

/** 站点标题：页面标题 + 站点名 */
const documentTitle = computed(() => {
  const page = route.meta?.title
  const site = `${SITE.name}`
  return page && page !== '首页' ? `${page} | ${site}` : site
})

function applyHead() {
  document.title = documentTitle.value
  const desc = route.meta?.description
  if (desc) {
    let tag = document.querySelector('meta[name="description"]')
    if (!tag) {
      tag = document.createElement('meta')
      tag.setAttribute('name', 'description')
      document.head.appendChild(tag)
    }
    tag.setAttribute('content', desc)
  }
}

/**
 * 路由切换后：
 *  1. 同步页面标题与描述
 *  2. 把键盘焦点移回主内容区，便于屏幕阅读器与键盘用户感知页面已切换
 */
watch(
  () => route.fullPath,
  async () => {
    applyHead()
    await nextTick()
    if (mainRef.value && route.name !== 'home') {
      mainRef.value.focus({ preventScroll: true })
    }
  },
)

onMounted(applyHead)
</script>

<template>
  <div class="flex min-h-screen flex-col bg-paper">
    <!-- 键盘用户跳过导航，直达正文 -->
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-hair focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
    >
      跳到主要内容
    </a>

    <AppTopbar />

    <!--
      版式：左侧栏 + 右内容栏。
      layout-with-sidebar 让内容栏内的 .container-page 不再居中（见 style.css），
      从而由侧栏与内容栏共同构成唯一的页面栅格。
      页脚放在内容栏内部，使侧栏能够贯穿整个页面高度。
      这一层不做 max-width 居中：左侧栏贴住视口左边缘，超宽屏多出来的宽度
      全部留给内容栏，由 .container-page 的内边距控制正文不至于贴边。
    -->
    <div class="layout-with-sidebar flex w-full flex-1 items-stretch">
      <AppSidebar />

      <div class="flex min-w-0 flex-1 flex-col">
        <main id="main" ref="mainRef" tabindex="-1" class="flex-1 outline-none">
          <RouterView v-slot="{ Component }">
            <Transition name="page" mode="out-in">
              <component :is="Component" />
            </Transition>
          </RouterView>
        </main>

        <AppFooter />
      </div>
    </div>

    <BackToTop />
    <ContentAudit />
  </div>
</template>

<style scoped>
/* 页面切换：轻量的淡入 + 微位移，不做花哨转场。
   采用 out-in 模式，离场与入场各 150ms，整次切页约 300ms。 */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.page-leave-to {
  opacity: 0;
  transform: translateY(-3px);
}
@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: none;
  }
  .page-enter-from,
  .page-leave-to {
    transform: none;
  }
}
</style>
