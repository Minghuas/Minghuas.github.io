/**
 * 团队动态 — src/data/news.js
 *
 * ⚠️ 当前状态：全部为占位内容，字段结构已确定。
 *
 * 关于 date / year：使用演示用日期区间，**不是真实日期**，
 *   保留数字是为了让「按时间倒序」「按年份归档」等功能可被验证。
 *
 * 字段说明：
 *   id     稳定标识
 *   date   展示用日期文本，如「20XX 年 X 月」
 *   year   年份（数字），用于排序与归档
 *   tag    标签，如「论文」「荣誉」「团队」「教学」
 *   title  动态标题
 *   text   一句话说明
 *   url    相关链接；为空则界面不渲染链接
 */

import { tbd } from './placeholder.js'

export const NEWS = [
  {
    id: 'n-01',
    date: tbd('年月'),
    year: 2026,
    tag: '论文',
    title: tbd('团队动态 1 · 标题'),
    text: tbd('团队动态 1 · 一句话说明'),
    url: '',
  },
  {
    id: 'n-02',
    date: tbd('年月'),
    year: 2025,
    tag: '荣誉',
    title: tbd('团队动态 2 · 标题'),
    text: tbd('团队动态 2 · 一句话说明'),
    url: '',
  },
  {
    id: 'n-03',
    date: tbd('年月'),
    year: 2025,
    tag: '团队',
    title: tbd('团队动态 3 · 标题'),
    text: tbd('团队动态 3 · 一句话说明'),
    url: '',
  },
  {
    id: 'n-04',
    date: tbd('年月'),
    year: 2024,
    tag: '论文',
    title: tbd('团队动态 4 · 标题'),
    text: tbd('团队动态 4 · 一句话说明'),
    url: '',
  },
  {
    id: 'n-05',
    date: tbd('年月'),
    year: 2024,
    tag: '学术服务',
    title: tbd('团队动态 5 · 标题'),
    text: tbd('团队动态 5 · 一句话说明'),
    url: '',
  },
]

/** 动态标签，供筛选器使用 */
export const NEWS_TAGS = [...new Set(NEWS.map((n) => n.tag))]

export default NEWS
