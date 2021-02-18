const book = {
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment ({ commit }) {
      return commit('increment')
    }
  }
}

export default book
