<template>
  <div class="ebook-bookmark" ref="ebookBookmark">
    <div class="ebook-bookmark-text-wrapper">
      <div class="ebook-bookmark-down-wrapper" ref="iconDown">
        <span class="icon-down"></span>
      </div>
      <div class="ebook-bookmark-text">
        {{text}}
      </div>
    </div>
    <div class="ebook-bookmark-icon-wrapper" :style="isFixed ? fixedStyle : {}">
      <book-mark :width="15" :height="35" :color="color" ref="bookmark"></book-mark>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BookMark from './Bookmark'
import { ebookMixin } from '../../mixin/mixin'
import { realPx, saveBookmark, getBookmark } from '../../utils/utils'

const BLUE = '#346cbc'
const WHITE = '#fff'
export default {
  mixins: [ebookMixin],
  components: {
    BookMark
  },
  computed: {
    // 书签拖动到多高到达临界点，因为realPx需要反复运算，所以这里定位计算属性
    height () {
      return realPx(35)
    },
    threshold () {
      return realPx(55)
    },
    fixedStyle () {
      return {
        position: 'fixed',
        right: `${(window.innerWidth - this.$refs.ebookBookmark.clientWidth) / 2}px`,
        top: 0
      }
    }
  },
  watch: {
    offsetY (v) {
      if (v >= this.height && v <= this.threshold) { // 第二阶段
        this.beforeThreshold(v)
      } else if (v >= this.threshold) { // 第三阶段
        this.afterThreshold(v)
      } else if (v > 0 && v < this.height) {
        this.beforeHight()
      } else if (v === 0) {
        this.restore()
      }
    },
    isBookmark (v) {
      this.fixed = v
      if (v) {
        this.color = BLUE
      } else {
        this.color = WHITE
      }
    }
  },
  data () {
    return {
      color: WHITE,
      text: '',
      setBookmark: false,
      isFixed: false
    }
  },
  methods: {
    restore () {
      setTimeout(() => {
        this.$refs.ebookBookmark.style.top = `${-this.height}px`
        this.$refs.iconDown.style.transform = 'rotate(0deg)'
      }, 200)

      if (this.isFixed) {
        this.setIsBookmark(true)
      } else {
        this.setIsBookmark(false)
      }
    },
    beforeHight () {
      if (this.isBookmark) {
        this.text = '下拉删除书签'
        this.color = BLUE
      } else {
        this.text = '下拉添加书签'
        this.color = WHITE
      }
      this.isFixed = false
    },
    beforeThreshold (v) {
      this.$refs.ebookBookmark.style.top = `${-v}px`
      this.beforeHight()
      const iconDown = this.$refs.iconDown
      if (iconDown.style.transform === 'rotate(180deg)') {
        iconDown.style.transform = 'rotate(0deg)'
      }
      this.isFixed = false
    },
    afterThreshold (v) {
      this.$refs.ebookBookmark.style.top = `${-v}px`

      if (this.isBookmark) {
        this.text = '松手删除书签'
        this.color = WHITE
        this.isFixed = false
      } else {
        this.text = '松手添加书签'
        this.color = BLUE
        this.isFixed = true
      }

      const iconDown = this.$refs.iconDown
      if (iconDown.style.transform === '' || iconDown.style.transform === 'rotate(0deg)') {
        iconDown.style.transform = 'rotate(180deg)'
      }
    },
    setAndSaveBookmark () {
      this.bookmark = getBookmark(this.fileName)
      if (!this.bookmark) {
        this.bookmark = []
      }
      const currentLocation = this.currentBook.rendition.currentLocation()
      const cfibase = currentLocation.start.cfi.replace(/!.*/, '').replace('epubcfi(', '')
      const cfistart = currentLocation.start.cfi.replace(/.*!/, '').replace(/\)/, '')
      const cfiend = currentLocation.end.cfi.replace(/.*!/, '').replace(/\)/, '')
      const cfiRange = `epubcfi(${cfibase}!,${cfistart},${cfiend})`
      const cfi = currentLocation.start.cfi
      this.currentBook.getRange(cfiRange).then(range => {
        let text = range.toString()
        text = text.replace(/\s\s/g, '')
        text = text.replace(/\r/g, '')
        text = text.replace(/\n/g, '')
        text = text.replace(/\t/g, '')
        text = text.replace(/\f/g, '')
        this.bookmark.push({
          cfi: cfi,
          text: text
        })
        this.setIsBookmark(true)
        saveBookmark(this.fileName, this.bookmark)
      })
    },
    removeBookmark () {
      const currentLocation = this.currentBook.rendition.currentLocation()
      const cfi = currentLocation.start.cfi
      if (this.bookmark) {
        this.bookmark = this.bookmark.filter(item => item.cfi !== cfi)
        saveBookmark(this.fileName, this.bookmark)
      }
      this.setIsBookmark(false)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .ebook-bookmark {
    position: absolute;
    top: px2rem(-35);
    left: 0;
    z-index: 200;
    width: 100%;
    height: px2rem(35);
    .ebook-bookmark-text-wrapper {
      position: absolute;
      right: px2rem(45);
      bottom: 0;
      display: flex;
      .ebook-bookmark-down-wrapper {
        font-size: px2rem(14);
        color: white;
        transition: all .2s linear;
        @include center;
      }
      .ebook-bookmark-text {
        font-size: px2rem(14);
        color: white;
      }
    }
    .ebook-bookmark-icon-wrapper {
      position: absolute;
      right: 0;
      bottom: 0;
      margin-right: px2rem(10);
    }
  }
</style>
