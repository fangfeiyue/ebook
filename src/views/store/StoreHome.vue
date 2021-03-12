<template>
  <div class="store-home">
    <search-bar/>
  </div>
</template>
<script>
import SearchBar from '../../components/home/SearchBar.vue'
export default {
  components: {
    SearchBar
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
