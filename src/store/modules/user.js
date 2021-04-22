const user = {
  state: {
    isAuth: false
  },
  mutations: {
    setAuth(state, has) {
      state.isAuth = has
    }
  }
}

export default user