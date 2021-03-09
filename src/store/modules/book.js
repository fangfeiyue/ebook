const book = {
  state: {
    fileName: '',
    menuVisible: false,
    settingVisible: -1,
    defaultFontSize: '16px',
    defaultFontFamily: 'Default',
    fontFamilyVisible: false,
    defaultTheme: 'Default',
    bookAvailable: false,
    progress: 0,
    section: 0,
    isPaginating: true,
    currentBook: null,
    navigation: null,
    cover: null,
    metadata: null,
    paginate: '',
    pagelist: null,
    offsetY: 0,
    isBookmark: null,
    // speakingIconBottom: realPx(58)
    speakingIconBottom: 58
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
    },
    setDefaultFontFamily (state, font) {
      state.defaultFontFamily = font
    },
    setFontFamilyVisible (state, visible) {
      state.fontFamilyVisible = visible
    },
    setDefaultTheme (state, theme) {
      state.defaultTheme = theme
    },
    setBookAvailable (state, bookAvailable) {
      state.bookAvailable = bookAvailable
    },
    setProgress (state, progress) {
      state.progress = progress
    },
    setSection (state, section) {
      state.section = section
    },
    setIsPaginating (state, isPaginating) {
      state.isPaginating = isPaginating
    },
    setCurrentBook (state, currentBook) {
      state.currentBook = currentBook
    },
    setNavigation (state, navigation) {
      state.navigation = navigation
    },
    setCover (state, cover) {
      state.cover = cover
    },
    setMetadata (state, metadata) {
      state.metadata = metadata
    },
    setPaginate (state, paginate) {
      state.paginate = paginate
    },
    setPagelist (state, pagelist) {
      state.pagelist = pagelist
    },
    setOffsetY (state, offsetY) {
      state.offsetY = offsetY
    },
    setIsBookmark (state, isBookmark) {
      state.isBookmark = isBookmark
    },
    setSpeakingIconBottom (state, speakingIconBottom) {
      state.speakingIconBottom = speakingIconBottom
    }
  }
}

export default book
