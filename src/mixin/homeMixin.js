import { mapGetters, mapActions } from 'vuex'
export const homeMixin = {
  computed: {
    ...mapGetters([
      'offsetY',
      'hotSearchOffsetY'
    ])
  },
  methods: {
    ...mapActions([
      'setOffsetY',
      'setHotSearchOffsetY'
    ])
  }
}
