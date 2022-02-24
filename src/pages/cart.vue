<template>
  <div>

    <orderheader></orderheader>
    cart
    <navfooter></navfooter>
  </div>
</template>
<script>
import orderheader from '../components/orderheader.vue'
import navfooter from '../components/NavFooter.vue'

export default {
  name: 'cart',
  components: {
    navfooter,
    orderheader
  }
}
</script>

<style>
</style>