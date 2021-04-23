import axios from './request'
const url = 'http://localhost:3000/v1/token'
export const register = options => axios.post('http://localhost:3000/v1/user/register', options)
export const login = options => axios.post(url, {...options, type: 101})
export const collect = options => axios.post('http://localhost:3000/v1/like', options)
export const unCollect = options => axios.post('http://localhost:3000/v1/like/cancel', options)
export const getCollectStatus = options => axios.get('http://localhost:3000/v1/book/2/favor', options)
