<template>
  <!-- <router-link to="/login">login</router-link>
  &nbsp;
  <router-link to="/order">order</router-link> -->
  <router-view></router-view>
</template>



<script>
import { mapState } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      // 数据
      //用来展示用户的登陆以后的用户名的数据
      username: "",
      userid: "",
      res: {}
    };
  },
  components: {

  },
  created () {

  },


  mounted () {
    // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
    // 向给定ID的用户发起请求
    // this.$api.get('mock/user/login.json')
    // .then(function (response) {
    //   // 处理成功情况
    //   console.log(response);
    // })
    // this.$api.get('/user/login')
    //   .then(function (response) {
    //     // 处理成功情况
    //     this.res = response;
    //   })
    console.log("aaaa");
    this.jiegoufuzhi()

    if (this.$cookie.get("userid")) {

      //获取登陆以后的用户的信息
      this.getuserinfo();
      //获取购物车的数量
      this.getcartnum();
    }
  },
  methods: {
    // 方法定义

    getcartnum () {
      this.$api.get("/carts").then((res = []) => {
        console.log("carts用户信息数据", res.data);
        // this.username = res.data[res.data.length - 1].username;
        // this.userid = res.data[res.data.length - 1].id;
        this.$store.dispatch("savecartcount", {
          cartnum: res.data.length
        })

      })


    },
    increase () {
      this.$store.commit("increment")
      this.$store.commit("add")
    },
    getuserinfo () {
      this.$api.get("/posts").then((res = {}) => {
        console.log("用户信息数据", res);
        // this.username = res.data[res.data.length - 1].username;
        // this.userid = res.data[res.data.length - 1].id;
        this.$store.dispatch("saveusername", {
          username: res.data[res.data.length - 1].username,
          userid: res.data[res.data.length - 1].id
        })
        console.log("用户的最后一条登录数据",);
      })

    },

    jiegoufuzhi () {
      // let x = { y: 22, z: true }
      // let { y: foo, z: bar } = x
      // console.log("解构赋值", foo, bar);

    }
  },
  computed: mapState({
    // 箭头函数可使代码更简练

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',
    // 为了能够使用 `this` 获取局部状态，必须使用常规函数


  })
}
</script>


<style lang="scss">
@import "./assets/scss/base.scss";
@import "./assets/scss/reset.scss";
@import "./assets/scss/config.scss";
@import "./assets/scss/button.scss";
</style>
