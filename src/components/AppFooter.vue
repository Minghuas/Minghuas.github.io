<script setup>
/**
 * AppFooter —— 页脚
 *
 * 四栏结构：机构与团队标识 / 页面导航 / 官方链接 / 联系方式。
 * 底部说明列出内容来源页面，便于核对每条信息的出处。
 */
import { ExternalLink, Mail, MapPin } from 'lucide-vue-next'
import { NAV_ITEMS, SITE } from '@/data/site.js'
import TbdText from './TbdText.vue'

const hasContact = (v) => Boolean(v)
</script>

<template>
  <footer class="no-print mt-auto border-t border-line bg-paper text-ink-600">
    <div class="container-page py-12 lg:py-14">
      <div class="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <!-- 机构与团队 -->
        <div class="lg:col-span-4">
          <div class="flex items-start gap-3">
            <img
              src="/sysu-logo.png"
              alt="中山大学校徽"
              width="44"
              height="44"
              class="mt-0.5 h-11 w-11 shrink-0 rounded-full object-contain"
            />
            <div class="min-w-0">
              <p class="font-display text-base font-semibold text-ink-900">
                <TbdText :text="SITE.name" label="实验室名称" />
              </p>
              <p class="mt-1 text-sm text-ink-500">
                <TbdText :text="SITE.nameEn" label="实验室英文名" />
              </p>
            </div>
          </div>

          <p class="mt-5 max-w-sm text-sm leading-relaxed text-ink-600">
            <TbdText :text="SITE.description" label="站点简介" />
          </p>

          <p class="mt-5 border-l-2 border-orange-500 pl-3 text-sm italic text-ink-600">
            <TbdText :text="SITE.motto" label="团队格言" />
          </p>
        </div>

        <!-- 页面导航 -->
        <nav class="lg:col-span-2" aria-label="页脚导航">
          <h2 class="font-display text-xs font-semibold uppercase tracking-[0.14em] text-navy-700">
            页面导航
          </h2>
          <ul class="mt-4 space-y-2.5">
            <li v-for="item in NAV_ITEMS" :key="item.to">
              <RouterLink
                :to="item.to"
                class="text-sm text-ink-600 transition-colors hover:text-accent-500 hover:underline hover:underline-offset-4"
              >
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>

        <!-- 官方链接 -->
        <div class="lg:col-span-3">
          <h2 class="font-display text-xs font-semibold uppercase tracking-[0.14em] text-navy-700">
            官方链接
          </h2>
          <ul class="mt-4 space-y-2.5">
            <li v-for="link in SITE.links" :key="link.label">
              <a
                v-if="link.url"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="group inline-flex items-center gap-1.5 text-sm text-ink-600 transition-colors hover:text-accent-500"
              >
                <span>{{ link.label }}</span>
                <ExternalLink
                  :size="12"
                  class="opacity-0 transition-opacity group-hover:opacity-70"
                  aria-hidden="true"
                />
              </a>
              <span v-else class="tbd text-xs">{{ link.label }} · 链接待补充</span>
            </li>
          </ul>
        </div>

        <!-- 联系方式 -->
        <div class="lg:col-span-3">
          <h2 class="font-display text-xs font-semibold uppercase tracking-[0.14em] text-navy-700">
            联系方式
          </h2>

          <ul class="mt-4 space-y-3 text-sm">
            <li v-if="hasContact(SITE.contact.email)" class="flex items-start gap-2.5">
              <Mail :size="15" class="mt-1 shrink-0 text-accent-600" aria-hidden="true" />
              <a
                :href="`mailto:${SITE.contact.email}`"
                class="break-all text-ink-600 transition-colors hover:text-accent-500"
              >
                {{ SITE.contact.email }}
              </a>
            </li>
            <li v-else class="flex items-start gap-2.5">
              <Mail :size="15" class="mt-1 shrink-0 text-accent-600" aria-hidden="true" />
              <span class="tbd text-xs">联系邮箱待补充</span>
            </li>

            <li v-if="hasContact(SITE.contact.address)" class="flex items-start gap-2.5">
              <MapPin :size="15" class="mt-1 shrink-0 text-accent-600" aria-hidden="true" />
              <span class="text-ink-600">{{ SITE.contact.address }}</span>
            </li>
            <li v-else class="flex items-start gap-2.5">
              <MapPin :size="15" class="mt-1 shrink-0 text-accent-600" aria-hidden="true" />
              <span class="tbd text-xs">办公地址待补充</span>
            </li>
          </ul>

          <p class="mt-5 text-xs leading-relaxed text-ink-400">
            联系方式以官方页面公布的信息为准，本站不另行提供未公开的联系渠道。
          </p>
        </div>
      </div>

      <!-- 底部：版权与内容来源 -->
      <div class="mt-10 border-t border-line pt-6">
        <div class="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <p class="text-xs text-ink-500">
            © {{ new Date().getFullYear() }}
            <TbdText :text="SITE.name" label="实验室名称" />
            ·
            <TbdText :text="SITE.owner.affiliation" label="所属学院" />
            · 内容更新：<TbdText :text="SITE.lastUpdated" label="更新年月" />
          </p>

          <div class="max-w-2xl">
            <p class="text-xs text-ink-500">
              内容来源：
              <template v-for="(src, i) in SITE.sources" :key="i">
                <a
                  v-if="src.url"
                  :href="src.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-accent-500 underline decoration-accent-300 underline-offset-2 transition-colors hover:text-ink-900"
                  >{{ src.label }}</a
                ><span v-if="i < SITE.sources.length - 1" class="text-ink-400">、</span>
                <span v-else class="tbd text-[11px]">{{ src.label }}</span>
              </template>
            </p>
            <p class="mt-1.5 text-xs leading-relaxed text-ink-400">
              本站为学术展示站点。所有论文、荣誉、项目与成员信息均以官方页面为准，
              未确认内容以占位标记显示。
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
