import request from '@/utils/request'

// 售货机列表
export function getEquipmentList(params) {
  return request({
    url: '/vm-service/vm/search',
    method: 'GET',
    params
  })
}
