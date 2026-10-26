/**
 * 专利与软件著作权 — src/data/patents.js
 *
 * ⚠️ 当前状态：全部为占位内容，字段结构已确定。
 *
 * 合规注意：
 *   - 专利名称、发明人、专利号、授权状态必须以公开可查的著录信息为准，
 *     不得凭印象填写，也不得把「申请中」写成「已授权」。
 *   - 专利号属于可能被他人检索的标识，未公开或不确定时请留空字符串，
 *     界面会自动隐藏该字段，而不是显示一个可能错误的编号。
 *   - 学生发明人的姓名公开需获得本人同意。
 *
 * 字段说明：
 *   id          稳定标识
 *   title       专利或软件著作权名称
 *   inventors   发明人列表；留空则界面显示占位标记
 *   kind        'invention' 发明专利 | 'utility' 实用新型 | 'software' 软件著作权
 *   status      'granted' 已授权 | 'pending' 申请中
 *   number      专利号或登记号；未公开时留空
 *   year        申请或授权年份
 *   url         公开查询链接；为空则界面不渲染链接
 */

import { tbd } from './placeholder.js'

/** 成果类型分类，用于筛选器 */
export const PATENT_KINDS = [
  { key: 'invention', label: '发明专利' },
  { key: 'utility', label: '实用新型' },
  { key: 'software', label: '软件著作权' },
]

/** 法律状态，用于界面标记 */
export const PATENT_STATUS = {
  granted: '已授权',
  pending: '申请中',
}

/** 演示用年份区间，非真实年份 */
const Y = [2025, 2024, 2023, 2022, 2021, 2020]

export const PATENTS = [
  {
    id: 'pt-01',
    title: tbd('专利 1 · 名称'),
    inventors: tbd('发明人列表'),
    kind: 'invention',
    status: 'granted',
    number: '',
    year: Y[0],
    url: '',
  },
  {
    id: 'pt-02',
    title: tbd('专利 2 · 名称'),
    inventors: tbd('发明人列表'),
    kind: 'invention',
    status: 'granted',
    number: '',
    year: Y[1],
    url: '',
  },
  {
    id: 'pt-03',
    title: tbd('专利 3 · 名称'),
    inventors: tbd('发明人列表'),
    kind: 'invention',
    status: 'pending',
    number: '',
    year: Y[2],
    url: '',
  },
  {
    id: 'pt-04',
    title: tbd('专利 4 · 名称'),
    inventors: tbd('发明人列表'),
    kind: 'utility',
    status: 'granted',
    number: '',
    year: Y[3],
    url: '',
  },
  {
    id: 'pt-05',
    title: tbd('软件著作权 1 · 名称'),
    inventors: tbd('著作权人'),
    kind: 'software',
    status: 'granted',
    number: '',
    year: Y[4],
    url: '',
  },
  {
    id: 'pt-06',
    title: tbd('软件著作权 2 · 名称'),
    inventors: tbd('著作权人'),
    kind: 'software',
    status: 'granted',
    number: '',
    year: Y[5],
    url: '',
  },
]

export const PATENTS_BY_YEAR_DESC = [...PATENTS].sort((a, b) => b.year - a.year)

export default PATENTS
