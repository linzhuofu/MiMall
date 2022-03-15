<template>
  <div class="cart">

    <orderheader title="我的购物车">
      <template v-slot:tip>
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </orderheader>
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1"><span class="checkbox"
                    :class="{ checked: isselectall}"
                    ref="checkbox"
                    @click="selectall"></span>全选</li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li class="cart-item"
                v-for="(item,index) in list"
                :key="index">
              <div class="item-check">
                <span class="checkbox"
                      :class="{ checked: item.productSelected}"
                      @click="changechecked(item.productId)"></span>
              </div>
              <div class="item-name">
                <img alt=""
                     :src="item.productMainImage">
                <span>{{item.productName}}</span>
              </div>
              <div class="item-price">{{item.productPrice}}</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;">-</a>
                  <span>{{item.quantity}}</span>
                  <a href="javascript:;">+</a>
                </div>
              </div>
              <div class="item-total">{{}}</div>
              <div class="item-del"></div>
            </li>
          </ul>
        </div>
        <div class="order-wrap clearfix">
          <div class="cart-tip fl">
            <a href="/#/index">继续购物</a>
            共<span>{{list.length}}</span>件商品，已选择<span>{{numberofcases.length  }}{{}}</span>件

          </div>
          <div class="total fr">
            合计：<span>{{totalprice.toFixed(2)  }}</span>元
            <a href="javascript:;"
               class="btn"
               @click="Calculate">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <servicebar></servicebar>
    <navfooter></navfooter>
  </div>
</template>
<script>
import orderheader from '../components/orderheader.vue'
import navfooter from '../components/NavFooter.vue'
import servicebar from '../components/servicebar.vue'

export default {
  name: 'cart',
  components: {
    navfooter,
    orderheader,
    servicebar,

  }, data () {
    return {
      list: [],
      isselectall: true,
    }
  }, mounted () {
    this.getcartlist();
  },
  methods: {
    selectall () {
      console.log("selectall", this.$refs.checkbox);
      this.isselectall = !this.isselectall;
      this.list.forEach((item) => {
        this.isselectall ? item.productSelected = true : item.productSelected = false;
      })

    },
    Calculate () {
      var istrue = this.list.every((item) => {
        return !item.productSelected
      })
      if (istrue) {
        this.$message({
          showClose: true,
          message: '至少选择一件商品!!!',
          center: true,
          type: "warning",
          offset: 20
        })
      }
      else {
        this.$router.push({ name: "orderconfirm", params: { id: 3 } })



      }
      console.log("istrue", istrue);
      console.log("//控制商品是否被选中", this.numberofcases);
    },
    //控制商品是否被选中
    changechecked (productId) {
      for (let i = 0; i < this.list.length; i++) {
        if (this.list[i].productId == productId) {
          this.list[i].productSelected = !this.list[i].productSelected;
        }

      }
      //使用findindex函数来查找是不是所有的productSelected都是true
      let index = this.list.findIndex((value,) => {
        console.log("value", value);
        return value.productSelected == false
      });
      if (index == -1) {
        this.isselectall = true
      } else {
        this.isselectall = false;
      }
      console.log(index);  //   2
      console.log("changechecked");
    },
    deweight (tempArr) {
      //对获取的购物车的信息处理去重  增加quantity
      for (let i = 0; i < tempArr.length; i++) {
        for (let j = i + 1; j < tempArr.length; j++) {
          if (tempArr[i].productId == tempArr[j].productId) {
            tempArr.splice(j, 1);
            tempArr[i].quantity += 1;
            j--;
          }
        }
      }
      return tempArr;
    },
    getcartlist () {
      //获取购物车的商品信息
      this.$api.get("/carts").then((res) => {
        console.log("getcartlist", res);
        // this.list = res;
        this.deweight(res);
        this.list = res;
        console.log("deweightdeweightdeweight", res);
      })
    }
  },
  computed: {
    //使用计算属性计算出已经选择的商品的件数
    numberofcases () {
      var newarr = this.list.filter((item) => {
        return item.productSelected;
      })
      return newarr
    },
    totalprice () {
      var totalprice = 0;
      this.numberofcases.filter((item) => {
        totalprice += item.productPrice * item.quantity;
      })
      return totalprice;
    }
  },
  computedselectall () {


  }
}
</script>
<style lang="scss">
.cart {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 114px;
    .cart-box {
      background-color: #fff;
      font-size: 14px;
      color: #999999;
      text-align: center;
      .checkbox {
        display: inline-block;
        width: 22px;
        height: 22px;
        border: 1px solid #e5e5e5;
        vertical-align: middle;
        margin-right: 17px;
        cursor: pointer;
        &.checked {
          background: url("/imgs/icon-gou.png") #ff6600 no-repeat center;
          background-size: 16px 12px;
          border: none;
        }
      }
      .cart-item-head {
        display: flex;
        height: 79px;
        line-height: 79px;
        .col-1 {
          flex: 1;
        }
        .col-2 {
          flex: 2;
        }
        .col-3 {
          flex: 3;
        }
      }
      .cart-item-list {
        .cart-item {
          display: flex;
          align-items: center;
          height: 125px;
          border-top: 1px solid #e5e5e5;
          font-size: 16px;
          .item-check {
            flex: 1;
          }
          .item-name {
            flex: 3;
            font-size: 18px;
            color: #333333;
            display: flex;
            align-items: center;
            img {
              width: 80px;
              height: 80px;
              vertical-align: middle;
            }
            span {
              margin-left: 30px;
            }
          }
          .item-price {
            flex: 1;
            color: #333333;
          }
          .item-num {
            flex: 2;
            .num-box {
              display: inline-block;
              width: 150px;
              height: 40px;
              line-height: 40px;
              border: 1px solid #e5e5e5;
              font-size: 14px;
              a {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
              span {
                display: inline-block;
                width: 50px;
                color: #333333;
              }
            }
          }
          .item-total {
            flex: 1;
            color: #ff6600;
          }
          .item-del {
            flex: 1;
            width: 14px;
            height: 12px;
            background: url("/imgs/icon-close.png") no-repeat center;
            background-size: contain;
            cursor: pointer;
          }
        }
      }
    }
    .order-wrap {
      font-size: 14px;
      color: #666666;
      margin-top: 20px;
      height: 50px;
      line-height: 50px;
      .cart-tip {
        margin-left: 29px;
        a {
          color: #666666;
          margin-right: 37px;
        }
        span {
          color: #ff6600;
          margin: 0 5px;
        }
      }
      .total {
        font-size: 14px;
        color: #ff6600;
        span {
          font-size: 24px;
        }
        a {
          width: 202px;
          height: 50px;
          line-height: 50px;
          font-size: 18px;
          margin-left: 37px;
        }
      }
    }
  }
}
</style>