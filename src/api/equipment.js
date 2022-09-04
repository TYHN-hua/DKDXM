import request from '@/utils/request'

// 售货机列表
export function getEquipmentList(params) {
  return request({
    url: '/vm-service/vm/search',
    method: 'GET',
    params
  })
}

// 售货机类型列表
export function getTypeName(params) {
  return request({
    url: '/vm-service/vmType/search',
    method: 'GET',
    params
  })
}

// 点位搜索
export function getPointName(params) {
  return request({
    url: '/vm-service/node/search',
    method: 'GET',
    params
  })
}

// 新增售货机
export function addEquipment(data) {
  return request({
    url: '/vm-service/vm',
    method: 'POST',
    data
  })
}

// 策略列表
export function getStrategyList(params) {
  return request({
    url: '/vm-service/policy',
    method: 'GET',
    params
  })
}

// 售货机应用策略
export function useEquipmentPolicy(data) {
  return request({
    url: '/vm-service/vm/applyPolicy',
    method: 'PUT',
    data
  })
}

// 查询售货机策略
export function getEquipmentPolicy(innerCode) {
  return request({
    url: `/vm-service/policy/vmPolicy/${innerCode}`,
    method: 'GET'
  })
}

// 取消策略
export function cancelPolicy({ innerCode, policyId }) {
  return request({
    url: `/vm-service/vm/cancelPolicy/${innerCode}/${policyId}`,
    method: 'PUT'
  })
}

// 修改售货机点位
export function changePoint({ id, nodeId }) {
  return request({
    url: `/vm-service/vm/${id}/${nodeId}`,
    method: 'PUT'
  })
}
