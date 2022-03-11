<template>
  <div class="index"
       ref="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
              <div class="children">
                <ul v-for="(item,i) in menuList"
                    v-bind:key="i">
                  <li v-for="(items,index) in item"
                      v-bind:key="index">
                    <a :href="'/#/product/'+items.id">
                      <img :src="[items.img ? items.img : 'imgs/item-box-1.png']"
                           alt="">
                      {{items.name ? items.name: '小米CC9'}}
                    </a>

                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 插线板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
            </li>
          </ul>
        </div>
        <swiper :autoplay="swiper_options.autoplay"
                :loop="swiper_options.loop"
                :speed="swiper_options.speed"
                :pagination="swiper_options.pagination"
                v-bind:options="swiperOption">
          <swiper-slide v-for="(item, index) in slideList"
                        :key="index"><a href="">
              <img :src="item.img"
                   alt=""></a>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </swiper>

      </div>
      <div class="ads-box">
        <a v-bind:href="'/#/product/'+item.id"
           v-for="(item,index) in adsList"
           v-bind:key="index">
          <img v-lazy="item.img"
               alt="">
        </a>
      </div>
      <div class="banner">
        <a href="/#/product/30">
          <img v-lazy="'/imgs/banner-1.png'"
               alt="">
        </a>
      </div>
      <div class="product-box">
        <div class="container">
          <h2>手机</h2>
          <div class="wrapper">
            <div class="banner-left">
              <a href="/#/product/4"><img alt=""
                     v-lazy="'/imgs/mix-alpha.jpg'"></a>
            </div>
            <div class="list-box">
              <div class="list"
                   v-for="(arr,i) in phoneList"
                   v-bind:key="i">
                <div class="item"
                     v-for="(item,j) in arr"
                     v-bind:key="j">
                  <span v-bind:class="{'new-pro':j%2==0}">新品</span>
                  <div class="item-img">
                    <img alt=""
                         v-lazy="item.mainImage">
                  </div>
                  <div class="item-info">
                    <h3>{{item.name}}</h3>
                    <p>{{item.subtitle}}</p>
                    <p class="price"
                       @click="addCart(item.id,item.name,item.subtitle,item.mainImage,item.price)">{{item.price}}元</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <servicebar ref="servicebar"></servicebar>
    <modal title="提示"
           sureText="查看购物车"
           btnType="1"
           modalType="middle"
           :showModal="showModal"
           @close="closewindow"
           @submit="gotocart">
      <template v-slot:body>
        <h1>Here might be a page title</h1>
      </template>
    </modal>
  </div>
</template>
<script>

import { reactive, } from 'vue';
import modal from '../components/modal.vue'
import servicebar from '../components/servicebar.vue'
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue.js';

// import Swiper core and required modules
import SwiperCore, { Navigation, A11y } from 'swiper';

SwiperCore.use([Navigation, A11y]);

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';
import 'swiper/modules/scrollbar/scrollbar.min.css';

export default {
  name: 'index',
  components: {
    servicebar,
    Swiper,
    SwiperSlide,
    modal,

  },
  data () {
    return {
      //弹窗的开关控制
      showModal: false,
      //轮播图的控制
      swiperOption: {
        autoplay: true,
        loop: true,
        effect: 'cube',
        cubeEffect: {
          shadowOffset: 100,
          shadowScale: 0.6
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      },
      //二级菜单数据
      menuList: [[{
        id: 1,
        img: "imgs/item-box-1.png",
        name: "小米CC9"
      }, {
        id: 2,
        img: "imgs/item-box-2.png",
        name: "小米CC9"
      }, {
        id: 3,
        img: "imgs/item-box-1.png",
        name: "小米CC9"
      }, {
        id: 4,
        img: "imgs/item-box-2.png",
        name: "小米CC9"
      },
      ], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
      //广告位数据banner上面的数据
      adsList: [
        {
          id: 33,
          img: '/imgs/ads/ads-1.png'
        }, {
          id: 48,
          img: '/imgs/ads/ads-2.jpg'
        }, {
          id: 45,
          img: '/imgs/ads/ads-3.png'
        }, {
          id: 47,
          img: '/imgs/ads/ads-4.jpg'
        }
      ],
      //轮播图数据
      slideList: [
        {
          id: '1',
          img: '/imgs/slider/slide-1.jpg'
        },
        {
          id: '2',
          img: '/imgs/slider/slide-2.jpg'
        },
        {
          id: '3',
          img: '/imgs/slider/slide-3.jpg'
        },
        {
          id: '4',
          img: '/imgs/slider/slide-4.jpg'
        },
        {
          id: '5',
          img: '/imgs/slider/slide-1.jpg'
        }
      ],
      //手机商品数据
      phoneList: [],
    }

  },

  mounted () {
    this.servicebaar();
    this.index();
    this.init()
    // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
  },
  methods: {
    // 方法定义
    gotocart (Viewshoppingcart) {
      this.$router.push("/cart");
      console.log("gotocart", Viewshoppingcart);
    },
    closewindow () {
      //关闭弹窗
      this.showModal = false;
    },
    async addCart (id, productname, productsubtitle, productmainImage, productprice,) {
      console.log("点击加入购物车");
      this.showModal = true;
      let res = await this.$api.post("/carts", {
        "userId": this.$store.state.username,
        "productId": id,
        "quantity": 1,
        "productName": productname,
        "productSubtitle": productsubtitle,
        "productMainImage": productmainImage,
        "productPrice": productprice,
        "productStatus": 1,
        "productTotalPrice": 86390.64,
        "productStock": 86,
        "productSelected": true
      });
      console.log("resresressssssssss", res);
      this.$api.get("/carts").then((val = []) => {
        console.log("valvalvalval", val);
        this.$store.dispatch("savecartcount", { cartnum: val.length })
      })
    },
    servicebaar () {
      console.log("this.$refs.servicebar", this.$refs.servicebar);
    },
    index () {
      console.log("sssssssss", this.$cookie.get('userid'));
      console.log("this.$refs.index", this.$refs.index);

    },
    init () {
      this.$api.get('mock/user/product.json')
        .then((res) => {
          // 处理成功情况
          console.log("res", res);
          this.phoneList = [res.list.slice(0, 4), res.list.slice(4, 8)]
          console.log("index", res);
        })

    }
  },
  setup () {
    // swiper相关配置属性放在swiper_options这个变量里
    let swiper_options = reactive({
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      loop: true,
      speed: 500,
      pagination: {
        clickable: true
      }
    })
    // 将swiper_options返回给模板中的swiper组件使用
    return { swiper_options };
  },
}
</script>

<style lang="scss" scoped>
@import "./../assets/scss/base.scss";
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.index {
  .swiper-box {
    .nav-menu {
      position: absolute;
      width: 264px;
      height: 451px;
      z-index: 9;
      padding: 26px 0;
      background-color: #55585a7a;
      box-sizing: border-box;
      .menu-wrap {
        .menu-item {
          height: 50px;
          line-height: 50px;
          a {
            position: relative;
            display: block;
            font-size: 16px;
            color: #ffffff;
            padding-left: 30px;
            &:after {
              position: absolute;
              right: 30px;
              top: 17.5px;
              content: " ";
              @include bgImg(10px, 15px, "/imgs/icon-arrow.png");
            }
          }
          &:hover {
            background-color: $colorA;
            .children {
              display: block;
            }
          }
          .children {
            display: none;
            width: 962px;
            height: 451px;
            background-color: $colorG;
            position: absolute;
            top: 0;
            left: 264px;
            border: 1px solid $colorH;
            ul {
              display: flex;
              justify-content: space-between;
              height: 75px;
              li {
                height: 75px;
                line-height: 75px;
                flex: 1;
                padding-left: 23px;
              }
              a {
                color: $colorB;
                font-size: 14px;
              }
              img {
                width: 42px;
                height: 35px;
                vertical-align: middle;
                margin-right: 15px;
              }
            }
          }
        }
      }
    }
    .swiper {
      height: 453px;
      .swiper-button-prev {
        left: 274px;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .ads-box {
    @include flex();
    margin-top: 14px;
    margin-bottom: 31px;
    a {
      width: 296px;
      height: 167px;
    }
  }
  .banner {
    margin-bottom: 50px;
  }
  .product-box {
    background-color: $colorJ;
    padding: 30px 0 50px;
    h2 {
      font-size: $fontF;
      height: 21px;
      line-height: 21px;
      color: $colorB;
      margin-bottom: 20px;
    }
    .wrapper {
      display: flex;
      .banner-left {
        margin-right: 16px;
        img {
          width: 224px;
          height: 619px;
        }
      }
      .list-box {
        .list {
          @include flex();
          width: 986px;
          margin-bottom: 14px;
          &:last-child {
            margin-bottom: 0;
          }
          .item {
            width: 236px;
            height: 302px;
            background-color: $colorG;
            text-align: center;
            span {
              display: inline-block;
              width: 67px;
              height: 24px;
              font-size: 14px;
              line-height: 24px;
              color: $colorG;
              &.new-pro {
                background-color: #7ecf68;
              }
              &.kill-pro {
                background-color: #e82626;
              }
            }
            .item-img {
              img {
                width: 100%;
                height: 195px;
              }
            }
            .item-info {
              h3 {
                font-size: $fontJ;
                color: $colorB;
                line-height: $fontJ;
                font-weight: bold;
              }
              p {
                color: $colorD;
                line-height: 13px;
                margin: 6px auto 13px;
              }
              .price {
                color: #f20a0a;
                font-size: $fontJ;
                font-weight: bold;
                cursor: pointer;
                &:after {
                  @include bgImg(22px, 22px, "/imgs/icon-cart-hover.png");
                  content: " ";
                  margin-left: 5px;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>