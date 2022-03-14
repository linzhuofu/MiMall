<template>
  <div>
    <orderheader :title="title">
      <template v-slot:tip>
        <span>{{tip}}</span>
      </template>
    </orderheader>
    <router-view></router-view>
    <servicebar></servicebar>
    <nav-footer></nav-footer>
  </div>

</template>
<script>
import orderheader from '../components/orderheader.vue'
import servicebar from '../components/servicebar.vue'
import NavFooter from '../components/NavFooter.vue'
export default {
  name: 'order',
  components: {
    servicebar,
    NavFooter,
    orderheader
  },
  data () {
    return {
      title: "",
      tip: "",
    }
  },
  mounted () {
    var path = this.$route.path;
    if (path == "/order/confirm") {
      this.title = "确认订单";
      this.tip = "请认真填写收货地址"

    } else if (path == "/order/list") {
      this.title = "订单列表";
      this.tip = "请谨防钓鱼链接或咋骗电话，了解更多>";
    }
    else if (path == "/order/pay") {
      this.title = "订单支付";
      this.tip = "请谨防钓鱼链接或咋骗电话，了解更多>";
    }
  }
}
</script>

<style>
</style>
