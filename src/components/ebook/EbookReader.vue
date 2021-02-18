<template>
  <div class="ebook-reader">
    <!-- {{$route.params.fileName}} -->
    <div id="reader"></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Epub from 'epubjs'
global.ePub = Epub
export default {
  computed: {
    ...mapGetters(['fileName'])
  },
  mounted () {
    const fileName = this.$route.params.fileName.split('|').join('/')
    this.$store.dispatch('setFileName', fileName).then(() => this.initEpub())
  },
  methods: {
    initEpub () {
      const url = 'http://192.168.0.103:8083/epub/' + this.fileName + '.epub'
      this.book = new Epub(url)
      this.book.rendation = this.book.renderTo('reader', {
        width: innerWidth,
        height: innerHeight
      }).display()
    }
  }
}
</script>
