<template>
  <div class="nav-bar"
       :class="headerFixed?'issFixed':''"
       ref="header">
    <div class="
       container">
      <div class="pro-title">
        {{title}}
      </div>
      <div class="pro-param">
        <a href="">概述</a><span>|</span>
        <a href="">参数页</a><span>|</span>
        <a href="">用户评价</a><span>|</span>
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "home",
  props: {
    title: {
      type: String,
      default: "oppo R8"
    },
  },
  data () {
    return {
      offsetTop: 0,
      offsetHeight: 0,
      headerFixed: 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      // 获取吸顶元素的dom
      let header = this.$refs.header;
      // 吸顶元素到top的距离
      this.offsetTop = header.offsetTop;
      // 元素自身的高度
      this.offsetHeight = header.offsetHeight;
      // 监听滚动条
      window.addEventListener("scroll", this.handleScroll);
    });
  },
  unmounted () {
    //vue3取消使用destroy周期函数改用unmounted函数
    window.removeEventListener("scroll", this.handleScroll, false);
  },

  methods: {
    handleScroll () {
      // 得到页面滚动的距离，兼容写法
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      // 判断页面滚动的距离是否大于吸顶元素的位置
      this.headerFixed = scrollTop > this.offsetTop;
    }
  }
}
</script>


<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";

.nav-bar {
  height: 70px;
  line-height: 70px;
  border-top: 1px solid $colorH;
  background-color: $colorG;
  z-index: 10;
  &.issFixed {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
    z-index: 4;
    box-shadow: 0 5px 5px $colorE;
  }

  .container {
    @include flex();
    .pro-title {
      font-size: $fontH;
      color: $colorB;
      font-weight: bold;
    }
    .pro-param {
      font-size: $fontJ;
      span {
        margin: 0 10px;
      }
      a {
        color: $colorC;
      }
    }
  }
}
</style>