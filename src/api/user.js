import request from '@/utils/request'

// 图片验证码接口
export function imageCodeApi(clientToken) {
  return request({
    method: 'GET',
    url: `/user-service/user/imageCode/${clientToken}`
    // responseType: 'blob'
  })
}

// 登录接口
export function login(data) {
  return request({
    method: 'POST',
    url: '/user-service/user/login',
    data
  })
}
