/**
 * 论文发表数据 — src/data/publications.js
 *
 * ⚠️ 当前状态：全部为占位内容，尚未填入真实论文。
 *    - 标题 / 作者 / 会议期刊 / 荣誉：均为可见占位标记
 *    - link 一律为空字符串，界面因此不渲染外链（不放置假链接）
 *    - year 使用 2011–2027 的年份区间，仅用于验证「按年份分组」的排序与折叠
 *    - acronym 使用 6 个占位载体，仅用于验证「发表载体」筛选的分组
 *
 * 替换方式：把 PUBLICATION_SEED 换成真实条目即可，字段结构保持不变。
 * 字段说明：
 *   id        稳定标识，用于列表 key
 *   type      conference | journal | abstract | domestic，对应 PUBLICATION_TYPES
 *   year      发表年份，用于年份分组与筛选
 *   acronym   会议或期刊缩写，用于「发表载体」筛选
 *   venue     会议或期刊全称
 *   title     论文标题
 *   authors   完整作者列表
 *   students  团队学生作者（可选，用于与成员页交叉检索）
 *   link      原文链接；为空则界面不渲染链接，仅显示占位标记
 *   abstract  摘要简介（1–3 句，不要整段粘贴官方摘要）；缺省时列表中的
 *             「摘要」折叠区显示占位标记
 *   award     论文荣誉；为空则不渲染荣誉标记
 *   featured  是否首页/成果页高亮展示
 */

/** 论文类型选项，供列表筛选器使用 */
export const PUBLICATION_TYPES = [
  { key: "conference", label: "国际会议", count: 30 },
  { key: "journal", label: "国际期刊", count: 14 },
  { key: "abstract", label: "短文摘要", count: 5 },
  { key: "domestic", label: "中文出版", count: 7 },
]

/** 论文条目。当前全部为占位内容。 */
export const PUBLICATION_SEED = [
  { "id": "c001", "type": "conference", "year": 2020, "acronym": "【载体 02】", "venue": "【会议或期刊全称占位 02】", "title": "【论文标题占位 01】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "c002", "type": "conference", "year": 2011, "acronym": "【载体 03】", "venue": "【会议或期刊全称占位 03】", "title": "【论文标题占位 02】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "c003", "type": "conference", "year": 2021, "acronym": "【载体 04】", "venue": "【会议或期刊全称占位 04】", "title": "【论文标题占位 03】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "c004", "type": "conference", "year": 2013, "acronym": "【载体 05】", "venue": "【会议或期刊全称占位 05】", "title": "【论文标题占位 04】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "c005", "type": "conference", "year": 2022, "acronym": "【载体 06】", "venue": "【会议或期刊全称占位 06】", "title": "【论文标题占位 05】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "c006", "type": "conference", "year": 2014, "acronym": "【载体 01】", "venue": "【会议或期刊全称占位 01】", "title": "【论文标题占位 06】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "c007", "type": "conference", "year": 2023, "acronym": "【载体 02】", "venue": "【会议或期刊全称占位 02】", "title": "【论文标题占位 07】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "c008", "type": "conference", "year": 2015, "acronym": "【载体 03】", "venue": "【会议或期刊全称占位 03】", "title": "【论文标题占位 08】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "c009", "type": "conference", "year": 2024, "acronym": "【载体 04】", "venue": "【会议或期刊全称占位 04】", "title": "【论文标题占位 09】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "【论文荣誉待补充】", "featured": true },
  { "id": "c010", "type": "conference", "year": 2016, "acronym": "【载体 05】", "venue": "【会议或期刊全称占位 05】", "title": "【论文标题占位 10】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "c011", "type": "conference", "year": 2025, "acronym": "【载体 06】", "venue": "【会议或期刊全称占位 06】", "title": "【论文标题占位 11】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "c012", "type": "conference", "year": 2018, "acronym": "【载体 01】", "venue": "【会议或期刊全称占位 01】", "title": "【论文标题占位 12】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "c013", "type": "conference", "year": 2026, "acronym": "【载体 02】", "venue": "【会议或期刊全称占位 02】", "title": "【论文标题占位 13】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "c014", "type": "conference", "year": 2019, "acronym": "【载体 03】", "venue": "【会议或期刊全称占位 03】", "title": "【论文标题占位 14】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "c015", "type": "conference", "year": 2027, "acronym": "【载体 04】", "venue": "【会议或期刊全称占位 04】", "title": "【论文标题占位 15】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "c016", "type": "conference", "year": 2020, "acronym": "【载体 05】", "venue": "【会议或期刊全称占位 05】", "title": "【论文标题占位 16】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "c017", "type": "conference", "year": 2011, "acronym": "【载体 06】", "venue": "【会议或期刊全称占位 06】", "title": "【论文标题占位 17】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "c018", "type": "conference", "year": 2021, "acronym": "【载体 01】", "venue": "【会议或期刊全称占位 01】", "title": "【论文标题占位 18】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "【论文荣誉待补充】", "featured": true },
  { "id": "c019", "type": "conference", "year": 2013, "acronym": "【载体 02】", "venue": "【会议或期刊全称占位 02】", "title": "【论文标题占位 19】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "c020", "type": "conference", "year": 2022, "acronym": "【载体 03】", "venue": "【会议或期刊全称占位 03】", "title": "【论文标题占位 20】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "c021", "type": "conference", "year": 2014, "acronym": "【载体 04】", "venue": "【会议或期刊全称占位 04】", "title": "【论文标题占位 21】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "c022", "type": "conference", "year": 2023, "acronym": "【载体 05】", "venue": "【会议或期刊全称占位 05】", "title": "【论文标题占位 22】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "c023", "type": "conference", "year": 2015, "acronym": "【载体 06】", "venue": "【会议或期刊全称占位 06】", "title": "【论文标题占位 23】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "c024", "type": "conference", "year": 2024, "acronym": "【载体 01】", "venue": "【会议或期刊全称占位 01】", "title": "【论文标题占位 24】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "c025", "type": "conference", "year": 2016, "acronym": "【载体 02】", "venue": "【会议或期刊全称占位 02】", "title": "【论文标题占位 25】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "c026", "type": "conference", "year": 2025, "acronym": "【载体 03】", "venue": "【会议或期刊全称占位 03】", "title": "【论文标题占位 26】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "c027", "type": "conference", "year": 2018, "acronym": "【载体 04】", "venue": "【会议或期刊全称占位 04】", "title": "【论文标题占位 27】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "【论文荣誉待补充】", "featured": true },
  { "id": "c028", "type": "conference", "year": 2026, "acronym": "【载体 05】", "venue": "【会议或期刊全称占位 05】", "title": "【论文标题占位 28】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "c029", "type": "conference", "year": 2019, "acronym": "【载体 06】", "venue": "【会议或期刊全称占位 06】", "title": "【论文标题占位 29】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "c030", "type": "conference", "year": 2027, "acronym": "【载体 01】", "venue": "【会议或期刊全称占位 01】", "title": "【论文标题占位 30】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "j001", "type": "journal", "year": 2020, "acronym": "【载体 02】", "venue": "【会议或期刊全称占位 02】", "title": "【论文标题占位 01】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "j002", "type": "journal", "year": 2011, "acronym": "【载体 03】", "venue": "【会议或期刊全称占位 03】", "title": "【论文标题占位 02】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "j003", "type": "journal", "year": 2021, "acronym": "【载体 04】", "venue": "【会议或期刊全称占位 04】", "title": "【论文标题占位 03】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "j004", "type": "journal", "year": 2013, "acronym": "【载体 05】", "venue": "【会议或期刊全称占位 05】", "title": "【论文标题占位 04】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "j005", "type": "journal", "year": 2022, "acronym": "【载体 06】", "venue": "【会议或期刊全称占位 06】", "title": "【论文标题占位 05】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "j006", "type": "journal", "year": 2014, "acronym": "【载体 01】", "venue": "【会议或期刊全称占位 01】", "title": "【论文标题占位 06】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "【论文荣誉待补充】", "featured": true },
  { "id": "j007", "type": "journal", "year": 2023, "acronym": "【载体 02】", "venue": "【会议或期刊全称占位 02】", "title": "【论文标题占位 07】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "j008", "type": "journal", "year": 2015, "acronym": "【载体 03】", "venue": "【会议或期刊全称占位 03】", "title": "【论文标题占位 08】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "j009", "type": "journal", "year": 2024, "acronym": "【载体 04】", "venue": "【会议或期刊全称占位 04】", "title": "【论文标题占位 09】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "j010", "type": "journal", "year": 2016, "acronym": "【载体 05】", "venue": "【会议或期刊全称占位 05】", "title": "【论文标题占位 10】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "j011", "type": "journal", "year": 2025, "acronym": "【载体 06】", "venue": "【会议或期刊全称占位 06】", "title": "【论文标题占位 11】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "j012", "type": "journal", "year": 2018, "acronym": "【载体 01】", "venue": "【会议或期刊全称占位 01】", "title": "【论文标题占位 12】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "j013", "type": "journal", "year": 2026, "acronym": "【载体 02】", "venue": "【会议或期刊全称占位 02】", "title": "【论文标题占位 13】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "j014", "type": "journal", "year": 2019, "acronym": "【载体 03】", "venue": "【会议或期刊全称占位 03】", "title": "【论文标题占位 14】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "a001", "type": "abstract", "year": 2027, "acronym": "【载体 04】", "venue": "【会议或期刊全称占位 04】", "title": "【论文标题占位 01】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "【论文荣誉待补充】", "featured": true },
  { "id": "a002", "type": "abstract", "year": 2020, "acronym": "【载体 05】", "venue": "【会议或期刊全称占位 05】", "title": "【论文标题占位 02】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "a003", "type": "abstract", "year": 2011, "acronym": "【载体 06】", "venue": "【会议或期刊全称占位 06】", "title": "【论文标题占位 03】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "a004", "type": "abstract", "year": 2021, "acronym": "【载体 01】", "venue": "【会议或期刊全称占位 01】", "title": "【论文标题占位 04】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "a005", "type": "abstract", "year": 2013, "acronym": "【载体 02】", "venue": "【会议或期刊全称占位 02】", "title": "【论文标题占位 05】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "d001", "type": "domestic", "year": 2022, "acronym": "【载体 03】", "venue": "【会议或期刊全称占位 03】", "title": "【论文标题占位 01】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "d002", "type": "domestic", "year": 2014, "acronym": "【载体 04】", "venue": "【会议或期刊全称占位 04】", "title": "【论文标题占位 02】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "d003", "type": "domestic", "year": 2023, "acronym": "【载体 05】", "venue": "【会议或期刊全称占位 05】", "title": "【论文标题占位 03】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "d004", "type": "domestic", "year": 2015, "acronym": "【载体 06】", "venue": "【会议或期刊全称占位 06】", "title": "【论文标题占位 04】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "d005", "type": "domestic", "year": 2024, "acronym": "【载体 01】", "venue": "【会议或期刊全称占位 01】", "title": "【论文标题占位 05】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "【论文荣誉待补充】", "featured": true },
  { "id": "d006", "type": "domestic", "year": 2016, "acronym": "【载体 02】", "venue": "【会议或期刊全称占位 02】", "title": "【论文标题占位 06】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
  { "id": "d007", "type": "domestic", "year": 2025, "acronym": "【载体 03】", "venue": "【会议或期刊全称占位 03】", "title": "【论文标题占位 07】", "authors": "【作者甲】, 【作者乙】, 【作者丙】, 【待补充】", "students": [], "link": "", "award": "" },
]

export default PUBLICATION_SEED
