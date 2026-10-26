/**
 * 学术服务 — src/data/services.js
 *
 * ⚠️ 当前状态：全部为占位内容，分组结构已确定。
 *
 * 字段说明：
 *   key    分组标识
 *   label  分组名称
 *   icon   Lucide 图标名
 *   items  条目列表 { text, meta, url }
 *          text 为条目标题，meta 为任期 / 年份 / 补充说明，url 为空则不渲染链接
 */

import { tbd } from './placeholder.js'

export const SERVICE_GROUPS = [
  {
    key: 'membership',
    label: '专业团体',
    icon: 'Users',
    items: [
      { text: tbd('专业团体 1 · 名称与身份'), meta: tbd('年份'), url: '' },
      { text: tbd('专业团体 2 · 名称与身份'), meta: tbd('年份'), url: '' },
    ],
  },
  {
    key: 'editorial',
    label: '编委工作',
    icon: 'FileText',
    items: [
      { text: tbd('编委工作 1 · 职务与刊物'), meta: tbd('任期'), url: '' },
      { text: tbd('编委工作 2 · 职务与刊物'), meta: tbd('任期'), url: '' },
      { text: tbd('编委工作 3 · 职务与刊物'), meta: tbd('任期'), url: '' },
    ],
  },
  {
    key: 'chair',
    label: '会议主席',
    icon: 'Award',
    items: [
      { text: tbd('会议主席 1 · 职务与会议'), meta: tbd('年份'), url: '' },
      { text: tbd('会议主席 2 · 职务与会议'), meta: tbd('年份'), url: '' },
    ],
  },
  {
    key: 'organizing',
    label: '会议组织',
    icon: 'Calendar',
    items: [
      { text: tbd('会议组织 1 · 会议名称'), meta: tbd('职务'), url: '' },
      { text: tbd('会议组织 2 · 会议名称'), meta: tbd('职务'), url: '' },
      { text: tbd('会议组织 3 · 会议名称'), meta: tbd('职务'), url: '' },
    ],
  },
  {
    key: 'workshop',
    label: '研讨主办',
    icon: 'Network',
    items: [
      { text: tbd('研讨会 1 · 职务与名称'), meta: tbd('合办会议与地点'), url: '' },
      { text: tbd('研讨会 2 · 职务与名称'), meta: tbd('合办会议与地点'), url: '' },
    ],
  },
  {
    key: 'tpc',
    label: '技术程序委员会',
    icon: 'ScrollText',
    items: [
      { text: tbd('会议名称 1'), meta: tbd('受邀年份'), url: '' },
      { text: tbd('会议名称 2'), meta: tbd('受邀年份'), url: '' },
      { text: tbd('会议名称 3'), meta: tbd('受邀年份'), url: '' },
      { text: tbd('会议名称 4'), meta: tbd('受邀年份'), url: '' },
    ],
  },
  {
    key: 'reviewer',
    label: '期刊审稿',
    icon: 'BookOpen',
    items: [
      { text: tbd('期刊名称 1'), meta: '', url: '' },
      { text: tbd('期刊名称 2'), meta: '', url: '' },
      { text: tbd('期刊名称 3'), meta: '', url: '' },
    ],
  },
]

export default SERVICE_GROUPS
