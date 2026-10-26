import { createApp } from 'vue'
import App from './App.vue'
import router, { prefetchViews } from './router/index.js'
import { reveal } from './directives/reveal.js'
import './style.css'

/**
 * 滚动渐入的「先隐藏」样式只在 JS 生效后启用。
 * 这样即使脚本失败，页面内容也始终可见，不会出现大片空白。
 */
document.documentElement.classList.add('js-reveal')

const app = createApp(App)

app.directive('reveal', reveal)
app.use(router)
app.mount('#app')

/**
 * 首屏路由解析完成、且页面资源加载结束后，再预取其余页面。
 * 让首屏图片、字体优先占用带宽；预取本身还会再等一次浏览器空闲。
 */
router.isReady().then(() => {
  if (document.readyState === 'complete') prefetchViews()
  else window.addEventListener('load', prefetchViews, { once: true })
})
