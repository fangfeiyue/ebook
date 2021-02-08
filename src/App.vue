<template>
  <div id="book">
    <span class="icon-check"></span>
    <span class="icon-clock"></span>
    <span class="text">hello world</span>
  </div>
</template>
<script>
import Epub from 'epubjs'
export default {
  mounted () {
    this.book = new Epub('/2014_Book_Self-ReportedPopulationHealthA.epub')
    this.book.renderTo('book', {
      width: window.innerWidth,
      height: window.innerHeight
    }).display()
  }
}
</script>
<style scoped>
  .text {
    font-family: monospace;
  }
</style>
