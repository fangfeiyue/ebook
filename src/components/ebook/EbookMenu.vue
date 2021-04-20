<template>
  <div class="ebook-menu">
    <transition name="slide-up">
      <div class="menu-wrapper" :class="{'hide-box-shadow': settingVisible >= 0 || !menuVisible}"
           v-show="menuVisible">
        <div class="icon-wrapper" :class="{'selected': settingVisible === 3}">
          <span class="icon-menu" @click="showSetting(3)"></span>
          <span>目录</span>
        </div>
        <div class="icon-wrapper" :class="{'selected': settingVisible === 2}">
          <span class="icon-progress" @click="showSetting(2)"></span>
          <span>进度</span>
        </div>
        <div class="icon-wrapper" :class="{'selected': settingVisible === 1}">
          <span class="icon-private" @click="setEyesModel"></span>
          <span>护眼</span>
        </div>
        <div class="icon-wrapper" :class="{'selected': settingVisible === 0}">
          <span class="icon-A" @click="showSetting(0)"></span>
          <span>设置</span>
        </div>
      </div>
    </transition>
    <ebook-setting-font></ebook-setting-font>
    <ebook-setting-font-popup></ebook-setting-font-popup>
    <ebook-setting-theme></ebook-setting-theme>
    <ebook-setting-progress></ebook-setting-progress>
    <ebook-slide></ebook-slide>
    <!--<ebook-speaking-icon></ebook-speaking-icon> -->
  </div>
</template>
<script>
import { ebookMixin } from '../../mixin/mixin'
import EbookSettingFont from './EbookSettingFont'
import EbookSettingFontPopup from './EbookSettingFontPopup'
import EbookSettingTheme from './EbookSettingTheme'
import EbookSettingProgress from './EbookSettingProgress'
import EbookSlide from './EbookSlide'
import { saveTheme } from '../../utils/utils'
// import EbookSpeakingIcon from './EbookSpeakingIcon'
export default {
  mixins: [ebookMixin],
  components: {
    EbookSettingFontPopup,
    EbookSlide,
    EbookSettingProgress,
    EbookSettingFont,
    EbookSettingTheme
    // EbookSpeakingIcon
  },
  methods: {
    showSetting (key) {
      this.setSettingVisible(key)
    },
    setEyesModel() {
      this.setTheme(3)
    },
    setTheme (index) {
      const theme = this.themeList[index]
      this.setDefaultTheme(theme.name).then(() => {
        this.setGlobalTheme()
        this.currentBook.rendition.themes.select(theme.name)
      })
      saveTheme(this.fileName, theme.name)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/styles/global";

.menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 200;
    display: flex;
    width: 100%;
    height: px2rem(48);
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    font-size: px2rem(22);
    background-color: #fff;
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      @include center;
      flex-direction: column;
      .icon-progress {
        font-size: px2rem(24);
      }
      .icon-A {
        font-size: px2rem(20);
      }
      span:last-child {
        font-size: px2rem(10);
      }
    }
  }
</style>
