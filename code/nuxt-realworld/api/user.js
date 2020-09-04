import { request } from '@/plugins/request'

// 用户登录
export const login = data => request({
    method: 'POST',
    url: '/api/users/login',
    data
})

// 用户注册
export const register = data => request({
    method: 'POST',
    url: '/api/users',
    data
})

// 用户更新
export const update = data => request({
    method: 'PUT',
    url: '/api/user',
    data
})

