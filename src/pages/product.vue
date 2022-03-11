
<template>
  <div class="product">
    <productparam ref=test
                  v-bind:title="product.name">
      <template v-slot:buy>
        <div class="btn"
             @click="buy">立即购买
        </div>
      </template>
    </productparam>
    <div class="content">
      <div class="item-bg"
           :style="{
        'background': `url(${(product.mainImage)}) no-repeat center `,
      }">
        <h2>{{product.name}}</h2>
        <h3>{{product.subtitle}}</h3>
        <p>
          <a href=""
             id="">全球首款双频 GP</a>
          <span>|</span>
          <a href=""
             id="">骁龙845</a>
          <span>|</span>
          <a href=""
             id="">AI 变焦双摄</a>
          <span>|</span>
          <a href=""
             id="">红外人脸识别</a>
        </p>
        <div class="price">
          <span>￥<em>{{product.price}}</em></span>
        </div>
      </div>
      <div class="item-bg-2"></div>
      <div class="item-bg-3"></div>

      <div class="item-video">
        <h2>60帧超慢动作摄影<br />慢慢回味每一瞬间的精彩</h2>
        <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br />更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
        <div class="video-bg"
             @click="showslide='slidedown'"></div>
        <div class="video-box">
          <div class="overlay"
               v-if="showslide=='slidedown'"></div>
          <div class="video"
               :class="showslide">
            <span class="icon-close"
                  @click="showslide='slideup'"></span>
            <video src="/imgs/product/video.mp4"
                   muted
                   autoplay
                   controls="controls"></video>
          </div>
        </div>
      </div>
    </div>
    <div class="h">200</div>
    <div class="h">200</div>
    <div class="h">200</div>
    <div class="h">200</div>
    <div class="h">200</div>
    <div class="h">200</div>
    <div class="h">200</div>
    <div class="h">200</div>
    <div class="h">200</div>
  </div>
</template>
<script>
import productparam from "./../components/productparam.vue"
export default {
  name: 'product',
  data () {
    return {
      showslide: "",
      product: {}
    }
  },
  components: {
    productparam
  },
  mounted () {
    this.$nextTick(() => {
      console.log("this.$refs.test", this.$refs.test, this.$refs.test.offsetHeight, this.$refs.test.$el);
    })
    this.getproductinfo();

  },

  methods: {
    buy () {
      let id = this.$route.params.id;
      this.$router.push(`/detail/${id}`);

    },
    getproductinfo () {
      console.log("this.$route.param", this.$route.param);
      let res = this.$route.params.id;
      this.$api.get(`/product/${res}`).then((res) => {
        this.product = res;
        console.log("getproductinfo", res);
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./../assets/scss/mixin.scss";
.h {
  height: 100px;
  background-color: #ffffff;
}
.product {
  .content {
    .item-bg {
      // background: url("/imgs/product/product-bg-1.png") no-repeat center;
      height: 718px;
      text-align: center;
      h2 {
        font-size: 80px;
        padding-top: 55px;
      }
      h3 {
        font-size: 24px;
        letter-spacing: 10px;
      }
      p {
        margin-top: 21px;
        margin-bottom: 40px;
        a {
          font-size: 16px;
          color: #333333;
        }
        span {
          margin: 0 15px;
        }
      }
      .price {
        font-size: 30px;
        color: #333333;
        em {
          font-style: normal;
          font-size: 38px;
        }
      }
    }
    .item-bg-2 {
      background: url(/imgs/product/product-bg-2.png) no-repeat center;
      height: 480px;
      background-size: 1226px 397px;
    }
    .item-bg-3 {
      background: url(/imgs/product/product-bg-3.png) no-repeat center;
      height: 638px;
      background-size: cover;
    }
    .item-swiper {
      margin: 36px auto 52px;
      .desc {
        font-size: 18px;
        color: #333333;
        text-align: center;
      }
      img {
        width: 100%;
      }
    }
    .item-video {
      height: 1044px;
      background-color: #070708;
      margin-bottom: 76px;
      color: #ffffff;
      text-align: center;
      h2 {
        font-size: 60px;
        padding-top: 82px;
        margin-bottom: 47px;
      }
      p {
        font-size: 24px;
        margin-bottom: 58px;
      }
      .video-bg {
        background: url("/imgs/product/gallery-1.png") no-repeat center;
        background-size: cover;
        width: 1226px;
        height: 540px;
        margin: 0 auto 120px;
        cursor: pointer;
      }
      .video-box {
        .overlay {
          @include position(fixed);
          background-color: #333333;
          opacity: 0.4;
          z-index: 10;
        }
        @keyframes slidedown {
          from {
            top: -50%;
            opacity: 0;
          }
          to {
            top: 50%;
            opacity: 1;
          }
        }

        @keyframes slideup {
          from {
            top: 50%;
            opacity: 1;
          }
          to {
            top: -50%;
            opacity: 0;
          }
        }
        .video {
          position: fixed;
          top: -50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 1000px;
          z-index: 100;
          height: 536px;
          opacity: 1;
          transition: all 0.6s;
          &.slidedown {
            animation: slidedown 0.6s ease;
            top: 50%;
          }

          &.slideup {
            animation: slideup 0.6s ease;
          }
          &.slide {
            top: 50%;
            opacity: 1;
          }
          .icon-close {
            position: absolute;
            top: 20px;
            right: 20px;
            @include bgImg(20px, 20px, "/imgs/icon-close.png");
            cursor: pointer;
            z-index: 11;
          }
          video {
            width: 100%;
            height: 100%;
            object-fit: cover;
            outline: none;
          }
        }
      }
    }
  }
}
</style>