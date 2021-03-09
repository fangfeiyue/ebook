<template>
  <div class="ebook-reader">
    <div class="ebook-reader-mask"
      @touchmove="move"
      @touchend="moveEnd"
      @mousedown.left="onMouseEnter"
      @mousemove.left="onMouseMove"
      @mouseup.left="onMouseEnd"
      @click="onMaskClick">
    </div>
    <div id="reader"></div>
  </div>
</template>
<script>
import { ebookMixin } from '../../mixin/mixin'
import Epub from 'epubjs'
import { getFontFamily, getFontSize, getLocation, getTheme, saveFontFamily, saveFontSize, saveTheme, saveMetadata, flatten } from '../../utils/utils'
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
    parseBook () {
      const book = this.book
      book.loaded.metadata.then(metadata => {
        this.setMetadata(metadata)
        saveMetadata(this.fileName, metadata)
      })

      book.loaded.navigation.then(navigation => {
        const nav = flatten(navigation.toc)
        // nav.forEach(item => (item.level = addLevel(nav, item)))

        function find (item, v = 0) {
          const parent = nav.filter(it => it.id === item.parent)[0]
          return !item.parent ? v : (parent ? find(parent, ++v) : v)
        }

        nav.forEach(item => {
          item.level = find(item)
        })

        this.setNavigation(nav)
        console.log('nav', nav)
      })

      book.loaded.cover.then(cover => book.archive.createUrl(cover).then(url => this.setCover(url)))
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
        this.parseBook()
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
    },
    onMaskClick (e) {
      const offsetX = e.offsetX
      const width = window.innerWidth
      if (offsetX > 0 && offsetX < width * 0.3) {
        this.prevPage()
      } else if (offsetX > 0 && offsetX > width * 0.7) {
        this.nextPage()
      } else {
        this.toggleTitleAndMenu()
      }
    },
    move (e) {
      this.firstOffsetY ? this.setOffsetY(e.changedTouches[0].clientY - this.firstOffsetY) : this.firstOffsetY = e.changedTouches[0].clientY
      e.preventDefault()
      e.stopPropagation()
    },
    moveEnd () {
      this.setOffsetY(0)
      this.firstOffsetY = null
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
  .ebook-reader {
    width: 100%;
    height: 100%;
    overflow: hidden;
    .ebook-reader-mask {
      position: absolute;
      z-index: 150;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
</style>
