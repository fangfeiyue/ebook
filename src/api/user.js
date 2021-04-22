import axios from './request'
const url = 'http://localhost:3000/v1/token'
export const register = options => axios.post('http://localhost:3000/v1/user/register', options)
export const login = (options) => axios.post(url, {...options, type: 101})