/**
 * 学科简介与培养理念 — src/data/philosophy.js
 *
 * ⚠️ 当前状态：全部为占位内容，分节结构与字数配额已确定。
 *   每个条目的占位标记中标注了建议字数，便于按篇幅直接替换。
 *
 * 使用页面：团队成员页（研究理念）、招生招聘页（培养模式）、首页（团队介绍）
 */

import { tbd } from './placeholder.js'

/**
 * 团队介绍 —— 用于首页「团队」区块与成员页开头。
 */
export const TEAM_INTRO = {
  title: tbd('团队介绍标题'),
  lead: tbd('团队定位与理念，1–2 句，约 40 字'),
  paragraphs: [
    tbd('团队介绍段落 1，约 80–120 字'),
    tbd('团队介绍段落 2，约 80–120 字'),
  ],
  values: [
    { icon: 'Target', title: tbd('研究理念 1 · 小标题'), text: tbd('研究理念 1 · 说明，约 30 字') },
    { icon: 'Users', title: tbd('研究理念 2 · 小标题'), text: tbd('研究理念 2 · 说明，约 30 字') },
    { icon: 'Wrench', title: tbd('研究理念 3 · 小标题'), text: tbd('研究理念 3 · 说明，约 30 字') },
    { icon: 'Globe', title: tbd('研究理念 4 · 小标题'), text: tbd('研究理念 4 · 说明，约 30 字') },
  ],
}

/**
 * 学科简介 —— 用于招生招聘页「关于这个学科」区块。
 */
export const DISCIPLINE_INTRO = {
  title: tbd('学科简介标题'),
  paragraphs: [
    tbd('学科简介段落 1 · 学科定位，约 100 字'),
    tbd('学科简介段落 2 · 为什么重要，约 100 字'),
    tbd('学科简介段落 3 · 研究范围的变化，约 100 字'),
  ],
  /** 类比例子，用一句话解释学科在软硬件之间的位置 */
  analogy: tbd('学科定位的类比说明，1 句'),
}

/**
 * 培养模式 —— 用于招生招聘页，也是指导理念的核心。
 * 每个条目包含「能力维度 + 具体说明」。
 */
export const TRAINING_PHILOSOPHY = {
  title: tbd('培养模式标题'),
  lead: tbd('培养模式总体说明，约 80–120 字'),
  dimensions: [
    { key: 'thinking', title: tbd('培养维度 1 · 名称'), text: tbd('培养维度 1 · 说明，约 40 字') },
    { key: 'abstraction', title: tbd('培养维度 2 · 名称'), text: tbd('培养维度 2 · 说明，约 40 字') },
    { key: 'organization', title: tbd('培养维度 3 · 名称'), text: tbd('培养维度 3 · 说明，约 40 字') },
    { key: 'writing', title: tbd('培养维度 4 · 名称'), text: tbd('培养维度 4 · 说明，约 40 字') },
    { key: 'communication', title: tbd('培养维度 5 · 名称'), text: tbd('培养维度 5 · 说明，约 40 字') },
  ],
}

/**
 * 推荐阅读 —— 用于招生招聘页。
 */
export const READING_LIST = [
  { text: tbd('推荐阅读 1 · 文献信息'), url: '' },
  { text: tbd('推荐阅读 2 · 文献信息'), url: '' },
  { text: tbd('推荐阅读 3 · 文献信息'), url: '' },
]

export default TEAM_INTRO
