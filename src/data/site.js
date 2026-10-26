/**
 * 站点全局信息 — src/data/site.js
 *
 * ⚠️ 当前状态：实际内容为占位，框架与字段结构已确定。
 *
 * 替换指引：
 *   - CONTENT 中所有 tbd(...) 均需替换为真实内容
 *   - 联系方式必须取自官方页面，不要凭印象填写
 *   - 空字符串 '' 表示官方未公开该信息，界面会自动隐藏对应条目
 */

import { tbd } from './placeholder.js'

export const SITE = {
  /** 站点标题：用于浏览器标签页与页头标识 */
  name: tbd('实验室中文全称'),
  shortName: tbd('实验室英文缩写'),
  nameEn: tbd('实验室英文全称'),

  /** 站点主体：教授 + 所属机构 */
  owner: {
    name: tbd('教授姓名'),
    nameEn: tbd('姓名拼音'),
    title: tbd('职称与导师身份'),
    affiliation: tbd('所属学院'),
    institute: tbd('所属研究所'),
    lab: tbd('所属实验室'),
  },

  /** 一句话学术定位 */
  tagline: tbd('一句话研究定位'),
  description: tbd('站点简介，60–120 字'),

  /** 团队格言 */
  motto: tbd('团队格言'),

  /** 官方主页 */
  homepage: '',

  /**
   * 联系方式。
   * 只收录官方页面已公开的内容；未公开的字段留空字符串，界面自动隐藏。
   */
  contact: {
    email: '', // 例：xxxx@xx.edu.cn（须与官方页面一致）
    address: '',
    phone: '',
    department: '',
  },

  /**
   * 外部官方链接。
   * kind 用于界面选择图标：'org' 机构 | 'profile' 学术主页 | 'doc' 文档
   * url 为空字符串时，界面渲染为不可点击的占位标记。
   */
  links: [
    { label: '实验室主页', url: '', kind: 'org', note: tbd('实验室页面说明') },
    { label: '所属研究所', url: '', kind: 'org', note: tbd('研究所名称') },
    { label: '所属学院', url: '', kind: 'org', note: tbd('学院名称') },
    { label: 'Google Scholar', url: '', kind: 'profile', note: '论文引用统计' },
    { label: 'DBLP', url: '', kind: 'profile', note: '论文索引' },
    { label: '个人简历（PDF）', url: '', kind: 'doc', note: '完整履历' },
  ],

  /** 内容来源说明：列出本站在内容上参考的官方页面 */
  sources: [{ label: tbd('官方页面名称'), url: '' }],

  /** 内容版本标记，替换真实内容后请更新 */
  lastUpdated: tbd('更新年月'),
}

/**
 * 主导航 —— 属于框架结构，非内容占位，可直接使用。
 */
export const NAV_ITEMS = [
  { label: '首页', to: '/', match: 'home' },
  { label: '研究方向', to: '/research', match: 'research' },
  { label: '科研成果', to: '/achievements', match: 'achievements' },
  { label: '论文发表', to: '/publications', match: 'publications' },
  { label: '团队成员', to: '/team', match: 'team' },
  { label: '招生招聘', to: '/join', match: 'join' },
]

export default SITE
