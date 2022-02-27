<template>
  <!-- <router-link to="/login">login</router-link>
  &nbsp;
  <router-link to="/order">order</router-link> -->
  <router-view></router-view>
</template>



<script>


export default {
  name: 'App',
  components: {

  },
  mounted () {
    // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
    // 向给定ID的用户发起请求
    this.$api.get('mock/user/login.json')
      .then(function (response) {
        // 处理成功情况
        console.log(response);
      })
  },
  methods: {
    // 方法定义
  }
}
</script>

<style>
</style>
