// import Vue from 'vue'
// import Router from 'vue-router'
// Vue.use(Router);

import { createRouter, createWebHistory } from 'vue-router'
import home from "./pages/home"
import index from "./pages/index"
import product from "./pages/product"
import detail from "./pages/detail"
import orderpay from "./pages/orderpay"


export default createRouter({
    history: createWebHistory(),
    routes: [{
            path: "/",
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
                {
                    path: "/orderpay",
                    name: "orderpay",
                    component: orderpay
                },

            ]
        },

    ],
})