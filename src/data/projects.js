/**
 * 科研项目 — src/data/projects.js
 *
 * ⚠️ 当前状态：全部为占位内容，字段结构已确定。
 *
 * 关于 period / startYear：使用演示用年份区间，**不是真实年份**，
 *   保留数字是为了让「按年份筛选」「时间线排序」可被验证。
 *
 * 字段说明：
 *   id         稳定标识
 *   title      项目名称
 *   sponsor    资助机构
 *   role       本人承担角色，如「项目负责人」「课题负责人」
 *   code       项目编号；未公开或不便公开时留空字符串
 *   period     执行期，如「20XX–20XX」
 *   startYear  起始年份（数字），用于筛选与排序
 *   level      级别分类，对应 PROJECT_LEVELS 的 key
 *   url        官方链接；为空则界面不渲染链接
 */

import { tbd } from './placeholder.js'

/** 项目级别分类，用于筛选器 */
export const PROJECT_LEVELS = [
  { key: 'national', label: '国家级' },
  { key: 'ministry', label: '省部级' },
  { key: 'other', label: '其它' },
]

/** 演示用起止年份，非真实年份 */
const YEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2016]

export const PROJECTS = [
  {
    id: 'p-01',
    title: tbd('科研项目 1 · 名称'),
    sponsor: tbd('资助机构'),
    role: tbd('承担角色'),
    code: '',
    period: tbd('执行期'),
    startYear: YEARS[0],
    level: 'national',
    url: '',
  },
  {
    id: 'p-02',
    title: tbd('科研项目 2 · 名称'),
    sponsor: tbd('资助机构'),
    role: tbd('承担角色'),
    code: '',
    period: tbd('执行期'),
    startYear: YEARS[1],
    level: 'national',
    url: '',
  },
  {
    id: 'p-03',
    title: tbd('科研项目 3 · 名称'),
    sponsor: tbd('资助机构'),
    role: tbd('承担角色'),
    code: '',
    period: tbd('执行期'),
    startYear: YEARS[2],
    level: 'national',
    url: '',
  },
  {
    id: 'p-04',
    title: tbd('科研项目 4 · 名称'),
    sponsor: tbd('资助机构'),
    role: tbd('承担角色'),
    code: '',
    period: tbd('执行期'),
    startYear: YEARS[3],
    level: 'ministry',
    url: '',
  },
  {
    id: 'p-05',
    title: tbd('科研项目 5 · 名称'),
    sponsor: tbd('资助机构'),
    role: tbd('承担角色'),
    code: '',
    period: tbd('执行期'),
    startYear: YEARS[4],
    level: 'ministry',
    url: '',
  },
  {
    id: 'p-06',
    title: tbd('科研项目 6 · 名称'),
    sponsor: tbd('资助机构'),
    role: tbd('承担角色'),
    code: '',
    period: tbd('执行期'),
    startYear: YEARS[5],
    level: 'ministry',
    url: '',
  },
  {
    id: 'p-07',
    title: tbd('科研项目 7 · 名称'),
    sponsor: tbd('资助机构'),
    role: tbd('承担角色'),
    code: '',
    period: tbd('执行期'),
    startYear: YEARS[6],
    level: 'other',
    url: '',
  },
  {
    id: 'p-08',
    title: tbd('科研项目 8 · 名称'),
    sponsor: tbd('资助机构'),
    role: tbd('承担角色'),
    code: '',
    period: tbd('执行期'),
    startYear: YEARS[2],
    level: 'other',
    url: '',
  },
]

export const PROJECTS_BY_YEAR_DESC = [...PROJECTS].sort((a, b) => b.startYear - a.startYear)

export default PROJECTS
