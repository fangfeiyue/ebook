<template>
  <div class="store">
    书架
    <footer-guide/>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import FooterGuide from '../../components/footer/Footer.vue'
export default {
  components: {
    FooterGuide
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/global.scss';
  .store {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
</style>
