<template>
  <div class="search-bar">
    <div class="search-bar-title-wrapper">
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
    <div class="search-bar-input-wrapper"></div>
  </div>
</template>
<script>
export default {}
</script>

<style lang="scss" scoped>
  @import '../../assets/global.scss';
  .search-bar {
    position: relative;
    width: 100%;
    .search-bar-title-wrapper {
      width: 100%;
      height: px2rem(42);
      position: absolute;
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
  }
</style>
