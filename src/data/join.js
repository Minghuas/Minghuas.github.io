/**
 * 招生与合作 — src/data/join.js
 *
 * ⚠️ 当前状态：全部为占位内容，招募类别与字段结构已确定。
 *
 * 合规注意：
 *   - 招生类别、名额、待遇等必须以官方页面与实际政策为准，不得自行许诺。
 *   - 联系方式必须与官方页面一致；未公开的字段留空，界面自动隐藏。
 *
 * 字段说明：
 *   POSITIONS[].key      类别标识
 *   POSITIONS[].label    类别名称
 *   POSITIONS[].open     当前是否开放招募，用于界面显示状态标记
 *   POSITIONS[].summary  一句话说明
 *   POSITIONS[].points[] 具体要求或说明条目
 */

import { tbd } from './placeholder.js'

export const POSITIONS = [
  {
    key: 'phd',
    label: '博士研究生',
    open: true,
    summary: tbd('博士研究生 · 一句话说明'),
    points: [
      tbd('博士研究生 · 要求 1'),
      tbd('博士研究生 · 要求 2'),
      tbd('博士研究生 · 要求 3'),
    ],
  },
  {
    key: 'master',
    label: '硕士研究生',
    open: true,
    summary: tbd('硕士研究生 · 一句话说明'),
    points: [tbd('硕士研究生 · 要求 1'), tbd('硕士研究生 · 要求 2')],
  },
  {
    key: 'undergrad',
    label: '优秀本科生',
    open: true,
    summary: tbd('本科生科研 · 一句话说明'),
    points: [tbd('本科生科研 · 要求 1'), tbd('本科生科研 · 要求 2')],
  },
  {
    key: 'postdoc',
    label: '博士后',
    open: true,
    summary: tbd('博士后 · 一句话说明'),
    points: [tbd('博士后 · 要求 1'), tbd('博士后 · 要求 2')],
  },
  {
    key: 'visiting',
    label: '访问学者',
    open: true,
    summary: tbd('访问学者 · 一句话说明'),
    points: [tbd('访问学者 · 要求 1')],
  },
]

/**
 * 研究训练的完整链条 —— 用于展示「从理论到系统」的培养路径。
 */
export const TRAINING_PIPELINE = [
  { step: '01', title: tbd('训练环节 1 · 名称'), text: tbd('训练环节 1 · 说明') },
  { step: '02', title: tbd('训练环节 2 · 名称'), text: tbd('训练环节 2 · 说明') },
  { step: '03', title: tbd('训练环节 3 · 名称'), text: tbd('训练环节 3 · 说明') },
  { step: '04', title: tbd('训练环节 4 · 名称'), text: tbd('训练环节 4 · 说明') },
  { step: '05', title: tbd('训练环节 5 · 名称'), text: tbd('训练环节 5 · 说明') },
]

/**
 * 合作与国际交流 —— 用于招生合作页。
 */
export const COLLABORATION = {
  title: tbd('合作与交流标题'),
  lead: tbd('合作与交流总体说明，约 60 字'),
  items: [
    { icon: 'Network', title: tbd('合作方向 1 · 小标题'), text: tbd('合作方向 1 · 说明') },
    { icon: 'Globe', title: tbd('合作方向 2 · 小标题'), text: tbd('合作方向 2 · 说明') },
    { icon: 'Building2', title: tbd('合作方向 3 · 小标题'), text: tbd('合作方向 3 · 说明') },
  ],
}

/**
 * 申请流程 —— 用于招生合作页。
 */
export const APPLICATION_STEPS = [
  { step: '01', title: tbd('申请步骤 1 · 名称'), text: tbd('申请步骤 1 · 说明') },
  { step: '02', title: tbd('申请步骤 2 · 名称'), text: tbd('申请步骤 2 · 说明') },
  { step: '03', title: tbd('申请步骤 3 · 名称'), text: tbd('申请步骤 3 · 说明') },
]

/**
 * 联系入口。
 * email 留空时，界面显示「【待补充：联系邮箱】」且不渲染 mailto 链接，
 * 避免出现点不动的死链。
 */
export const CONTACT = {
  email: '',
  emailNote: tbd('联系说明，如「请附简历与成绩单」'),
  /** 官方招生页面链接 */
  officialLinks: [{ label: tbd('官方页面名称'), url: '' }],
}

export default POSITIONS
