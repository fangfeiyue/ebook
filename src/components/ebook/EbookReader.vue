<template>
  <div class="ebook-reader">
    <div id="reader"></div>
  </div>
</template>
<script>
import { ebookMixin } from '../../mixin/mixin'
import Epub from 'epubjs'
import { getFontFamily, getFontSize, saveFontFamily, saveFontSize } from '../../utils/utils'
global.ePub = Epub
export default {
  mixins: [ebookMixin],
  mounted () {
    const fileName = this.$route.params.fileName.split('|').join('/')
    this.setFileName(fileName).then(() => this.initEpub())
  },
  methods: {
    prevPage () {
      if (this.reader) this.reader.prev()
      this.hideTileAndMenu()
    },
    nextPage () {
      if (this.reader) this.reader.next()
      this.hideTileAndMenu()
    },
    toggleTitleAndMenu () {
      if (this.menuVisible) {
        this.setSettingVisible(-1)
        this.setFontFamilyVisible(false)
      }

      this.setMenuVisible(!this.menuVisible)
    },
    hideTileAndMenu () {
      this.setSettingVisible(-1)
      this.setMenuVisible(false)
      this.setFontFamilyVisible(false)
    },
    initFontSize () {
      const fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize)
      } else {
        this.book.rendition.themes.fontSize(fontSize)
        this.setDefaultFontSize(fontSize)
      }
    },
    initFontFamily () {
      const fontFamily = getFontFamily(this.fileName)
      if (!fontFamily) {
        saveFontFamily(this.fileName, this.defaultFontFamily)
      } else {
        this.book.rendition.themes.font(fontFamily)
        this.setDefaultFontFamily(fontFamily)
      }
    },
    initEpub () {
      const url = 'http://192.168.0.103:8083/epub/' + this.fileName + '.epub'
      this.book = new Epub(url)

      this.setCurrentBook(this.book)

      this.reader = this.book.renderTo('reader', {
        width: innerWidth,
        height: innerHeight
      })

      this.reader.display().then(() => {
        this.initFontSize()
        this.initFontFamily()
      })

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

      this.reader.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(`${process.env.VUE_APP_BASE_URL}/fonts/cabin.css`),
          contents.addStylesheet(`${process.env.VUE_APP_BASE_URL}/fonts/daysOne.css`),
          contents.addStylesheet(`${process.env.VUE_APP_BASE_URL}/fonts/montserrat.css`),
          contents.addStylesheet(`${process.env.VUE_APP_BASE_URL}/fonts/tangerine.css`)
        ]).then(() => {})
      })
    }
  }
}
</script>
