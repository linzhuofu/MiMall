
<template>
  <div class="detail">
    <productparam :title="product.name"></productparam>
    <div class="wrapper">
      <div class="container clearfix">

        <div class="content">
          <h2 class="item-title">{{}}</h2>
          <p class="item-info">相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS / 骁龙845处理器 / 红<br />外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏</p>
          <div class="delivery">小米自营</div>
          <div class="item-price">{{product.price}}元<span class="del">1999元</span></div>
          <div class="line"></div>
          <div class="item-addr">
            <i class="icon-loc"></i>
            <div class="addr">北京 北京市 朝阳区 安定门街道</div>
            <div class="stock">有现货</div>
          </div>
          <div class="item-version clearfix">
            <h2>选择版本</h2>
            <div class="phone fl "
                 @click="version=1"
                 :class="{ checked: version==1 }">6GB+64GB 全网通</div>
            <div class="phone fr"
                 @click="version=2"
                 :class="{ checked: version==2 }">4GB+64GB 移动4G</div>
          </div>
          <div class="item-color">
            <h2>选择颜色</h2>
            <div class="phone checked">
              <span class="color"></span>``
              深空灰
            </div>
          </div>
          <div class="item-total">
            <div class="phone-info clearfix">
              <div class="fl">{{product.name}} {{version==1?"6GB+64GB 全网通":"4GB+64GB 移动4G"}} 深灰色</div>
              <div class="fr">{{product.price}}元</div>
            </div>
            <div class="phone-total">总计：{{product.price}}元</div>
          </div>
          <div class="btn-group">
            <a href="javascript:;"
               class="btn btn-huge fl"
               @click="addcart">加入购物车</a>
          </div>
        </div>
      </div>
    </div>
    <div class="price-info">
      <div class="container">
        <h2>价格说明</h2>
        <div class="desc">
          <img src="/imgs/detail/item-price.jpeg"
               alt="">
        </div>
      </div>
    </div>
    <servicebar></servicebar>
  </div>
</template>
<script>
import productparam from "../components/productparam.vue"
import servicebar from "../components/servicebar.vue"
export default {
  name: 'detail',
  components: {
    productparam,
    servicebar
  },
  data () {
    return {
      product: {},
      version: 1,
    }
  },
  mounted () {
    this.getproductinfo();

  },
  methods: {
    async addcart () {
      let id = this.$route.params.id;
      var res = await this.$api.post("/carts", {
        "userId": this.$store.state.username,
        "productId": id,
        "quantity": 1,
        "productName": this.product.name,
        "productSubtitle": this.product.subtitle,
        "productMainImage": this.product.mainImage,
        "productPrice": this.product.price,
        "productStatus": 1,
        "productTotalPrice": 86390.64,
        "productStock": 86,
        "productSelected": true
      })
      console.log("aaaaaaaaaares", res);
      this.$api.get("/carts").then((val = []) => {
        console.log("valvalvalval", val);
        this.$store.dispatch("savecartcount", { cartnum: val.length })
      })
      this.$router.push("/cart")
    },
    getproductinfo () {
      let id = this.$route.params.id;
      console.log("id", id);
      this.$api.get(`/product/${id}`).then((res) => {
        this.product = res;
        console.log("getproductinfo", res);
      })
    }
  }

}
</script>

<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.detail {
  .wrapper {
    .swiper {
      float: left;
      width: 642px;
      height: 617px;
      margin-top: 5px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content {
      float: right;
      width: 584px;
      height: 870px;
      .item-title {
        font-size: 28px;
        padding-top: 30px;
        padding-bottom: 16px;
        height: 26px;
      }
      .item-info {
        font-size: 14px;
        height: 36px;
      }
      .delivery {
        font-size: 16px;
        color: #ff6700;
        margin-top: 26px;
        margin-bottom: 14px;
        height: 15px;
      }
      .item-price {
        font-size: 20px;
        color: #ff6700;
        height: 19px;
        .del {
          font-size: 16px;
          color: #999999;
          margin-left: 10px;
          text-decoration: line-through;
        }
      }
      .line {
        height: 0;
        margin-top: 25px;
        margin-bottom: 28px;
        border-top: 1px solid #e5e5e5;
      }
      .item-addr {
        height: 108px;
        background-color: #fafafa;
        border: 1px solid #e5e5e5;
        box-sizing: border-box;
        padding-top: 31px;
        padding-left: 64px;
        font-size: 14px;
        line-height: 14px;
        position: relative;
        .icon-loc {
          position: absolute;
          top: 27px;
          left: 34px;
          @include bgImg(20px, 20px, "/imgs/detail/icon-loc.png");
        }
        .addr {
          color: #666666;
        }
        .stock {
          margin-top: 15px;
          color: #ff6700;
        }
      }
      .item-version,
      .item-color {
        margin-top: 30px;
        h2 {
          font-size: 18px;
          margin-bottom: 20px;
        }
      }
      .item-version,
      .item-color {
        .phone {
          width: 287px;
          height: 50px;
          line-height: 50px;
          font-size: 16px;
          color: #333333;
          border: 1px solid #e5e5e5;
          box-sizing: border-box;
          text-align: center;
          cursor: pointer;
          span {
            color: #666666;
            margin-left: 15px;
          }
          .color {
            display: inline-block;
            width: 14px;
            height: 14px;
            background-color: #666666;
          }
          &.checked {
            border: 1px solid #ff6600;
            color: #ff6600;
          }
        }
      }
      .item-total {
        height: 108px;
        background: #fafafa;
        padding: 24px 33px 29px 30px;
        font-size: 14px;
        margin-top: 50px;
        margin-bottom: 30px;
        box-sizing: border-box;
        .phone-total {
          font-size: 24px;
          color: #ff6600;
          margin-top: 18px;
        }
      }
    }
  }
  .price-info {
    background-color: #f3f3f3;
    height: 340px;
    h2 {
      font-size: 24px;
      color: #333333;
      padding-top: 38px;
      margin-bottom: 30px;
    }
  }
}
</style>