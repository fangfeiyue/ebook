const home = {
  state: {
    hotSearchOffsetY: 0,
    shelfList: [],
    flapCardVisible: false
  },
  mutations: {
    setHotSearchOffsetY (state, offsetY) {
      state.hotSearchOffsetY = offsetY
    },
    setShelfList(state, list) {
      state.shelfList = list
    },
    setFlapCardVisible (state, visible) {
      state.flapCardVisible = visible
    }
  }
}

export default home
