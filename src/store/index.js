import { createStore } from 'vuex'
const store = createStore({
    state() {
        return {
            count: 0,
            username: "",
            userid: "",
            cartcount: 0,
        }
    },
    getters: {





    },
    actions: {
        savecartcount(context, payload) {
            context.commit("savecartcount", payload)

        },
        saveusername(context, payload) {
            console.log("context", context, payload);
            context.commit("saveusername", payload)
        }
    },
    mutations: {
        savecartcount(state, payload) {
            state.cartcount = payload.cartnum;
        },
        saveusername(state, payload) {
            state.username = payload.username;
            state.userid = payload.userid;
        },
        increment(state) {
            state.count++
        },
        add(state) {

            state.userid++


        },
    }
})
export default store