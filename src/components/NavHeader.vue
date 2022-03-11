<template>
  <div class="header">
    <div class="navtopbar">
      <div class="container">

        <div class="topbarmenu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">MIUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbaruser">
          <a href="javascript:;"
             v-if="username">{{username}}</a>
          <a href="javascript:;"
             v-if="!username">登录</a>
          <a href="javascript:;"
             v-if="username">我的订单</a>
          <a href="javascript:;">注册</a>
          <a href="javascript:;"
             class="my-cart"
             @click="goToCart"><span class="icon-cart"></span>购物车({{cartcount}})</a>
        </div>
      </div>

    </div>
    <div class="navheader">
      <div class="container">
        <div class="header-logo">

          <a href="/#/index"></a>

        </div>

        <div class="header-menu">

          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">

              <ul>
                <li class="product"
                    v-for="item in phoneList"
                    :key="item.id">
                  <a :href="'/#/product/'+item.id"
                     target="_blank">
                    <div class="pro-img"><img v-lazy="item.mainImage"
                           alt=""></div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">￥{{item.price.toFixed(2)}}元</div>
                  </a>
                </li>

              </ul>

            </div>
          </div>
          <div class="item-menu">
            <span>RedMi红米</span>
            <div class="children"></div>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href=""
                     target="_blank">
                    <div class="pro-img"><img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/02ac31f8d3848f71617e074e8e50879e.png?thumb=1&w=160&h=110&f=webp&q=90"
                           alt=""></div>
                    <div class="pro-name">Redmi智能电视X55 2022</div>
                    <div class="pro-price">6999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href=""
                     target="_blank">
                    <div class="pro-img"><img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/02ac31f8d3848f71617e074e8e50879e.png?thumb=1&w=160&h=110&f=webp&q=90"
                           alt=""></div>
                    <div class="pro-name">Redmi智能电视X65 2022</div>
                    <div class="pro-price">6999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href=""
                     target="_blank">
                    <div class="pro-img"><img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/02ac31f8d3848f71617e074e8e50879e.png?thumb=1&w=160&h=110&f=webp&q=90"
                           alt=""></div>
                    <div class="pro-name">小米电视6 65" OLED</div>
                    <div class="pro-price">6999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href=""
                     target="_blank">
                    <div class="pro-img"><img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/02ac31f8d3848f71617e074e8e50879e.png?thumb=1&w=160&h=110&f=webp&q=90"
                           alt=""></div>
                    <div class="pro-name">小米电视大师77" OLED</div>
                    <div class="pro-price">6999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href=""
                     target="_blank">
                    <div class="pro-img"><img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/02ac31f8d3848f71617e074e8e50879e.png?thumb=1&w=160&h=110&f=webp&q=90"
                           alt=""></div>
                    <div class="pro-name">小米透明电视</div>
                    <div class="pro-price">6999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href=""
                     target="_blank">
                    <div class="pro-img"><img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/02ac31f8d3848f71617e074e8e50879e.png?thumb=1&w=160&h=110&f=webp&q=90"
                           alt=""></div>
                    <div class="pro-name">Xiaomi 12 Pro</div>
                    <div class="pro-price">6999元</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>
        <div class="header-search">

          <div class="wrapper">
            <input type="text"
                   name="keyword">

            <a href=""></a>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "navheader",
  data () {
    return {
      phoneList: []
      // 数据
    };
  },
  components: {
    // 组件注册
  },
  methods: {
    goToCart () {
      this.$router.push('/cart')
      console.log("goToCart");
    },
    getProductList () {
      this.$api.get('mock/user/navheader.json')
        .then((res) => {
          // 处理成功情况
          this.phoneList = res.list
          console.log(this.phoneList);
        })
    }

    // 方法定义
  }, mounted () {
    this.getProductList()
  },
  computed: {
    accountInUSD () {
      return '$' + this.accountBalance
    },
    //防止请求延时设置computed  数据发生变化会重新计算
    username () {
      return this.$store.state.username
    },
    cartcount () {
      return this.$store.state.cartcount;
    }

  }
}
</script>


<style lang="scss"  scoped>
@import "./../assets/scss/base.scss";
@import "./../assets/scss/mixin.scss";
@import "./../assets/scss/config.scss";
.header {
  .navtopbar {
    height: 39px;
    line-height: 39px;
    background-color: #333;
    color: #b0b0b0;
    .container {
      @include flex();
      a {
        display: inline-block;
        color: #b0b0b0;
        margin-right: 17px;
      }
      .my-cart {
        width: 110px;
        background-color: #ff6600;
        text-align: center;
        color: #ffffff;
        margin-right: 0;
        .icon-cart {
          @include bgImg(16px, 12px, "/imgs/icon-cart-checked.png", contain);
          margin-right: 4px;
        }
      }
    }
  }

  .navheader {
    .container {
      position: relative;
      height: 112px;
      @include flex();
      .header-menu {
        display: inline-block;
        width: 643px;
        padding-left: 209px;
        .item-menu {
          display: inline-block;
          color: #333;
          font-weight: bold;
          font-size: 16px;
          line-height: 112px;
          margin-right: 20px;
          span {
            cursor: pointer;
          }
          &:hover {
            color: $colorA;
            .children {
              height: 220px;
              opacity: 1;
            }
          }
          .children {
            position: absolute;
            transition: height 0.5s;
            top: 112px;
            left: 0;
            width: 1226px;
            height: 0;
            opacity: 0;
            overflow: hidden;
            z-index: 10;
            border-top: 1px solid #e5e5e5;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            background-color: #ffffff;
            .product {
              position: relative;
              float: left;
              width: 16.6%;
              height: 220px;
              text-align: center;
              line-height: 18px;
              font-size: 16px;
              &:before {
                content: "";
                position: absolute;
                height: 100px;
                width: 1px;
                top: 28px;
                right: 0;
                border-left: 1px solid #d7d7d7;
              }
              &:last-child:before {
                display: none;
              }
              a {
                display: inline-block;
              }
              img {
                width: auto;
                height: 111px;
                margin-top: 26px;
              }
              .pro-img {
                height: 137px;
              }
              .pro-name {
                font-weight: bold;
                margin-top: 19px;
                margin-bottom: 8px;
                color: $colorB;
              }
              .pro-price {
                color: $colorA;
              }
            }
          }
        }
      }
      .header-search {
        width: 319px;
        .wrapper {
          border: 1px solid #e0e0e0;
          display: flex;
          align-items: center;
          input {
            border: none;
            height: 50px;
            border-right: 1px solid #e0e0e0;
            width: 264px;
            height: 50px;
            padding-left: 14px;
          }
          a {
            @include bgImg(18px, 18px, "/imgs/icon-search.png", contain);
            margin-left: 17px;
          }
        }
      }
    }
  }
}
</style>