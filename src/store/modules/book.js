const book = {
  state: {
    fileName: '',
    menuVisible: false
  },
  mutations: {
    setFileName (state, fileName) {
      state.fileName = fileName
    },
    setMenuVisible (state, menuVisible) {
      state.menuVisible = menuVisible
    }
  },
  actions: {
    setFileName ({ commit }, fileName) {
      return commit('setFileName', fileName)
    },
    setMenuVisible ({ commit }, menuVisible) {
      return commit('setMenuVisible', menuVisible)
    }
  }
}

export default book
