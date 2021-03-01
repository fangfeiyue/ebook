import { mapGetters, mapActions } from 'vuex'
import { themeList } from '../config/config'
import { addCssFile, clearPreTheme } from '../utils/utils'

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
    }
  }
}
