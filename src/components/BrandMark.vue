<script setup>
/**
 * BrandMark —— 站点标识图形
 *
 * 用抽象芯片图形表达「体系结构」的学科属性，使用 currentColor 描边，
 * 因此可直接继承父级文字颜色，在浅色/深色底上都成立。
 *
 * 说明：这是站点自有图形，不是任何机构的官方校徽或受保护标识。
 */
defineProps({
  /** 图形尺寸（宽高一致） */
  size: { type: [Number, String], default: 40 },
})
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 48 48"
    fill="none"
    role="img"
    aria-hidden="true"
    focusable="false"
  >
    <!-- 芯片外形 -->
    <rect
      x="11"
      y="11"
      width="26"
      height="26"
      rx="2.5"
      stroke="currentColor"
      stroke-width="2"
      opacity="0.55"
    />
    <!-- 内核分区 -->
    <rect x="16" y="16" width="7" height="6" fill="currentColor" opacity="0.9" />
    <rect x="25" y="16" width="7" height="6" fill="currentColor" opacity="0.45" />
    <rect x="16" y="25" width="16" height="7" fill="currentColor" opacity="0.45" />
    <!-- 引脚 -->
    <g stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="0.55">
      <path d="M18 11V6" />
      <path d="M24 11V6" />
      <path d="M30 11V6" />
      <path d="M18 37v5" />
      <path d="M24 37v5" />
      <path d="M30 37v5" />
      <path d="M11 18H6" />
      <path d="M11 24H6" />
      <path d="M37 18h5" />
      <path d="M37 24h5" />
    </g>
  </svg>
</template>
