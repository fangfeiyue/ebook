<template>
  <div class="ebook-reader">
    <div id="reader"></div>
  </div>
</template>
<script>
import { ebookMixin } from '../../mixin/mixin'
import Epub from 'epubjs'
import { getFontFamily, getFontSize, getLocation, getTheme, saveFontFamily, saveFontSize, saveTheme } from '../../utils/utils'
global.ePub = Epub
export default {
  mixins: [ebookMixin],
  mounted () {
    const fileName = this.$route.params.fileName.split('|').join('/')
    this.setFileName(fileName).then(() => this.initEpub())
  },
  methods: {
    prevPage () {
      if (this.reader) this.reader.prev().then(this.refreshContent)
      this.hide()
    },
    nextPage () {
      if (this.reader) this.reader.next().then(this.refreshContent)
      this.hide()
    },
    toggleTitleAndMenu () {
      if (this.menuVisible) {
        this.setSettingVisible(-1)
        this.setFontFamilyVisible(false)
      }

      this.setMenuVisible(!this.menuVisible)
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
    initTheme () {
      let theme = getTheme(this.fileName)
      console.log('themme', theme)
      if (!theme) {
        theme = this.themeList[0].name
        saveTheme(this.fileName, theme)
      }
      this.themeList.forEach(theme => this.reader.themes.register(theme.name, theme.style))

      this.setDefaultTheme(theme)
      this.setGlobalTheme()
      this.reader.themes.select(theme)

      return theme
    },
    initGestrue () {
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
    },
    initRender () {
      this.reader = this.book.renderTo('reader', {
        width: innerWidth,
        height: innerHeight
      })
      const location = getLocation(this.fileName)
      this.displayBook(location, () => {
        this.initTheme()
        this.initFontSize()
        this.initFontFamily()
        this.refreshContent()
      })
    },
    registerFont () {
      this.reader.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(`${process.env.VUE_APP_BASE_URL}/fonts/cabin.css`),
          contents.addStylesheet(`${process.env.VUE_APP_BASE_URL}/fonts/daysOne.css`),
          contents.addStylesheet(`${process.env.VUE_APP_BASE_URL}/fonts/montserrat.css`),
          contents.addStylesheet(`${process.env.VUE_APP_BASE_URL}/fonts/tangerine.css`)
        ]).then(() => {})
      })
    },
    initPaging () {
      this.book.ready.then(() => {
        return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
      }).then(locations => {
        // console.log(locations)
        this.setBookAvailable(true)
        // 分页完成后
        this.refreshContent()
      })
    },
    initEpub () {
      const url = process.env.VUE_APP_BASE_URL + '/epub/' + this.fileName + '.epub'
      this.book = new Epub(url)
      this.setCurrentBook(this.book)
      this.initRender()
      this.initGestrue()
      this.registerFont()
      this.initPaging()
    }
  }
}
</script>
