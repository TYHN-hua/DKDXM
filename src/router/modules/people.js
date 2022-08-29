// 导出员工的路由规则
import Layout from '@/layout'
export default {
  path: '/people',
  component: Layout,
  redirect: '/people/peoplelist',
  name: 'people',
  meta: {
    title: '人员管理',
    icon: 'people'
  },
  children: [
    {
      path: 'peoplelist',
      component: () => import('@/views/people/components/peopleList'), // Parent router-view
      name: 'peoplelist',
      meta: { title: '人员列表' }
    },
    {
      path: 'peoplework',
      component: () => import('@/views/people/components/PeopleWorkStatistics'), // Parent router-view
      name: 'peoplework',
      meta: { title: '人效统计' }
    },
    {
      path: 'workload',
      component: () => import('@/views/people/components/workload'), // Parent router-view
      name: 'workload',
      meta: { title: '工作量列表' }
    }
  ]
}
