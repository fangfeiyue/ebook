<template>
  <div>
    <div class="search-bar" :class="{'hide-title': !titleVisible, 'hide-shadow': !shadowVisible}">
      <transition name="title">
        <div class="search-bar-title-wrapper" v-show="titleVisible">
          <div class="title-text-wrapper">
            <span class="title-text title">书城</span>
          </div>
          <div class="title-icon-shake-wrapper" @click="showFlapCard">
            <span class="icon-shake icon"></span>
          </div>
        </div>
      </transition>
      <div class="title-icon-back-wrapper" :class="{'hide-title': !titleVisible}" @click="handleBack">
        <span class="icon-back icon"></span>
      </div>
      <div class="search-bar-input-wrapper" :class="{'hide-title': !titleVisible}">
        <div class="search-bar-blank" :class="{'hide-title': !titleVisible}"></div>
        <div class="search-bar-input">
          <span class="icon-search icon"></span>
          <input type="text" class="input" placeholder="计算机科学和软件工程" v-model="searchText" @click="showSearchList">
        </div>
      </div>
    </div>
    <hot-search-list v-show="searchListVisible" ref="searchList"/>
  </div>
</template>
<script>
import { homeMixin } from '../../mixin/homeMixin'
import HotSearchList from './HotSearchList.vue'
export default {
  components: {
    HotSearchList
  },
  mixins: [homeMixin],
  data () {
    return {
      searchText: '',
      titleVisible: true,
      shadowVisible: false,
      searchListVisible: false
    }
  },
  watch: {
    offsetY (offsetY) {
      console.log(offsetY)
      if (offsetY > 0) {
        this.hideTile()
        this.showShadow()
      } else {
        this.showTitle()
        this.hideShadow()
      }
    },
    hotSearchOffsetY (offsetY) {
      console.log('hotSearch', offsetY)
      offsetY > 0 ? this.showShadow() : this.hideShadow()
    }
  },
  methods: {
    hideTile () {
      this.titleVisible = false
    },
    showTitle () {
      this.titleVisible = true
    },
    hideShadow () {
      this.shadowVisible = false
    },
    showShadow () {
      this.shadowVisible = true
    },
    hideSearchList () {
      this.searchListVisible = false
      if (this.offsetY > 0) {
        this.hideTile()
        this.showShadow()
      } else {
        this.showTitle()
        this.hideShadow()
      }
    },
    showSearchList () {
      this.hideTile()
      this.hideShadow()
      this.searchListVisible = true
      this.$nextTick(() => {
        this.$refs.searchList.reset()
      })
    },
    handleBack () {
      console.log('点击了返回')
      this.showTitle()
      this.hideSearchList()
      this.offsetY > 0 ? this.showShadow() : this.hideShadow()
    },
    showFlapCard () {
      console.log('showFlapCard ')
      this.setFlapCardVisible(true)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/global.scss';
  .search-bar {
    position: relative;
    width: 100%;
    height: px2rem(94);
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
    &.hide-title {
      height: px2rem(52);
    }
    &.hide-shadow {
      box-shadow: none;
    }
    .search-bar-title-wrapper {
      width: 100%;
      height: px2rem(42);
      position: absolute;
      top: 0;
      left: 0;
      .title-text-wrapper {
        width: 100%;
        height: px2rem(42);
        @include center;
      }
      .title-icon-shake-wrapper {
        position: absolute;
        right: px2rem(15);
        top: 0;
        height: px2rem(42);
        @include center;
      }
    }
    .title-icon-back-wrapper {
      position: absolute;
      left: px2rem(15);
      top: 0;
      z-index: 200;
      height: px2rem(42);
      transition: height .2s linear;
      @include center;
      &.hide-title {
        height: px2rem(52);
      }
    }
    .search-bar-input-wrapper {
      position: absolute;
      top: px2rem(42);
      left: 0;
      z-index: 100;
      width: 100%;
      height: px2rem(52);
      display: flex;
      padding: px2rem(10);
      box-sizing: border-box;
      transition: top .2s linear;
      &.hide-title {
        top: 0;
      }
      .search-bar-blank {
        flex: 0 0 0;
        width: 0;
        transition: all .2s linear;
        &.hide-title {
          flex: 0 0 px2rem(31);
          width: px2rem(31);
        }
      }
      .search-bar-input {
        width: 100%;
        flex: 1;
        border-radius: px2rem(20);
        background-color: #f4f4f4;
        padding: px2rem(5) px2rem(15);
        box-sizing: border-box;
        border: px2rem(1) solid #eee;
        @include left;
        .icon-search {
          color: #999;
        }
        .input {
          width: 100%;
          height: px2rem(22);
          border: none;
          margin-left: px2rem(10);
          font-size: px2rem(12);
          color: #666;
          background-color: transparent;
          &:focus {
            outline: none;
          }
          &::-webkit-input-placeholder {
            color: #ccc;
          }
        }
      }
    }
  }
</style>
