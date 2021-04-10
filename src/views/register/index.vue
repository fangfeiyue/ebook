<template>
  <div class="register">
    <header-top />
    <div class="register-box">
      <div class="item">
        <span>昵称：</span>
        <input type="text" placeholder="请输入昵称" />
      </div>
      <div class="item">
        <span>邮箱：</span>
        <input type="text" placeholder="请输入邮箱" />
      </div>
      <div class="item">
        <span>密码：</span>
        <input type="text" placeholder="请输入密码" />
      </div>
      <!-- <div class="item">
        <span>确认密码：</span>
        <input type="text" placeholder="请再次输入密码" />
      </div> -->
            <div class="tip">
        <span>已有账号 </span>
        <span @click="login">去登录</span>
      </div>
      <div class="btn">注册</div>
    </div>
  </div>
</template>
<script>
import HeaderTop from "../../components/header-top/index";
export default {
  components: {
    HeaderTop,
  },
  methods: {
    login() {
      this.$router.push('/login')
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/global.scss";
.register {
  background-color: #fff;
  width: 100%;
  height: 100%;
  .register-box {
    width: 100%;
    box-sizing: border-box;
    padding: px2rem(60) px2rem(30) px2rem(30);
  }
  .title {
    font-size: px2rem(20);
  }
  .item {
    display: flex;
    flex-direction: column;
    margin-top: px2rem(15);
    span {
      font-size: px2rem(18);
    }
    input {
      background: #ffffff;
      font-size: px2rem(16);
      box-shadow: 0 0 px2rem(5) 0 rgba(0, 0, 0, 0.09);
      border-radius: px2rem(4);
      height: px2rem(45);
      width: 100%;
      margin-top: px2rem(10);
      border: none;
      padding-left: px2rem(10);
      outline: none;
    }
  }
  .tip {
    text-align: center;
    span {
      font-size: px2rem(12);
    }
    span:first-child {
      color: #0c0c0c;
    }
    span:last-child {
      color: #4c70e8;
      text-decoration: underline;
    }
  }
  .btn {
    margin-top: px2rem(20);
    background: #4c70e8;
    box-shadow: 0 0 px2rem(5) 0 rgba(0, 0, 0, 0.13);
    border-radius: 8px;
    height: px2rem(50);
    // width: px2rem(293.5);
    width: 100%;
    font-family: PingFangSC-Regular;
    font-size: px2rem(18);
    color: #ffffff;
    text-align: center;
    line-height: px2rem(50);
  }
}
</style>