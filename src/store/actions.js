import { login } from '../api/user'
import { saveToken, getToken } from '../utils/utils'
const actions = {
  setFileName ({ commit }, fileName) {
    return commit('setFileName', fileName)
  },
  setMenuVisible ({ commit }, menuVisible) {
    return commit('setMenuVisible', menuVisible)
  },
  setSettingVisible ({ commit }, settingVisible) {
    return commit('setSettingVisible', settingVisible)
  },
  setDefaultFontSize ({ commit }, defaultFontSize) {
    return commit('setDefaultFontSize', defaultFontSize)
  },
  setDefaultFontFamily ({ commit }, font) {
    return commit('setDefaultFontFamily', font)
  },
  setIsEditMode({ commit }, isEditMode) {
    return commit('setIsEditMode', isEditMode)
  },
  setShelfSelected({ commit }, selected) {
    return commit('setShelfSelected', selected)
  },
  setShelfTitleVisible({ commit }, visible) {
    return commit('setShelfTitleVisible', visible)
  },
  setShelfCategory({ commit }, category) {
    return commit('setShelfCategory', category)
  },
  setCurrentType({ commit }, type) {
    return commit('setCurrentType', type)
  },
  setShelfList({ commit }, list) {
    return commit('setShelfList', list)
  },
  setFontFamilyVisible ({ commit }, visible) {
    return commit('setFontFamilyVisible', visible)
  },
  setDefaultTheme ({ commit }, theme) {
    return commit('setDefaultTheme', theme)
  },
  setBookAvailable ({ commit }, bookAvailable) {
    return commit('setBookAvailable', bookAvailable)
  },
  setProgress ({ commit }, progress) {
    return commit('setProgress', progress)
  },
  setSection ({ commit }, section) {
    return commit('setSection', section)
  },
  setIsPaginating ({ commit }, isPaginating) {
    return commit('setIsPaginating', isPaginating)
  },
  setCurrentBook ({ commit }, currentBook) {
    return commit('setCurrentBook', currentBook)
  },
  setNavigation ({ commit }, navigation) {
    return commit('setNavigation', navigation)
  },
  setCover ({ commit }, cover) {
    return commit('setCover', cover)
  },
  setMetadata ({ commit }, metadata) {
    return commit('setMetadata', metadata)
  },
  setPaginate ({ commit }, paginate) {
    return commit('setPaginate', paginate)
  },
  setPagelist ({ commit }, pagelist) {
    return commit('setPagelist', pagelist)
  },
  setOffsetY ({ commit }, offsetY) {
    return commit('setOffsetY', offsetY)
  },
  setIsBookmark ({ commit }, isBookmark) {
    return commit('setIsBookmark', isBookmark)
  },
  setHotSearchOffsetY ({ commit }, offsetY) {
    return commit('setHotSearchOffsetY', offsetY)
  },
  setSpeakingIconBottom ({ commit }, speakingIconBottom) {
    return commit('setSpeakingIconBottom', speakingIconBottom)
  },
  setFlapCardVisible ({ commit }, flapCardVisible) {
    return commit('setFlapCardVisible', flapCardVisible)
  },

  async login({ commit }, payload) {
    try {
      const res = await login(payload)
      if (res && res.token) {
        saveToken(res.token)
      }
      commit('setAuth', true)
      return res
    } catch(err) {
      saveToken('token', '')
      commit('setAuth', false)
      throw err
    }
  }
}

export default actions
