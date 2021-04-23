import axios from 'axios'
import {
  Base64
} from 'js-base64'
import { getToken } from '../utils/utils'

function _encode() {
  // account:password
  // token
  // token:
  const token = wx.getStorageSync('token')
  const base64 = Base64.encode(token + ':')
  return 'Basic ' + base64
}

export default new class HttpRequest {
  constructor() {
    this.baseUrl = 'http://localhost:3000/'
    this.timeout = 3000
  }
  handleErrStatus(code) {
    switch(code) {
      case 401:
        break;
    }
  }
  setInterceptors(instance) {
    instance.interceptors.request.use(config => {
      const token = getToken()
      const base64 = Base64.encode(token + ':')
      console.log('token', base64)
      config.headers.Authorization = 'Basic ' + base64
      return config
    })
    instance.interceptors.response.use(res => {
      if (res.status === 200) {
        return Promise.resolve(res.data)
      }
      return Promise.reject(res.data.data)
    }, err => {
      console.log(err)
      this.handleErrStatus(err.response.status)
      return Promise.reject(err)
    })
  }
  mergeOptions(options) {
    return { baseUrl: this.baseUrl, timeout: this.timeout, ...options }
  }
  request(options) {
    const instance = axios.create()
    this.setInterceptors(instance)
    const opts = this.mergeOptions(options)
    return instance(opts)
  }
  get(url, config) {
    return this.request({
      method: 'get',
      url,
      ...config
    })
  }
  post(url, data) {
    return this.request({
      method: 'post',
      url,
      data
    })
  }
}
