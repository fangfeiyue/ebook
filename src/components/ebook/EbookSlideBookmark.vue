<template>
  <div class="ebook-slide-bookmark">
    <div class="slide-bookmark-title">书签</div>
    <scroll class="slide-bookmark-list" :top="48" :bottom="48">
      <div v-if="bookmark && bookmark.length">
        <div
          class="slide-bookmark-item"
          v-for="(item, index) in bookmark"
          :key="index"
          @click="displayBookmark(item.cfi)"
        >
          <div class="slide-bookmark-item-text">{{ item.text }}</div>
          <div class="slide-bookmark-item-icon">
            <span>{{ item.time }}</span>
          </div>
        </div>
      </div>
      <div v-else class="slide-bookmark-tip slide-bookmark-title">
        本书暂无书签
      </div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from "../common/Scroll";
import { ebookMixin } from "../../mixin/mixin";
import { getBookmark } from "../../utils/utils";

export default {
  mixins: [ebookMixin],
  components: {
    Scroll,
  },
  data() {
    return {
      bookmark: null,
    };
  },
  methods: {
    displayBookmark(target) {
      this.displayBook(target, this.hide);
    },
  },
  mounted() {
    this.bookmark = getBookmark(this.fileName);
    console.log("bookmark", this.bookmark);
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";

.ebook-slide-bookmark {
  width: 100%;
  .slide-bookmark-title {
    width: 100%;
    height: px2rem(48);
    font-size: px2rem(14);
    font-weight: bold;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    @include left;
  }
  .slide-bookmark-list {
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-bookmark-item {
      display: flex;
      flex-direction: column;
      padding: px2rem(15) 0;
      box-sizing: border-box;
      .slide-bookmark-item-icon {
        flex: 0 0 px2rem(29);
        @include left;
        font-size: px2rem(13);
        color: #8c8c8c;
      }
      .slide-bookmark-item-text {
        font-size: px2rem(14);
        line-height: px2rem(15);
        max-height: px2rem(45);
        @include ellipsis2(1);
      }
    }
    .slide-bookmark-tip {
      width:100%;
      height:100%;
      @include columnCenter;
      text-align:center;
      color: #fcfcfc;
      font-size: px2rem(15);
    }
  }
}
</style>
