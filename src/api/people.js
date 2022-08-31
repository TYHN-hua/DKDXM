import request from '@/utils/request'

export function getPeopleList(data) {
  return request({
    url: 'user-service/user/search',
    method: 'get',
    data
  })
}
