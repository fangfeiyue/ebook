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
export default {
  components: {
    EbookMenu,
    EbookTitle,
    EbookReader
  }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/styles/global.scss";
</style>
