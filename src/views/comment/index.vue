<template>
  <div class="container">
    <header-top title="评论" />
    <textarea
      v-model="commentText"
      placeholder="评论内容最多可写12个字~"
      maxlength="12"
      cols="30"
      rows="10"
    ></textarea>
    <div class="btn" @click="comment">发表</div>
  </div>
</template>
<script>
import { sendComment } from "../../api/user";
import HeaderTop from "../../components/header-top/index";
export default {
  components: {
    HeaderTop,
  },
  data() {
    return {
      commentText: "",
    };
  },
  methods: {
    async comment() {
      if (!this.commentText) return this.simpleToast('评论内容不能为空')
      try {
        await sendComment({
          book_id: this.$route.params.id,
          content: this.commentText.trim(),
        });
        this.simpleToast('评论成功~')
        setTimeout(() => this.$router.back(), 1000)
      }catch(err) {
        this.simpleToast('评论失败，请稍后再试~')
      }
    },
  },
};
</script>
<style lang="scss" scoped>
@import "../../assets/global.scss";
.container {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  textarea {
    background-color: #f5f5f5;
    margin-top: px2rem(60);
    width: 100%;
    border: none;
    box-sizing: border-box;
    padding: px2rem(10);
    font-size: px2rem(16);
    outline: none;
  }
  .btn {
    margin-top: px2rem(20);
    background: #4c70e8;
    box-shadow: 0 0 px2rem(5) 0 rgba(0, 0, 0, 0.13);
    border-radius: 8px;
    height: px2rem(50);
    // width: px2rem(293.5);
    width: 80%;
    font-family: PingFangSC-Regular;
    font-size: px2rem(18);
    color: #ffffff;
    text-align: center;
    line-height: px2rem(50);
  }
}
</style>