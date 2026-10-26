/**
 * 渲染冒烟测试 — scripts/smoke-render.mjs
 *
 * 目的：在不启动浏览器的前提下，把每个页面组件真实渲染一遍，
 *       捕获「模板能编译但运行时报错」的问题（取值为 undefined、
 *       数据字段缺失、filters/computed 出错等），这是构建通过也发现不了的。
 *
 * 做法：用 Vite 的 SSR 模块加载器加载 .vue 组件与 @/ 别名下的数据文件，
 *       注入一个内存路由（供 useRoute 使用）与 RouterLink 替身，然后 renderToString。
 *
 * 运行：npm run check:render
 *
 * 说明：SSR 不执行 onMounted，因此依赖浏览器 API 的交互（滚动、IntersectionObserver、
 *       焦点管理、抽屉开关）不在此测试范围内，需要人工在浏览器中确认。
 */
import { createServer } from 'vite'
import { h, createSSRApp } from 'vue'
import { renderToString } from '@vue/server-renderer'
import { createMemoryHistory, createRouter } from 'vue-router'

const Blank = { name: 'Blank', render: () => h('div') }

/** 内存路由：仅提供 useRoute 所需的当前路由信息，页面组件本身不依赖真实路由表 */
function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', name: 'home', component: Blank, meta: { match: 'home', title: '首页', description: '首页' } },
      { path: '/research', name: 'research', component: Blank, meta: { match: 'research', title: '研究方向', description: '研究方向' } },
      { path: '/achievements', name: 'achievements', component: Blank, meta: { match: 'achievements', title: '科研成果', description: '科研成果' } },
      { path: '/publications', name: 'publications', component: Blank, meta: { match: 'publications', title: '论文发表', description: '论文发表' } },
      { path: '/team', name: 'team', component: Blank, meta: { match: 'team', title: '团队成员', description: '团队成员' } },
      { path: '/join', name: 'join', component: Blank, meta: { match: 'join', title: '招生招聘', description: '招生招聘' } },
      { path: '/:pathMatch(.*)*', name: 'not-found', component: Blank, meta: { match: '', title: '页面不存在', description: '未找到该页面。' } },
    ],
  })
}

/** 页面在各自对应的路由下渲染，导航高亮等依赖当前路由的逻辑才能被覆盖到 */
const VIEWS = [
  ['HomeView', '/'],
  ['ResearchView', '/research'],
  ['AchievementsView', '/achievements'],
  ['PublicationsView', '/publications'],
  ['TeamView', '/team'],
  ['JoinUsView', '/join'],
  ['NotFoundView', '/no-such-page'],
]

/** 除页面外的核心组件，单独渲染以确认数据绑定无误 */
const COMPONENTS = [
  ['components/AppTopbar.vue', 'AppTopbar'],
  ['components/AppSidebar.vue', 'AppSidebar'],
  ['components/AppFooter.vue', 'AppFooter'],
  ['components/ContentAudit.vue', 'ContentAudit'],
]

/** 应用外壳：连同版式一起渲染，验证「顶部栏 + 侧栏 + 内容栏 + 页脚」的组合 */
const SHELL = 'App.vue'

async function main() {
  const server = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    logLevel: 'warn',
  })

  let failed = 0
  const rows = []

  const renderOne = async (path, label, at = '/research') => {
    try {
      const mod = await server.ssrLoadModule(path)

      const app = createSSRApp(mod.default ?? mod)
      const router = createTestRouter()
      app.use(router)
      // 使用真实的 RouterLink，顺带验证站内链接的目标路由都已注册
      await router.push(at)
      await router.isReady()

      app.directive('reveal', {})

      const html = await renderToString(app)

      const placeholders = (html.match(/【待补充/g) || []).length
      rows.push({ label, ok: true, bytes: html.length, placeholders })
    } catch (error) {
      failed += 1
      rows.push({ label, ok: false, error: error?.stack || String(error) })
    }
  }

  for (const [name, at] of VIEWS) await renderOne(`/src/views/${name}.vue`, name, at)
  for (const [path, label] of COMPONENTS) await renderOne(`/src/${path}`, label)
  await renderOne(`/src/${SHELL}`, 'App（外壳）', '/team')

  await server.close()

  for (const row of rows) {
    if (row.ok) {
      console.log(
        `  ✓ ${row.label.padEnd(18)} ${String(row.bytes).padStart(7)} 字节  占位标记 ${row.placeholders} 处`,
      )
    } else {
      console.log(`  ✗ ${row.label}`)
      console.log(row.error)
    }
  }

  console.log(
    failed === 0
      ? `\n全部 ${rows.length} 个组件渲染通过。`
      : `\n有 ${failed} 个组件渲染失败。`,
  )

  process.exit(failed === 0 ? 0 : 1)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
