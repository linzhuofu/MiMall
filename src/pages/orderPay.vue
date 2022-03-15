<template>
  <div class="order-pay">
    <orderheader title="订单支付">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多</span>
      </template>
    </orderheader>
    <div class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功！去付款咯～</h2>
              <p>请在<span>30分</span>内完成支付, 超时后将取消订单</p>
              <p>收货信息：{{shippingVo.receiverName+" "+shippingVo.receiverMobile+" "+shippingVo.receiverProvince
                +" "+shippingVo.receiverCity+" "+shippingVo.receiverDistrict+" "+shippingVo.receiverAddress}}</p>
            </div>
            <div class="order-total">
              <p>应付总额：<span>2599</span>元</p>
              <p>订单详情<em class="icon-down"
                    :class="{up:showDetail}"
                    @click="showDetail=!showDetail"></em></p>
            </div>

          </div>
          <div class="item-detail"
               v-if="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">{{orderNo}}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div class="detail-info">{{shippingVo.receiverName+" "+shippingVo.receiverMobile+" "+shippingVo.receiverProvince
                +" "+shippingVo.receiverCity+" "+shippingVo.receiverDistrict+" "+shippingVo.receiverAddress}}</div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="(item,index) in orderItemVoList"
                      :key="index">
                    <img v-lazy="item.productImage" />{{item.productName}}
                  </li>

                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div class="pay pay-ali"
                 :class="{checked:paytype==1}"
                 @click="pay(1)"></div>
            <div class="pay pay-wechat"
                 :class="{checked:paytype==2}"
                 @click="pay(2)"></div>
          </div>
        </div>
      </div>
    </div>
    <scan-pay-code v-if="showPay"></scan-pay-code>
  </div>
  <scanpaycode :isshowscanpaycode="isshowpaycode"
               v-on:close="control"
               :img="payimg"></scanpaycode>

  <modal @cancel="cancel"
         @certaintolist="gotopaylist"
         @close="closewhethertopay"
         :btnType="3"
         :title="aaa"
         :showModal="paymodalshow"
         cancelText="未支付"
         sureText="查看订单列表">
    <template v-slot:body>
      <p>
        是否支付订单?
      </p>
    </template>
  </modal>
</template>


<script>
import QRCode from "qrcode";
import orderheader from '../components/orderheader.vue'
import scanpaycode from '../components/scanpaycode.vue'
import modal from '../components/modal.vue'
export default {
  name: "orderpay",
  components: {
    scanpaycode,
    modal,
    orderheader
  },
  data () {
    return {
      orderNo: this.$route.query.orderNo,
      orderItemVoList: [],
      shippingVo: {},
      showDetail: false,
      paytype: "",
      isshowpaycode: false,
      payimg: "",
      paymodalshow: false,
      T: null
    }
  },
  mounted () {
    this.orderdetail();

  },
  methods: {
    looporderstate () {
      this.T = setInterval(() => {
        this.$api.get(`/order/${this.orderNo}`).then((res) => {
          if (res.status == 10) {
            clearInterval(this.T);
            this.gotopaylist()

          }
        })
      }, 1000)



    },
    cancel () {
      this.paymodalshow = false;//点击未支付的时候关闭弹框
      clearInterval(this.T);
    },
    gotopaylist () {
      this.$router.push("/order/list");//跳转到订单列表
    },
    closewhethertopay () {

      this.paymodalshow = false;//点击X的时候关闭弹框

    },
    control () {
      console.log("control");
      clearInterval(this.T);
      this.paymodalshow = true;
      this.isshowpaycode = false;

    },
    pay (paytype) {
      if (paytype == 1) {
        //支付宝支付的拉取
        window.open(`/#/order/alipay?orderId=${this.orderNo}`, "_blank")
      }
      else {
        //微信支付的拉取

        // this.$api.post("/pay", {
        //   orderId: this.orderNo,
        //   orderName: "Vue高仿小米商城",//扫码支付时订单名称
        //   amount: 0.01, //单位元
        //   payType: 2, //1支付宝，2微信
        // }).then((res) => {
        //   this.conent = res.conent

        // })
        this.looporderstate();
        this.isshowpaycode = true;
        let url = window.location.href;
        console.log(url);
        QRCode.toDataURL("https://blog.csdn.net/weixin_46419373/article/details/108266563")
          //在这里拿到地址，把它赋值给data里面定义的值imrUrl
          .then(tpian => {
            console.log(tpian);
            this.payimg = tpian;
          })
          .catch(err => {
            console.error(err);
          });
      }

    },
    //拉取详情信息请求数据
    orderdetail () {
      this.$api.get(`/orders`).then((res) => {
        this.orderItemVoList = res.orderItemVoList;
        this.shippingVo = res.shippingVo;
        console.log("orderdetail", res);
      })
    }

  }
}
</script>

<style lang="scss">
.order-pay {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 61px;
    .order-wrap {
      padding: 62px 50px;
      background-color: #fff;
      font-size: 14px;
      margin-bottom: 30px;
      .item-order {
        display: flex;
        align-items: center;
        .icon-succ {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: url("/imgs/icon-gou.png") #80c58a no-repeat center;
          background-size: 60px;
          margin-right: 40px;
        }
        .order-info {
          margin-right: 248px;
          h2 {
            font-size: 24px;
            color: #333333;
            margin-bottom: 20px;
          }
          p {
            color: #666666;
            span {
              color: #ff6700;
            }
          }
        }
        .order-total {
          & > p:first-child {
            margin-bottom: 30px;
          }
          span {
            font-size: 28px;
            color: #ff6700;
          }
          .icon-down {
            display: inline-block;
            width: 14px;
            height: 10px;
            background: url("/imgs/icon-down.png") no-repeat center;
            background-size: contain;
            margin-left: 9px;
            transition: all 0.5s;
            cursor: pointer;
            &.up {
              transform: rotate(180deg);
            }
          }
          .icon-up {
            transform: rotate(180deg);
          }
        }
      }
      .item-detail {
        border-top: 1px solid #d7d7d7;
        padding-top: 47px;
        padding-left: 130px;
        font-size: 14px;
        margin-top: 45px;
        .item {
          margin-bottom: 19px;
          .detail-title {
            float: left;
            width: 100px;
          }
          .detail-info {
            display: inline-block;
            img {
              width: 30px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .item-pay {
      padding: 26px 50px 72px;
      background-color: #ffffff;
      color: #333333;
      h3 {
        font-size: 20px;
        font-weight: 200;
        color: #333333;
        padding-bottom: 24px;
        border-bottom: 1px solid #d7d7d7;
        margin-bottom: 26px;
      }
      .pay-way {
        font-size: 18px;
        .pay {
          display: inline-block;
          width: 188px;
          height: 64px;
          border: 1px solid #d7d7d7;
          cursor: pointer;
          &:last-child {
            margin-left: 20px;
          }
          &.checked {
            border: 1px solid #ff6700;
          }
        }
        .pay-ali {
          background: url("/imgs/pay/icon-ali.png") no-repeat center;
          background-size: 103px 38px;
          margin-top: 19px;
        }
        .pay-wechat {
          background: url("/imgs/pay/icon-wechat.png") no-repeat center;
          background-size: 103px 38px;
        }
      }
    }
  }
}
</style>