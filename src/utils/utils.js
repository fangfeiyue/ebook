import { getLocalStorage, setLocalStorage } from './storage'

export function setBookObj (fileName, key, value) {
  let book = getLocalStorage(`${fileName}-book-info`)

  if (!book) book = {}

  book[key] = value

  setLocalStorage(`${fileName}-book-info`, book)
}

export function getBookObj (fileName, key) {
  const book = getLocalStorage(`${fileName}-book-info`)
  return book ? book[key] : null
}

export function getFontFamily (fileName) {
  return getBookObj(fileName, 'fontFamily')
}

export function saveFontFamily (fileName, font) {
  return setBookObj(fileName, 'fontFamily', font)
}

export function getFontSize (fileName) {
  return getBookObj(fileName, 'fontSize')
}

export function saveFontSize (fileName, size) {
  return setBookObj(fileName, 'fontSize', size)
}
