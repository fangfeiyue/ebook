<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible">
    <div class="close-btn-wrapper" @click="handleClick">
      <span class="icon-close"></span>
    </div>
  </div>
</template>
<script>
import { homeMixin } from '../../mixin/homeMixin'
export default {
  mixins: [homeMixin],
  methods: {
    handleClick () {
      this.setFlapCardVisible(false)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../assets/global.scss';
  .flap-card-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 888;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    .close-btn-wrapper {
      position: absolute;
      left: 0;
      bottom: px2rem(30);
      z-index: 999;
      width: 100%;
      @include center;
      .icon-close {
        width: px2rem(45);
        height: px2rem(45);
        font-size: px2rem(25);
        border-radius: 50%;
        background-color: #333;
        color: #fff;
        @include center;
      }
    }
  }
</style>
