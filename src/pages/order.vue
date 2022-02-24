<template>
  <div>
    <orderheader></orderheader>
    <router-view></router-view>
    <h1>order</h1>
    <navheader></navheader>

  </div>

</template>
<script>
import navheader from '../components/NavHeader.vue'
import orderheader from '../components/orderheader.vue'

export default {
  name: 'order',
  components: {
    navheader,
    orderheader,

  }
}
</script>

<style>
</style>
