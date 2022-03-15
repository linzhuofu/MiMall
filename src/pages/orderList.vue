<template>
  <div class="order-list">
    <orderheader title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </orderheader>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <div class="order"
               v-for="(item,index) in list"
               :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{item.createTime}}
                <span>|</span>
                {{item.receiverName}}
                <span>|</span>
                订单号：{{item.orderNo}}
                <span>|</span>
                {{item.paymentTypeDesc}}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{item.payment*item.orderItemVoList[0].quantity}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix">
              <div class="good-box fl">
                <div class="good-list"
                     v-for="(items,i) in item.orderItemVoList"
                     :key="i">
                  <div class="good-img">
                    <img :src="items.productImage"
                         alt="">
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{items.productName}}</div>
                    <div class="p-money">{{items.currentUnitPrice}} X {{items.quantity}}元</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr"
                   v-if="item.status==20">
                <a href="javascript:;">{{item.statusDesc}}</a>
              </div>
              <div class="good-state fr"
                   v-else>
                <a href="javascript:;"
                   @click="gopay(item.orderNo)">{{item.statusDesc}}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import orderheader from './../components/orderheader'
export default {
  name: 'order-list',
  components: {
    orderheader
  },
  data () {
    return {
      list: [],
    }
  },
  mounted () {
    this.getorderlist();
  },
  methods: {
    gopay (orderNo) {
      this.$router.push({ path: "/order/pay", query: { orderNo } })
    },
    getorderlist () {
      this.$api.get("orderslist").then((res) => {
        this.list = res.list;
        console.log("orderslist", res);
      })
    }
  }
}
</script>
<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
.order-list {
  .wrapper {
    background-color: $colorJ;
    padding-top: 33px;
    padding-bottom: 110px;
    .order-box {
      .order {
        @include border();
        background-color: $colorG;
        margin-bottom: 31px;
        &:last-child {
          margin-bottom: 0;
        }
        .order-title {
          @include height(74px);
          background-color: $colorK;
          padding: 0 43px;
          font-size: 16px;
          color: $colorC;
          .item-info {
            span {
              margin: 0 9px;
            }
          }
          .money {
            font-size: 26px;
            color: $colorB;
          }
        }
        .order-content {
          padding: 0 43px;
          .good-box {
            width: 88%;
            .good-list {
              display: flex;
              align-items: center;
              height: 145px;
              .good-img {
                width: 112px;
                img {
                  width: 100%;
                }
              }
              .good-name {
                font-size: 20px;
                color: $colorB;
              }
            }
          }
          .good-state {
            @include height(145px);
            font-size: 20px;
            color: $colorA;
            a {
              color: $colorA;
            }
          }
        }
      }
      .pagination {
        text-align: right;
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #ff6600;
      }
      .el-button--primary {
        background-color: #ff6600;
        border-color: #ff6600;
      }
      .load-more,
      .scroll-more {
        text-align: center;
      }
    }
  }
}
</style>