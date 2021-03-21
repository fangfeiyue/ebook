const home = {
  state: {
    hotSearchOffsetY: 0,
    shelfList: [],
    isEditMode: false,
    flapCardVisible: false,
    shelfSelected: [],
    shelfTitleVisible: true,
    shelfCategory: [], // 书架分类列表数据
    currentType: 1 // 书架列表为1，书架分类列表为2
  },
  mutations: {
    setHotSearchOffsetY (state, offsetY) {
      state.hotSearchOffsetY = offsetY
    },
    setIsEditMode(state, isEditMode) {
      state.isEditMode = isEditMode
    },
    setShelfList(state, list) {
      state.shelfList = list
    },
    setShelfSelected(state, selected) {
      state.shelfSelected = selected
    },
    setShelfTitleVisible(state, visible) {
      state.shelfTitleVisible = visible
    },
    setShelfCategory(state, category) {
      state.shelfCategory = category
    },
    setCurrentType(state, type) {
      state.currentType = type
    },
    setFlapCardVisible (state, visible) {
      state.flapCardVisible = visible
    }
  }
}

export default home
