import { createRouter, createWebHistory } from 'vue-router'

/**
 * 页面组件的懒加载入口。
 * 首次访问某个页面时再下载对应 chunk；首屏完成后由 prefetchViews() 预取其余页面，
 * 这样第一次点击导航也不会等网络。
 */
const VIEW_LOADERS = {
  home: () => import('@/views/HomeView.vue'),
  research: () => import('@/views/ResearchView.vue'),
  achievements: () => import('@/views/AchievementsView.vue'),
  publications: () => import('@/views/PublicationsView.vue'),
  team: () => import('@/views/TeamView.vue'),
  join: () => import('@/views/JoinUsView.vue'),
  notFound: () => import('@/views/NotFoundView.vue'),
}

/**
 * 路由表。
 * meta.title / meta.description 由 App.vue 在导航后写入 document，
 * 保证每个页面都有独立的标题与描述。
 * meta.match 与 NAV_ITEMS 中的 match 对应，用于导航高亮。
 */
const routes = [
  {
    path: '/',
    name: 'home',
    component: VIEW_LOADERS.home,
    meta: {
      match: 'home',
      title: '首页',
      description: '可持续架构与智能实验室（SAIL）— 计算机体系结构、人工智能芯片与可持续计算研究。',
    },
  },
  {
    path: '/research',
    name: 'research',
    component: VIEW_LOADERS.research,
    meta: {
      match: 'research',
      title: '研究方向',
      description: '研究背景与关键挑战、核心科学问题、技术路线与典型应用场景。',
    },
  },
  {
    path: '/achievements',
    name: 'achievements',
    component: VIEW_LOADERS.achievements,
    meta: {
      match: 'achievements',
      title: '科研成果',
      description: '代表性论文、科研项目、学术奖励与荣誉、学术服务，支持按年份与类别筛选。',
    },
  },
  {
    path: '/publications',
    name: 'publications',
    component: VIEW_LOADERS.publications,
    meta: {
      match: 'publications',
      title: '论文发表',
      description: '按年份分组的论文目录，支持按发表载体、类型筛选与关键词搜索。',
    },
  },
  {
    path: '/team',
    name: 'team',
    component: VIEW_LOADERS.team,
    meta: {
      match: 'team',
      title: '团队成员',
      description: '导师、博士后、研究生、本科生与已毕业成员，支持按角色筛选。',
    },
  },
  {
    path: '/join',
    name: 'join',
    component: VIEW_LOADERS.join,
    meta: {
      match: 'join',
      title: '招生招聘',
      description: '博士、硕士、本科生科研、博士后与访问学者的招募信息与申请方式。',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: VIEW_LOADERS.notFound,
    meta: {
      match: '',
      title: '页面不存在',
      description: '未找到该页面。',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  /**
   * 滚动行为：
   *  - 浏览器前进/后退时恢复原位置
   *  - 带锚点时滚到锚点，并让出吸顶导航的高度
   *  - 其余情况回到页面顶部
   */
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      // 112px ≈ 吸顶顶部栏 + 研究方向页的页内锚点条，保证跳转后标题完整可见
      return { el: to.hash, top: 112, behavior: 'smooth' }
    }
    if (to.path !== from.path) return { top: 0 }
    return false
  },
})

/**
 * 首屏完成后预取其余页面组件。
 *
 * 背景：路由按页懒加载，第一次进入某个页面时要等对应 chunk 下载完才开始渲染，
 * 在 GitHub Pages / 移动网络下会明显停顿。这里在浏览器空闲时把剩余页面的 chunk
 * 下载好（总增量只有几十 KB），之后所有页面切换都是即时的。
 *
 * 省流量：开启 data-saver 或处于 2G 网络时跳过；单次执行，失败静默忽略。
 */
let prefetchStarted = false

export function prefetchViews() {
  if (prefetchStarted || typeof window === 'undefined') return
  prefetchStarted = true

  const connection = navigator.connection
  if (connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? '')) return

  const loadAll = () => {
    for (const load of Object.values(VIEW_LOADERS)) load().catch(() => {})
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(loadAll, { timeout: 3000 })
  } else {
    window.setTimeout(loadAll, 1500)
  }
}

export default router
