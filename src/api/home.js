import axios from 'axios'
const BASE_URL = process.env.VUE_APP_BASE_URL

export function getHome() {
  return axios({
    method: 'get',
    url: `${BASE_URL}/book/home`
  })
}
