// import Vue from 'vue'
// import Router from 'vue-router'
// Vue.use(Router);

import { createRouter, createWebHashHistory } from 'vue-router'
import home from "./pages/home"
import index from "./pages/index"
import product from "./pages/product"
import detail from "./pages/detail"
import login from "./pages/login"
import cart from "./pages/cart"
import order from "./pages/order"
import orderpay from "./pages/orderpay"
import orderlist from "./pages/orderlist"
import orderconfirm from "./pages/orderconfirm"
import alipay from "./pages/alipay"



export default createRouter({
    history: createWebHashHistory(),
    routes: [{
            path: "/",
            redirect: '/index',
            name: "home",
            component: home,
            children: [{
                    path: "/product/:id",
                    name: "product",
                    component: product
                },

                {
                    path: "/index",
                    name: "index",
                    component: index
                },
                {
                    path: "/detail/:id",
                    name: "detail",
                    component: detail
                },
            ],
        },
        {
            path: "/login",
            name: "login",
            component: login
        },
        {
            path: "/cart",
            name: "cart",
            component: cart
        },
        {
            path: "/order",
            name: "order",
            component: order,
            children: [{
                    path: "pay",
                    name: "orderpay",
                    component: orderpay
                }, {
                    path: "list",
                    name: "orderlist",
                    component: orderlist
                },
                {
                    path: "confirm",
                    name: "orderconfirm",
                    component: orderconfirm
                }, {
                    path: "alipay",
                    name: "alipay",
                    component: alipay
                },

            ]
        },

    ],
})