/**
 * 团队成员 — src/data/members.js
 *
 * ⚠️ 当前状态：全部为占位内容，角色分类与字段结构已确定。
 *
 * 隐私与合规注意：
 *   - 成员姓名、身份、研究方向必须来自官方公开页面，不得凭推测填写。
 *   - 照片必须已获授权或来自官方公开渠道；未获授权的照片一律不放。
 *     photo 为空字符串时，界面渲染统一的字母/首字中性占位，不会使用他人照片。
 *   - 学生个人联系方式不在此处收录。
 *
 * 字段说明：
 *   id           稳定标识
 *   name         姓名
 *   nameEn       英文名或拼音，无则留空
 *   role         对应 MEMBER_ROLES 的 key
 *   cohort       年级 / 身份说明，如「20XX 级博士生」
 *   interests[]  研究兴趣关键词
 *   bio          个人简介，一两句
 *   homepage     个人主页或学术主页链接；为空则界面不渲染
 *   photo        头像图片路径；为空则使用中性占位设计
 *   destination  毕业去向（仅已毕业成员）
 *   coAdvise     联合指导说明，无则留空
 */

import { tbd } from './placeholder.js'

/** 成员角色分类，用于筛选器与分组渲染 */
export const MEMBER_ROLES = [
  { key: 'faculty', label: '导师' },
  { key: 'postdoc', label: '博士后' },
  { key: 'phd', label: '博士生' },
  { key: 'master', label: '硕士生' },
  { key: 'undergrad', label: '本科生' },
  { key: 'alumni', label: '已毕业' },
]

/** 演示用年级，非真实数据 */
const COHORTS = ['2026 级', '2025 级', '2024 级', '2023 级']

/** 生成占位成员，避免逐条硬编码 —— 替换真实内容时请改为展开书写 */
function placeholderMembers(role, prefix, labels, count) {
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${String(i + 1).padStart(2, '0')}`,
    name: tbd(`${labels} ${i + 1} · 姓名`),
    nameEn: '',
    role,
    cohort: role === 'alumni' ? tbd('毕业届别') : COHORTS[i % COHORTS.length],
    interests: role === 'alumni' ? [] : [tbd('研究兴趣 1'), tbd('研究兴趣 2')],
    bio: tbd(`${labels} ${i + 1} · 个人简介`),
    homepage: '',
    photo: '',
    destination: role === 'alumni' ? tbd('毕业去向') : '',
    coAdvise: i === count - 1 ? tbd('联合指导说明') : '',
  }))
}

export const MEMBERS = [
  // 导师 —— 站点主体，通常只有一位，真实内容优先级最高
  {
    id: 'faculty-01',
    name: tbd('导师姓名'),
    nameEn: tbd('姓名拼音'),
    role: 'faculty',
    cohort: tbd('职称与导师身份'),
    interests: [
      tbd('研究兴趣 1'),
      tbd('研究兴趣 2'),
      tbd('研究兴趣 3'),
      tbd('研究兴趣 4'),
    ],
    bio: tbd('导师个人简介，3–5 句'),
    homepage: '',
    photo: '',
    destination: '',
    coAdvise: '',
  },

  ...placeholderMembers('postdoc', 'postdoc', '博士后', 2),
  ...placeholderMembers('phd', 'phd', '博士生', 6),
  ...placeholderMembers('master', 'master', '硕士生', 7),
  ...placeholderMembers('undergrad', 'ug', '本科生', 3),
  ...placeholderMembers('alumni', 'alum', '已毕业成员', 8),
]

/** 按角色筛选 */
export function membersByRole(role) {
  if (!role || role === 'all') return MEMBERS
  return MEMBERS.filter((m) => m.role === role)
}

/** 各角色成员数量，用于筛选器徽标 */
export const MEMBER_COUNTS = MEMBER_ROLES.reduce((acc, r) => {
  acc[r.key] = MEMBERS.filter((m) => m.role === r.key).length
  return acc
}, {})

export default MEMBERS
