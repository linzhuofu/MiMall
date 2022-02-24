<template>
  <div id="home">
    <p>home</p>
    <navheader></navheader>
    <router-view></router-view>
    <navfooter></navfooter>
  </div>
</template>

<script>
import navheader from '../components/NavHeader.vue'
import navfooter from '../components/NavFooter.vue'

export default {
  name: "home",
  components: {
    navheader,
    navfooter,
  }
}
</script>