import request from '@/utils/request'

// 获取人员列表
export function getPeopleList(params, data) {
  return request({
    url: 'user-service/user/search',
    method: 'get',
    params,
    data
  })
}

// 获取角色列表
export function getRole(data) {
  return request({
    url: '/user-service/role',
    method: 'get',
    data
  })
}

// 新增人员
export function addPeople(data) {
  return request({
    url: '/user-service/user',
    method: 'POST',
    data
  })
}
