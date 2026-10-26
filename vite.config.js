import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

/**
 * GitHub Pages 的部署路径：
 *   - 用户/组织主页仓库（<owner>.github.io）部署在站点根路径；
 *   - 其他仓库属于「项目站点」，部署在 /<repo>/ 子路径。
 * 本地构建默认使用根路径；绑定自定义域名时，可在构建环境中设 BASE_PATH=/ 覆盖。
 * vue-router 使用 import.meta.env.BASE_URL 作为 history base，会自动跟随这里。
 */
const [repoOwner = '', repoName = ''] = (process.env.GITHUB_REPOSITORY ?? '').split('/')
const isUserSite = repoName.toLowerCase() === `${repoOwner}.github.io`.toLowerCase()
const base = process.env.BASE_PATH || (repoName ? (isUserSite ? '/' : `/${repoName}/`) : '/')

export default defineConfig({
  base,
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    open: false,
  },
  build: {
    outDir: 'dist',
    /*
     * 论文数据体量较大，单独分包，避免首页与其它页面被动加载整份论文目录。
     * 注意：Vite 8 底层使用 rolldown，manualChunks 只接受函数形式，
     *       对象形式（键值映射）会报 "Expected Function but received Object"。
     */
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('/src/data/publications.js')) return 'publications'
          return undefined
        },
      },
    },
  },
})
