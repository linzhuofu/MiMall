<template>
  <div class="login">
    <div class="container">
      <a href="/#/index"><img src="/imgs/login-logo.png"
             alt=""></a>
    </div>
    <div class="wrapper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">帐号登录</span><span class="sep-line">|</span><span>扫码登录</span>
          </h3>
          <div class="input">
            <input type="text"
                   placeholder="请输入帐号"
                   v-model="username">
          </div>
          <div class="input">
            <input type="password"
                   placeholder="请输入密码"
                   v-model="password">
          </div>
          <div class="btn-box">
            <a class="btn"
               href="javascript:;"
               @click.prevent="login($event)">登录</a>
          </div>
          <div class="tips">
            <div class="sms">手机短信登录/注册</div>
            <div class="reg"
                 @click="register">立即注册<span>|</span>忘记密码？</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="footer-link">
        <a href="https://www.imooc.com/u/1343480"
           target="_blank">河畔一角主页</a><span>|</span>
        <a href="https://coding.imooc.com/class/113.html"
           target="_blank">Vue全栈课程</a><span>|</span>
        <a href="https://coding.imooc.com/class/236.html"
           target="_blank">React全家桶课程</a><span>|</span>
        <a href="https://coding.imooc.com/class/343.html"
           target="_blank">微信支付专项课程（H5+小程序/云+Node+MongoDB）</a>
      </div>
      <p class="copyright">Copyright ©2019 mi.futurefe.com All Rights Reserved.</p>
    </div>
  </div>
</template>
<script>

export default {
  name: 'login',
  data () {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    login (events) {
      //需要判定才可以放进vuex
      events.preventDefault();
      events.stopPropagation();
      this.$api.post('/posts', {
        username: this.username,
        password: this.password
      }).then((res) => {
        // 处理成功情况
        this.$store.dispatch("saveusername", {
          username: res.username,
          userid: res.id,
        })
        console.log("resresreslogin", res);
        this.$cookie.set("userid", res.id, { expires: 'Session' })
        console.log(res);
        this.$router.push({ name: "index", params: { from: "login" } })
      })
      // fetch('/posts').then(res => res.json()).then(res => {
      //   console.log('res', res);
      // })
    },
    register () {
      this.$api.post('/register', {
        username: 1369403243,
        password: "LZf1369403243"
      }).then((res) => {
        // 处理成功情况

        console.log(res);
        this.$router.push("/index")
      })
    }
  }
}

</script>
<style lang="scss">
.login {
  & > .container {
    height: 113px;
    img {
      width: auto;
      height: 100%;
    }
  }
  .wrapper {
    background: url("/imgs/login-bg.jpg") no-repeat center;
    .container {
      height: 576px;
      .login-form {
        box-sizing: border-box;
        padding-left: 31px;
        padding-right: 31px;
        width: 410px;
        height: 510px;
        background-color: #ffffff;
        position: absolute;
        bottom: 29px;
        right: 0;
        h3 {
          line-height: 23px;
          font-size: 24px;
          text-align: center;
          margin: 40px auto 49px;
          .checked {
            color: #ff6600;
          }
          .sep-line {
            margin: 0 32px;
          }
        }
        .input {
          display: inline-block;
          width: 348px;
          height: 50px;
          border: 1px solid #e5e5e5;
          margin-bottom: 20px;
          input {
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
          }
        }
        .btn {
          width: 100%;
          line-height: 50px;
          margin-top: 10px;
          font-size: 16px;
        }
        .tips {
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          font-size: 14px;
          cursor: pointer;
          .sms {
            color: #ff6600;
          }
          .reg {
            color: #999999;
            span {
              margin: 0 7px;
            }
          }
        }
      }
    }
  }
  .footer {
    height: 100px;
    padding-top: 60px;
    color: #999999;
    font-size: 16px;
    text-align: center;
    .footer-link {
      a {
        color: #999999;
        display: inline-block;
      }
      span {
        margin: 0 10px;
      }
    }
    .copyright {
      margin-top: 13px;
    }
  }
}
</style>