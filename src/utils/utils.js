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

export function saveBookmark (fileName, location) {
  setBookObj(fileName, 'bookmark', location)
}
export function getBookmark (fileName) {
  return getBookObj(fileName, 'bookmark')
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

export function saveSearchHistory (searchHistory) {
  setLocalStorage('search-history', searchHistory)
}

export function getSearchHistory () {
  return getLocalStorage('search-history') || []
}

export function getCategoryName (id) {
  switch (id) {
    case 1:
      return 'ComputerScience'
    case 2:
      return 'SocialSciences'
    case 3:
      return 'Economics'
    case 4:
      return 'Education'
    case 5:
      return 'Engineering'
    case 6:
      return 'Environment'
    case 7:
      return 'Geography'
    case 8:
      return 'History'
    case 9:
      return 'Laws'
    case 10:
      return 'LifeSciences'
    case 11:
      return 'Literature'
    case 12:
      return 'Biomedicine'
    case 13:
      return 'BusinessandManagement'
    case 14:
      return 'EarthSciences'
    case 15:
      return 'MaterialsScience'
    case 16:
      return 'Mathematics'
    case 17:
      return 'MedicineAndPublicHealth'
    case 18:
      return 'Philosophy'
    case 19:
      return 'Physics'
    case 20:
      return 'PoliticalScienceAndInternationalRelations'
    case 21:
      return 'Psychology'
    case 22:
      return 'Statistics'
  }
}

export function categoryText (category, vue) {
  switch (category) {
    case 1:
      return vue.$t('category.computerScience')
    case 2:
      return vue.$t('category.socialSciences')
    case 3:
      return vue.$t('category.economics')
    case 4:
      return vue.$t('category.education')
    case 5:
      return vue.$t('category.engineering')
    case 6:
      return vue.$t('category.environment')
    case 7:
      return vue.$t('category.geography')
    case 8:
      return vue.$t('category.history')
    case 9:
      return vue.$t('category.laws')
    case 10:
      return vue.$t('category.lifeSciences')
    case 11:
      return vue.$t('category.literature')
    case 12:
      return vue.$t('category.biomedicine')
    case 13:
      return vue.$t('category.businessandManagement')
    case 14:
      return vue.$t('category.earthSciences')
    case 15:
      return vue.$t('category.materialsScience')
    case 16:
      return vue.$t('category.mathematics')
    case 17:
      return vue.$t('category.medicineAndPublicHealth')
    case 18:
      return vue.$t('category.philosophy')
    case 19:
      return vue.$t('category.physics')
    case 20:
      return vue.$t('category.politicalScienceAndInternationalRelations')
    case 21:
      return vue.$t('category.psychology')
    case 22:
      return vue.$t('category.statistics')
  }
}

export function getBookShelf () {
  return getLocalStorage('shelf')
}
export function saveBookShelf (shelf) {
  return setLocalStorage('shelf', shelf)
}

export function addToShelf (book) {
  let shelfList = getBookShelf()
  shelfList = removeAddFromShelf(shelfList)
  book.type = 1
  shelfList.push(book)
  shelfList = computeId(shelfList)
  shelfList = appendAddToShelf(shelfList)
  saveBookShelf(shelfList)
}
export function removeFromBookShelf (book) {
  return getBookShelf().filter(item => {
    if (item.itemList) {
      item.itemList = removeAddFromShelf(item.itemList)
    }
    return item.fileName !== book.fileName
  })
}

export function gotoBookDetail(vue, book) {
  vue.$router.push({
    path: '/store/detail',
    query: {
      fileName: book.fileName,
      category: book.categoryText
    }
  })
}

export function appendAddToShelf (list) {
  list.push({
    id: -1,
    type: 3
  })
  return list
}

export function computeId (list) {
  return list.map((book, index) => {
    if (book.type !== 3) {
      book.id = index + 1
      if (book.itemList) {
        book.itemList = computeId(book.itemList)
      }
    }
    return book
  })
}

export function removeAddFromShelf (list) {
  return list.filter(item => item.type !== 3)
}

export function dateFormat(fmt, date) {
  let ret;
  const opt = {
      "Y+": date.getFullYear().toString(),
      "m+": (date.getMonth() + 1).toString(),
      "d+": date.getDate().toString(),
      "H+": date.getHours().toString(),
      "M+": date.getMinutes().toString(),
      "S+": date.getSeconds().toString()
  };
  for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
  };
  return fmt;
}
