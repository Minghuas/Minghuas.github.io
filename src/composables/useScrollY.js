import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * 监听纵向滚动位置。
 * 使用 passive 监听 + rAF 节流，避免滚动时阻塞主线程。
 *
 * @returns {{ y: import('vue').Ref<number> }}
 */
export function useScrollY() {
  const y = ref(0)
  let ticking = false

  function read() {
    y.value = window.scrollY || window.pageYOffset || 0
    ticking = false
  }

  function onScroll() {
    if (ticking) return
    ticking = true
    window.requestAnimationFrame(read)
  }

  onMounted(() => {
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
  })

  return { y }
}

export default useScrollY
