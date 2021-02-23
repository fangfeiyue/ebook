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
  }
}

export default actions
