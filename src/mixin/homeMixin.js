import { mapGetters, mapActions } from 'vuex'
export const homeMixin = {
  computed: {
    ...mapGetters(['offsetY'])
  },
  methods: {
    ...mapActions(['setOffsetY'])
  }
}
