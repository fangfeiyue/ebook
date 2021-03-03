import { mapGetters, mapActions } from 'vuex'
import { themeList } from '../config/config'
import { addCssFile, clearPreTheme, saveLocation, getReadTime } from '../utils/utils'

export const ebookMixin = {
  computed: {
    ...mapGetters([
      'fileName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'isPaginating',
      'currentBook',
      'navigation',
      'cover',
      'metadata',
      'paginate',
      'pagelist',
      'offsetY',
      'isBookmark',
      'speakingIconBottom'
    ]),
    themeList () {
      return themeList()
    }
  },
  methods: {
    ...mapActions([
      'setFileName',
      'setMenuVisible',
      'setSettingVisible',
      'setDefaultFontSize',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme',
      'setBookAvailable',
      'setProgress',
      'setSection',
      'setIsPaginating',
      'setCurrentBook',
      'setNavigation',
      'setCover',
      'setMetadata',
      'setPaginate',
      'setPagelist',
      'setOffsetY',
      'setIsBookmark',
      'setSpeakingIconBottom'
    ]),
    getCss () {
      switch (this.defaultTheme) {
        case 'Default':
          return 'theme_default.css'
        case 'Gold':
          return 'theme_gold.css'
        case 'Eye':
          return 'theme_eye.css'
        case 'Night':
          return 'theme_night.css'
        default:
          return 'theme_default.css'
      }
    },
    setGlobalTheme () {
      // 清除之前的主题
      clearPreTheme()
      const baseUrl = `${process.env.VUE_APP_BASE_URL}/theme/`
      addCssFile(baseUrl + this.getCss())
    },
    refreshContent (d) {
      const curLocation = this.currentBook.rendition.currentLocation()
      console.log(curLocation)
      const cfi = (curLocation.start && curLocation.start.cfi) || ''
      if (!cfi) return
      const progress = this.currentBook.locations.percentageFromCfi(cfi)
      this.setProgress(Math.floor(progress * 100))
      this.setSection(curLocation.start.index)
      saveLocation(this.fileName, cfi)
    },
    displayBook (target, cb) {
      const reader = this.currentBook.rendition
      reader.display(target).then(() => {
        cb && cb()
        this.refreshContent()
      })
      return target
    },
    hide () {
      this.setSettingVisible(-1)
      this.setMenuVisible(false)
      this.setFontFamilyVisible(false)
    },
    getReadTime () {
      const time = getReadTime(this.fileName)
      return time ? this.formatTime(Math.ceil(time / 60)) : 0
    },
    formatTime (time) {
      if (time < 60) return time + '分钟'
      return Math.ceil(time / 60) + '小时'
    }
  }
}
