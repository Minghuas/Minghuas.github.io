import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
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
