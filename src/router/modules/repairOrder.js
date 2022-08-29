// 导出员工的路由规则
import Layout from '@/layout'
export default {
  path: '/repairorder',
  component: Layout,
  redirect: '/repairOrder/operating',
  name: 'repairorder',
  meta: { title: '工单管理', icon: 'form' },
  children: [
    {
      path: 'operating',
      name: 'operating',
      component: () => import('@/views/repairOrder/components/operating'),
      meta: { title: '运营工单' }
    },
    {
      path: 'operations',
      name: 'operations',
      component: () => import('@/views/repairOrder/components/operations'),
      meta: { title: '运维工单' }
    }
  ]
}
