<template>
  <div id="book"></div>
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
