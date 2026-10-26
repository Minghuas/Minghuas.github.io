/**
 * 研究方向数据 — src/data/research.js
 *
 * ⚠️ 当前状态：内容区全部为占位，页面结构、分区顺序与字段定义已确定。
 *
 * 数据结构说明（每个方向包含）：
 *   id            锚点标识，用于路由跳转 /research#<id>
 *   title         方向名称
 *   titleEn       英文名称
 *   icon          Lucide 图标名，用于卡片与页面标题
 *   summary       一句话概述，用于首页卡片
 *   background[]  研究背景与关键挑战，长段落
 *   challenges[]  关键挑战条目，{ title, text }
 *   questions[]   核心科学问题
 *   approach[]    技术路线与研究方法
 *   applications[]  典型应用场景
 *   keywords[]    技术关键词，用于卡片标记
 *   papers[]      代表性论文 { title, meta, url }；url 为空则渲染占位标记
 *   projects[]    代表性项目；留空数组时界面渲染「待补充区块」
 *
 * 内容边界：不要写入未经确认的具体结论、数据或成果。
 *           无法确认的列表请留空数组 []，界面会显示可编辑的待补充区块。
 */

import { tbd } from './placeholder.js'

export const RESEARCH_DIRECTIONS = [
  {
    id: 'ai-chips',
    title: tbd('研究方向一 · 名称'),
    titleEn: tbd('Direction 1 · English title'),
    icon: 'Cpu',
    summary: tbd('方向一 · 一句话概述'),
    background: [
      tbd('方向一 · 研究背景与关键挑战，段落 1'),
      tbd('方向一 · 研究背景与关键挑战，段落 2'),
    ],
    challenges: [
      { title: tbd('关键挑战 1.1 · 标题'), text: tbd('关键挑战 1.1 · 说明') },
      { title: tbd('关键挑战 1.2 · 标题'), text: tbd('关键挑战 1.2 · 说明') },
      { title: tbd('关键挑战 1.3 · 标题'), text: tbd('关键挑战 1.3 · 说明') },
    ],
    questions: [tbd('核心科学问题 1.1'), tbd('核心科学问题 1.2'), tbd('核心科学问题 1.3')],
    approach: [
      tbd('技术路线 1.1'),
      tbd('技术路线 1.2'),
      tbd('技术路线 1.3'),
      tbd('技术路线 1.4'),
    ],
    applications: [
      tbd('典型应用场景 1.1'),
      tbd('典型应用场景 1.2'),
      tbd('典型应用场景 1.3'),
    ],
    keywords: [tbd('关键词 1.1'), tbd('关键词 1.2'), tbd('关键词 1.3'), tbd('关键词 1.4')],
    papers: [
      { title: tbd('方向一 · 代表性论文 1'), meta: tbd('会议或期刊 · 年份'), url: '' },
      { title: tbd('方向一 · 代表性论文 2'), meta: tbd('会议或期刊 · 年份'), url: '' },
      { title: tbd('方向一 · 代表性论文 3'), meta: tbd('会议或期刊 · 年份'), url: '' },
    ],
    projects: [],
  },
  {
    id: 'hpc-clusters',
    title: tbd('研究方向二 · 名称'),
    titleEn: tbd('Direction 2 · English title'),
    icon: 'Server',
    summary: tbd('方向二 · 一句话概述'),
    background: [
      tbd('方向二 · 研究背景与关键挑战，段落 1'),
      tbd('方向二 · 研究背景与关键挑战，段落 2'),
    ],
    challenges: [
      { title: tbd('关键挑战 2.1 · 标题'), text: tbd('关键挑战 2.1 · 说明') },
      { title: tbd('关键挑战 2.2 · 标题'), text: tbd('关键挑战 2.2 · 说明') },
      { title: tbd('关键挑战 2.3 · 标题'), text: tbd('关键挑战 2.3 · 说明') },
    ],
    questions: [tbd('核心科学问题 2.1'), tbd('核心科学问题 2.2'), tbd('核心科学问题 2.3')],
    approach: [
      tbd('技术路线 2.1'),
      tbd('技术路线 2.2'),
      tbd('技术路线 2.3'),
      tbd('技术路线 2.4'),
    ],
    applications: [
      tbd('典型应用场景 2.1'),
      tbd('典型应用场景 2.2'),
      tbd('典型应用场景 2.3'),
    ],
    keywords: [tbd('关键词 2.1'), tbd('关键词 2.2'), tbd('关键词 2.3'), tbd('关键词 2.4')],
    papers: [
      { title: tbd('方向二 · 代表性论文 1'), meta: tbd('会议或期刊 · 年份'), url: '' },
      { title: tbd('方向二 · 代表性论文 2'), meta: tbd('会议或期刊 · 年份'), url: '' },
      { title: tbd('方向二 · 代表性论文 3'), meta: tbd('会议或期刊 · 年份'), url: '' },
    ],
    projects: [],
  },
  {
    id: 'sustainable-computing',
    title: tbd('研究方向三 · 名称'),
    titleEn: tbd('Direction 3 · English title'),
    icon: 'Leaf',
    summary: tbd('方向三 · 一句话概述'),
    background: [
      tbd('方向三 · 研究背景与关键挑战，段落 1'),
      tbd('方向三 · 研究背景与关键挑战，段落 2'),
    ],
    challenges: [
      { title: tbd('关键挑战 3.1 · 标题'), text: tbd('关键挑战 3.1 · 说明') },
      { title: tbd('关键挑战 3.2 · 标题'), text: tbd('关键挑战 3.2 · 说明') },
      { title: tbd('关键挑战 3.3 · 标题'), text: tbd('关键挑战 3.3 · 说明') },
    ],
    questions: [tbd('核心科学问题 3.1'), tbd('核心科学问题 3.2'), tbd('核心科学问题 3.3')],
    approach: [
      tbd('技术路线 3.1'),
      tbd('技术路线 3.2'),
      tbd('技术路线 3.3'),
      tbd('技术路线 3.4'),
    ],
    applications: [],
    keywords: [tbd('关键词 3.1'), tbd('关键词 3.2'), tbd('关键词 3.3'), tbd('关键词 3.4')],
    papers: [
      { title: tbd('方向三 · 代表性论文 1'), meta: tbd('会议或期刊 · 年份'), url: '' },
      { title: tbd('方向三 · 代表性论文 2'), meta: tbd('会议或期刊 · 年份'), url: '' },
      { title: tbd('方向三 · 代表性论文 3'), meta: tbd('会议或期刊 · 年份'), url: '' },
    ],
    projects: [],
  },
  {
    id: 'hw-sw-codesign',
    title: tbd('研究方向四 · 名称'),
    titleEn: tbd('Direction 4 · English title'),
    icon: 'Layers',
    summary: tbd('方向四 · 一句话概述'),
    background: [
      tbd('方向四 · 研究背景与关键挑战，段落 1'),
      tbd('方向四 · 研究背景与关键挑战，段落 2'),
    ],
    challenges: [
      { title: tbd('关键挑战 4.1 · 标题'), text: tbd('关键挑战 4.1 · 说明') },
      { title: tbd('关键挑战 4.2 · 标题'), text: tbd('关键挑战 4.2 · 说明') },
      { title: tbd('关键挑战 4.3 · 标题'), text: tbd('关键挑战 4.3 · 说明') },
    ],
    questions: [tbd('核心科学问题 4.1'), tbd('核心科学问题 4.2'), tbd('核心科学问题 4.3')],
    approach: [
      tbd('技术路线 4.1'),
      tbd('技术路线 4.2'),
      tbd('技术路线 4.3'),
      tbd('技术路线 4.4'),
    ],
    applications: [
      tbd('典型应用场景 4.1'),
      tbd('典型应用场景 4.2'),
      tbd('典型应用场景 4.3'),
    ],
    keywords: [tbd('关键词 4.1'), tbd('关键词 4.2'), tbd('关键词 4.3'), tbd('关键词 4.4')],
    papers: [
      { title: tbd('方向四 · 代表性论文 1'), meta: tbd('会议或期刊 · 年份'), url: '' },
      { title: tbd('方向四 · 代表性论文 2'), meta: tbd('会议或期刊 · 年份'), url: '' },
      { title: tbd('方向四 · 代表性论文 3'), meta: tbd('会议或期刊 · 年份'), url: '' },
    ],
    projects: [],
  },
  {
    id: 'resource-resilience',
    title: tbd('研究方向五 · 名称'),
    titleEn: tbd('Direction 5 · English title'),
    icon: 'Activity',
    summary: tbd('方向五 · 一句话概述'),
    background: [
      tbd('方向五 · 研究背景与关键挑战，段落 1'),
      tbd('方向五 · 研究背景与关键挑战，段落 2'),
    ],
    challenges: [
      { title: tbd('关键挑战 5.1 · 标题'), text: tbd('关键挑战 5.1 · 说明') },
      { title: tbd('关键挑战 5.2 · 标题'), text: tbd('关键挑战 5.2 · 说明') },
      { title: tbd('关键挑战 5.3 · 标题'), text: tbd('关键挑战 5.3 · 说明') },
    ],
    questions: [tbd('核心科学问题 5.1'), tbd('核心科学问题 5.2'), tbd('核心科学问题 5.3')],
    approach: [
      tbd('技术路线 5.1'),
      tbd('技术路线 5.2'),
      tbd('技术路线 5.3'),
      tbd('技术路线 5.4'),
    ],
    applications: [
      tbd('典型应用场景 5.1'),
      tbd('典型应用场景 5.2'),
      tbd('典型应用场景 5.3'),
    ],
    keywords: [tbd('关键词 5.1'), tbd('关键词 5.2'), tbd('关键词 5.3'), tbd('关键词 5.4')],
    papers: [
      { title: tbd('方向五 · 代表性论文 1'), meta: tbd('会议或期刊 · 年份'), url: '' },
      { title: tbd('方向五 · 代表性论文 2'), meta: tbd('会议或期刊 · 年份'), url: '' },
      { title: tbd('方向五 · 代表性论文 3'), meta: tbd('会议或期刊 · 年份'), url: '' },
    ],
    projects: [],
  },
]

/**
 * 当前研究前沿 —— 用于首页「正在关注的问题」区块。
 * 每个前沿包含：问题描述 + 观察视角 + 参考论文列表。
 */
export const RESEARCH_FRONTS = [
  {
    id: 'front-1',
    index: '01',
    title: tbd('研究前沿一 · 标题'),
    text: tbd('研究前沿一 · 问题描述'),
    perspective: tbd('研究前沿一 · 观察视角'),
    refs: [
      { label: tbd('参考论文 1.1'), url: '' },
      { label: tbd('参考论文 1.2'), url: '' },
      { label: tbd('参考论文 1.3'), url: '' },
      { label: tbd('参考论文 1.4'), url: '' },
    ],
  },
  {
    id: 'front-2',
    index: '02',
    title: tbd('研究前沿二 · 标题'),
    text: tbd('研究前沿二 · 问题描述'),
    perspective: tbd('研究前沿二 · 观察视角'),
    refs: [
      { label: tbd('参考论文 2.1'), url: '' },
      { label: tbd('参考论文 2.2'), url: '' },
      { label: tbd('参考论文 2.3'), url: '' },
      { label: tbd('参考论文 2.4'), url: '' },
    ],
  },
  {
    id: 'front-3',
    index: '03',
    title: tbd('研究前沿三 · 标题'),
    text: tbd('研究前沿三 · 问题描述'),
    perspective: tbd('研究前沿三 · 观察视角'),
    refs: [
      { label: tbd('参考论文 3.1'), url: '' },
      { label: tbd('参考论文 3.2'), url: '' },
      { label: tbd('参考论文 3.3'), url: '' },
      { label: tbd('参考论文 3.4'), url: '' },
    ],
  },
]

/**
 * 精选报告 —— 用于研究方向页底部。
 */
export const INVITED_TALKS = [
  {
    title: tbd('精选报告 · 标题'),
    summary: tbd('精选报告 · 概述'),
    occasions: tbd('报告场合'),
    url: '',
  },
]

/**
 * 以往工作（历史研究脉络）—— 用于研究方向页「研究脉络」区块。
 */
export const PAST_WORK = [
  {
    id: 'past-1',
    title: tbd('以往工作一 · 标题'),
    text: tbd('以往工作一 · 描述'),
  },
]

export default RESEARCH_DIRECTIONS
