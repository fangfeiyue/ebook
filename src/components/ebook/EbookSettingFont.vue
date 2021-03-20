<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 0">
      <div class="setting-font-size">
        <div class="preview" @click="reduceFontSize">
          <span>A-</span>
        </div>
        <div class="select">
          <span>{{ fontSize }}</span>
        </div>
        <div class="preview" @click="increaseFontSize">
          <span>A+</span>
        </div>
        <div class="setting-font-family" @click.stop="showFontFamilySetting">
          <div class="setting-font-family-text-wrapper">
            <span class="setting-font-family-text"
              >当前字体：{{ defaultFontFamily }}</span
            >
          </div>
          <div class="setting-font-family-icon-wrapper">
            <span class="icon-forward"></span>
          </div>
        </div>
      </div>
      <!-- <div class="setting-font-family" @click.stop="showFontFamilySetting">
        <div class="setting-font-family-text-wrapper">
          <span class="setting-font-family-text"
            >当前字体：{{ defaultFontFamily }}</span
          >
        </div>
        <div class="setting-font-family-icon-wrapper">
          <span class="icon-forward"></span>
        </div>
      </div> -->
      <div class="setting-theme">
        <span>主题：</span>
        <div
          class="setting-theme-item"
          v-for="(item, index) in themeList.slice(0, 3)"
          :key="index"
          @click="setTheme(index)"
        >
          <div
            class="preview"
            :class="{ selected: item.name === defaultTheme }"
            :style="{ background: item.style.body.background }"
          ></div>
          <!-- <div class="text"
               :class="{'selected': item.name === defaultTheme}">{{item.alias}}
          </div> -->
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { FONT_SIZE_LIST } from "../../config/config";
import { ebookMixin } from "../../mixin/mixin";
import { saveFontSize, saveTheme } from "../../utils/utils";
export default {
  mixins: [ebookMixin],
  data() {
    return {
      styleLeft: {},
      styleRight: {},
      fontSize: 16,
      fontSizeList: FONT_SIZE_LIST,
    };
  },
  methods: {
    setFontSize(fontSize) {
      this.setDefaultFontSize(fontSize);
      saveFontSize(this.fileName, fontSize);
      this.currentBook.rendition.themes.fontSize(fontSize);
    },
    increaseFontSize() {
      this.fontSize += 2;
      this.fontSize = this.fontSize > 24 ? 24 : this.fontSize;
      this.setFontSize(this.fontSize + "px");
    },
    reduceFontSize(fontSize = 24) {
      this.fontSize -= 2;
      this.fontSize = this.fontSize < 12 ? 12 : this.fontSize;
      this.setFontSize(this.fontSize + "px");
    },
    showFontFamilySetting() {
      this.setFontFamilyVisible(true);
    },
    setTheme(index) {
      const theme = this.themeList[index];
      this.setDefaultTheme(theme.name).then(() => {
        this.setGlobalTheme();
        this.currentBook.rendition.themes.select(theme.name);
      });
      saveTheme(this.fileName, theme.name);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";

.setting-wrapper {
  position: absolute;
  bottom: px2rem(48);
  left: 0;
  z-index: 190;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: px2rem(100);
  padding-left: px2rem(10);
  box-sizing: border-box;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  background-color: #fff;
  .setting-font-size {
    flex: 2;
    display: flex;
    height: 100%;
    align-items: center;
    .preview {
      flex: 0 0 px2rem(40);
      @include center;
      span {
        font-size: px2rem(25);
        border: 20px;
        padding: px2rem(5) px2rem(20);
        border-radius: px2rem(25);
        border: px2rem(2) solid #fcfcfc;
      }
    }
    .select {
      display: flex;
      // flex: 1;
      span {
        padding: 0 px2rem(10);
        font-size: px2rem(14);
      }
      .select-wrapper {
        flex: 1;
        display: flex;
        align-items: center;
        &:first-child {
          .line {
            &:first-child {
              border-top: none;
            }
          }
        }
        &:last-child {
          .line {
            &:last-child {
              border-top: none;
            }
          }
        }
        .line {
          flex: 1;
          height: 0;
        }
        .point-wrapper {
          position: relative;
          flex: 0 0 0;
          width: 0;
          height: px2rem(7);
          .point {
            position: absolute;
            top: px2rem(-8);
            left: px2rem(-10);
            width: px2rem(20);
            height: px2rem(20);
            border-radius: 50%;
            box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, 0.15);
            @include center;
            .small-point {
              width: px2rem(5);
              height: px2rem(5);
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
  .setting-font-family {
    flex: 1;
    font-size: px2rem(14);
    @include center;
    .setting-font-family-text-wrapper {
      @include center;
    }
    .setting-font-family-icon-wrapper {
      @include center;
    }
  }
  .setting-theme {
    height: 50%;
    display: flex;
    align-items: center;
    span {
      height: 50%;
      font-size: px2rem(20);
    }
    .setting-theme-item {
      flex: 1;
      display: flex;
      height: 100%;
      flex-direction: column;
      padding: px2rem(5);
      box-sizing: border-box;
      .preview {
        flex: 1;
        border: px2rem(1) solid #ccc;
        box-sizing: border-box;
        border: none;
        border-radius: 45%;
        span {
          font-size: px2rem(12);
        }
        &.selected {
          box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, 0.1);
          border: px2rem(2) solid #5e6369;
        }
      }
      .text {
        flex: 0 0 px2rem(20);
        font-size: px2rem(14);
        @include center;
      }
    }
  }
}
</style>
