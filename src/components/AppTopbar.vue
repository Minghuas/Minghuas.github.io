<script setup>
/**
 * AppTopbar —— 精简顶部栏
 *
 * 版式分工：
 *   顶部栏只负责站点标识与移动端导航入口；
 *   桌面端的一级导航全部交给左侧栏（AppSidebar.vue），此处不重复。
 *
 * 移动端因为没有左侧栏，导航收纳为抽屉：
 *   点击「菜单」展开、Esc 或点击遮罩关闭、切换路由自动关闭、打开时锁定页面滚动。
 */
import { onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronRight, Menu, X } from 'lucide-vue-next'
import { NAV_ITEMS, SITE } from '@/data/site.js'
import TbdText from './TbdText.vue'

const route = useRoute()

const menuOpen = ref(false)

const isActive = (item) => route.meta?.match === item.match

function closeMenu() {
  menuOpen.value = false
}

function onKeydown(event) {
  if (event.key === 'Escape') closeMenu()
}

watch(menuOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) document.addEventListener('keydown', onKeydown)
  else document.removeEventListener('keydown', onKeydown)
})

watch(() => route.fullPath, closeMenu)

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  document.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <header
    class="no-print sticky top-0 z-50 border-b-[6px] border-orange-500 bg-navy-900"
  >
    <!-- 通栏：站点标识的左内边距与左侧栏一致，两者左边缘对齐 -->
    <div class="w-full px-5 sm:px-8 lg:px-10">
      <div class="flex h-14 items-center justify-between gap-3 sm:h-16 sm:gap-6">
        <!-- 机构与团队标识：官方校徽 + 学校名 + 团队名 -->
        <RouterLink
          to="/"
          class="group flex min-w-0 items-center gap-3"
          :aria-label="`返回首页 · ${SITE.name}`"
        >
          <img
            src="/sysu-logo.png"
            alt="中山大学校徽"
            width="46"
            height="46"
            class="h-9 w-9 shrink-0 rounded-full bg-white object-contain p-0.5 ring-1 ring-white/25 transition-transform duration-300 group-hover:scale-[1.04] sm:h-11 sm:w-11"
          />
          <span class="flex min-w-0 flex-col leading-tight">
            <!-- 移动端只保留一行校名，避免窄屏折行把顶栏撑高 -->
            <span
              class="truncate font-display text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-white/65 sm:text-[0.64rem] sm:tracking-[0.18em]"
            >
              Sun Yat-sen University
              <span class="mx-1 hidden text-white/35 sm:inline" aria-hidden="true">/</span>
              <span class="hidden sm:inline">中山大学</span>
            </span>
            <span
              class="mt-0.5 flex min-w-0 items-baseline gap-1.5 font-display text-[0.9rem] font-semibold tracking-tight text-white sm:text-[1.1rem]"
            >
              <!-- 窄屏仅显示实验室名，学院名在首屏与侧栏中仍有呈现 -->
              <span class="hidden shrink-0 sm:inline">
                <TbdText :text="SITE.owner.affiliation" label="所属学院" />
              </span>
              <span class="mx-0.5 hidden shrink-0 font-normal text-white/40 sm:inline" aria-hidden="true">/</span>
              <span class="min-w-0 truncate">
                <TbdText :text="SITE.name" label="实验室名称" />
              </span>
            </span>
          </span>
        </RouterLink>

        <!-- 移动端导航开关（桌面端导航在侧栏） -->
        <button
          type="button"
          class="inline-flex shrink-0 items-center gap-1.5 rounded-hair border border-white/35 px-2.5 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 lg:hidden"
          :aria-expanded="menuOpen"
          :aria-label="menuOpen ? '关闭导航菜单' : '打开导航菜单'"
          aria-controls="mobile-nav"
          @click="menuOpen = !menuOpen"
        >
          <component :is="menuOpen ? X : Menu" :size="17" aria-hidden="true" />
          <!-- 极窄屏（<360px）只留图标，把宽度让给站名 -->
          <span class="hidden min-[360px]:inline">{{ menuOpen ? '关闭' : '菜单' }}</span>
        </button>
      </div>
    </div>

  </header>

  <!--
    移动端导航抽屉。
    必须是 header 的兄弟节点而不是子节点：header 上的 backdrop-blur 会成为
    position: fixed 元素的包含块，放进去会使抽屉相对顶栏定位而不是相对视口。
  -->
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 -translate-y-2"
    leave-active-class="transition duration-150 ease-in"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <div
      v-if="menuOpen"
      id="mobile-nav"
      class="no-print fixed left-0 right-0 bottom-0 top-14 z-40 border-t border-line bg-paper lg:hidden sm:top-16"
    >
      <nav class="h-full overflow-y-auto px-5 py-4 sm:px-8" aria-label="移动端主导航">
        <ul class="divide-y divide-line-soft">
          <li v-for="item in NAV_ITEMS" :key="item.to">
            <RouterLink
              :to="item.to"
              class="flex items-center justify-between px-1 py-3.5 font-display text-base font-semibold tracking-wide transition-colors"
              :class="isActive(item) ? 'text-plum-700' : 'text-ink-700'"
              :aria-current="isActive(item) ? 'page' : undefined"
            >
              <span class="flex items-center gap-2.5">
                <span
                  class="h-1.5 w-1.5 rounded-full"
                  :class="isActive(item) ? 'bg-orange-500' : 'bg-transparent'"
                  aria-hidden="true"
                />
                {{ item.label }}
              </span>
              <ChevronRight :size="16" class="text-ink-300" aria-hidden="true" />
            </RouterLink>
          </li>
        </ul>

        <!-- 官方链接：移动端放在抽屉里，桌面端由页脚承载 -->
        <div class="mt-5 border-t border-line pt-5">
          <p class="eyebrow mb-2.5">官方链接</p>
          <ul class="flex flex-wrap gap-2">
            <li v-for="link in SITE.links" :key="link.label">
              <a
                v-if="link.url"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center rounded-hair border border-line px-2.5 py-1.5 text-xs text-ink-600 transition-colors hover:border-accent-300 hover:text-accent-500"
              >
                {{ link.label }}
              </a>
              <span v-else class="tbd inline-flex items-center px-2.5 py-1.5 text-xs"
                >{{ link.label }} · 链接待补充</span
              >
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </Transition>
</template>
