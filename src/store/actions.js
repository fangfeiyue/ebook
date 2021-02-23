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
  setOffsety ({ commit }, offsetY) {
    return commit('setOffsety', offsetY)
  },
  setIsBookmark ({ commit }, isBookmark) {
    return commit('setIsBookmark', isBookmark)
  },
  setSpeakingIconBottom ({ commit }, speakingIconBottom) {
    return commit('setSpeakingIconBottom', speakingIconBottom)
  }
}

export default actions
