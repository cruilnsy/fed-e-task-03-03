/**
 * 基于 axios 封装的请求模块
 */
import axios from 'axios'

export const request = axios.create({
    // username: bettycui19@gmail.com
    // password: 123456789
    baseURL: 'https://conduit.productionready.io'

    // email: testcui@test.com, testcui1@test.com
    // password: testcui123
    // baseURL: 'http://realworld.api.fed.lagounews.com'
})

export default ({ store }) => {
    // 请求拦截器
    // Add a request interceptor
    // 任何请求都要经过请求拦截器
    // 我们可以再请求拦截器中做一些公共的业务处理，例如统一设置 token
    request.interceptors.request.use(function (config) {
        // Do something before request is sent
        // 请求就会经过这里
        const { user } = store.state
        if (user && user.token) {
            config.headers.Authorization = `Token ${user.token}`
        }
        
        return config
    }, function (error) {
        // 如果请求失败（此时请求还没有发出去）就会进入这里
        // Do something with request error
        return Promise.reject(error)
    })
}
