<script setup>
/**
 * ClusterArt —— 算力集群与调度路径示意图
 *
 * 说明：纯几何示意，用节点、链路与一条被高亮的调度路径表达
 * 「集群资源调度」的概念，不含任何具体的规模或性能数据。
 *
 * 用途：研究方向页「高性能计算系统与算力集群」「系统资源管理」方向配图。
 */
defineProps({
  /** 图的宽度使用场景，影响纵宽比 */
  tall: { type: Boolean, default: false },
})

// 三排节点，模拟机架 / 分组的层次；坐标为固定值，保证渲染稳定
const NODES = [
  // 第一排
  { id: 'a1', x: 88, y: 62 },
  { id: 'a2', x: 200, y: 62 },
  { id: 'a3', x: 312, y: 62 },
  { id: 'a4', x: 424, y: 62 },
  // 第二排
  { id: 'b1', x: 88, y: 156 },
  { id: 'b2', x: 200, y: 156 },
  { id: 'b3', x: 312, y: 156 },
  { id: 'b4', x: 424, y: 156 },
  // 第三排
  { id: 'c1', x: 88, y: 250 },
  { id: 'c2', x: 200, y: 250 },
  { id: 'c3', x: 312, y: 250 },
  { id: 'c4', x: 424, y: 250 },
]

// 链路：同一排内相邻 + 跨排同列
const LINKS = [
  ['a1', 'a2'], ['a2', 'a3'], ['a3', 'a4'],
  ['b1', 'b2'], ['b2', 'b3'], ['b3', 'b4'],
  ['c1', 'c2'], ['c2', 'c3'], ['c3', 'c4'],
  ['a1', 'b1'], ['a2', 'b2'], ['a3', 'b3'], ['a4', 'b4'],
  ['b1', 'c1'], ['b2', 'c2'], ['b3', 'c3'], ['b4', 'c4'],
]

const byId = Object.fromEntries(NODES.map((n) => [n.id, n]))

/** 被高亮的调度路径：体现「任务从一个入口流转到目标节点」 */
const PATH = ['a1', 'a2', 'b2', 'b3', 'c3']
const PATH_D = PATH.map((id, i) => `${i === 0 ? 'M' : 'L'}${byId[id].x} ${byId[id].y}`).join(' ')
</script>

<template>
  <figure class="not-prose">
    <div class="rounded-card border border-line bg-mist p-4 sm:p-6">
      <svg
        viewBox="0 0 512 312"
        class="w-full"
        :class="tall ? '' : ''"
        role="img"
        aria-label="算力集群节点与资源调度路径示意图"
      >
        <!-- 链路 -->
        <g stroke="#cfd9e3" stroke-width="1.4" fill="none">
          <path v-for="([from, to], i) in LINKS" :key="i" :d="`M${byId[from].x} ${byId[from].y}L${byId[to].x} ${byId[to].y}`" />
        </g>

        <!-- 调度路径：加粗 + 流动虚线 -->
        <g fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path :d="PATH_D" stroke="#b3d6f0" stroke-width="4.5" stroke-opacity="0.5" />
          <path :d="PATH_D" stroke="#336699" stroke-width="2" class="flow-dash" />
        </g>

        <!-- 节点 -->
        <g>
          <g v-for="node in NODES" :key="node.id">
            <rect
              :x="node.x - 17"
              :y="node.y - 13"
              width="34"
              height="26"
              rx="3"
              fill="#ffffff"
              stroke="#cfd9e3"
              stroke-width="1.2"
            />
            <!-- 机架内格栅 -->
            <path
              :d="`M${node.x - 11} ${node.y - 6}h22M${node.x - 11} ${node.y}h22M${node.x - 11} ${node.y + 6}h22`"
              stroke="#cfd9e3"
              stroke-width="1"
              fill="none"
            />
          </g>
        </g>

        <!-- 路径上的节点强调 -->
        <g>
          <rect
            v-for="id in PATH"
            :key="`hl-${id}`"
            :x="byId[id].x - 17"
            :y="byId[id].y - 13"
            width="34"
            height="26"
            rx="3"
            fill="none"
            stroke="#f66733"
            stroke-width="1.8"
          />
          <circle
            v-for="id in PATH"
            :key="`dot-${id}`"
            :cx="byId[id].x"
            :cy="byId[id].y"
            r="2.6"
            fill="#f66733"
          />
        </g>

        <!-- 入口标记 -->
        <g stroke="#f66733" stroke-width="1.4" fill="none" stroke-dasharray="4 4">
          <path d="M24 62h40" />
          <path d="M24 62l8-5M24 62l8 5" />
        </g>
      </svg>
    </div>

    <figcaption class="mt-3 text-xs text-ink-500">
      图：集群节点分组与任务调度路径（示意）
    </figcaption>
  </figure>
</template>
