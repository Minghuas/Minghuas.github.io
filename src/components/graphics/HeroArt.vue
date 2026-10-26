<script setup>
/**
 * HeroArt —— 首页首屏视觉
 *
 * 用抽象的芯片 / 存储层次 / 互连结构表达「体系结构」的学科属性，
 * 而不是使用来源不明的芯片或机房照片：
 *   - 图形为站点自有 SVG，不涉及任何版权与授权问题
 *   - 矢量绘制，任意分辨率下不模糊，也不会造成布局跳动
 *   - 不依赖网络请求，首屏不会因图片加载而闪动
 *
 * 动效：互连走线上的数据流为轻量虚线动画，系统开启
 *       「减少动态效果」时自动停止（见 style.css）。
 */
</script>

<template>
  <div class="relative">
    <!-- 极淡的径向底光，仅用于把主体从深色背景中托起 -->
    <div
      class="pointer-events-none absolute inset-0"
      style="
        background: radial-gradient(
          58% 50% at 50% 46%,
          rgba(174, 211, 239, 0.26) 0%,
          rgba(246, 103, 51, 0.08) 46%,
          transparent 72%
        );
      "
      aria-hidden="true"
    />

    <svg
      viewBox="0 0 600 440"
      class="relative w-full"
      role="img"
      aria-label="抽象的处理器芯片、存储层次与互连结构示意图"
    >
      <defs>
        <!-- 核心块的渐变，让大面积色块不生硬 -->
        <linearGradient id="hero-core" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#b3d6f0" stop-opacity="0.95" />
          <stop offset="100%" stop-color="#7db8e3" stop-opacity="0.7" />
        </linearGradient>
        <linearGradient id="hero-core-dim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#b3d6f0" stop-opacity="0.35" />
          <stop offset="100%" stop-color="#7db8e3" stop-opacity="0.18" />
        </linearGradient>
      </defs>

      <!-- ===== 存储层次：左右两列 ===== -->
      <g stroke="#d7e9f7" stroke-opacity="0.45" stroke-width="1.2" fill="none">
        <rect x="34" y="104" width="96" height="50" rx="3" />
        <rect x="34" y="170" width="96" height="50" rx="3" />
        <rect x="34" y="236" width="96" height="50" rx="3" />
        <rect x="470" y="104" width="96" height="50" rx="3" />
        <rect x="470" y="170" width="96" height="50" rx="3" />
        <rect x="470" y="236" width="96" height="50" rx="3" />
      </g>
      <!-- 存储体内部的 bank 分隔，暗示容量与层次 -->
      <g stroke="#d7e9f7" stroke-opacity="0.28" stroke-width="1">
        <path d="M50 116h64M50 129h64M50 142h64M34 129h96" />
        <path d="M50 182h64M50 195h64M50 208h64M34 195h96" />
        <path d="M50 248h64M50 261h64M50 274h64M34 261h96" />
        <path d="M486 116h64M486 129h64M486 142h64M470 129h96" />
        <path d="M486 182h64M486 195h64M486 208h64M470 195h96" />
        <path d="M486 248h64M486 261h64M486 274h64M470 261h96" />
      </g>

      <!-- ===== 主芯片 ===== -->
      <g>
        <!-- 封装基板 -->
        <rect
          x="176"
          y="76"
          width="248"
          height="248"
          rx="10"
          fill="#234e75"
          fill-opacity="0.55"
          stroke="#d7e9f7"
          stroke-opacity="0.55"
          stroke-width="1.4"
        />
        <!-- 内核阵列 3×3 -->
        <g>
          <rect x="200" y="100" width="56" height="56" rx="4" fill="url(#hero-core)" />
          <rect x="272" y="100" width="56" height="56" rx="4" fill="url(#hero-core-dim)" />
          <rect x="344" y="100" width="56" height="56" rx="4" fill="url(#hero-core-dim)" />

          <rect x="200" y="172" width="56" height="56" rx="4" fill="url(#hero-core-dim)" />
          <rect x="272" y="172" width="56" height="56" rx="4" fill="url(#hero-core)" />
          <rect x="344" y="172" width="56" height="56" rx="4" fill="url(#hero-core-dim)" />

          <rect x="200" y="244" width="56" height="56" rx="4" fill="url(#hero-core-dim)" />
          <rect x="272" y="244" width="56" height="56" rx="4" fill="url(#hero-core-dim)" />
          <rect x="344" y="244" width="56" height="56" rx="4" fill="url(#hero-core)" />
        </g>
        <!-- 内核之间的片上互连 -->
        <g stroke="#d7e9f7" stroke-opacity="0.4" stroke-width="1">
          <path d="M256 128h16M328 128h16M256 200h16M328 200h16M256 272h16M328 272h16" />
          <path d="M228 156v16M300 156v16M372 156v16M228 228v16M300 228v16M372 228v16" />
        </g>
      </g>

      <!-- ===== 芯片与存储之间的互连总线 ===== -->
      <g
        stroke="#f47b50"
        stroke-opacity="0.55"
        stroke-width="1.4"
        stroke-linecap="round"
        fill="none"
      >
        <path d="M130 129h46M130 195h46M130 261h46" />
        <path d="M424 129h46M424 195h46M424 261h46" />
      </g>
      <!-- 数据流：虚线动画 -->
      <g
        stroke="#f66733"
        stroke-opacity="0.95"
        stroke-width="2"
        stroke-linecap="round"
        fill="none"
      >
        <path class="flow-dash" d="M130 129h46" />
        <path class="flow-dash" d="M130 261h46" style="animation-delay: -0.8s" />
        <path class="flow-dash" d="M424 195h46" style="animation-delay: -1.6s" />
      </g>

      <!-- ===== 底部互连网络 / 集群 ===== -->
      <g stroke="#d7e9f7" stroke-opacity="0.35" stroke-width="1.2" fill="none">
        <!-- 主干 -->
        <path d="M48 380h504" />
        <!-- 芯片向下引出 -->
        <path d="M236 324v28M300 324v28M364 324v28" />
        <!-- 节点 -->
        <circle cx="120" cy="380" r="4.5" />
        <circle cx="300" cy="380" r="4.5" />
        <circle cx="480" cy="380" r="4.5" />
        <circle cx="48" cy="380" r="3" />
        <circle cx="552" cy="380" r="3" />
        <!-- 节点上行支线 -->
        <path d="M120 380v-38M480 380v-38" />
        <path d="M120 342h56M480 342h-56" />
      </g>
      <g fill="#f47b50" fill-opacity="0.85">
        <circle cx="120" cy="380" r="2.4" />
        <circle cx="300" cy="380" r="2.4" />
        <circle cx="480" cy="380" r="2.4" />
      </g>

      <!-- ===== 边角刻度：工程图纸的克制装饰 ===== -->
      <g stroke="#d7e9f7" stroke-opacity="0.3" stroke-width="1">
        <path d="M24 24h28M24 24v28" />
        <path d="M576 24h-28M576 24v28" />
        <path d="M24 416h28M24 416v-28" />
        <path d="M576 416h-28M576 416v-28" />
      </g>
    </svg>
  </div>
</template>
