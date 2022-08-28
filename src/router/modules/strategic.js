// 导出员工的路由规则
import Layout from '@/layout'
export default {
  path: '/strategic',
  component: Layout,
  children: [{
    name: 'strategic',
    path: '',
    component: () => import('@/views/strategic'),
    meta: { title: '策略管理', icon: 'el-icon-s-help' }
  }]
}
