/* eslint-env browser */
import {firebase} from "./FirebaseInit";

import Vue from "vue";
import VueRouter from "vue-router";

import CardListApp from "../vue/CardListApp.vue";
import UserPageApp from "../vue/UserPageApp.vue";

import {TodoList, Collections, getCollectionRef} from "./Models";

Vue.use(VueRouter);

const vmData = {
    userInfo: null,
    lists: []
}

const router = new VueRouter({
    routes: [
        {path: "/", component: UserPageApp, params: true},
        {path: "/list/:id", component: CardListApp}
    ]
})

const vm = new Vue({
    router,
    data: vmData,
    template: "<router-view></router-view>"
});

firebase.auth().onAuthStateChanged(function authStateHandler(user) {
    if(user) {
        // User is logged in. 
        vmData.userInfo = user;

        // Get user's lists from database
        TodoList.getByOwner(getCollectionRef(Collections.LISTS), user.uid)
            .then(tls => {vmData.lists = tls})
            .catch(err => {console.error("An error occured while accessing database: " + err)})

        if(!vm.$el) {
            vm.$mount("#mount-point");
        }
    } else {
        vmData.userInfo = null;
    }
})