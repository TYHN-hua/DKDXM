import request from '@/utils/request'

export function getPeopleList(params, data) {
  return request({
    url: 'user-service/user/search',
    method: 'get',
    params,
    data
  })
}
