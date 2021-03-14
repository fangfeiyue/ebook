<template>
  <div class="store-home">
    <search-bar/>
    <!-- <flap-card/> -->
    <scroll :top="94" @onScroll="onScroll">
      <div class="banner-wrapper">
        <img :src="banner"/>
      </div>
      <guess-you-like :data="guessYouLike"/>
      <recommend class="recommend" :data="recommend"/>
      <featured class="featured" :data="featured" :titleText="titleText" :btnText="btnText" />
      <div class="category-list-wrapper" v-for="(item, index) in categoryList" :key="index">
        <category-book :data="item"></category-book>
      </div>
    </scroll>
    <!-- <footer-guide></footer-guide> -->
  </div>
</template>
<script>
import { homeMixin } from '../../mixin/homeMixin'
import Scroll from '../../components/common/Scroll.vue'
import Recommend from '../../components/home/Recommend'
import Featured from '../../components/home/Featured'
import CategoryBook from '../../components/home/CategoryBook'
import GuessYouLike from '../../components/home/GuessYouLike'
import SearchBar from '../../components/home/SearchBar.vue'
// import FlapCard from '../../components/home/FlapCard'
// import FooterGuide from '../../components/footer/Footer.vue'
import { getHome } from '../../api/home'
export default {
  mixins: [homeMixin],
  components: {
    Scroll,
    SearchBar,
    Featured,
    Recommend,
    CategoryBook,
    GuessYouLike
    // FlapCard,
    // FooterGuide
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
        const randomIndex = Math.floor(Math.random() * data.random.length)
        this.banner = data.banner
        this.featured = data.featured
        this.recommend = data.recommend
        this.guessYouLike = data.guessYouLike
        this.categoryList = data.categoryList
        this.randomBook = data.random[randomIndex]
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
