const book = {
  state: {
    fileName: '',
    menuVisible: false,
    settingVisible: -1,
    defaultFontSize: 16
  },
  mutations: {
    setFileName (state, fileName) {
      state.fileName = fileName
    },
    setMenuVisible (state, menuVisible) {
      state.menuVisible = menuVisible
    },
    setSettingVisible (state, settingVisible) {
      state.settingVisible = settingVisible
    },
    setDefaultFontSize (state, fontSize) {
      state.defaultFontSize = fontSize
    }
  }
}

export default book
