<template>
  <div class="header-top">
    <span class="icon-back icon1" @click="handleBack"></span>
    <span class="title">{{title}}</span>
  </div>
</template>
<script>
export default {
  props: {
    title: String
  },
  methods: {
    handleBack() {
      this.$router.back()
    }
  }
}
</script>
<style lang="scss">
  @import '../../assets/global.scss';
  .header-top {
    display: flex;
    align-items: center;
    // justify-content: center;
    box-shadow: 0 0 px2rem(5) 0 rgba(0, 0, 0, 0.09);
    height: px2rem(46);
    background-color: #f5f5f5;
    position: fixed;
    z-index: 100;
    left: 0;
    top: 0;
    width: 100%;
    span {
      color: #000;
    }
    .title {
      font-size: px2rem(18);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    .icon1 {
      font-size: px2rem(20);
      margin-left: px2rem(10);
    }
  }
</style>