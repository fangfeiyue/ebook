<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible">
    <div class="flap-card-bg">
      <div class="flap-card" v-for="item in flapCardList" :key="item.zIndex" :style="{zIndex: item.zIndex}">
        <div class="flap-card-circle">
          <div class="flap-card-semi-circle flap-card-semi-circle-left" :style="semiCricelStyle(item, 'left')" ref="left"></div>
          <div class="flap-card-semi-circle flap-card-semi-circle-right" :style="semiCricelStyle(item, 'right')" ref="right"></div>
        </div>
      </div>
    </div>
    <div class="close-btn-wrapper" @click="handleClick">
      <span class="icon-close"></span>
    </div>
  </div>
</template>
<script>
import { homeMixin } from '../../mixin/homeMixin'
export default {
  mixins: [homeMixin],
  data () {
    return {
      front: 0,
      back: 1,
      interval: 100,
      flapCardList: [
        {
          r: 255,
          g: 102,
          _g: 102,
          b: 159,
          imgLeft: 'url(' + require('@/assets/images/gift-left.png') + ')',
          imgRight: 'url(' + require('@/assets/images/gift-right.png') + ')',
          backgroundSize: '50% 50%',
          zIndex: 100,
          rotateDegree: 0
        },
        {
          r: 74,
          g: 171,
          _g: 171,
          b: 255,
          imgLeft: 'url(' + require('@/assets/images/compass-left.png') + ')',
          imgRight: 'url(' + require('@/assets/images/compass-right.png') + ')',
          backgroundSize: '50% 50%',
          zIndex: 99,
          rotateDegree: 0
        },
        {
          r: 255,
          g: 198,
          _g: 198,
          b: 102,
          imgLeft: 'url(' + require('@/assets/images/star-left.png') + ')',
          imgRight: 'url(' + require('@/assets/images/star-right.png') + ')',
          backgroundSize: '50% 50%',
          zIndex: 98,
          rotateDegree: 0
        },
        {
          r: 255,
          g: 102,
          _g: 102,
          b: 159,
          imgLeft: 'url(' + require('@/assets/images/heart-left.png') + ')',
          imgRight: 'url(' + require('@/assets/images/heart-right.png') + ')',
          backgroundSize: '50% 50%',
          zIndex: 97,
          rotateDegree: 0
        },
        {
          r: 59,
          g: 201,
          _g: 201,
          b: 22,
          imgLeft: 'url(' + require('@/assets/images/crown-left.png') + ')',
          imgRight: 'url(' + require('@/assets/images/crown-right.png') + ')',
          backgroundSize: '50% 50%',
          zIndex: 96,
          rotateDegree: 0
        }
      ]
    }
  },
  methods: {
    handleClick () {
      this.setFlapCardVisible(false)
    },
    semiCricelStyle (item, direction) {
      return {
        backgroundColor: `rgb(${item.r} ,${item.g} ,${item.b})`,
        backgroundImage: direction === 'left' ? item.imgLeft : item.imgRight,
        backgroundSize: item.backgroundSize
      }
    },
    /*
      index: 第几个圆
      type：
    */
    rotate (index, type) {
      // 获取属性值，因为flapCardList里存储着卡片的参数值
      const item = this.flapCardList[index]
      // front代表正面，也就是右侧的半圆开始旋转
      const dom = type === 'front' ? this.$refs.right[index] : this.$refs.left[index]
      if (!dom) return
      // 设置旋转角度
      dom.style.transform = `rotateY(${item.rotateDegree}deg)`
      // 设置背景颜色
      dom.style.backgroundColor = `rgb(${item.r} ,${item._g} ,${item.b})`
    },
    flapCardRotate () {
      // 正面半圆
      const frontFlapCard = this.flapCardList[this.front]
      // 背面半圆
      const backFlapCard = this.flapCardList[this.back]
      frontFlapCard.rotateDegree += 10
      frontFlapCard._g -= 5
      backFlapCard.rotateDegree -= 10
      backFlapCard._g += 5
      if (frontFlapCard.rotateDegree === 90 && backFlapCard.rotateDegree === 90) {
        backFlapCard.zIndex += 2
      }
      this.rotate(this.front, 'front')
      this.rotate(this.back, 'back')
    },
    prepare () {
      // 让背面的左侧半圆和右侧半圆重叠起来
      const backFlapCard = this.flapCardList[this.back]
      backFlapCard.rotateDegree = 180
      this.rotate(this.back, 'back')
    },
    startFlapCardAnimation () {
      this.prepare()
      this.timer = setInterval(() => {
        this.flapCardRotate()
      }, this.interval)
    }
  },
  mounted () {
    this.startFlapCardAnimation()
  }
}
</script>
<style lang="scss" scoped>
  @import '../../assets/global.scss';
  .flap-card-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 888;
    width: 100%;
    height: 100%;
    @include center;
    background-color: rgba(0, 0, 0, 0.6);
    .close-btn-wrapper {
      position: absolute;
      left: 0;
      bottom: px2rem(30);
      z-index: 999;
      width: 100%;
      @include center;
      .icon-close {
        width: px2rem(45);
        height: px2rem(45);
        font-size: px2rem(25);
        border-radius: 50%;
        background-color: #333;
        color: #fff;
        @include center;
      }
    }

    .flap-card-bg {
      position: relative;
      width: px2rem(64);
      height: px2rem(64);
      border-radius: px2rem(5);
      background-color: #fff;
      .flap-card {
        @include absCenter;
        width: px2rem(48);
        height: px2rem(48);
        .flap-card-circle {
          display: flex;
          width: 100%;
          height: 100%;
          .flap-card-semi-circle{
            flex: 0 0 50%;
            width: 50%;
            height: 100%;
            background-repeat: no-repeat;
            backface-visibility: hidden;
          }
          .flap-card-semi-circle-left {
            border-radius: px2rem(24) 0 0 px2rem(24);
            background-position: center right;
            transform-origin: right;
          }
          .flap-card-semi-circle-right {
            border-radius: 0 px2rem(24) px2rem(24) 0;
            background-position: center left;
            transform-origin: left;
          }
        }
      }
    }
  }
</style>
