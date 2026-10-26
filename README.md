# 学术网站

面向高校科研团队的学术站点框架。技术栈为 **Vue 3 + Vite + Tailwind CSS**，
纯静态部署，无需后端。

> **当前状态：框架已完整，实际内容全部为占位。**
> 页面上所有需要人工填写的文字、链接、数字都以可见的 **【待补充】** 标记呈现，
> 详见下方「需要人工补充的内容清单」。

---

## 快速开始

```bash
npm install       # 安装依赖
npm run dev       # 启动开发服务器，默认 http://localhost:5173
```

生产构建与本地预览：

```bash
npm run build     # 构建产物输出到 dist/
npm run preview   # 本地预览构建结果
```

### 可用脚本

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 生产构建 |
| `npm run build:pages` | GitHub Pages 构建：生产构建后额外生成 `dist/404.html` 作为前端路由回退 |
| `npm run preview` | 预览 `dist/` 构建产物 |
| `npm run check:render` | 渲染冒烟测试：把每个页面组件真实渲染一遍，捕获构建阶段发现不了的运行时报错 |
| `npm run check:content` | 输出占位内容清单：按文件统计占位标记与待确认链接 |

---

## 部署到 GitHub Pages

仓库内已包含 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)，
推送到 `main` 分支即可自动构建并发布。

### 1. 创建仓库并推送

在 GitHub 上新建一个空仓库（不要勾选自动生成 README），然后在本目录执行：

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<用户名>/<仓库名>.git
git push -u origin main
```

### 2. 开启 Pages

打开仓库 **Settings → Pages → Build and deployment**，
把 **Source** 设为 **GitHub Actions**。首次 push 后可在 **Actions** 标签查看构建进度。

部署地址由仓库名决定，构建时会自动处理子路径：

| 仓库名 | 访问地址 | Vite `base` |
| --- | --- | --- |
| `<用户名>.github.io` | `https://<用户名>.github.io/` | `/` |
| 其他任意名称（如 `sysu-style`） | `https://<用户名>.github.io/sysu-style/` | `/sysu-style/` |

`base` 由 `vite.config.js` 读取 Actions 注入的 `GITHUB_REPOSITORY` 自动推导，
本地 `npm run dev` / `npm run build` 仍使用根路径，无需修改配置。

### 3. 前端路由与 404

站点使用 `createWebHistory`（无 `#` 的干净 URL）。GitHub Pages 没有服务器重写，
因此 `npm run build:pages` 会把 `index.html` 复制为 `404.html`；
直接访问 `/research` 等深链接时由 `404.html` 接管，vue-router 再渲染对应页面。
刷新页面、收藏链接均可正常工作。该回退响应的 HTTP 状态仍是 404（搜索引擎收录会略受影响）；
若不在意地址栏中的 `#`，也可以把路由换成 `createWebHashHistory()` 彻底避免此问题。

### 4. 绑定自定义域名

在 **Settings → Pages → Custom domain** 设置域名后，站点会从根路径提供。
此时在 workflow 的构建步骤中显式指定 `BASE_PATH: /`：

```yaml
      - name: Build
        run: npm run build:pages
        env:
          BASE_PATH: /
```

本地想验证项目子路径的构建效果，可模拟仓库名后预览：

```bash
GITHUB_REPOSITORY=owner/sysu-style npm run build:pages
npm run preview
```

---

## 页面与路由

| 路由 | 页面 | 主要交互 |
| --- | --- | --- |
| `/` | 首页 | 首屏行动入口、研究方向概览、代表性成果、学术影响力、团队介绍、团队动态、招生与合作 |
| `/research` | 研究方向 | 方向锚点导航（滚动高亮）、每个方向的背景/挑战/科学问题/技术路线/应用场景/论文与项目 |
| `/achievements` | 科研成果 | 代表性论文大块展示、项目级别筛选、荣誉类别与年份筛选、专利列表、学术服务分组 |
| `/publications` | 论文发表 | 标题与作者搜索、类型/载体/年份三维筛选、按年份分组折叠、摘要展开 |
| `/team` | 团队成员 | 类别与研究兴趣筛选、导师独立版式、成员分组网格 |
| `/join` | 招生招聘 | 培养理念、训练路径、招募类别手风琴、申请流程、合作交流、联系方式 |
| `/*` | 404 | 站点目录导航 |

导航状态与路由同步（`aria-current`、激活色条），所有外链均为新标签页打开并带
`rel="noopener noreferrer"`。

### 版式：左侧栏 + 右内容栏

全站（含首页）统一为「精简顶部栏 + 左侧导航栏 + 右侧内容栏」：

```
┌──────────────────────────────────────────────────────┐
│ 顶部栏：站点标识（左）              移动端菜单（右）      │
├──────────┬───────────────────────────────────────────┤
│ 导航      │  页面内容                                  │
│ 首页      │  （含各页首屏、正文分区与页脚）              │
│ 研究方向 ←│                                           │
│ 科研成果  │                                           │
│ 论文发表  │                                           │
│ 团队成员  │                                           │
│ 招生招聘  │                                           │
└──────────┴───────────────────────────────────────────┘
```

- 侧栏承载全部一级入口（6 项），**桌面端常驻、跟随滚动吸顶**，贯穿整页高度；
- 侧栏**贴视口左边缘**：外壳层不做 `max-width` 居中，超宽屏多出来的宽度全部给内容栏，
  屏幕越宽导航越靠左；站点标识、侧栏条目、正文三者的左内边距一致（`lg` 下均为 2.5rem），
  左边缘对齐成一列；
- 侧栏整列铺一层比正文略深的淡蓝（`bg-mist-deep`）并带右侧分隔线，
  即使只有 6 个条目，整列也读作一块完整的导航面而非空白；
  宽度 `lg:w-60` / `xl:w-72`，条目按主导航规格排版（17px、通栏点击区），
  当前页以「白色底 + 左侧 3px 色条 + 加粗」三重标记，不依赖颜色单一维度；
- 页脚位于内容栏内部，使侧栏能够一直延伸到底部；
- **移动端（`lg` 以下）不渲染侧栏**，导航收纳为顶部栏中的抽屉，避免窄屏下正文被挤压；
- 页面栅格由 `App.vue` 的 `.layout-with-sidebar` 一层统一决定，
  内容栏内的 `.container-page` 在该版式下不再居中（见 [src/style.css](src/style.css) 中的同名规则），
  因此各分区的底色与分隔线仍能横贯整个内容栏；
  屏幕宽度超过 100rem / 120rem 后，内容栏留白再加一档（4rem / 5rem），
  避免正文字面宽度随屏幕无限拉伸；
- 吸顶高度已对齐：顶部栏 `h-14`/`sm:h-16`，侧栏与研究方向页的页内锚点条均从该高度吸顶，
  `scroll-padding-top` 与路由锚点偏移也按此设置。

---

## 目录结构

```
├─ .github/workflows/deploy.yml  GitHub Pages 自动部署
├─ index.html            入口 HTML（含 SEO meta 与结构化数据）
├─ vite.config.js        构建配置（@ 别名、论文数据分包、Pages base 推导）
├─ scripts/
│  ├─ smoke-render.mjs   渲染冒烟测试
│  ├─ content-audit.mjs  占位内容统计
│  └─ spa-fallback.mjs   GitHub Pages 深链接回退（复制 404.html）
├─ public/
│  ├─ sysu-logo.png      官方校徽（顶栏 / 页脚 / favicon / 首屏水印）
│  └─ fonts/             自托管字体（Open Sans / Titillium Web）
└─ src/
   ├─ main.js            应用入口（挂载 v-reveal 指令）
   ├─ App.vue            外壳与版式：顶部栏 / 侧栏 / 内容栏 / 页脚 / 页面切换与标题管理
   ├─ style.css          设计系统：颜色、字体、栅格、圆角、阴影、占位样式
   ├─ router/index.js    路由表（含每页 title / description）
   ├─ directives/        v-reveal 滚动渐入指令
   ├─ composables/       useScrollY 等通用逻辑
   ├─ data/              ★ 全部内容都在这里，替换内容只需改这一层
   ├─ components/        通用组件与 SVG 示意图
   │  ├─ AppTopbar.vue   精简顶部栏 + 移动端导航抽屉
   │  ├─ AppSidebar.vue  桌面端左侧主导航
   │  └─ AppFooter.vue   页脚
   └─ views/             7 个页面
```

**内容与结构分离**：页面组件只负责版式与交互，所有事实性内容都来自 `src/data/`。
补齐内容时不需要改动任何组件代码。

---

## 需要人工补充的内容清单

执行 `npm run check:content` 可随时打印最新清单。当前统计：

| 模块 | 文件 | 占位标记 | 链接待确认 |
| --- | --- | ---: | ---: |
| 站点信息 | `src/data/site.js` | 17 | 9 |
| 研究方向 | `src/data/research.js` | 178 | 28 |
| 论文数据 | `src/data/publications.js` | 62 | 56 |
| 奖励荣誉 | `src/data/awards.js` | 45 | 17 |
| 科研项目 | `src/data/projects.js` | 32 | 8 |
| 专利与软著 | `src/data/patents.js` | 12 | 6 |
| 团队成员 | `src/data/members.js` | 117 | 54 |
| 学术服务 | `src/data/services.js` | 35 | 19 |
| 团队动态 | `src/data/news.js` | 15 | 5 |
| 学科与理念 | `src/data/philosophy.js` | 32 | 3 |
| 招生合作 | `src/data/join.js` | 41 | 2 |
| 统计指标 | `src/data/stats.js` | — | — |
| **合计** | | **586** | **207** |

### 按优先级补充

1. **`src/data/site.js`** — 站点名称、教授姓名与职称、所属机构、一句话定位、格言、
   邮箱与地址、官方链接。这是全站标识与页脚的基础，优先级最高。
2. **`src/data/stats.js`** — 首页「学术影响力」的 6 个数字。**必须核实后再填**，
   未核实保持 `null`（界面显示【待补充】），不要用 `0` 代替未知。
3. **`src/data/research.js`** — 各研究方向的背景、挑战、科学问题、技术路线、
   应用场景、关键词、代表论文与相关项目。
4. **`src/data/publications.js`** — 论文条目的标题、完整作者、发表载体、年份、
   原文链接、荣誉标记。
5. **`src/data/members.js`** — 成员姓名、身份、研究兴趣、简介、个人主页。
6. **`src/data/awards.js` / `projects.js` / `patents.js` / `services.js` / `news.js`** —
   荣誉、项目、专利、学术服务与团队动态。
7. **`src/data/philosophy.js` / `join.js`** — 团队理念、培养模式、招生要求与申请流程。

### 关于演示用年份

以下文件中的年份是**为了让排序与筛选功能可被验证而保留的演示值，不是真实年份**，
替换内容时请一并改为实际年份：

- `src/data/awards.js` → `Y`
- `src/data/projects.js` → `YEARS`
- `src/data/patents.js` → `Y`
- `src/data/members.js` → `COHORTS`
- `src/data/publications.js` → 各条目的 `year` / `acronym`
- `src/data/news.js` → 各条目的 `date` / `year`

---

## 内容真实性约束

本站是学术站点，以下规则在补充内容时必须遵守：

- **不得编造**论文、荣誉、项目经历、团队成员；不得虚构研究统计与实验结果；
  不得把未经证实的结果描述为已实现的突破。
- **不要使用**非官方的学校或机构标识、以及其他受保护的标记。
  `src/components/BrandMark.vue` 中的图形是本站自绘的中性标识，不属于任何官方校徽。
- **联系邮箱、官方链接**只使用官方页面已公开的信息；未公开的字段留空字符串，
  界面会自动隐藏或不渲染链接，避免出现死链。
- **学生个人联系方式**不在本站收录。
- **成员照片**仅在已获授权或已在官方页面公开时使用；其余情况一律保留统一的
  中性占位，不使用他人照片顶替。
- **论文荣誉标记**（如最佳论文）只在有公开依据时填写 `award` 字段。

---

## 内容占位机制

| 位置 | 说明 |
| --- | --- |
| `src/data/placeholder.js` | `tbd(label)` 生成占位字符串，`isTbd()` 判断 |
| `<TbdText>` | 文本占位渲染器；空字符串自动生成【待补充：字段说明】 |
| `<TbdBlock>` | 整个列表缺失时的占位区块（例如某方向暂无项目） |
| 页面右下角浮标 | 实时统计各文件的占位数量，可折叠、可关闭 |
| `npm run check:content` | 命令行版本的同款统计 |

补齐内容后，把 `src/data/placeholder.js` 中的 `SHOW_CONTENT_AUDIT` 改为 `false`
即可隐藏浮标。

---

## 设计规范

- **色彩**：参考中山大学课程站点的校色体系。深海军蓝（`navy-900` `#336699`）
  用于顶部栏、首屏与页脚强调区块，其下沿固定 6px 校色橙（`orange-500` `#f66733`）；
  页面底色为纸白（`paper` `#fdfdfd`），分区用浅蓝灰（`mist` `#f0f4f8`）；
  一级标题用深紫（`plum-700` `#522d80`），链接用强调蓝（`accent-500` `#0077cc`）；
  分隔线为中性浅灰（`line` `#e8e8e8`）。荣誉标记使用低饱和金褐色。
  占位内容用金色虚线标记，与真实内容区分。不使用霓虹渐变、发光、玻璃拟态等效果。
- **字体**：正文 Open Sans，标题与导航 Titillium Web，均自托管 woff2
  （`public/fonts/`，含拉丁字符；中文回退 PingFang SC / 思源黑体 / 微软雅黑），
  编号与代码用等宽字体。
- **校徽**：`public/sysu-logo.png`（官方校徽）用于顶部栏、页脚、favicon，
  并作为首屏的低透明度水印。
- **节奏**：大留白、明确网格、清晰标题层级；页面纵向深度充足，
  大块展示与紧凑列表交替，避免通篇同一节奏。
- **动效**：滚动渐入、导航状态切换、卡片悬停、页面淡入，全部轻量；
  系统开启「减少动态效果」时自动关闭。
- **配图**：首屏与研究方向页使用自绘 SVG 示意图（芯片、存储层次、集群调度、抽象层次），
  矢量绘制、不依赖网络、不产生布局跳动，也不涉及图片版权问题。

### 无障碍与响应式

- 键盘可访问：跳转到主内容链接、`aria-expanded` / `aria-pressed` / `aria-current`、
  筛选器方向键导航、抽屉 Esc 关闭、明确的焦点样式。
- 语义标签：`header` / `nav` / `main` / `article` / `figure` / `dl`，图片均有替代文本。
- 响应式：桌面 / 平板 / 手机三档布局，移动端导航折叠为抽屉，
  论文列表在移动端隐藏冗余年份列并收紧行距，正文不会横向滚动。
- 图片加载：声明 `width` / `height` 并使用 `loading="lazy"`；
  图片加载失败时文字内容仍完整可读。

---

## 版本记录

| 版本 | 版式与配色 | 位置 |
| --- | --- | --- |
| v1 | 顶部横向导航，首页整屏深色首屏 | `D:\Code\WebSite-backup-v1-topnav\`（完整源码备份） |
| v2 | 精简顶部栏 + 左侧导航栏 + 右内容栏，外壳居中（`max-w-[100rem]`），暖白中性色 | 未单独留档 |
| v2.1 | 同上，但**外壳通栏、侧栏贴视口左缘**；中性色整体改为**蓝调**（`mist` / `mist-deep`） | 未单独留档（由 v3 覆盖） |
| v3（当前） | **保持顶栏 + 左侧栏 + 右内容栏的结构与页面顺序**，配色改用 SYSU 校色（海军蓝 `#336699` + 校色橙 `#f66733`、紫色标题 `#522d80`、蓝色链接 `#0077cc`），字体改为 Open Sans + Titillium Web，并加入官方校徽 | 本目录 |

v3 的视觉令牌集中定义在 [src/style.css](src/style.css) 的 `@theme` 中；
校色的大面积使用（顶栏、首屏、页脚等）分布在 `AppTopbar.vue`、`HomeView.vue`、
`JoinUsView.vue`、`AppSidebar.vue`、`AppFooter.vue` 与 `PageHero.vue`。
字体与校徽文件位于 `public/fonts/` 与 `public/sysu-logo.png`，离线可用。

备份目录是可直接运行的完整副本（不含 `node_modules` 与 `dist`），
需要回到 v1 时把 `src/`、`index.html`、`vite.config.js` 等文件覆盖回来即可。

## 已知限制

- 渲染冒烟测试覆盖组件渲染逻辑，但**滚动、焦点、抽屉、侧栏吸顶等依赖浏览器 API 的
  交互未自动测试**，需在浏览器中人工确认（建议检查 375px / 1024px / 1440px 三档宽度，
  其中 1024px 是侧栏出现/消失的临界点）。
- 站点为单页应用，如部署到静态托管且需要深链接直达，请开启 history 模式回退到
  `index.html`。
- 搜索为前端全量匹配（当前论文量级下性能充足）；数据量大幅增长后可考虑
  预建索引或分页。
