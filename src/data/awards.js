/**
 * 学术奖励与荣誉 — src/data/awards.js
 *
 * ⚠️ 当前状态：全部为占位内容，分类结构已确定。
 *
 * 关于 year 字段：使用 2011–2026 的演示用年份区间，**不是真实年份**。
 *   保留数字是为了让「按年份排序 / 筛选」「时间线倒序」等功能可被验证。
 *   替换真实内容时请一并改为实际获奖年份。
 *
 * 字段说明：
 *   id        稳定标识
 *   category  对应 AWARD_CATEGORIES 的 key，用于分类筛选
 *   title     奖励或荣誉名称
 *   org       授予机构
 *   year      获奖年份
 *   level     等级说明，如「一等奖」「最佳论文」「提名」；无则留空字符串
 *   url       官方链接；为空则界面不渲染链接
 */

import { tbd } from './placeholder.js'

export const AWARD_CATEGORIES = [
  { key: 'honor', label: '学术荣誉' },
  { key: 'paper', label: '论文获奖' },
  { key: 'achievement', label: '成果奖励' },
]

/** 演示用年份区间，非真实年份 */
const Y = [2026, 2025, 2024, 2023, 2021, 2020, 2019, 2018, 2016, 2015, 2013, 2011]

export const AWARDS = [
  {
    id: 'a-honor-01',
    category: 'honor',
    title: tbd('学术荣誉 1 · 名称'),
    org: tbd('授予机构'),
    year: Y[0],
    level: '',
    url: '',
  },
  {
    id: 'a-honor-02',
    category: 'honor',
    title: tbd('学术荣誉 2 · 名称'),
    org: tbd('授予机构'),
    year: Y[2],
    level: '',
    url: '',
  },
  {
    id: 'a-honor-03',
    category: 'honor',
    title: tbd('学术荣誉 3 · 名称'),
    org: tbd('授予机构'),
    year: Y[4],
    level: '',
    url: '',
  },
  {
    id: 'a-honor-04',
    category: 'honor',
    title: tbd('学术荣誉 4 · 名称'),
    org: tbd('授予机构'),
    year: Y[6],
    level: '',
    url: '',
  },
  {
    id: 'a-honor-05',
    category: 'honor',
    title: tbd('学术荣誉 5 · 名称'),
    org: tbd('授予机构'),
    year: Y[9],
    level: '',
    url: '',
  },
  {
    id: 'a-honor-06',
    category: 'honor',
    title: tbd('学术荣誉 6 · 名称'),
    org: tbd('授予机构'),
    year: Y[11],
    level: '',
    url: '',
  },
  {
    id: 'a-paper-01',
    category: 'paper',
    title: tbd('论文获奖 1 · 奖项名称'),
    org: tbd('会议或期刊名称'),
    year: Y[0],
    level: tbd('奖项等级'),
    url: '',
  },
  {
    id: 'a-paper-02',
    category: 'paper',
    title: tbd('论文获奖 2 · 奖项名称'),
    org: tbd('会议或期刊名称'),
    year: Y[1],
    level: tbd('奖项等级'),
    url: '',
  },
  {
    id: 'a-paper-03',
    category: 'paper',
    title: tbd('论文获奖 3 · 奖项名称'),
    org: tbd('会议或期刊名称'),
    year: Y[3],
    level: tbd('奖项等级'),
    url: '',
  },
  {
    id: 'a-paper-04',
    category: 'paper',
    title: tbd('论文获奖 4 · 奖项名称'),
    org: tbd('会议或期刊名称'),
    year: Y[5],
    level: tbd('奖项等级'),
    url: '',
  },
  {
    id: 'a-paper-05',
    category: 'paper',
    title: tbd('论文获奖 5 · 奖项名称'),
    org: tbd('会议或期刊名称'),
    year: Y[7],
    level: tbd('奖项等级'),
    url: '',
  },
  {
    id: 'a-paper-06',
    category: 'paper',
    title: tbd('论文获奖 6 · 奖项名称'),
    org: tbd('会议或期刊名称'),
    year: Y[9],
    level: tbd('奖项等级'),
    url: '',
  },
  {
    id: 'a-paper-07',
    category: 'paper',
    title: tbd('论文获奖 7 · 奖项名称'),
    org: tbd('会议或期刊名称'),
    year: Y[10],
    level: tbd('奖项等级'),
    url: '',
  },
  {
    id: 'a-achv-01',
    category: 'achievement',
    title: tbd('成果奖励 1 · 名称'),
    org: tbd('授予机构'),
    year: Y[1],
    level: tbd('奖励等级'),
    url: '',
  },
  {
    id: 'a-achv-02',
    category: 'achievement',
    title: tbd('成果奖励 2 · 名称'),
    org: tbd('授予机构'),
    year: Y[4],
    level: tbd('奖励等级'),
    url: '',
  },
  {
    id: 'a-achv-03',
    category: 'achievement',
    title: tbd('成果奖励 3 · 名称'),
    org: tbd('授予机构'),
    year: Y[6],
    level: tbd('奖励等级'),
    url: '',
  },
  {
    id: 'a-achv-04',
    category: 'achievement',
    title: tbd('成果奖励 4 · 名称'),
    org: tbd('授予机构'),
    year: Y[8],
    level: tbd('奖励等级'),
    url: '',
  },
]

/** 按年份倒序，供时间线渲染 */
export const AWARDS_BY_YEAR_DESC = [...AWARDS].sort((a, b) => b.year - a.year)

export default AWARDS
