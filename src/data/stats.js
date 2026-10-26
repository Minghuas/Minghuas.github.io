/**
 * 学术影响力统计 — src/data/stats.js
 *
 * ⚠️ 重要约束：首页「学术影响力」中的每一个数字都必须来源于官方页面
 *   或经过确认的数据。禁止编造、禁止估算、禁止用 0 代替未知。
 *   未确认的数字一律使用 null，界面显示「【待补充】」而不是数字。
 *
 * 当前状态：全部为 null，等待填入经核实的数字。
 *
 * 说明：本文件只保存「需要人工核实」的对外指标，因此不引入论文数据集，
 *       以免把大体量数据带进首页包。论文页的分类计数见 src/data/derive.js。
 */

/**
 * 首页展示的学术影响力指标。
 * value 为 null 时界面显示占位标记 —— 请填入已核实的数字。
 */
export const STAT_HIGHLIGHTS = [
  {
    key: 'publications',
    label: '发表论文',
    value: null,
    unit: '篇',
    note: '统计口径待确认（是否含短文摘要、中文出版）',
  },
  {
    key: 'top-conf',
    label: '体系结构顶级会议论文',
    value: null,
    unit: '篇',
    note: '统计口径待确认（覆盖哪些会议）',
  },
  {
    key: 'projects',
    label: '主持科研项目',
    value: null,
    unit: '项',
    note: '统计口径待确认（是否含子课题）',
  },
  {
    key: 'awards',
    label: '重要学术荣誉',
    value: null,
    unit: '项',
    note: '统计口径待确认',
  },
]

/**
 * 学术服务概览：编委、会议主席等角色的数量。
 * 同样要求核实后再填入。
 */
export const SERVICE_HIGHLIGHTS = [
  { key: 'editorial', label: '国际期刊编委', value: null, unit: '个' },
  { key: 'chair', label: '会议主席职务', value: null, unit: '次' },
]

export default STAT_HIGHLIGHTS
