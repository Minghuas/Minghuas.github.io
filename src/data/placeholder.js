/**
 * 占位符约定 — src/data/placeholder.js
 *
 * 当前阶段：框架先行，所有「实际内容」一律使用可见占位标记，方便逐块替换。
 *
 * 约定：
 *   1. 单一字段缺失 → 使用 `tbd('说明')`，界面上会渲染成醒目的待补充标记。
 *   2. 列表整体缺失 → 使用空数组 []，界面会渲染成「待补充区块」。
 *   3. 数字型统计缺失 → 使用 null，界面不显示数字，只显示占位标记。
 *   4. 外部链接缺失 → 使用空字符串 ''，界面不渲染 <a>，只显示不可点击的占位标记。
 *
 * 替换方式：把 TBD 标记换成真实内容即可，无需改动任何组件。
 * 校验方式：开发环境下运行 `npm run check:content`，会列出所有仍为占位的字段。
 */

/** 通用占位标记 */
export const TBD = '【待补充】'

/**
 * 带说明的占位标记，例：tbd('会议全称') → 「【待补充：会议全称】」
 * @param {string} [label] 该字段的说明，便于替换时定位
 */
export function tbd(label) {
  return label ? `【待补充：${label}】` : TBD
}

/**
 * 判断一个值是否为占位内容（用于界面样式与内容校验）
 * @param {unknown} value
 */
export function isTbd(value) {
  return typeof value === 'string' && value.includes('待补充')
}

/** 判断数组中是否存在占位内容 */
export function hasTbd(list) {
  return Array.isArray(list) && list.some((item) => isTbd(item))
}

/**
 * 数字统计的占位标记。数字缺失时不要填 0，0 会被误读为「确实为零」。
 */
export const TBD_NUMBER = null

/** 占位条目的通用键名前缀，供列表渲染 key 使用 */
export const TBD_PREFIX = 'tbd'

/**
 * 是否显示右下角的「内容占位统计」浮标。
 * 该浮标会扫描全部数据模块，列出仍需替换的占位数量与对应文件。
 * 内容补齐后把它设为 false（或删除 ContentAudit 组件）即可。
 */
export const SHOW_CONTENT_AUDIT = true
