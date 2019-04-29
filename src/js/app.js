/* eslint-env browser */
import {firebase, fsDb} from "./init_firebase";

import Vue from "vue";
import VueRouter from "vue-router";

import CardListApp from "../vue/CardListApp.vue";
import UserPageApp from "../vue/UserPageApp.vue";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {path: "/app", component: UserPageApp},
        {path: "/app/list/:id", component: CardListApp}
    ]
})

const vm = new Vue({
    router
}).$mount("#mount-point");