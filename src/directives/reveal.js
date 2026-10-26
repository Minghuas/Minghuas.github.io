/**
 * v-reveal —— 滚动渐入指令
 *
 * 用法：
 *   <div v-reveal>…</div>
 *   <div v-reveal="{ delay: 120 }">…</div>          延迟 120ms
 *   <div v-reveal="{ threshold: 0.25 }">…</div>      进入视口 25% 时触发
 *
 * 行为：
 *   - 元素进入视口后加上 data-reveal="in"，触发 CSS 过渡，随后停止观察。
 *   - 系统开启「减少动态效果」时直接置为可见，不做动画。
 *   - 同一指令实例共享一个 IntersectionObserver，避免大量元素时开销过大。
 *   - 不支持 IntersectionObserver 的环境（极旧浏览器）直接显示内容。
 */

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const supportsObserver = () => typeof IntersectionObserver !== 'undefined'

/** 按 rootMargin/threshold 组合缓存观察器 */
const observers = new Map()

function getObserver(rootMargin, threshold) {
  const key = `${rootMargin}|${threshold}`
  if (observers.has(key)) return observers.get(key)

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.setAttribute('data-reveal', 'in')
        observer.unobserve(entry.target)
      }
    },
    { rootMargin, threshold },
  )

  observers.set(key, observer)
  return observer
}

function showImmediately(el) {
  el.setAttribute('data-reveal', 'in')
}

export const reveal = {
  mounted(el, binding) {
    const options = binding.value && typeof binding.value === 'object' ? binding.value : {}

    if (typeof options.delay === 'number' && options.delay > 0) {
      el.style.setProperty('--reveal-delay', `${options.delay}ms`)
    }

    if (!supportsObserver() || prefersReducedMotion()) {
      showImmediately(el)
      return
    }

    const rootMargin = options.rootMargin || '0px 0px -8% 0px'
    const threshold = typeof options.threshold === 'number' ? options.threshold : 0.08

    el.setAttribute('data-reveal', '')
    getObserver(rootMargin, threshold).observe(el)
    el.__revealObserver = getObserver(rootMargin, threshold)
  },

  unmounted(el) {
    el.__revealObserver?.unobserve(el)
    delete el.__revealObserver
  },
}

export default reveal
