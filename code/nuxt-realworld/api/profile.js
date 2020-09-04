import { request } from '@/plugins/request'

export const getProfile = username => request({
    method: 'GET',
    url: `/api/profiles/${username}`
})

// follow 用户
export const followProfile = username => request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`
})

export const unfollowProfile = username => request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`
})