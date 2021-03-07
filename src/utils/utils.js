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

export function getLocale () {
  return getLocalStorage('locale')
}

export function saveLocale (locale) {
  return setLocalStorage('locale', locale)
}

export function realPx (px) {
  const maxWidth = window.innerWidth > 500 ? 500 : window.innerWidth
  return px * (maxWidth / 375)
}

export function getTheme (fileName) {
  return getBookObj(fileName, 'theme')
}

export function saveTheme (fileName, theme) {
  setBookObj(fileName, 'theme', theme)
}

export function addCssFile (href) {
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', href)
  document.getElementsByTagName('head')[0].appendChild(link)
}

export function removeCssFile (href) {
  const link = document.getElementsByTagName('link')

  for (var i = link.length; i >= 0; i--) {
    if (link[i] && link[i].getAttribute('href') && link[i].getAttribute('href').indexOf(href) !== -1) {
      link[i].parentNode.removeChild(link[i])
    }
  }
}

export function clearPreTheme (href) {
  const cssArr = [
    'theme_eye.css',
    'theme_gold.css',
    'theme_night.css',
    'theme_default.css'
  ]
  cssArr.forEach(removeCssFile)
}

export function saveLocation (fileName, location) {
  setBookObj(fileName, 'location', location)
}

export function getLocation (fileName) {
  return getBookObj(fileName, 'location')
}

export function getReadTime (fileName) {
  return getBookObj(fileName, 'readTime')
}

export function saveReadTime (fileName, time) {
  setBookObj(fileName, 'readTime', time)
}

export function saveMetadata (fileName, metadata) {
  setBookObj(fileName, 'metadata', metadata)
}

export function getMetadata (fileName) {
  return getBookObj(fileName, 'metadata')
}

export function flatten (arr) {
  return [].concat(...arr.map(item => [item, ...flatten(item.subitems)]))
}

export function addLevel (nav, item, level = 0) {
  return !item.parent ? level : addLevel(nav.filter(p => p.id === item.parent)[0], ++level)
}

export function px2rem (px) {
  const ratio = 375 / 10
  return px / ratio
}
