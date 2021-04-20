<template>
  <div class="footer">
    <div class="footer-item" v-for="tab in tabs" :key="tab.name" @click="gotoAddress(tab.path)">
      <span class="icon" :class="tab.class" :style="{color: $route.path.indexOf(tab.path) !== -1?'red':'black'}"></span>
      <span class="footer-item-desc" :style="{color: $route.path.indexOf(tab.path) !== -1?'red':'black'}">{{tab.name}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tabs: [{
        id: 'store',
        name: '书城',
        path: '/store/home',
        class: 'icon-book'
      }, {
        id: 'bookshelf',
        name: '书架',
        path: '/bookshelf',
        class: 'icon-shelf'
      }
      // , {
      //   id: 'my',
      //   name: '我的',
      //   path: '/my',
      //   class: 'icon-person'
      // }
      ]
    }
  },
  methods: {
    gotoAddress (path) {
      console.log('点击了页面', path)
      this.$router.push(path)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../assets/global.scss';
  .footer {
    background-color: #fff;
    position: fixed;
    z-index: 100;
    left: 0;
    right: 0;
    bottom: 0;
    height: px2rem(45.7);
    display: flex;
    box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,.1);
    .footer-item{
      flex: 1;
      display: flex;
      text-align: center;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .footer-item-desc {
        font-size: px2rem(10);
        color: #666;
      }
      .icon {
        font-size: px2rem(19);
      }
    }
  }
</style>
