import { createRouter, createWebHistory } from 'vue-router'

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
    component: () => import('@/views/HomeView.vue'),
    meta: {
      match: 'home',
      title: '首页',
      description: '可持续架构与智能实验室（SAIL）— 计算机体系结构、人工智能芯片与可持续计算研究。',
    },
  },
  {
    path: '/research',
    name: 'research',
    component: () => import('@/views/ResearchView.vue'),
    meta: {
      match: 'research',
      title: '研究方向',
      description: '研究背景与关键挑战、核心科学问题、技术路线与典型应用场景。',
    },
  },
  {
    path: '/achievements',
    name: 'achievements',
    component: () => import('@/views/AchievementsView.vue'),
    meta: {
      match: 'achievements',
      title: '科研成果',
      description: '代表性论文、科研项目、学术奖励与荣誉、学术服务，支持按年份与类别筛选。',
    },
  },
  {
    path: '/publications',
    name: 'publications',
    component: () => import('@/views/PublicationsView.vue'),
    meta: {
      match: 'publications',
      title: '论文发表',
      description: '按年份分组的论文目录，支持按发表载体、类型筛选与关键词搜索。',
    },
  },
  {
    path: '/team',
    name: 'team',
    component: () => import('@/views/TeamView.vue'),
    meta: {
      match: 'team',
      title: '团队成员',
      description: '导师、博士后、研究生、本科生与已毕业成员，支持按角色筛选。',
    },
  },
  {
    path: '/join',
    name: 'join',
    component: () => import('@/views/JoinUsView.vue'),
    meta: {
      match: 'join',
      title: '招生招聘',
      description: '博士、硕士、本科生科研、博士后与访问学者的招募信息与申请方式。',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
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

export default router
