<template>
  <div class="store-home">
    <search-bar/>
    <!-- <flap-card/> -->
    <scroll :top="94" @onScroll="onScroll">
      <div class="banner-wrapper">
        <img :src="banner"/>
      </div>
      <guess-you-like :data="guessYouLike"/>
      <recommend :data="recommend"/>
    </scroll>
    <!-- <footer-guide></footer-guide> -->
  </div>
</template>
<script>
import { homeMixin } from '../../mixin/homeMixin'
import Scroll from '../../components/common/Scroll.vue'
import Recommend from '../../components/home/Recommend'
import GuessYouLike from '../../components/home/GuessYouLike'
import SearchBar from '../../components/home/SearchBar.vue'
// import FlapCard from '../../components/home/FlapCard'
// import FooterGuide from '../../components/footer/Footer.vue'
import { getHome } from '../../api/home'
export default {
  mixins: [homeMixin],
  components: {
    SearchBar,
    Scroll,
    Recommend,
    GuessYouLike
    // FlapCard,
    // FooterGuide
  },
  data () {
    return {
      recommend: null,
      banner: null,
      guessYouLike: null
    }
  },
  mounted () {
    getHome().then(res => {
      if (res && res.status === 200) {
        const data = res.data
        const randomIndex = Math.floor(Math.random() * data.random.length)
        this.randomBook = data.random[randomIndex]
        this.banner = data.banner
        this.recommend = data.recommend
        this.guessYouLike = data.guessYouLike
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
    .banner-wrapper {
      width: 100%;
      padding: px2rem(10);
      box-sizing: border-box;
      img {
        width: 100%;
        height: px2rem(150);
      }
    }
  }
</style>
