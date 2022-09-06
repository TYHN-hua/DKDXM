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

// 获取当天总计
export function getRepairTotal(start, end) {
  return request({
    url: `/task-service/task/taskReportInfo/${start}/${end}`
  })
}

// 获取用户工作量(工单统计)
export function getUserWork(params) {
  return request({
    url: '/task-service/task/userWork',
    params

  })
}

// 人员工作量列表
export function getWorkList() {
  return request({
    url: '/user-service/user/searchUserWork'

  })
}
