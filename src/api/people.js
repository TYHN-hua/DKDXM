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

// 删除人员
export function delPeople(id) {
  return request({
    url: `user-service/user/${id}`,
    method: 'DELETE'
  })
}

// 根据id 获取人员信息
export function getPeopleDetailById(id) {
  return request({
    url: `user-service/user/${id}`
  })
}

// 根据id 修改人员信息
export function editPeopleDetailById(id, data) {
  return request({
    url: `user-service/user/${id}`,
    method: 'PUT',
    data
  })
}
