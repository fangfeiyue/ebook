import { mapGetters, mapActions } from 'vuex'

export const userMixin = {
  computed: {
    ...mapGetters([
      'isAuth'
    ])
  },
  methods: {
    ...mapActions([
      'login'
    ])
  },
}
