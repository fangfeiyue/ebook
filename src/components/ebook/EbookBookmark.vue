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
import {
  realPx,
  getBookmark,
  saveBookmark
} from '../../utils/utils'

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
    isBookmark (isBookmark) {
      this.isFixed = isBookmark
      this.color = isBookmark ? BLUE : WHITE
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
        this.addBookmark()
      } else {
        this.setIsBookmark(false)
        this.removeBookmark()
      }
    },
    beforeHight () {
      if (this.isBookmark) {
        this.text = '下拉删除书签'
        this.color = BLUE
        this.isFixed = true
      } else {
        this.text = '下拉添加书签'
        this.color = WHITE
        this.isFixed = false
      }
    },
    beforeThreshold (v) {
      this.$refs.ebookBookmark.style.top = `${-v}px`
      this.beforeHight()
      const iconDown = this.$refs.iconDown
      if (iconDown.style.transform === 'rotate(180deg)') {
        iconDown.style.transform = 'rotate(0deg)'
      }
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
    addBookmark () {
      this.bookmark = getBookmark(this.fileName)
      if (!this.bookmark) this.bookmark = []

      const cur = this.currentBook.rendition.currentLocation()
      console.log('curcur', cur)
      // start.cfi = 'epubcfi(/6/28[A370011_1_En_6_Chapter]!/4/8/10[Sec5]/6[Par21]/5:76)'
      // end.cfi = 'epubcfi(/6/28[A370011_1_En_6_Chapter]!/4/8/10[Sec5]/8[Par22]/5:183)'
      // 取出cfi叹号前面的部分
      const cfibase = cur.start.cfi.replace(/!.*/, '')
      // 取出cfi后面的部分
      const cfistart = cur.start.cfi.replace(/.*!/, '').replace(/\)$/, '')
      const cfiend = cur.end.cfi.replace(/.*!/, '').replace(/\)$/, '')
      console.log('cfibase', cfibase) // epubcfi(/6/28[A370011_1_En_6_Chapter]
      console.log('cfistart', cfistart) // /4/8/10[Sec5]/6[Par21]/5:76
      console.log('cfiend', cfiend) // /4/8/10[Sec5]/8[Par22]/5:183
      const cfirange = `${cfibase}!,${cfistart},${cfiend})`
      console.log('cfirange', cfirange) // epubcfi(/6/28[A370011_1_En_6_Chapter]!/4/8/10[Sec5]/6[Par21]/5:76,/4/8/10[Sec5]/8[Par22]/5:183)
      this.currentBook.getRange(cfirange).then(range => {
        console.log('range', range.toString())
        const text = range.toString().replace(/\$\$/g, '')
        console.log('text', text)
        this.bookmark.push({
          // 用于判断当前页是不是书签页
          cfi: cur.start.cfi,
          // 用于显示文本
          text
        })
        saveBookmark(this.fileName, this.bookmark)
      })
    },
    removeBookmark () {
      this.bookmark = getBookmark(this.fileName)
      const cur = this.currentBook.rendition.currentLocation()
      const startcfi = cur.start.cfi
      if (this.bookmark) {
        saveBookmark(this.fileName, this.bookmark.filter(item => item.cfi !== startcfi))
        this.setIsBookmark(false)
      }
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
    z-index: 160;
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
