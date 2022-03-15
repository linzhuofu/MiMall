<template>
  <div>
    <loading></loading>
    <form action=""
          v-html="conent">

    </form>

  </div>
</template>


<script>
import loading from '../components/loading.vue'
export default {
  name: "alipay",
  components: {
    loading
  },
  data () {
    return {
      conent: ""
    }
  },
  mounted () {
    this.paysubmit();
  },
  methods: {
    paysubmit () {
      this.$api.post("/pay", {
        orderId: this.$route.query.orderId,
        orderName: "Vue高仿小米商城",//扫码支付时订单名称
        amount: 0.01, //单位元
        payType: 1, //1支付宝，2微信
      }).then((res) => {
        this.conent = res.conent
        console.log("", res);
        setTimeout(() => {
          document.forms[0].submit();
        }, 100)
      })
    }
  }
}
</script>