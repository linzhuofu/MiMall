<template>
  <!-- <router-link to="/login">login</router-link>
  &nbsp;
  <router-link to="/order">order</router-link> -->
  <router-view></router-view>
</template>



<script>


export default {
  name: 'App',
  data () {
    return {
      // 数据


      res: {}
    };
  },
  components: {

  },
  mounted () {
    // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
    // 向给定ID的用户发起请求
    this.$api.get('mock/user/login.json')
    // .then(function (response) {
    //   // 处理成功情况
    //   console.log(response);
    // })
    // this.$api.get('/user/login')
    //   .then(function (response) {
    //     // 处理成功情况
    //     this.res = response;
    //   })
  },
  methods: {
    // 方法定义
  }
}
</script>


<style lang="scss">
@import "./assets/scss/base.scss";
@import "./assets/scss/reset.scss";
@import "./assets/scss/config.scss";
@import "./assets/scss/button.scss";
</style>
