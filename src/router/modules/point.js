// 导出员工的路由规则
import Layout from '@/layout'
export default {
  path: '/point',
  component: Layout,
  meta: { title: '点位管理', icon: 'guide' },
  children: [
    {
      path: 'area',
      name: 'area',
      component: () => import('@/views/point/components/area'),
      meta: { title: '区域管理' }
    },
    {
      path: 'points',
      name: 'points',
      component: () => import('@/views/point/components/point'),
      meta: { title: '点位管理' }
    },
    {
      path: 'partners',
      name: 'partners',
      component: () => import('@/views/point/components/partners'),
      meta: { title: '合作商管理' }
    }
  ]
}
