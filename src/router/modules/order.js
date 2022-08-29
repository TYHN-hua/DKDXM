// 导出员工的路由规则
import Layout from '@/layout'
export default {
  path: '/order',
  component: Layout,
  children: [{
    name: 'order',
    path: '',
    component: () => import('@/views/order'),
    meta: { title: '订单管理', icon: 'skill' }
  }]
}
