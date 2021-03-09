<template>
  <div class="ebook" ref="reader">
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
  </div>
</template>
<script>
import EbookMenu from '../../components/ebook/EbookMenu'
import EbookReader from '../../components/ebook/EbookReader'
import EbookTitle from '../../components/ebook/EbookTitle'
import { getReadTime, saveReadTime } from '../../utils/utils'
import { ebookMixin } from '../../mixin/mixin'
export default {
  mixins: [ebookMixin],
  components: {
    EbookMenu,
    EbookTitle,
    EbookReader
  },
  mounted () {
    this.calReadTime()
  },
  beforeMount () {
    this.timer && clearInterval(this.timer)
  },
  watch: {
    offsetY (v) {
      if (v > 0) {
        this.move(v)
      } else if (v === 0) {
        this.restore()
      }
    }
  },
  methods: {
    move (v) {
      console.log('ddd', v)
      this.$refs.reader.style.top = v + 'px'
    },
    restore () {
      this.$refs.reader.style.top = '0px'
    },
    calReadTime () {
      let time = getReadTime(this.fileName)
      if (!time) time = 0
      this.timer = setInterval(() => {
        time++
        if (time % 30 === 0) {
          saveReadTime(this.fileName, time)
        }
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
  .ebook {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
  }
</style>
