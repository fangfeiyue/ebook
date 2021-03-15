<template>
  <transition name="hot-search-move">
    <scroll class="hot-search-wrapper"
            :top="52"
            @onScroll="onScroll"
            ref="scroll">
      <hot-search label="搜索历史"
                  btn="清空"
                  :hotSearch="historySearch" v-show="historySearch.length"></hot-search>
    </scroll>
  </transition>
</template>

<script>
import Scroll from '../common/Scroll'
import HotSearch from './HotSearch'
import { homeMixin } from '../../mixin/homeMixin'
import { getSearchHistory, saveSearchHistory } from '../../utils/utils'

export default {
  mixins: [homeMixin],
  components: {
    Scroll,
    HotSearch
  },
  data () {
    return {
      historySearch: []
    }
  },
  methods: {
    onScroll (offsetY) {
      this.setHotSearchOffsetY(offsetY)
    },
    reset () {
      this.$refs.scroll.scrollTo(0, 0)
    }
  },
  mounted () {
    this.historySearch = getSearchHistory()
  },
  unmounted () {
    if (this.historySearch) saveSearchHistory(this.historySearch)
  }
}
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .hot-search-wrapper {
    width: 100%;
    height: 100%;
    background: #fff;
    .line {
      width: 100%;
      height: 0;
      border-top: px2rem(1) solid #eee;
      margin: px2rem(10) 0;
    }
  }
</style>
