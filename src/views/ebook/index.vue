<template>
  <div class="ebook">
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
  methods: {
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
</style>
