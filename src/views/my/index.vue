<template>
  <div class="container">
    <img src="../../assets/images/my@bg.png" class="bg"/>
    <!-- <button
      if="false"
      open-type="getUserInfo"
      class="avatar-position"
      bind:getuserinfo="onGetUserInfo"
    >
      <img class="avatar" src="../../assets/images/my.png" />
    </button> -->
    <div class="avatar-container avatar-position">
      <img src="../../assets/images/my.png" class="avatar" />
      <span class="nick-name">可爱的宝宝</span>
    </div>
    <div class="about-container">
      <div class="about-us">
        <span class="icon-progress book-num"></span>
        <span class="description">关于我们</span>
      </div>
      <div class="about-us">
        <span class="book-num">1</span>
        <span class="description">喜欢的书</span>
      </div>
    </div>
    <div class="item-box">
      <div class="item">
        <span>收藏的图书</span>
        <span class="icon-forward"></span>
      </div>
      <div class="item">
        <span>清除缓存</span>
        <span class="icon-forward"></span>
      </div>
    </div>
    <footer-guide />
  </div>
</template>
<script>
import FooterGuide from "../../components/footer/Footer.vue";
export default {
  components: {
    FooterGuide,
  },
};
</script>
<style lang="scss" scoped>
@import '../../assets/global.scss';
.personal-center {
  background-color: #fff;
  width: 100%;
  height: 100%;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  background-color: #fff;
}

.item-box {
  width: 100%;
  // padding: px2rem(20);
  .item {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    font-size: px2rem(16);
    padding: 0 px2rem(10);
    box-sizing: border-box;
    height: px2rem(50);
    border-bottom: 1px solid rgba(0, 0, 0, 0.04);
  }
}

.bg {
    width: 100%;
    // height: px2rem(574);
}

.nick-name {
  font-size: px2rem(16);
}

.avatar-position {
    position: absolute;
    top: px2rem(120);
    border: none;
    border-radius: 50%;
}

.my-img {
    width: px2rem(60);
    height: px2rem(60);
}

.avatar-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.avatar {
    width: px2rem(60);
    height: px2rem(60);
    overflow: hidden;
    border-radius: 50%;
    margin-bottom: px2rem(10);
}

.about-container {
    padding: 0 px2rem(50);
    width: px2rem(250);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    top: px2rem(220);
}

.about-us image {
    width: px2rem(17);
    height: px2rem(17);
}

.preview-container {
    margin-top: px2rem(15);
    width: 690rpx;
    display: flex;
    flex-direction: row;
    padding:0 px2rem(15);
    flex-wrap:wrap;
    justify-content: space-between;
}

.preview {
    margin-bottom: px2rem(15);
}

.about-us {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.book-num {
    font-size: px2rem(18);
    color: #000000;
}

.description {
    font-size: px2rem(12);
    color: #999999;
}

.about-container>view:nth-child(2) {
    margin-top: px2rem(-5);
}

.like-container {
    /* margin-top:30rpx; */
    margin-top: px2rem(-13);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f5f5f5;
}

.headline {
    margin-top: px2rem(30);
    width: px2rem(97);
    height: px2rem(42);
}

.study {
    width: px2rem(88);
    height: px2rem(88);
    position: absolute;
    top: px2rem(40);
    right: px2rem(45);
}
</style>