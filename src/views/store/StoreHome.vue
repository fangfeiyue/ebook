<template>
  <div class="store-home">
    <search-bar/>
    <scroll :top="94" @onScroll="onScroll">
      <div v-for="(item, index) in list" :key="index">11111111111111111</div>
    </scroll>
  </div>
</template>
<script>
import { homeMixin } from '../../mixin/homeMixin'
import Scroll from '../../components/common/Scroll.vue'
import SearchBar from '../../components/home/SearchBar.vue'
export default {
  mixins: [homeMixin],
  components: {
    SearchBar,
    Scroll
  },
  data () {
    return {
      list: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    }
  },
  methods: {
    onScroll (offsetY) {
      this.setOffsetY(offsetY)
    }
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
