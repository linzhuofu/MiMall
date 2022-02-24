// import Vue from 'vue'
// import Router from 'vue-router'
// Vue.use(Router);

import { createRouter, createWebHistory } from 'vue-router'
import home from "./pages/home"
import index from "./pages/index"
import product from "./pages/product"
import detail from "./pages/detail"
import cart from "./pages/cart"
import order from "./pages/order"
import orderpay from "./pages/orderpay"
import orderlist from "./pages/orderlist"
import orderconfirm from "./pages/orderconfirm"




export default createRouter({
    history: createWebHistory(),
    routes: [{
            path: "/",
            redirect: '/index',
            name: "home",
            component: home,
            children: [{
                    path: "/product",
                    name: "product",
                    component: product
                },

                {
                    path: "/index",
                    name: "index",
                    component: index
                },
                {
                    path: "/detail",
                    name: "detail",
                    component: detail
                },
            ],
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
                    path: "/orderpay",
                    name: "orderpay",
                    component: orderpay
                }, {
                    path: "/orderlist",
                    name: "orderlist",
                    component: orderlist
                },
                {
                    path: "/orderconfirm",
                    name: "orderconfirm",
                    component: orderconfirm
                },

            ]
        },

    ],
})