// 导出员工的路由规则
import Layout from '@/layout'
export default {
  path: '/equipment',
  component: Layout,
  redirect: '/equipment/management',
  name: 'equipment',
  meta: {
    title: '设备管理',
    icon: 'nested'
  },
  children: [
    {
      path: 'management',
      component: () => import('@/views/equipment/management'), // Parent router-view
      name: 'management',
      meta: { title: '设备管理' }
    },
    {
      path: 'equipmentstate',
      component: () => import('@/views/equipment/EquipmentState'), // Parent router-view
      name: 'equipmentstate',
      meta: { title: '设备状态' }
    },
    {
      path: 'devicetype',
      component: () => import('@/views/equipment/deviceType'), // Parent router-view
      name: 'devicetype',
      meta: { title: '设备类型管理' }
    }
  ]
}
