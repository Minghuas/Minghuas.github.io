/**
 * 内容占位清单 — scripts/content-audit.mjs
 *
 * 扫描 src/data 下的全部内容模块，按文件统计：
 *   - 占位标记数量（含「待补充」的字符串）
 *   - 待确认的链接位数量（url / link / homepage / photo / email 为空字符串）
 *   - 为 null 的统计数字数量
 *
 * 运行：npm run check:content
 *
 * 用途：给出「需要人工补充的内容清单」，补齐后计数自动归零。
 *       页面右下角的浮标（src/components/ContentAudit.vue）展示同一份统计。
 */
import * as site from '../src/data/site.js'
import * as research from '../src/data/research.js'
import * as publications from '../src/data/publications.js'
import * as awards from '../src/data/awards.js'
import * as projects from '../src/data/projects.js'
import * as patents from '../src/data/patents.js'
import * as members from '../src/data/members.js'
import * as services from '../src/data/services.js'
import * as news from '../src/data/news.js'
import * as philosophy from '../src/data/philosophy.js'
import * as join from '../src/data/join.js'
import * as stats from '../src/data/stats.js'

const MODULES = [
  { file: 'src/data/site.js', label: '站点信息', exports: [site.SITE] },
  { file: 'src/data/research.js', label: '研究方向', exports: [research.RESEARCH_DIRECTIONS, research.RESEARCH_FRONTS, research.INVITED_TALKS, research.PAST_WORK] },
  { file: 'src/data/publications.js', label: '论文数据', exports: [publications.PUBLICATION_SEED] },
  { file: 'src/data/awards.js', label: '奖励荣誉', exports: [awards.AWARDS] },
  { file: 'src/data/projects.js', label: '科研项目', exports: [projects.PROJECTS] },
  { file: 'src/data/patents.js', label: '专利与软著', exports: [patents.PATENTS] },
  { file: 'src/data/members.js', label: '团队成员', exports: [members.MEMBERS] },
  { file: 'src/data/services.js', label: '学术服务', exports: [services.SERVICE_GROUPS] },
  { file: 'src/data/news.js', label: '团队动态', exports: [news.NEWS] },
  { file: 'src/data/philosophy.js', label: '学科与理念', exports: [philosophy.TEAM_INTRO, philosophy.DISCIPLINE_INTRO, philosophy.TRAINING_PHILOSOPHY, philosophy.READING_LIST] },
  { file: 'src/data/join.js', label: '招生合作', exports: [join.POSITIONS, join.TRAINING_PIPELINE, join.COLLABORATION, join.APPLICATION_STEPS, join.CONTACT] },
  { file: 'src/data/stats.js', label: '统计指标', exports: [stats.STAT_HIGHLIGHTS, stats.SERVICE_HIGHLIGHTS] },
]

/** 视为「链接位」的键名 */
const LINK_KEYS = new Set(['url', 'link', 'homepage', 'photo', 'email'])

function walk(value, seen, stats) {
  if (typeof value === 'string') {
    if (value.includes('待补充')) stats.placeholders += 1
    return
  }
  if (value === null) {
    // 统计指标为 null 表示「数字待核实」，与普通占位分开计数
    return
  }
  if (typeof value !== 'object') return
  if (seen.has(value)) return
  seen.add(value)

  if (Array.isArray(value)) {
    for (const item of value) walk(item, seen, stats)
    return
  }

  for (const [key, val] of Object.entries(value)) {
    if (LINK_KEYS.has(key) && val === '') stats.emptyLinks += 1
    if (typeof val === 'number' && key === 'value') stats.numbers += 1
    walk(val, seen, stats)
  }
}

const rows = []
let total = { placeholders: 0, emptyLinks: 0 }

for (const m of MODULES) {
  const seen = new WeakSet()
  const stats2 = { placeholders: 0, emptyLinks: 0, numbers: 0 }
  for (const exported of m.exports) walk(exported, seen, stats2)
  total.placeholders += stats2.placeholders
  total.emptyLinks += stats2.emptyLinks
  rows.push({ ...m, ...stats2 })
}

const pad = (s, n) => String(s).padEnd(n, ' ')

console.log('\n内容占位清单\n')
console.log(
  `  ${pad('模块', 14)}${pad('文件', 30)}${pad('占位标记', 10)}${pad('链接待确认', 12)}`,
)
console.log('  ' + '-'.repeat(66))

for (const row of rows) {
  console.log(
    `  ${pad(row.label, 14)}${pad(row.file, 30)}${pad(row.placeholders, 10)}${pad(row.emptyLinks, 12)}`,
  )
}

console.log('  ' + '-'.repeat(66))
console.log(`  ${pad('合计', 44)}${pad(total.placeholders, 10)}${pad(total.emptyLinks, 12)}`)

// 数字型指标单独提示：这些必须是已核实的数字，不能靠估算填写
console.log('\n需要人工核实的数字型指标（src/data/stats.js）')
for (const item of [...stats.STAT_HIGHLIGHTS, ...stats.SERVICE_HIGHLIGHTS]) {
  console.log(`  - ${item.label}（${item.unit}）${item.value === null ? ' → 待核实' : ''}`)
}

console.log('\n补充说明')
console.log('  - 占位标记：把 tbd(...) 替换为真实字符串即可，界面会自动取消标记。')
console.log('  - 链接位：填入官方公开的 URL；确实没有公开链接时保留空字符串，界面不渲染链接。')
console.log('  - 数字指标：必须来自官方页面或经确认的数据，禁止估算，禁止用 0 代替未知。')
console.log('  - 全部补齐后，可把 src/data/placeholder.js 的 SHOW_CONTENT_AUDIT 设为 false。\n')
