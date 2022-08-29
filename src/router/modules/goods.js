// 导出员工的路由规则
import Layout from '@/layout'
export default {
  path: '/goods',
  component: Layout,
  redirect: '/goods/goodstype',
  name: 'goods',
  meta: { title: '商品管理', icon: 'shopping' },
  children: [
    {
      path: 'goodstype',
      name: 'goodstype',
      component: () => import('@/views/goods/components/goodsType'),
      meta: { title: '商品类型' }
    },
    {
      path: 'goodsmanagement',
      name: 'goodsmanagement',
      component: () => import('@/views/goods/components/goodsManagement'),
      meta: { title: '商品管理' }
    }
  ]
}
