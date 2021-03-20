import axios from 'axios'
const BASE_URL = process.env.VUE_APP_BASE_URL

export function getHome () {
  return axios({
    method: 'get',
    url: `${BASE_URL}/book/home`
  })
}

export function detail (book) {
  return axios({
    method: 'get',
    url: `${BASE_URL}/book/detial`
  })
}

export function list () {
  return axios({
    method: 'get',
    url: `${BASE_URL}/book/list`
  })
}

export function shelf () {
  return axios({
    method: 'get',
    url: `${BASE_URL}/book/shelf`
  })
}
