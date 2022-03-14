import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'
import store from './store/index.js'
// var VueCookie = require('vue-cookie');
import VueCookie from 'vue-cookie'
import 'element-ui/lib/theme-chalk/index.css';
import { ElMessage } from 'element-plus'
// var VueCookie = require('vue-cookie');
// import vueaxios from 'vue-axios'
import router from "./router"
import env from "./env"
import lazyPlugin from 'vue3-lazy'


//mock开关
const mock = true;
if (mock) {
    require('./mock/api');
}


const app = createApp(App).use(router).use(store)
    //vue3-lazy图片懒加载的使用
lazyPlugin.install(app, {
    loading: '/imgs/loading-svg/loading-bars.svg',
})



console.log("app", app);
app.config.globalProperties.$message = ElMessage
app.config.globalProperties.$cookie = VueCookie
app.config.globalProperties.$filters = {
        currencyUSD(value) {
            return '$' + value
        }
    }
    // app.use(axios)
app.config.globalProperties.$api = axios
app.mount('#app');

app.config.globalProperties.$http = axios
    //发请求时设置基础值
    // axios.defaults.baseURL = '/api';
    // axios.defaults.timeout = 8000;
    // // 根据环境变量获取不同的请求地址
    // axios.defaults.baseURL = env.baseURL;

const baseurl = env.baseURL;
axios.create({
    baseURL: baseurl,
    timeout: 5000
})

axios.interceptors.response.use(function(response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么

    let res = response.data;
    if (res.status == 0) {
        return res.data;
    } else
    if (res.status == 10) {
        // window.location.href = "/#/login"
    } else {
        return res


    }
}, function(error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});