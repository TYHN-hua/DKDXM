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

// 获取售货机维修次数
export function getRepairCount({ innerCode, start, end }) {
  return request({
    url: `/task-service/task/repairCount/${innerCode}/${start}/${end}`,
    method: 'GET'
  })
}

// 获取售货机补货次数
export function getSupplyCount({ innerCode, start, end }) {
  return request({
    url: `/task-service/task/supplyCount/${innerCode}/${start}/${end}`,
    method: 'GET'
  })
}

// 获取售货机商品销量
export function getSkuCollect({ innerCode, start, end }) {
  return request({
    url: `/order-service/report/skuCollect/${innerCode}/${start}/${end}`,
    method: 'GET'
  })
}

// 新增售货机类型
export function addEquipmentType(data) {
  return request({
    url: '/vm-service/vmType',
    method: 'POST'
  })
}

// 获取一定时间范围之内的订单总数
export function getGoodsCount(params) {
  return request({
    url: '/order-service/report/orderCount',
    method: 'GET',
    params
  })
}

// 获取一定时间范围之内的收入
export function getGoodsIncome(params) {
  return request({
    url: '/order-service/report/orderAmount',
    method: 'GET',
    params
  })
}

// 售货机类型删除
export function delEquipment(typeId) {
  return request({
    url: `/vm-service/vmType/${typeId}`,
    method: 'DELETE'
  })
}

// 获取售货机货道详情
export function getAisle(innerCode) {
  return request({
    url: `/vm-service/channel/channelList/${innerCode}`,
    method: 'GET'
  })
}

// 获取商圈下销量前10的商品(补货推荐)
export function getTenGoods({ businessId }) {
  return request({
    url: `/vm-service/sku/businessTop10/${businessId}`,
    method: 'GET'
  })
}

// 商圈列表
export function getBusinessList() {
  return request({
    url: '/vm-service/businessType',
    method: 'GET'
  })
}

// 货道配置
export function channelConfig(data) {
  return request({
    url: '/vm-service/channel/channelConfig',
    method: 'PUT',
    data
  })
}

// 商品搜索
export function getSkuList(params) {
  return request({
    url: '/vm-service/sku/search',
    method: 'GET',
    params
  })
}
