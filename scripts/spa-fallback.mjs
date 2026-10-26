/**
 * GitHub Pages SPA 回退 — scripts/spa-fallback.mjs
 *
 * GitHub Pages 没有服务器端重写规则，直接访问 /research 这类前端路由会返回 404。
 * 把构建出的 index.html 复制一份为 404.html 后，Pages 会用该页面响应未知路径，
 * vue-router 再按真实 URL 渲染对应页面。
 *
 * 运行：npm run build:pages（在 vite build 之后）
 */
import { copyFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const distDir = fileURLToPath(new URL('../dist/', import.meta.url))

await copyFile(join(distDir, 'index.html'), join(distDir, '404.html'))
console.log('已生成 dist/404.html（GitHub Pages 深链接回退）')
