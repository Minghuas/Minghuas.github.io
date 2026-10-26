/**
 * 数据集派生统计 — src/data/derive.js
 *
 * 这些数字由本地数据实时算出，只反映 src/data/publications.js 的内容，
 * 属于「目录统计」而非「学术影响力指标」，界面上必须注明统计口径。
 * 对外宣传用的指标请放在 src/data/stats.js 并人工核实。
 */

import { PUBLICATION_SEED, PUBLICATION_TYPES } from './publications.js'

/**
 * 统计论文数据集。
 * @param {Array} [seed] 论文数据集，默认使用 PUBLICATION_SEED
 */
export function computePublicationStats(seed = PUBLICATION_SEED) {
  const byType = PUBLICATION_TYPES.map((t) => ({
    ...t,
    count: seed.filter((p) => p.type === t.key).length,
  }))

  const years = seed.map((p) => p.year).filter((y) => typeof y === 'number')
  const byYear = [...new Set(years)]
    .sort((a, b) => b - a)
    .map((year) => ({ year, count: seed.filter((p) => p.year === year).length }))

  const venueMap = new Map()
  for (const p of seed) {
    const key = p.acronym || p.venue
    if (!key) continue
    venueMap.set(key, (venueMap.get(key) || 0) + 1)
  }
  const byVenue = [...venueMap.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((a, b) => b.count - a.count || a.key.localeCompare(b.key))

  return {
    total: seed.length,
    byType,
    byYear,
    byVenue,
    yearRange: years.length ? [Math.min(...years), Math.max(...years)] : [null, null],
    withLink: seed.filter((p) => p.link).length,
    featured: seed.filter((p) => p.featured).length,
  }
}

export default computePublicationStats
