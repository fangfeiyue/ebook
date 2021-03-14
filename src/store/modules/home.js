const home = {
  state: {
    hotSearchOffsetY: 0,
    flapCardVisible: false
  },
  mutations: {
    setHotSearchOffsetY (state, offsetY) {
      state.hotSearchOffsetY = offsetY
    },
    setFlapCardVisible (state, visible) {
      state.flapCardVisible = visible
    }
  }
}

export default home
