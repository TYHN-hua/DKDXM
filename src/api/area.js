import request from '@/utils/request'

export function getAreaList(params) {
  return request({
    url: '/vm-service/region/search',
    params
  })
}
