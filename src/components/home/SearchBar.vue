<template>
  <div class="search-bar" :class="{'hide-title': !titleVisible}">
    <transition name="title">
      <div class="search-bar-title-wrapper" v-show="titleVisible">
        <div class="title-icon-back-wrapper">
          <span class="icon-back icon"></span>
        </div>
        <div class="title-text-wrapper">
          <span class="title-text title">书城</span>
        </div>
        <div class="title-icon-shake-wrapper">
          <span class="icon-shake icon"></span>
        </div>
      </div>
    </transition>
    <div class="search-bar-input-wrapper">
      <div class="search-bar-input">
        <span class="icon-search icon"></span>
        <input type="text" class="input" placeholder="计算机科学和软件工程" v-model="searchText">
      </div>
    </div>
  </div>
</template>
<script>
import { homeMixin } from '../../mixin/homeMixin'
export default {
  mixins: [homeMixin],
  data () {
    return {
      searchText: '',
      titleVisible: true
    }
  },
  watch: {
    offsetY (offsetY) {
      console.log(offsetY)
      if (offsetY > 0) {
        this.hideTile()
      } else {
        this.showTitle()
      }
    }
  },
  methods: {
    hideTile () {
      this.titleVisible = false
    },
    showTitle () {
      this.titleVisible = true
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
    &.hide-title {
      height: px2rem(52);
    }
    .search-bar-title-wrapper {
      width: 100%;
      height: px2rem(42);
      position: relative;
      top: 0;
      left: 0;
      .title-icon-back-wrapper {
        position: absolute;
        left: px2rem(15);
        top: 0;
        height: px2rem(42);
        @include center;
      }
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
    .search-bar-input-wrapper {
      width: 100%;
      height: px2rem(52);
      padding: px2rem(10);
      box-sizing: border-box;
      .search-bar-input {
        width: 100%;
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
