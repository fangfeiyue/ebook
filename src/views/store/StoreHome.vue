<template>
  <div class="store-home">
    <search-bar/>
    <scroll :top="94" @onScroll="onScroll">
      <recommend class="recommend" :data="recommend"/>
      <guess-you-like :data="guessYouLike"/>
    </scroll>
    <footer-guide></footer-guide>
  </div>
</template>
<script>
import { homeMixin } from '../../mixin/homeMixin'
import Scroll from '../../components/common/Scroll.vue'
import Recommend from '../../components/home/Recommend'
import GuessYouLike from '../../components/home/GuessYouLike'
import SearchBar from '../../components/home/SearchBar.vue'
import FooterGuide from '../../components/footer/Footer.vue'
import { getHome } from '../../api/home'
export default {
  mixins: [homeMixin],
  components: {
    Scroll,
    SearchBar,
    Recommend,
    GuessYouLike,
    FooterGuide
  },
  data () {
    return {
      titleText: '精选',
      btnText: '查看全部',
      recommend: null,
      banner: null,
      categoryList: null,
      featured: null,
      guessYouLike: null
    }
  },
  mounted () {
    getHome().then(res => {
      if (res && res.status === 200) {
        const data = res.data
        // const randomIndex = Math.floor(Math.random() * data.random.length)
        // this.banner = data.banner
        // this.featured = data.featured
        this.recommend = data.recommend
        this.guessYouLike = data.guessYouLike
        // this.categoryList = data.categoryList
        // this.randomBook = data.random[randomIndex]
      }
      console.log('res', res)
    })
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
    .recommend {
      margin-top: px2rem(20);
    }
    .featured {
      margin-top: px2rem(20);
    }
    .category-list-wrapper {
      margin-top: px2rem(20);
    }
    .category {
      margin-top: px2rem(20);
    }
  }
</style>
