import axios from 'axios'
const BOOK_URL = process.env.VUE_APP_BOOK_URL
const BASE_URL = process.env.VUE_APP_API_BASE_URL

export function getHome () {
  return axios({
    method: 'get',
    url: `${BASE_URL}/book/home`
  })
}

export function detail (book) {
  return axios({
    method: 'get',
    url: `${BOOK_URL}/book/detail`,
    params: {
      fileName: book.fileName
    }
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

export function download(book, onSucess, onError, onProgress) {
  if (onProgress == null) {
    onProgress = onError
    onError = null
  }
  return axios.create({
    baseURL: process.env.VUE_APP_EPUB_URL,
    method: 'get',
    responseType: 'blob',
    timeout: 180 * 1000,
    onDownloadProgress: progressEvent => {
      if (onProgress) onProgress(progressEvent)
    }
  }).get(`${book.categoryText}/${book.fileName}.epub`)
    .then(res => {
      const blob = new Blob([res.data])
      setLocalForage(book.fileName, blob,
        () => onSucess(book),
        err => onError(err))
    }).catch(err => {
      if (onError) onError(err)
    })
}
