// 导出员工的路由规则
import Layout from '@/layout'
export default {
  path: '/reconciliation',
  component: Layout,
  children: [{
    name: 'reconciliation',
    path: '',
    component: () => import('@/views/reconciliation'),
    meta: { title: '对账统计', icon: 'el-icon-s-help' }
  }]
}
