<template>
  <div id="home">

    <navheader></navheader>
    <router-view></router-view>
    <navfooter></navfooter>
  </div>
</template>

<script>
import storage from '../storage/index'
import navheader from '../components/NavHeader.vue'
import navfooter from '../components/NavFooter.vue'


export default {
  name: "home",
  components: {
    navheader,
    navfooter,

  },
  mounted () {
    // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
    // storage.setItem("user1", "lzf")
    // storage.setItem("user2", "lzf2", "user")
    storage.clear("user1")
    //console.log(storage.getStorage());
  },
}
</script>