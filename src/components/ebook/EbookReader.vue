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
    prevPage () {
      if (this.reader) this.reader.prev()
    },
    nextPage () {
      if (this.reader) this.reader.next()
    },
    toggleTitleAndMenu () {
      console.log('ddd')
    },
    initEpub () {
      const url = 'http://192.168.0.103:8083/epub/' + this.fileName + '.epub'
      this.book = new Epub(url)
      this.reader = this.book.renderTo('reader', {
        width: innerWidth,
        height: innerHeight
      })

      this.reader.display()
      this.reader.on('touchstart', e => {
        this.touchStartX = e.changedTouches[0].clientX
        this.timeStamp = e.timeStamp
      }).on('touchend', e => {
        this.offsetX = e.changedTouches[0].clientX - this.touchStartX
        this.time = e.timeStamp - this.timeStamp
        if (this.time < 500 && this.offsetX > 40) {
          this.prevPage()
        } else if (this.time < 500 && this.offsetX < -40) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
        // e.preventDefault()
        e.stopPropagation()
      })
    }
  }
}
</script>
